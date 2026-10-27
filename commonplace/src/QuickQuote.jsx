import React, { useMemo, useState } from 'react';
import QuoteForm from './QuoteForm.jsx';
import SourceForm from './SourceForm.jsx';
import { useData } from './store.jsx';
import { Modal, TYPE_LABEL } from './ui.jsx';

export default function QuickQuote({ onClose, notify, presetSourceId }) {
  const { sources, saveQuote } = useData();
  const [sourceId, setSourceId] = useState(presetSourceId || null);
  const [find, setFind] = useState('');
  const [creating, setCreating] = useState(false);
  const [cursor, setCursor] = useState(0);

  const source = sources.find((s) => s.id === sourceId);
  const matches = useMemo(() => {
    const q = find.trim().toLowerCase();
    const list = [...sources].sort((a, b) => (b.updated_at || '').localeCompare(a.updated_at || ''));
    return (q ? list.filter((s) => `${s.title} ${s.authors}`.toLowerCase().includes(q)) : list).slice(0, 8);
  }, [find, sources]);

  if (creating) {
    return <SourceForm initialTitle={find.trim()} onClose={() => setCreating(false)} onSaved={(s) => setSourceId(s.id)} />;
  }

  const save = (keepOpen) => async (fields) => {
    await saveQuote({ ...fields, source_id: source.id });
    notify(`Quote saved to ${source.title}`);
    if (!keepOpen) onClose();
  };

  return (
    <Modal title="Add a quote" onClose={onClose} wide>
      {!source ? (
        <div className="picker">
          <label className="field">
            <span>Which source is it from?</span>
            <input value={find} autoFocus placeholder="Search by title or author"
              onChange={(e) => { setFind(e.target.value); setCursor(0); }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') { e.preventDefault(); setCursor((c) => Math.min(c + 1, matches.length - 1)); }
                if (e.key === 'ArrowUp') { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)); }
                if (e.key === 'Enter' && matches[cursor]) { e.preventDefault(); setSourceId(matches[cursor].id); }
              }} />
          </label>
          <ul className="picker-list">
            {matches.map((s, i) => (
              <li key={s.id}>
                <button type="button" className={i === cursor ? 'active' : ''} onClick={() => setSourceId(s.id)}>
                  <span className="picker-title">{s.title}</span>
                  <span className="picker-meta">{TYPE_LABEL[s.type]}{s.authors ? `, ${s.authors.split(';')[0].split(',')[0]}` : ''}</span>
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="btn-ghost add-source" onClick={() => setCreating(true)}>
            + New source{find ? `: “${find}”` : ''}
          </button>
        </div>
      ) : (
        <>
          <div className="picked">
            <span><span className="type-tag">{TYPE_LABEL[source.type]}</span> {source.title}</span>
            {!presetSourceId && <button type="button" className="btn-ghost" onClick={() => setSourceId(null)}>Change</button>}
          </div>
          <QuoteForm sourceType={source.type} onSubmit={save(false)}
            extraAction={{ label: 'Save and add another', handler: save(true) }} />
        </>
      )}
    </Modal>
  );
}
