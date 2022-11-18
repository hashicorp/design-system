import { glob } from 'glob';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const sourceFolder = path.resolve(__dirname, '../temp/split-files');

(async () => {
  try {
    console.log(
      `\n==========\n${chalk.cyan(
        'Renaming ".hbs" source files to ".md"...'
      )}\n`
    );

    await renameFiles();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

async function renameFiles() {
  // process the HBS files
  glob(sourceFolder + '/**/*.hbs', {}, async function (_error, files) {
    // loop on every HBS file found in the source folder
    for (const filePath of files) {
      // DEBUG
      // console.log(
      //   `Renaming file "${filePath}" to "${filePath.replace(
      //     /.hbs$/,
      //     '.md'
      //   )}"`
      // );

      await fs.rename(filePath, filePath.replace(/.hbs$/, '.md'));
    }
  });
}
