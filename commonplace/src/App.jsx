import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Library from './Library.jsx';
import PrintView from './PrintView.jsx';
import QuickQuote from './QuickQuote.jsx';
import SourceForm from './SourceForm.jsx';
import SourceView from './SourceView.jsx';
import { DataProvider } from './store.jsx';
import { configured, supabase } from './supabase.js';

function useRoute() {
  const read = () => {
    const m = window.location.hash.match(/^#\/s\/([^/]+)(?:\/q\/([^/]+))?/);
    return m ? { view: 'source', id: m[1], quoteId: m[2] } : { view: 'library' };
  };
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const on = () => { setRoute(read()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  return (
    <main className="login">
      <form onSubmit={async (e) => {
        e.preventDefault(); setBusy(true); setError('');
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) setError(err.message === 'Invalid login credentials' ? 'That email and password don’t match.' : err.message);
        setBusy(false);
      }}>
        <h1 className="wordmark">Commonplace</h1>
        <label className="field"><span>Email</span>
          <input type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus /></label>
        <label className="field"><span>Password</span>
          <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="btn" type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </main>
  );
}

function Shell() {
  const route = useRoute();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [quick, setQuick] = useState(false);
  const [newSource, setNewSource] = useState(false);
  const [toast, setToast] = useState('');
  const [printJob, setPrintJob] = useState(null);
  const searchRef = useRef(null);
  const toastTimer = useRef(null);

  const notify = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 3200);
  }, []);

  // Q = add a quote, / = search. Ignored while typing in a field.
  useEffect(() => {
    const onKey = (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName);
      if (typing || e.metaKey || e.ctrlKey || e.altKey || quick || newSource) return;
      if (e.key === 'q' || e.key === 'Q') { e.preventDefault(); setQuick(true); }
      if (e.key === '/') { e.preventDefault(); searchRef.current?.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [quick, newSource]);

  useEffect(() => {
    if (!printJob) return undefined;
    const done = () => setPrintJob(null);
    window.addEventListener('afterprint', done);
    const t = setTimeout(() => window.print(), 50);
    return () => { clearTimeout(t); window.removeEventListener('afterprint', done); };
  }, [printJob]);

  return (
    <DataProvider onError={notify}>
      <div className="app">
        <header className="topbar">
          <a href="#/" className="wordmark" onClick={() => setQuery('')}>Commonplace</a>
          <div className="search">
            <input ref={searchRef} type="search" value={query} placeholder="Search quotes and notes, or #tag"
              aria-label="Search"
              onChange={(e) => { setQuery(e.target.value); if (route.view !== 'library') window.location.hash = '#/'; }}
              onKeyDown={(e) => { if (e.key === 'Escape') { setQuery(''); e.target.blur(); } }} />
            {!query && <kbd>/</kbd>}
          </div>
          <button type="button" className="btn-ghost" onClick={() => setNewSource(true)}>New source</button>
          <button type="button" className="btn" onClick={() => setQuick(true)}>Add quote <kbd>Q</kbd></button>
          <button type="button" className="btn-ghost signout" onClick={() => supabase.auth.signOut()}>Sign out</button>
        </header>

        <main>
          {route.view === 'source'
            ? <SourceView key={route.id} id={route.id} focusQuoteId={route.quoteId} onExport={setPrintJob} />
            : <Library query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} onExport={setPrintJob} />}
        </main>

        {quick && <QuickQuote onClose={() => setQuick(false)} notify={notify}
          presetSourceId={route.view === 'source' ? route.id : null} />}
        {newSource && <SourceForm onClose={() => setNewSource(false)}
          onSaved={(s) => { window.location.hash = `#/s/${s.id}`; }} />}
        {toast && <div className="toast" role="status">{toast}</div>}
      </div>
      {createPortal(<PrintView job={printJob} />, document.getElementById('print-root'))}
    </DataProvider>
  );
}

export default function App() {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    if (!configured) return undefined;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  if (!configured) {
    return (
      <main className="login"><div>
        <h1 className="wordmark">Commonplace</h1>
        <p>Add your Supabase URL and anon key as <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code>, then restart. See the README.</p>
      </div></main>
    );
  }
  if (session === undefined) return null;
  if (!session) return <Login />;
  return <Shell key={session.user.id} />;
}
