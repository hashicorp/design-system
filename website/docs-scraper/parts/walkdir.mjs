import fs from 'fs-extra';
import path from 'path';

export async function walkDir(dir, fileList = []) {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const stat = await fs.stat(path.join(dir, file));
    if (stat.isDirectory()) {
      fileList = await walkDir(path.join(dir, file), fileList);
    } else {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}
