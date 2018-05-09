const resultsSelector = [
  '.ssp.card-section a', // did you mean ...
  '.sp_cnt.card-section a', // showing results for ...
  '.r a:first-child', // results
  '#navcnt td a', // page numbers
].join(',');

const results = Array.from(document.querySelectorAll(resultsSelector));

const activeResultIndex = () => results.indexOf(document.activeElement);

const click = (el) => el && el.click();

const focus = (el) => el && el.focus();

const prevResult = () => {
  const idx = Math.max(activeResultIndex() - 1, 0);
  focus(results[idx]);
};

const nextResult = () => {
  const idx = activeResultIndex() + 1;
  focus(results[idx]);
};

const prevPage = () => click(document.querySelector('#navcnt td:first-child a'));

const nextPage = () => click(document.querySelector('#navcnt td:last-child a'));

const search = () => {
  const el = document.querySelector('#lst-ib');
  focus(el);
  el && el.setSelectionRange(0, el.value.length);
};

const handlers = {
  'k': prevResult,
  'j': nextResult,
  'h': prevPage,
  'l': nextPage,
  '/': search,
};

const formElements = [
  'button',
  'datalist',
  'fieldset',
  'input',
  'keygen',
  'label',
  'legend',
  'meter',
  'optgroup',
  'option',
  'output',
  'progress',
  'select',
  'textarea'
];

const modKey = (e) => e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;

const typing = () => {
  const el = document.activeElement;
  return el.form || formElements.indexOf(el.tagName.toLowerCase()) > -1;
};

const dispatch = (e) => {
  if (modKey(e) || typing()) return;

  const handler = handlers[e.key];
  if (!handler) return;
  e.preventDefault();
  handler();
};

document.addEventListener('keypress', dispatch);
