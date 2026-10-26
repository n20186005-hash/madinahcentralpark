# King Fahad Central Park visitor guide

Independent nonprofit Arabic RTL guide for the park in AlHadiqah,Madinah. Existing pages: home,cookie settings,privacy policy,terms,and404.

## Development

Use the exact Node/package-manager versions declared in package.json and the committed lockfile.

- pnpm install --frozen-lockfile
- pnpm check
- pnpm run build
- pnpm verify:content
- npx wrangler deploy --dry-run

Cloudflare's existing project is madinahcentralpark. The default configuration uses src/worker.ts before ASSETS. The source canonical host remains madinahcentralpark.com; existingwww andHTTP entrances redirect while preserving paths and queries.

Weather is fetched only at build time with bounded deadlines and validated Riyadh-local dates,finite values and seven dates. No browser refresh or same-origin weather API is added. A build may show a genuine unavailable message.

The existing GA control requires verified persisted permission, supports immediate withdrawal and reports storage failure truthfully. Hosting performance measurement is separate. No telemetry delivery is established by script presence alone.

See SOURCES.md for facts and public/images/PHOTO-CREDITS.md for the explicitly conceptual original illustration.
