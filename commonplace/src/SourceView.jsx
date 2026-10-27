import React, { useEffect, useMemo, useState } from 'react';
import { citations, parseAuthors } from './citations.js';
import QuoteForm from './QuoteForm.jsx';
import SourceForm from './SourceForm.jsx';
import { useData } from './store.jsx';
import { CopyButton, Rich, shortDate, submitOnMetaEnter, TagChips, TYPE_LABEL } from './ui.jsx';

function QuoteCard({ quote, source, activeTags, onTag, focused }) {
  const { saveQuote, deleteQuote } = useData();
  const [editing, setEditing] = useState(false);
  const cites = citations(source, quote.locator);

  useEffect(() => {
    if (focused) document.getElementById(`q-${quote.id}`)?.scrollIntoView({ block: 'center' });
  }, [focused, quote.id]);

  if (editing) {
    return (
      <li className="quote-card editing">
        <QuoteForm sourceType={source.type} initial={quote} submitLabel="Save changes" onCancel={() => setEditing(false)}
          onSubmit={async (f) => { await saveQuote({ ...f, source_id: source.id }, quote.id); setEditing(false); }} />
      </li>
    );
  }
  return (
    <li className={`quote-card ${focused ? 'focused' : ''}`} id={`q-${quote.id}`}>
      <blockquote><span className="marked">{quote.text}</span></blockquote>
      <div className="quote-meta">
        {quote.locator && <span className="locator">{source.type === 'podcast' ? quote.locator : `p. ${quote.locator}`}</span>}
        <TagChips tags={quote.tags} active={activeTags} onPick={onTag} />
      </div>
      <div className="card-actions">
        <CopyButton segs={cites.note} label="Copy footnote" />
        <CopyButton segs={cites.short} label="Copy short footnote" />
        <span className="spacer" />
        <button type="button" className="btn-ghost reveal" onClick={() => setEditing(true)}>Edit</button>
        <button type="button" className="btn-ghost btn-quiet-danger reveal" onClick={() => {
          if (window.confirm('Delete this quote?')) deleteQuote(quote.id);
        }}>Delete</button>
      </div>
    </li>
  );
}

function NoteCard({ note }) {
  const { saveNote, deleteNote } = useData();
  const [editing, setEditing] = useState(false);
  const [body, setBody] = useState(note.body);
  const save = async () => { if (body.trim()) { await saveNote({ source_id: note.source_id, body }, note.id); setEditing(false); } };

  if (editing) {
    return (
      <li className="note-card editing">
        <textarea rows={Math.max(4, body.split('\n').length + 1)} value={body} autoFocus
          onChange={(e) => setBody(e.target.value)} onKeyDown={submitOnMetaEnter(save)} />
        <div className="form-actions">
          <span className="spacer" />
          <button type="button" className="btn-ghost" onClick={() => { setBody(note.body); setEditing(false); }}>Cancel</button>
          <button type="button" className="btn" onClick={save}>Save changes</button>
        </div>
      </li>
    );
  }
  return (
    <li className="note-card">
      <p className="note-body">{note.body}</p>
      <div className="card-actions">
        <span className="hint">{shortDate(note.created_at)}</span>
        <span className="spacer" />
        <button type="button" className="btn-ghost reveal" onClick={() => setEditing(true)}>Edit</button>
        <button type="button" className="btn-ghost btn-quiet-danger reveal" onClick={() => {
          if (window.confirm('Delete this note?')) deleteNote(note.id);
        }}>Delete</button>
      </div>
    </li>
  );
}

function NoteComposer({ sourceId }) {
  const { saveNote } = useData();
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);
  const save = async () => {
    if (!body.trim()) return;
    setBusy(true);
    try { await saveNote({ source_id: sourceId, body }); setBody(''); } finally { setBusy(false); }
  };
  return (
    <div className="note-composer">
      <textarea rows={3} value={body} onChange={(e) => setBody(e.target.value)} onKeyDown={submitOnMetaEnter(save)}
        placeholder="Write a note" />
      {body.trim() && (
        <div className="form-actions">
          <span className="hint">⌘ Enter to save</span>
          <span className="spacer" />
          <button type="button" className="btn" disabled={busy} onClick={save}>Save note</button>
        </div>
      )}
    </div>
  );
}

export default function SourceView({ id, focusQuoteId, onExport }) {
  const { sources, quotes, notes, saveQuote, loading } = useData();
  const source = sources.find((s) => s.id === id);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [tagFilter, setTagFilter] = useState([]);

  const myQuotes = useMemo(() => quotes.filter((q) => q.source_id === id), [quotes, id]);
  const myNotes = useMemo(() => notes.filter((n) => n.source_id === id), [notes, id]);
  const tagsHere = useMemo(() => [...new Set(myQuotes.flatMap((q) => q.tags))].sort(), [myQuotes]);
  const shown = tagFilter.length ? myQuotes.filter((q) => tagFilter.every((t) => q.tags.includes(t))) : myQuotes;
  const toggle = (t) => setTagFilter((f) => (f.includes(t) ? f.filter((x) => x !== t) : [...f, t]));

  if (loading) return <p className="hint pad">Loading…</p>;
  if (!source) return <div className="empty pad"><p>This source was deleted or doesn't exist. <a href="#/">Back to the library</a></p></div>;

  const cites = citations(source);
  const names = parseAuthors(source.authors).map((a) => [a.first, a.last].filter(Boolean).join(' '));
  const d = source.details || {};
  const where = source.type === 'podcast' ? d.podcast : source.type === 'article' ? d.publication : d.publisher;
  const when = source.type === 'book' ? d.year : d.date?.slice(0, 4);

  return (
    <div className="source">
      <header className="source-head">
        <div className="source-id">
          <a href="#/" className="back">Library</a>
          <span className="type-tag">{TYPE_LABEL[source.type]}</span>
          <h1>{source.title}{d.subtitle && <span className="subtitle">{d.subtitle}</span>}</h1>
          <p className="source-by">{[names.join(', '), [where, when].filter(Boolean).join(', ')].filter(Boolean).join(' / ')}</p>
        </div>
        <div className="source-actions">
          <button type="button" className="btn-ghost" onClick={() => setEditing(true)}>Edit source</button>
          <button type="button" className="btn-ghost" onClick={() => onExport({ source, quotes: myQuotes, notes: myNotes })}>Export PDF</button>
        </div>
      </header>

      <dl className="cite-bar">
        {[['Bibliography', cites.bib], ['Footnote', cites.note], ['Short footnote', cites.short]].map(([label, segs]) => (
          <div key={label} className="cite-row">
            <dt>{label}</dt>
            <dd><Rich segs={segs} /></dd>
            <CopyButton segs={segs} />
          </div>
        ))}
      </dl>

      <div className="spread">
        <section className="page page-left" aria-label="Notes">
          <div className="page-head">
            <h2>Notes</h2>
            <span className="hint">{myNotes.length}</span>
          </div>
          <NoteComposer sourceId={source.id} />
          <ul className="note-list">
            {myNotes.map((n) => <NoteCard key={n.id} note={n} />)}
          </ul>
        </section>

        <section className="page page-right" aria-label="Quotes">
          <div className="page-head">
            <h2>Quotes</h2>
            <span className="hint">{shown.length}{tagFilter.length ? ` of ${myQuotes.length}` : ''}</span>
            <span className="spacer" />
            {!adding && <button type="button" className="btn" onClick={() => setAdding(true)}>Add quote</button>}
          </div>
          {tagsHere.length > 0 && (
            <div className="tag-filter">
              <TagChips tags={tagsHere} active={tagFilter} onPick={toggle} />
              {tagFilter.length > 0 && <button type="button" className="btn-ghost" onClick={() => setTagFilter([])}>Show all</button>}
            </div>
          )}
          {adding && (
            <div className="quote-composer">
              <QuoteForm sourceType={source.type} onCancel={() => setAdding(false)}
                onSubmit={(f) => saveQuote({ ...f, source_id: source.id })} />
            </div>
          )}
          {myQuotes.length === 0 && !adding && <p className="hint">No quotes yet. Add the first one, or press Q from anywhere.</p>}
          <ul className="quote-list">
            {shown.map((q) => (
              <QuoteCard key={q.id} quote={q} source={source} activeTags={tagFilter} onTag={toggle} focused={q.id === focusQuoteId} />
            ))}
          </ul>
        </section>
      </div>

      {editing && <SourceForm source={source} onClose={() => setEditing(false)} />}
    </div>
  );
}
