(function () {
  const editor = document.getElementById('editor');
  const preview = document.getElementById('preview');
  const statusEl = document.getElementById('status');
  const btnTheme = document.getElementById('btn-theme');
  const btnClear = document.getElementById('btn-clear');
  const btnDownloadMD = document.getElementById('btn-download-md');
  const btnDownloadHTML = document.getElementById('btn-download-html');
  const fileInput = document.getElementById('file-input');
  const toolbar = document.querySelector('.toolbar');

  const LS_KEY_CONTENT = 'mdp.content';
  const LS_KEY_THEME = 'mdp.theme';

  // -------- Theme --------
  const applyTheme = (theme) => {
    document.body.classList.toggle('light', theme === 'light');
  };
  const savedTheme = localStorage.getItem(LS_KEY_THEME) || 'dark';
  applyTheme(savedTheme);

  btnTheme.addEventListener('click', () => {
    const next = document.body.classList.contains('light') ? 'dark' : 'light';
    localStorage.setItem(LS_KEY_THEME, next);
    applyTheme(next);
  });

  // -------- Markdown parser options --------
  // Marked is loaded via CDN in index.html
  marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true,
    mangle: false
  });

  // -------- Debounce helper --------
  const debounce = (fn, delay = 200) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), delay);
    };
  };

  // -------- Render function --------
  const render = () => {
    const raw = editor.value;
    const html = marked.parse(raw);
    // Sanitize the generated HTML for safety
    const clean = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
    preview.innerHTML = clean;
    statusEl.textContent = `Rendered ${new Date().toLocaleTimeString()}`;
  };

  const renderDebounced = debounce(render, 120);

  // -------- Load initial content --------
  const defaultSample = `# Welcome to Markdown Previewer

Type Markdown on the left, see **live preview** on the right.

## Features
- Toolbar snippets (bold, italic, code, list, quote, image, link)
- Autosave to localStorage
- Download as **.md** or **.html**
- Safe rendering via DOMPurify
- Dark / Light theme (🌓)

### Code
\`\`\`js
console.log('Hello Markdown!');
\`\`\`

> Tip: try tables, lists, images, and more.

| Col A | Col B |
|------:|:-----|
|  123  | left |
|  456  | **bold** |
`;

  editor.value = localStorage.getItem(LS_KEY_CONTENT) ?? defaultSample;
  render();

  // -------- Autosave + Live render --------
  editor.addEventListener('input', () => {
    localStorage.setItem(LS_KEY_CONTENT, editor.value);
    renderDebounced();
  });

  // -------- Toolbar insertions --------
  toolbar.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-md]');
    if (!btn) return;
    e.preventDefault();
    const snippet = btn.getAttribute('data-md');
    insertSnippet(snippet);
  });

  function insertSnippet(snippet) {
    editor.focus();
    const start = editor.selectionStart ?? editor.value.length;
    const end = editor.selectionEnd ?? editor.value.length;
    const before = editor.value.slice(0, start);
    const selected = editor.value.slice(start, end);
    const after = editor.value.slice(end);

    // If snippet contains "code block" or other newline-leading patterns,
    // place selection in the middle when useful.
    let finalText = '';
    if (snippet.includes('code block')) {
      finalText = `${before}${snippet}${after}`;
      editor.selectionStart = editor.selectionEnd = (before + snippet).length;
    } else if (snippet.includes('](') && selected) {
      // wrap selection as link [selected](https://)
      finalText = `${before}[${selected}](https://)${after}`;
      editor.selectionStart = editor.selectionEnd = (before + `[${selected}](`).length + 8;
    } else if (snippet.includes('![') && selected) {
      finalText = `${before}![${selected}](https://)${after}`;
      editor.selectionStart = editor.selectionEnd = (before + `![${selected}](`).length + 8;
    } else if (snippet === '**bold**' && selected) {
      finalText = `${before}**${selected}**${after}`;
      editor.selectionStart = start + 2; editor.selectionEnd = start + 2 + selected.length;
    } else if (snippet === '*italic*' && selected) {
      finalText = `${before}*${selected}*${after}`;
      editor.selectionStart = start + 1; editor.selectionEnd = start + 1 + selected.length;
    } else if (snippet === '`code`' && selected) {
      finalText = `${before}\`${selected}\`${after}`;
      editor.selectionStart = start + 1; editor.selectionEnd = start + 1 + selected.length;
    } else {
      finalText = `${before}${snippet}${after}`;
      editor.selectionStart = editor.selectionEnd = (before + snippet).length;
    }

    editor.value = finalText;
    localStorage.setItem(LS_KEY_CONTENT, editor.value);
    renderDebounced();
  }

  // -------- Clear Editor --------
  btnClear.addEventListener('click', () => {
    if (!confirm('Clear editor? This will remove current content (saved copy stays only if you keep typing).')) return;
    editor.value = '';
    localStorage.setItem(LS_KEY_CONTENT, '');
    render();
  });

  // -------- Downloads --------
  const download = (filename, text, type = 'text/plain') => {
    const blob = new Blob([text], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    a.remove(); URL.revokeObjectURL(url);
  };

  btnDownloadMD.addEventListener('click', () => {
    download('document.md', editor.value, 'text/markdown');
  });

  btnDownloadHTML.addEventListener('click', () => {
    const htmlDoc = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Exported HTML</title></head>
<body>${DOMPurify.sanitize(marked.parse(editor.value))}</body></html>`;
    download('document.html', htmlDoc, 'text/html');
  });

  // -------- Open .md file --------
  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    editor.value = text;
    localStorage.setItem(LS_KEY_CONTENT, text);
    render();
    fileInput.value = '';
  });
})();
