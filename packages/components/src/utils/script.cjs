const fs = require('fs');
const path = require('path');

// CONFIGURATION
const TARGET_FILE = './hds-carbon-icon-map.ts';

function run() {
  const filePath = path.resolve(__dirname, TARGET_FILE);

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }

  console.log(`Reading ${TARGET_FILE}...`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // 1. Extract Imports
  // We keep all lines that start with 'import'
  const importLines = fileContent.match(/^import .*$/gm) || [];

  // 2. Extract Icon Definitions using Regex
  // This regex looks for:
  // - hdsIconName: 'someName'
  // - importCarbonIcon: (captures the async function body)
  // - It relies on the function body ending before the closing brace of the object '},'
  const iconRegex =
    /hdsIconName:\s*'([^']+)',[\s\S]*?importCarbonIcon:\s*(async\s*\([\s\S]*?})(?=,?\s*\n\s*},)/g;

  const newIcons = [];
  let match;

  while ((match = iconRegex.exec(fileContent)) !== null) {
    const iconName = match[1];
    const functionBody = match[2];

    // Clean up the function body indentation (optional, for aesthetics)
    // We remove the basic indentation level to make it fit the new object structure
    const cleanedBody = functionBody.trim();

    newIcons.push(`  '${iconName}': ${cleanedBody}`);
  }

  console.log(`Found ${newIcons.length} icons.`);

  if (newIcons.length === 0) {
    console.warn(
      'No icons found. Check if the file format matches the expected pattern.'
    );
    return;
  }

  // 3. Construct the New File Content
  const newContent = [
    ...importLines,
    '',
    // Define the new object
    'export const hdsCarbonIcons = {',
    newIcons.join(',\n'),
    '};',
    '',
  ].join('\n');

  // 4. Write to file
  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log('Transformation complete!');
}

run();
