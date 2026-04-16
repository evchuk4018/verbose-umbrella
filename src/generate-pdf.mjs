import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pdf } from '@react-pdf/renderer';
import React from 'react';
import { HandoutDocument } from './handout-document.mjs';
import { IMAGE_URLS } from './image-urls.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../output');
const outputPath = path.join(outputDir, 'integrated-team-handout.pdf');
const IMAGE_FETCH_TIMEOUT_MS = 4000;
async function canFetchImage(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), IMAGE_FETCH_TIMEOUT_MS);
    const response = await fetch(url, { method: 'GET', signal: controller.signal });
    clearTimeout(timeout);
    return response.ok ? url : null;
  } catch {
    return null;
  }
}

await fs.mkdir(outputDir, { recursive: true });

const imageSources = await Promise.all(IMAGE_URLS.map(canFetchImage));
const doc = React.createElement(HandoutDocument, { imageSources });
const data = await pdf(doc).toBuffer();

await fs.writeFile(outputPath, data);
console.log(`PDF generated: ${outputPath}`);
