// import { glob } from 'glob';
import fs from 'fs-extra';
import path from 'path';
import _ from 'lodash';


const getFileContent = (folderPath, filePath)  => {
  if (filePath.startsWith('.')) {
    return `[ERROR INCLUDING FILE ${filePath}: the file path must be relative (no '../' or './' are allowed)]`;
  }
  if (fs.existsSync(`${folderPath}/${filePath}`)) {
    const fileContent = fs.readFileSync(`${folderPath}/${filePath}`, 'utf-8');
    return `\n<!-- file included: ${filePath} -->\n\n${fileContent}\n\n`;
  } else {
    return `[ERROR INCLUDING FILE ${filePath}: the file path does not exist (no file found)]`;
  }
}

const markdownSourceFolder = path.resolve(__dirname, '../../website/docs/components/alert/');

const markdownIndexContent = fs.readFileSync(`${markdownSourceFolder}/index.md`, 'utf-8');

const includedFiles = [];

// https://regex101.com/r/tesSl8/1
const includeRegex = new RegExp(/^\s*@include '(.*\.md)'\s*$/, 'gm');

let newMarkdownFileContent;
if (markdownIndexContent.match(includeRegex)) {
  newMarkdownFileContent = markdownIndexContent.replace(
    includeRegex,
    (_match, capture1) => {
      // return `${p1} will be inserted here!`;
      includedFiles.push(capture1);
      return getFileContent(markdownSourceFolder, capture1);
    }
  );
}

console.log('newMarkdownFileContent = ', newMarkdownFileContent);
console.log('includedFiles = ', includedFiles);
