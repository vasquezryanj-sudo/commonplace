import React, { useMemo, useState } from 'react';
import { citations, toMarked } from './citations.js';
import { useData } from './store.jsx';
import { Modal, Rich, TYPE_LABEL } from './ui.jsx';

const FIELDS = {
  book: [
    ['subtitle', 'Subtitle'],
    ['publisher', 'Publisher'],
    ['year', 'Year', 'short'],
    ['place', 'City (optional)'],
    ['edition', 'Edition', 'short', 'e.g. 2nd'],
  ],
  article: [
    ['subtitle', 'Subtitle'],
    ['publication', 'Journal, magazine, or website'],
    ['date', 'Date', 'short', '2024 or 2024-03-05'],
    ['volume', 'Volume', 'short', 'Journals only'],
    ['issue', 'Issue', 'short'],
    ['pages', 'Page range', 'short', '121–36'],
    ['doi', 'DOI'],
    ['url', 'URL'],
  ],
  podcast: [
    ['podcast', 'Podcast name'],
    ['episode', 'Episode number', 'short'],
    ['date', 'Date', 'short', '2024-03-05'],
    ['publisher', 'Network or producer'],
    ['duration', 'Length', 'short', '1:12:04'],
    ['url', 'URL'],
  ],
};

const AUTHOR_LABEL = { book: 'Author(s)', article: 'Author(s)', podcast: 'Host(s)' };
const TITLE_LABEL = { book: 'Title', article: 'Article title', podcast: 'Episode title' };

export default function SourceForm({ source, initialTitle = '', onClose, onSaved }) {
  const { saveSource, deleteSource } = useData();
  const [type, setType] = useState(source?.type || 'book');
  const [title, setTitle] = useState(source?.title || initialTitle);
  const [authors, setAuthors] = useState(source?.authors || '');
  const [details, setDetails] = useState(source?.details || {});
  const [overrides, setOverrides] = useState(source?.citation_overrides || {});
  const [showOverrides, setShowOverrides] = useState(Boolean(
    source?.citation_overrides && Object.values(source.citation_overrides).some(Boolean)));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const setDetail = (k, v) => setDetails((d) => ({ ...d, [k]: v }));
  const draft = { type, title: title || 'Untitled', authors, details, citation_overrides: {} };
  const generated = useMemo(() => citations(draft), [type, title, authors, details]); // eslint-disable-line
  const preview = useMemo(() => citations({ ...draft, citation_overrides: overrides }), [generated, overrides]); // eslint-disable-line

  async function submit(e) {
    e.preventDefault();
    if (!title.trim()) { setError('Add a title to save this source.'); return; }
    setSaving(true);
    try {
      // keep only fields that belong to this type, and only non-empty overrides
      const keep = Object.fromEntries(FIELDS[type].map(([k]) => [k, details[k]]).concat([['shortTitle', details.shortTitle]])
        .filter(([, v]) => v && String(v).trim()));
      const ov = Object.fromEntries(Object.entries(overrides).filter(([, v]) => v && v.trim()));
      const saved = await saveSource({ type, title, authors, details: keep, citation_overrides: ov }, source?.id);
      onSaved?.(saved);
      onClose();
    } catch (err) {
      setError(`Couldn't save: ${err.message}`);
      setSaving(false);
    }
  }

  async function remove() {
    if (!window.confirm(`Delete “${source.title}” and all of its quotes and notes? This can't be undone.`)) return;
    await deleteSource(source.id);
    onClose();
    window.location.hash = '#/';
  }

  return (
    <Modal title={source ? 'Edit source' : 'New source'} onClose={onClose} wide>
      <form onSubmit={submit} className="form">
        <div className="segmented" role="radiogroup" aria-label="Source type">
          {Object.keys(FIELDS).map((t) => (
            <button type="button" key={t} role="radio" aria-checked={type === t}
              className={type === t ? 'on' : ''} onClick={() => setType(t)}>{TYPE_LABEL[t]}</button>
          ))}
        </div>

        <label className="field">
          <span>{TITLE_LABEL[type]}</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label className="field">
          <span>{AUTHOR_LABEL[type]}</span>
          <input value={authors} onChange={(e) => setAuthors(e.target.value)} placeholder="Last, First; Last, First" />
        </label>

        <div className="field-grid">
          {FIELDS[type].map(([k, label, size, hint]) => (
            <label key={`${type}-${k}`} className={`field ${size === 'short' ? 'field-short' : ''}`}>
              <span>{label}</span>
              <input value={details[k] || ''} placeholder={hint || ''} onChange={(e) => setDetail(k, e.target.value)} />
            </label>
          ))}
          <label className="field field-short">
            <span>Short title</span>
            <input value={details.shortTitle || ''} placeholder="Auto" onChange={(e) => setDetail('shortTitle', e.target.value)} />
          </label>
        </div>

        <section className="cite-preview">
          <div className="cite-preview-head">
            <h3>Citations</h3>
            <button type="button" className="btn-ghost" onClick={() => setShowOverrides((v) => !v)}>
              {showOverrides ? 'Use automatic citations' : 'Edit by hand'}
            </button>
          </div>
          {showOverrides ? (
            <>
              <p className="hint">Leave a box empty to keep the automatic version. Wrap italics in *asterisks*. A quote's page number is added to the footnotes for you.</p>
              {[['bibliography', 'Bibliography', generated.bib], ['note', 'Footnote', generated.note], ['short', 'Short footnote', generated.short]].map(([k, label, segs]) => (
                <label key={k} className="field">
                  <span>{label}</span>
                  <textarea rows={2} value={overrides[k] || ''} placeholder={toMarked(segs)}
                    onChange={(e) => setOverrides((o) => ({ ...o, [k]: e.target.value }))} />
                </label>
              ))}
            </>
          ) : (
            <dl className="cite-list">
              <dt>Bibliography</dt><dd><Rich segs={preview.bib} /></dd>
              <dt>Footnote</dt><dd><Rich segs={preview.note} /></dd>
              <dt>Short footnote</dt><dd><Rich segs={preview.short} /></dd>
            </dl>
          )}
        </section>

        {error && <p className="error" role="alert">{error}</p>}
        <footer className="form-actions">
          {source && <button type="button" className="btn-danger" onClick={remove}>Delete source</button>}
          <span className="spacer" />
          <button type="button" className="btn-ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn" disabled={saving}>{saving ? 'Saving…' : 'Save source'}</button>
        </footer>
      </form>
    </Modal>
  );
}
