import React, { useEffect, useRef, useState } from 'react';
import { toHtml, toPlain } from './citations.js';

export async function copyRich(segs) {
  const html = toHtml(segs);
  const plain = toPlain(segs);
  try {
    await navigator.clipboard.write([new ClipboardItem({
      'text/html': new Blob([html], { type: 'text/html' }),
      'text/plain': new Blob([plain], { type: 'text/plain' }),
    })]);
  } catch {
    await navigator.clipboard.writeText(plain);
  }
}

export function Rich({ segs }) {
  return <>{segs.map((s, i) => (s.i ? <i key={i}>{s.t}</i> : <span key={i}>{s.t}</span>))}</>;
}

export function CopyButton({ segs, label = 'Copy', className = '' }) {
  const [done, setDone] = useState(false);
  return (
    <button type="button" className={`btn-ghost ${className}`} onClick={async () => {
      await copyRich(segs);
      setDone(true);
      setTimeout(() => setDone(false), 1400);
    }}>{done ? 'Copied' : label}</button>
  );
}

export function Modal({ title, onClose, children, wide }) {
  const ref = useRef(null);
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    ref.current?.querySelector('input, textarea, select')?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="scrim" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={`modal ${wide ? 'modal-wide' : ''}`} ref={ref} role="dialog" aria-label={title}>
        <header className="modal-head">
          <h2>{title}</h2>
          <button type="button" className="btn-ghost" onClick={onClose} aria-label="Close">Close</button>
        </header>
        {children}
      </div>
    </div>
  );
}

export function TagChips({ tags, active = [], onPick }) {
  if (!tags.length) return null;
  return (
    <span className="chips">
      {tags.map((t) => (
        <button type="button" key={t} className={`chip ${active.includes(t) ? 'chip-on' : ''}`}
          onClick={onPick ? () => onPick(t) : undefined} tabIndex={onPick ? 0 : -1}>#{t}</button>
      ))}
    </span>
  );
}

export const TYPE_LABEL = { book: 'Book', article: 'Article', podcast: 'Podcast' };

export function shortDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

/** Cmd/Ctrl+Enter submits */
export const submitOnMetaEnter = (fn) => (e) => {
  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); fn(); }
};
