#!/usr/bin/env node

const fs = require('fs');
const lily = require('@jcubic/lily');


const svg_anchor = `<svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`;


const md = require('markdown-it')({
    highlight: function (str, lang) {
        if (lang) {
            return `<pre class="language-${lang}"><code>${str}</code></pre>`;
        }

        return ''; // use external default escaping
    }
});

function slugify(tokens) {
	  var text = tokens.map(x => x.content).join('');
	  var normalized = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	  return normalized.replace(/\W+/g, '-').replace(/^-|-$/g, '').toLowerCase();
}

md.renderer.rules.heading_open = function(tokens, i, options, env, renderer) {
    var token = tokens[i];
    var next = tokens[i + 1];
    var result = `<${token.tag}>`;
    if (token && next) {
        var slug = slugify(next.children.filter(x => x.type == 'text'));
        var attrs = `id="${slug}" class="anchor" aria-hidden="true" href="#${slug}"`;
        result += `<a ${attrs}>${svg_anchor}</a>`;
    }
    return result;
};



function parse_markdown(markdown) {
	return md.render(markdown);
}

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
         const out = parse_markdown(text.toString());
         template = template.toString()
            .replace(/\{\{CONTENT\}\}/g, out)
            .replace(/\{\{TITLE\}\}/g, meta.title);
         console.log(template);
    });
}
