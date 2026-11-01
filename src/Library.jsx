import React, { useMemo, useState } from 'react';
import { citations, parseAuthors } from './citations.js';
import { parseQuery, useData } from './store.jsx';
import { CopyButton, TagChips, TYPE_LABEL } from './ui.jsx';

export function runSearch({ sources, quotes, notes }, query, tagMode = 'and') {
  const { tags, text } = parseQuery(query);
  const byId = Object.fromEntries(sources.map((s) => [s.id, s]));
  const has = (s) => !text || (s || '').toLowerCase().includes(text);
  const sourceText = (s) => [s.title, s.authors, s.details?.subtitle, s.details?.publication, s.details?.podcast].join(' ');
  const tagMatch = (quoteTags) => !tags.length || (tagMode === 'or'
    ? tags.some((w) => quoteTags.some((t) => t === w || t.replace(/\s+/g, '-') === w))
    : tags.every((w) => quoteTags.some((t) => t === w || t.replace(/\s+/g, '-') === w)));

  const q = quotes.filter((x) => byId[x.source_id] && tagMatch(x.tags) && has(`${x.text} ${x.tags.join(' ')}`));
  const n = tags.length ? [] : notes.filter((x) => byId[x.source_id] && has(x.body));
  const s = tags.length ? [] : sources.filter((x) => has(sourceText(x)));
  return { quotes: q, notes: n, sources: s, tags, text, byId };
}

function Highlight({ text, term }) {
  if (!term) return text;
  const i = text.toLowerCase().indexOf(term);
  if (i < 0) return text;
  return <>{text.slice(0, i)}<mark className="hit">{text.slice(i, i + term.length)}</mark>{text.slice(i + term.length)}</>;
}

function excerpt(body, term, size = 220) {
  if (body.length <= size) return body;
  const i = term ? body.toLowerCase().indexOf(term) : 0;
  const start = Math.max(0, i - 60);
  return `${start ? '…' : ''}${body.slice(start, start + size)}…`;
}

const byline = (s) => parseAuthors(s.authors).map((a) => [a.first, a.last].filter(Boolean).join(' ')).join(', ');

export default function Library({ query, setQuery, filter, setFilter, onExport }) {
  const data = useData();
  const { sources, quotes, notes, terms, allTags, loading } = data;
  const [openSpineMenu, setOpenSpineMenu] = useState(null);
  const [tagMode, setTagMode] = useState('and');

  const handleSpineExport = (source, mode) => {
    onExport({
      source,
      quotes: quotes.filter((q) => q.source_id === source.id),
      notes: notes.filter((n) => n.source_id === source.id),
      terms: terms.filter((t) => t.source_id === source.id),
      mode,
    });
    setOpenSpineMenu(null);
  };

  const counts = useMemo(() => {
    const c = {};
    quotes.forEach((q) => { c[q.source_id] = c[q.source_id] || { q: 0, n: 0 }; c[q.source_id].q += 1; });
    notes.forEach((n) => { c[n.source_id] = c[n.source_id] || { q: 0, n: 0 }; c[n.source_id].n += 1; });
    return c;
  }, [quotes, notes]);

  const results = useMemo(() => (query.trim() ? runSearch(data, query, tagMode) : null), [data, query, tagMode]);
  const shelf = useMemo(() => sources
    .filter((s) => filter === 'all' || s.type === filter)
    .sort((a, b) => (b.updated_at || '').localeCompare(a.updated_at || '')), [sources, filter]);

  const toggleTag = (t) => {
    const token = /\s/.test(t) ? `#"${t}"` : `#${t}`;
    setQuery(query.includes(token) ? query.replace(token, '').replace(/\s+/g, ' ').trim() : `${query} ${token}`.trim());
  };
  const activeTags = results?.tags || [];

  return (
    <div className="library">
      <aside className="tag-rail">
        <div className="tag-rail-head">
          <h2>Tags</h2>
          {allTags.length > 0 && (
            <div className="tag-mode-toggle" role="group" aria-label="Tag filter mode">
              <button type="button" className={tagMode === 'and' ? 'on' : ''} onClick={() => setTagMode('and')} title="Show quotes that have all selected tags">All</button>
              <button type="button" className={tagMode === 'or' ? 'on' : ''} onClick={() => setTagMode('or')} title="Show quotes that have any selected tag">Any</button>
            </div>
          )}
        </div>
        {allTags.length === 0 && <p className="hint">Tags you add to quotes show up here.</p>}
        <ul>
          {allTags.map(([t, n]) => (
            <li key={t}>
              <button type="button" className={activeTags.includes(t) || activeTags.includes(t.replace(/\s+/g, '-')) ? 'on' : ''}
                onClick={() => toggleTag(t)}>
                <span>#{t}</span><span className="count">{n}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section className="shelf">
        {loading && <p className="hint">Loading your library…</p>}

        {!loading && !results && (
          <>
            <div className="shelf-head">
              <div className="segmented" role="tablist">
                {[['all', 'Everything'], ['book', 'Books'], ['article', 'Articles'], ['podcast', 'Podcasts']].map(([k, l]) => (
                  <button type="button" key={k} role="tab" aria-selected={filter === k} className={filter === k ? 'on' : ''}
                    onClick={() => setFilter(k)}>{l}</button>
                ))}
              </div>
              <span className="hint">{shelf.length} {shelf.length === 1 ? 'source' : 'sources'}</span>
            </div>
            {shelf.length === 0 ? (
              <div className="empty">
                <p>Nothing here yet. Add a quote with the button above, or press Q, and create its source as you go.</p>
              </div>
            ) : (
              <ol className="spines">
                {shelf.map((s) => (
                  <li key={s.id} className="spine-row">
                    <a href={`#/s/${s.id}`} className={`spine spine-${s.type}`}>
                      <span className="spine-title">{s.title}</span>
                      <span className="spine-by">{byline(s) || s.details?.publication || s.details?.podcast || ''}</span>
                    </a>
                    <div className="spine-export">
                      <button
                        type="button"
                        className="spine-export-btn"
                        title="Export PDF"
                        onClick={(e) => { e.preventDefault(); setOpenSpineMenu(openSpineMenu === s.id ? null : s.id); }}
                      >↓</button>
                      {openSpineMenu === s.id && (
                        <div className="spine-export-menu">
                          <button type="button" onClick={() => handleSpineExport(s, 'full')}>Notes &amp; Quotes</button>
                          <button type="button" onClick={() => handleSpineExport(s, 'notes')}>Notes only</button>
                          <button type="button" onClick={() => handleSpineExport(s, 'quotes')}>Quotes only</button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </>
        )}

        {results && (
          <div className="results">
            <div className="shelf-head">
              <p className="results-summary">
                {results.quotes.length} {results.quotes.length === 1 ? 'quote' : 'quotes'}
                {!results.tags.length && `, ${results.notes.length} ${results.notes.length === 1 ? 'note' : 'notes'}, ${results.sources.length} ${results.sources.length === 1 ? 'source' : 'sources'}`}
              </p>
              <span className="spacer" />
              {results.quotes.length > 0 && <button type="button" className="btn-ghost" onClick={() => onExport(results)}>Export quotes as PDF</button>}
              <button type="button" className="btn-ghost" onClick={() => setQuery('')}>Clear search</button>
            </div>

            {results.sources.length > 0 && (
              <section className="result-group">
                <h3>Sources</h3>
                <ul className="result-sources">
                  {results.sources.map((s) => (
                    <li key={s.id}><a href={`#/s/${s.id}`}><Highlight text={s.title} term={results.text} /></a> <span className="hint">{byline(s)}</span></li>
                  ))}
                </ul>
              </section>
            )}

            {results.quotes.length > 0 && (
              <section className="result-group">
                <h3>Quotes</h3>
                {results.quotes.map((q) => {
                  const s = results.byId[q.source_id];
                  const c = citations(s, q.locator);
                  return (
                    <div key={q.id} className="result-quote">
                      <a href={`#/s/${s.id}/q/${q.id}`} className="result-quote-body">
                        <blockquote><span className="marked"><Highlight text={q.text} term={results.text} /></span></blockquote>
                        <span className="result-meta">{s.title}{q.locator ? `, ${q.locator}` : ''}</span>
                        <TagChips tags={q.tags} active={results.tags} />
                      </a>
                      <div className="result-cite-actions">
                        <CopyButton segs={c.note} label="Footnote" />
                        <CopyButton segs={c.short} label="Short" />
                      </div>
                    </div>
                  );
                })}
              </section>
            )}

            {results.notes.length > 0 && (
              <section className="result-group">
                <h3>Notes</h3>
                {results.notes.map((n) => (
                  <a key={n.id} href={`#/s/${n.source_id}`} className="result-note">
                    <p><Highlight text={excerpt(n.body, results.text)} term={results.text} /></p>
                    <span className="result-meta">{results.byId[n.source_id].title}</span>
                  </a>
                ))}
              </section>
            )}

            {!results.quotes.length && !results.notes.length && !results.sources.length && (
              <div className="empty"><p>No matches for “{query}”. Tag searches need the exact tag, like #privacy.</p></div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
