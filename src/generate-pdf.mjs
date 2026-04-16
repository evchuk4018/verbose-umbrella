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

await fs.mkdir(outputDir, { recursive: true });

const doc = React.createElement(HandoutDocument);
const data = await pdf(doc).toBuffer();

await fs.writeFile(outputPath, data);
console.log(`PDF generated: ${outputPath}`);
