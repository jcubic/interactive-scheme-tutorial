#!/usr/bin/env node

const fs = require('fs');
const lily = require('@jcubic/lily');
const hljs = require('highlight.js');

const md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang) {
        return `<pre class="language-${lang}"><code>${str}</code></pre>`;
    }

    return ''; // use external default escaping
  }
});

const options = lily(process.argv.slice(2));
const path = require('path');

const lang = options.l || options.lang;
const template = options.t || options.template;

const readFile = fs.promises.readFile;

if (lang && template) {
    Promise.all([
        readFile(path.join(lang, 'index.md')),
        readFile(path.join(lang, 'meta.json')),
        readFile(template)
    ]).then(([text, meta, template]) => {
         meta = JSON.parse(meta.toString());
         const out = md.render(text.toString());
         template = template.toString()
            .replace(/\{\{CONTENT\}\}/g, out)
            .replace(/\{\{TITLE\}\}/g, meta.title);
         console.log(template);
    });
}
