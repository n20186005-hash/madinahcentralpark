import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('../dist/', import.meta.url);
const banned = ['exam' + 'ple.com', 'local' + 'host', 'chrome-' + 'extension://'];

async function walk(dir) {
  const out = [];
  for (const name of await readdir(dir)) {
    const p = join(dir, name);
    const s = await stat(p);
    if (s.isDirectory()) out.push(...await walk(p));
    else out.push(p);
  }
  return out;
}

const files = await walk(root);
let bad = false;
for (const file of files) {
  if (!/\.(html|js|css|xml|txt|json)$/i.test(file)) continue;
  const text = await readFile(file, 'utf8');
  for (const token of banned) {
    if (text.includes(token)) {
      console.error(`محتوى محظور: ${token} -> ${file}`);
      bad = true;
    }
  }
}

const sitemapFiles = files.filter((f) => /sitemap.*\.xml$/i.test(f));
for (const file of sitemapFiles) {
  const text = await readFile(file, 'utf8');
  if (/<lastmod>/i.test(text)) {
    console.error(`lastmod غير مطلوب: ${file}`);
    bad = true;
  }
  if (new RegExp(['exam' + 'ple\\.com', 'local' + 'host'].join('|'), 'i').test(text)) {
    console.error(`عنوان غير صالح في sitemap: ${file}`);
    bad = true;
  }
}

if (bad) process.exit(1);
console.log(`نجح فحص المخرجات: ${files.length} ملفاً، ${sitemapFiles.length} ملف sitemap.`);
