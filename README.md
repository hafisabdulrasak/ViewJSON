# ViewJSON

ViewJSON is a client-side developer utility for formatting, validating, and converting JSON, CSV, and Excel data in the browser.

## Features

- JSON formatter with pretty-print output
- JSON validator with readable error + approximate line/column location
- JSON minifier
- CSV → JSON conversion (paste or upload)
- JSON → CSV conversion (arrays of flat objects)
- Excel → JSON conversion (first worksheet)
- Drag-and-drop upload support for `.json`, `.csv`, `.xlsx`, `.xls`
- Copy-to-clipboard and download actions for converted output

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React
- papaparse
- xlsx
- react-dropzone
- lucide-react

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the repo into Vercel.
3. Use default settings (Framework preset: Next.js).
4. Deploy.

Or deploy from CLI:

```bash
npm i -g vercel
vercel
```

All data processing runs fully client-side with zero backend infrastructure.
