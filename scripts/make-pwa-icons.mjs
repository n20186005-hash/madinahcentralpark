// توليد أيقونات PWA (192/512) من شعار النخلة في favicon.svg بدون أي اعتماديات خارجية.
// يعيد رسم الشكل في مساحة 1536×1536 ثم يصغّره إلى 512 و192 بمتوسط كتلي للتنعيم، ويُرمّز PNG يدوياً.
import { deflateSync } from 'node:zlib';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'icons');
const SIZE = 1536; // مساحة الرسم
const UNIT = 20.4; // معامل التحويل من صندوق 64 وحدة إلى مساحة الرسم (إبقاء المحتوى ضمن المنطقة الآمنة)
const CENTER = SIZE / 2;
const X = (u) => CENTER + (u - 32) * UNIT;
const Y = (u) => CENTER + (u - 32) * UNIT;

const BG = [255, 253, 247]; // #fffdf7
const TRUNK = [23, 51, 36]; // #173324
const FROND = [81, 123, 88]; // #517b58
const ARC = [210, 170, 97]; // #d2aa61

const W = SIZE;
const img = new Uint8Array(W * W * 4);
for (let i = 0; i < W * W; i++) {
  img[i * 4] = BG[0];
  img[i * 4 + 1] = BG[1];
  img[i * 4 + 2] = BG[2];
  img[i * 4 + 3] = 255;
}

function stamp(x, y, r, rgb) {
  const x0 = Math.max(0, Math.floor(x - r));
  const x1 = Math.min(W - 1, Math.ceil(x + r));
  const y0 = Math.max(0, Math.floor(y - r));
  const y1 = Math.min(W - 1, Math.ceil(y + r));
  const rr = r * r;
  for (let py = y0; py <= y1; py++) {
    for (let px = x0; px <= x1; px++) {
      const dx = px - x;
      const dy = py - y;
      if (dx * dx + dy * dy <= rr) {
        const o = (py * W + px) * 4;
        img[o] = rgb[0];
        img[o + 1] = rgb[1];
        img[o + 2] = rgb[2];
        img[o + 3] = 255;
      }
    }
  }
}

function polylineStroke(points, r, rgb) {
  // يرسم فرشاة كثيفة على طول نقاط المسار (عينة منحى أو خط مستقيم)
  for (let i = 0; i < points.length; i++) {
    const a = points[i];
    const b = points[i + 1];
    if (!b) break;
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const steps = Math.max(2, Math.ceil(len / (r * 0.45)));
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      stamp(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, r, rgb);
    }
  }
}

function sampleCubic(p0, p1, p2, p3, steps = 90) {
  const out = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const mt = 1 - t;
    out.push([
      mt * mt * mt * p0[0] + 3 * mt * mt * t * p1[0] + 3 * mt * t * t * p2[0] + t * t * t * p3[0],
      mt * mt * mt * p0[1] + 3 * mt * mt * t * p1[1] + 3 * mt * t * t * p2[1] + t * t * t * p3[1]
    ]);
  }
  return out;
}

const U = (x, y) => [X(x), Y(y)];

// الجذع
polylineStroke([U(31, 51), U(31, 26)], (6 * UNIT) / 2, TRUNK);

// سعف النخيل الأربعة (نفس مسارات favicon.svg)
const fronds = [
  sampleCubic(U(31, 27), U(19, 25), U(13, 18), U(11, 10)),
  sampleCubic(U(32, 27), U(44, 25), U(51, 18), U(54, 10)),
  sampleCubic(U(31, 30), U(22, 31), U(16, 35), U(12, 41)),
  sampleCubic(U(32, 30), U(41, 31), U(48, 35), U(52, 41))
];
for (const f of fronds) polylineStroke(f, (5 * UNIT) / 2, FROND);

// قوس الأرض الذهبي
polylineStroke(sampleCubic(U(12, 52), U(25, 42), U(38, 40), U(52, 45)), (5 * UNIT) / 2, ARC);

function downscale(factor) {
  const t = SIZE / factor;
  const out = new Uint8Array(t * t * 4);
  for (let y = 0; y < t; y++) {
    for (let x = 0; x < t; x++) {
      let r = 0, g = 0, b = 0, a = 0;
      for (let sy = 0; sy < factor; sy++) {
        for (let sx = 0; sx < factor; sx++) {
          const o = ((y * factor + sy) * SIZE + x * factor + sx) * 4;
          r += img[o]; g += img[o + 1]; b += img[o + 2]; a += img[o + 3];
        }
      }
      const n = factor * factor;
      const o = (y * t + x) * 4;
      out[o] = Math.round(r / n);
      out[o + 1] = Math.round(g / n);
      out[o + 2] = Math.round(b / n);
      out[o + 3] = Math.round(a / n);
    }
  }
  return out;
}

// ترميز PNG (بدون مكتبات)
const CRC_TABLE = new Int32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c;
});
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}
function encodePng(rgba, size) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // عمق
  ihdr[9] = 6; // RGBA
  const stride = size * 4;
  const raw = Buffer.alloc((stride + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (stride + 1)] = 0;
    Buffer.from(rgba.buffer, rgba.byteOffset + y * stride, stride).copy(raw, y * (stride + 1) + 1);
  }
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}

mkdirSync(OUT_DIR, { recursive: true });
for (const [name, size, factor] of [['icon-512.png', 512, 3], ['icon-192.png', 192, 8]]) {
  const out = downscale(factor);
  writeFileSync(join(OUT_DIR, name), encodePng(out, size));
  console.log(`كتب ${name} (${size}×${size})`);
}
console.log('اكتمل توليد أيقونات PWA.');
