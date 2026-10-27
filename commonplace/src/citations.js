// Chicago notes and bibliography (18th ed.) for books, articles, podcasts.
// Citations are built as segments: [{ t: "text", i: true|false }] so italics survive copy/paste.

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];

export function parseAuthors(str = '') {
  return str.split(';').map((s) => s.trim()).filter(Boolean).map((s) => {
    const [last, ...rest] = s.split(',').map((p) => p.trim());
    const first = rest.join(', ');
    return { first, last };
  });
}

const fullName = (a) => [a.first, a.last].filter(Boolean).join(' ');
const invertedName = (a) => (a.first ? `${a.last}, ${a.first}` : a.last);

function joinList(items) {
  if (items.length <= 1) return items.join('');
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

// Notes: 1-2 authors in full, 3+ = first author et al.
function noteAuthors(list) {
  if (!list.length) return '';
  if (list.length >= 3) return `${fullName(list[0])} et al.`;
  return joinList(list.map(fullName));
}

// Bibliography: first author inverted; 7+ authors = first three, et al.
function bibAuthors(list) {
  if (!list.length) return '';
  const shown = list.length > 6 ? list.slice(0, 3) : list;
  const names = shown.map((a, i) => (i === 0 ? invertedName(a) : fullName(a)));
  if (list.length > 6) return `${names.join(', ')}, et al.`;
  if (names.length === 2) return `${names[0]}, and ${names[1]}`;
  return joinList(names);
}

function shortAuthors(list) {
  if (!list.length) return '';
  if (list.length >= 3) return `${list[0].last} et al.`;
  return joinList(list.map((a) => a.last));
}

export function formatDate(d = '') {
  const m = String(d).trim().match(/^(\d{4})(?:-(\d{1,2}))?(?:-(\d{1,2}))?$/);
  if (!m) return String(d).trim();
  const [, y, mo, day] = m;
  if (!mo) return y;
  const month = MONTHS[Number(mo) - 1] || '';
  return day ? `${month} ${Number(day)}, ${y}` : `${month} ${y}`;
}

export function shortTitle(title = '', override = '') {
  if (override) return override;
  const main = title.split(':')[0].trim();
  let words = main.replace(/^(The|A|An)\s+/i, '').split(/\s+/);
  if (words.length > 5) {
    words = words.slice(0, 4);
    const small = /^(of|the|a|an|and|or|to|in|for|on|is|at|by|with|from)$/i;
    while (words.length > 1 && small.test(words[words.length - 1])) words.pop();
  }
  return words.join(' ');
}

const fullTitle = (title, subtitle) => (subtitle ? `${title}: ${subtitle}` : title);

// Small helpers to build segment lists
const T = (t) => ({ t });
const I = (t) => ({ t, i: true });
// Put a comma or period inside closing quotation marks (American style)
const Q = (t, punct) => T(`“${t}${/[?!]$/.test(t) ? '' : punct}”`);

function finish(segs) {
  // collapse empty pieces and ensure a final period
  const out = segs.filter((s) => s.t);
  while (out.length && !out[out.length - 1].t.trimEnd()) out.pop();
  if (out.length) out[out.length - 1] = { ...out[out.length - 1], t: out[out.length - 1].t.trimEnd() };
  const last = out[out.length - 1];
  if (last && !/[.?!”]$/.test(last.t)) out.push(T('.'));
  return out;
}

function locatorText(source, locator) {
  if (!locator) return '';
  return source.type === 'podcast' ? `at ${locator}` : locator;
}

// ---------- Books ----------
function book(src, loc) {
  const d = src.details || {};
  const a = parseAuthors(src.authors);
  const title = fullTitle(src.title, d.subtitle);
  const pubParts = [d.place && d.publisher ? `${d.place}: ${d.publisher}` : d.publisher || d.place, d.year].filter(Boolean);
  const pub = pubParts.join(', ');
  const ed = d.edition ? `${d.edition} ed.` : '';

  const note = finish([
    T(a.length ? `${noteAuthors(a)}, ` : ''),
    I(title),
    T(ed ? `, ${ed}` : ''),
    T(pub ? ` (${pub})` : ''),
    T(loc ? `, ${loc}` : ''),
  ]);
  const short = finish([
    T(a.length ? `${shortAuthors(a)}, ` : ''),
    I(shortTitle(src.title, d.shortTitle)),
    T(loc ? `, ${loc}` : ''),
  ]);
  const bib = finish([
    T(a.length ? `${bibAuthors(a)}. ` : ''),
    I(title),
    T('. '),
    T(ed ? `${ed[0].toUpperCase()}${ed.slice(1)} ` : ''),
    T(pub ? `${pub}` : ''),
  ]);
  return { note, short, bib };
}

// ---------- Articles ----------
function article(src, loc) {
  const d = src.details || {};
  const a = parseAuthors(src.authors);
  const title = fullTitle(src.title, d.subtitle);
  const date = formatDate(d.date);
  const link = d.doi ? (d.doi.startsWith('http') ? d.doi : `https://doi.org/${d.doi}`) : d.url;
  const isJournal = Boolean(d.volume);

  let note, bib;
  if (isJournal) {
    const volIssue = [d.volume, d.issue ? `no. ${d.issue}` : ''].filter(Boolean).join(', ');
    note = finish([
      T(a.length ? `${noteAuthors(a)}, ` : ''),
      Q(title, ','),
      T(' '),
      I(d.publication || ''),
      T(` ${volIssue}`),
      T(date ? ` (${date})` : ''),
      T(loc ? `: ${loc}` : ''),
      T(link ? `, ${link}` : ''),
    ]);
    bib = finish([
      T(a.length ? `${bibAuthors(a)}. ` : ''),
      Q(title, '.'),
      T(' '),
      I(d.publication || ''),
      T(` ${volIssue}`),
      T(date ? ` (${date})` : ''),
      T(d.pages ? `: ${d.pages}` : ''),
      T(link ? `. ${link}` : ''),
    ]);
  } else {
    note = finish([
      T(a.length ? `${noteAuthors(a)}, ` : ''),
      Q(title, ','),
      T(' '),
      I(d.publication || ''),
      T(date ? `, ${date}` : ''),
      T(loc ? `, ${loc}` : ''),
      T(link ? `, ${link}` : ''),
    ]);
    bib = finish([
      T(a.length ? `${bibAuthors(a)}. ` : ''),
      Q(title, '.'),
      T(' '),
      I(d.publication || ''),
      T(date ? `, ${date}` : ''),
      T(link ? `. ${link}` : ''),
    ]);
  }
  const short = finish([
    T(a.length ? `${shortAuthors(a)}, ` : ''),
    Q(shortTitle(src.title, d.shortTitle), loc ? ',' : '.'),
    T(loc ? ` ${loc}` : ''),
  ]);
  return { note, short, bib };
}

// ---------- Podcasts ----------
function podcast(src, loc) {
  const d = src.details || {};
  const a = parseAuthors(src.authors);
  const role = a.length > 1 ? 'hosts' : 'host';
  const date = formatDate(d.date);
  const ep = d.episode ? `episode ${d.episode}` : '';

  const note = finish([
    T(a.length ? `${noteAuthors(a)}, ${role}, ` : ''),
    Q(src.title, ','),
    T(' '),
    I(d.podcast || ''),
    T(ep ? `, ${ep}` : ''),
    T(d.publisher ? `, ${d.publisher}` : ''),
    T(date ? `, ${date}` : ''),
    T(d.duration ? `, ${d.duration}` : ''),
    T(loc ? `, ${loc}` : ''),
    T(d.url ? `, ${d.url}` : ''),
  ]);
  const short = finish([
    T(a.length ? `${shortAuthors(a)}, ` : ''),
    Q(shortTitle(src.title, d.shortTitle), loc ? ',' : '.'),
    T(loc ? ` ${loc}` : ''),
  ]);
  const bib = finish([
    T(a.length ? `${bibAuthors(a)}, ${role}. ` : ''),
    Q(src.title, '.'),
    T(' '),
    I(d.podcast || ''),
    T(ep ? `, ${ep[0].toUpperCase()}${ep.slice(1)}` : ''),
    T(d.publisher ? `. ${d.publisher}` : ''),
    T(date ? `, ${date}` : ''),
    T(d.duration ? `. ${d.duration}` : ''),
    T(d.url ? `. ${d.url}` : ''),
  ]);
  return { note, short, bib };
}

const builders = { book, article, podcast };

// Plain text overrides become a single segment, with *asterisks* as italics
function fromOverride(str) {
  return str.split(/(\*[^*]+\*)/).filter(Boolean).map((p) =>
    p.startsWith('*') && p.endsWith('*') ? I(p.slice(1, -1)) : T(p));
}

/** Citations for a source, optionally pinned to a page or timestamp. */
export function citations(source, locator = '') {
  const loc = locatorText(source, locator);
  const built = (builders[source.type] || book)(source, loc);
  const o = source.citation_overrides || {};
  // Hand-edited citations apply to the source as a whole; a quote's page is appended
  if (o.bibliography) built.bib = fromOverride(o.bibliography);
  if (o.note) built.note = fromOverride(appendLoc(o.note, loc));
  if (o.short) built.short = fromOverride(appendLoc(o.short, loc));
  return built;
}

function appendLoc(text, loc) {
  if (!loc) return text;
  return `${text.replace(/\.\s*$/, '')}, ${loc}.`;
}

export const toPlain = (segs) => segs.map((s) => s.t).join('');
const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
export const toHtml = (segs) => segs.map((s) => (s.i ? `<i>${esc(s.t)}</i>` : esc(s.t))).join('');
// Editable form for the override box: italics shown as *asterisks*
export const toMarked = (segs) => segs.map((s) => (s.i ? `*${s.t}*` : s.t)).join('');
