const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const docsDir = path.join(root, 'docs');
const site = 'https://developers.volumio.com';

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))
    .flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : /\.mdx?$/.test(e.name) ? [path.join(dir, e.name)] : []);
}

const pages = walk(docsDir).map(file => {
  const raw = fs.readFileSync(file, 'utf8');
  const front = raw.match(/^---\n([\s\S]*?)\n---\n/);
  const meta = key => front && (front[1].match(new RegExp(`^${key}:\\s*(.+)$`, 'm')) || [])[1];
  const body = front ? raw.slice(front[0].length) : raw;
  const title = meta('title') || meta('sidebar_label') || (body.match(/^#\s+(.+)$/m) || [])[1];
  const rel = path.relative(docsDir, file).replace(/\.mdx?$/, '').split('/').map(s => s.replace(/^\d+[-_.](?!\d)/, ''));
  if (meta('id')) rel[rel.length - 1] = meta('id');
  const custom = meta('slug');
  const slug = custom ? (custom.startsWith('/') ? custom.slice(1) : [...rel.slice(0, -1), custom].join('/')) : rel.join('/').replace(/\/index$/, '');
  return { title: (title || slug).replace(/^['"]|['"]$/g, ''), url: encodeURI(`${site}/${slug}`), body };
});

const intro = '# Volumio Developers Documentation\n\n> How to write plugins for Volumio 4, use its APIs and port it to new devices.\n';
fs.writeFileSync(path.join(root, 'static', 'llms.txt'),
  intro + `\nFull text: ${site}/llms-full.txt\n\n## Pages\n\n` + pages.map(p => `- [${p.title}](${p.url})`).join('\n') + '\n');
fs.writeFileSync(path.join(root, 'static', 'llms-full.txt'),
  intro + pages.map(p => `\n\n# ${p.title}\n\nSource: ${p.url}\n\n${p.body.trim()}`).join('\n') + '\n');
