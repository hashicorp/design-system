import { existsSync } from 'fs';
import process from 'process';

const filePath = 'dist/styles/@hashicorp/design-system-components.css';

if (!existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  console.error('This is likely caused by Sass compilation failing');
  process.exit(1);
}
