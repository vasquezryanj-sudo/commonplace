import React, { useMemo, useState } from 'react';
import { parseTags, useData } from './store.jsx';
import { submitOnMetaEnter } from './ui.jsx';

/** Comma-separated tag box that suggests tags you've used before. */
export function TagInput({ value, onChange, onKeyDown }) {
  const { allTags } = useData();
  const [focused, setFocused] = useState(false);
  const fragment = value.split(',').pop().trim().replace(/^#/, '').toLowerCase();
  const used = new Set(parseTags(value));
  const suggestions = useMemo(() => (fragment
    ? allTags.map(([t]) => t).filter((t) => t.startsWith(fragment) && t !== fragment && !used.has(t)).slice(0, 6)
    : []), [fragment, allTags, value]); // eslint-disable-line

  const pick = (t) => {
    const parts = value.split(',');
    parts[parts.length - 1] = ` ${t}`;
    onChange(`${parts.join(',').replace(/^\s+/, '')}, `);
  };

  return (
    <div className="tag-input">
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="power, privacy, epistemic rights"
        onFocus={() => setFocused(true)} onBlur={() => setTimeout(() => setFocused(false), 120)}
        onKeyDown={(e) => {
          if (e.key === 'Tab' && suggestions.length && !e.shiftKey) { e.preventDefault(); pick(suggestions[0]); return; }
          onKeyDown?.(e);
        }} />
      {focused && suggestions.length > 0 && (
        <ul className="suggest">
          {suggestions.map((t) => <li key={t}><button type="button" onMouseDown={() => pick(t)}>#{t}</button></li>)}
        </ul>
      )}
    </div>
  );
}

/** Text, page/timestamp, tags. Used on the source page and in Quick quote. */
export default function QuoteForm({ sourceType, initial, onSubmit, onCancel, submitLabel = 'Save quote', extraAction }) {
  const [text, setText] = useState(initial?.text || '');
  const [locator, setLocator] = useState(initial?.locator || '');
  const [tags, setTags] = useState(initial?.tags?.join(', ') || '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const run = async (handler) => {
    if (!text.trim()) { setError('Paste or type the quote first.'); return; }
    setBusy(true); setError('');
    try {
      await handler({ text, locator, tags: parseTags(tags) });
      if (!initial) { setText(''); setLocator(''); setTags(''); }
    } catch (err) {
      setError(`Couldn't save: ${err.message}`);
    }
    setBusy(false);
  };
  const keys = submitOnMetaEnter(() => run(onSubmit));

  return (
    <form className="quote-form" onSubmit={(e) => { e.preventDefault(); run(onSubmit); }}>
      <textarea className="quote-input" rows={4} value={text} onChange={(e) => setText(e.target.value)}
        onKeyDown={keys} placeholder="Paste the passage" />
      <div className="quote-form-row">
        <label className="field field-short">
          <span>{sourceType === 'podcast' ? 'Timestamp' : 'Page'}</span>
          <input value={locator} onChange={(e) => setLocator(e.target.value)} onKeyDown={keys}
            placeholder={sourceType === 'podcast' ? '12:34' : '42'} />
        </label>
        <label className="field field-grow">
          <span>Tags</span>
          <TagInput value={tags} onChange={setTags} onKeyDown={keys} />
        </label>
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      <div className="form-actions">
        <span className="hint">⌘ Enter to save</span>
        <span className="spacer" />
        {onCancel && <button type="button" className="btn-ghost" onClick={onCancel}>Cancel</button>}
        {extraAction && <button type="button" className="btn-ghost" disabled={busy} onClick={() => run(extraAction.handler)}>{extraAction.label}</button>}
        <button type="submit" className="btn" disabled={busy}>{busy ? 'Saving…' : submitLabel}</button>
      </div>
    </form>
  );
}
