import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pdf } from '@react-pdf/renderer';
import React from 'react';
import { HandoutDocument } from './handout-document.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../output');
const outputPath = path.join(outputDir, 'integrated-team-handout.pdf');
const imageUrls = [
  'https://github.com/user-attachments/assets/08dcf66a-8f49-4d61-8441-d5a33060aa84',
  'https://github.com/user-attachments/assets/3d4ccf6f-0b4d-4c69-a1e9-2176835b6ce5',
  'https://github.com/user-attachments/assets/04fe239a-5091-4d29-bee2-0426a4ac1ca2',
  'https://github.com/user-attachments/assets/c5ce5852-3a89-47fa-ad9e-d44447ad3ec1',
];

async function canFetchImage(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const response = await fetch(url, { method: 'GET', signal: controller.signal });
    clearTimeout(timeout);
    return response.ok ? url : null;
  } catch {
    return null;
  }
}

await fs.mkdir(outputDir, { recursive: true });

const imageSources = await Promise.all(imageUrls.map(canFetchImage));
const doc = React.createElement(HandoutDocument, { imageSources });
const data = await pdf(doc).toBuffer();

await fs.writeFile(outputPath, data);
console.log(`PDF generated: ${outputPath}`);
