import { glob } from 'glob';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const sourceFolder = path.resolve(__dirname, '../source/split-files');
const destFolder = path.resolve(__dirname, '../../website/docs');

(async () => {
  try {
    console.log(
      `\n==========\n${chalk.cyan(
        'Copying source files to docs...'
      )}\n`
    );

    await copyFiles();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

async function copyFiles() {
  // prepare the destingation folder
  try {
    // console.log('Preparing the "dest" folder');
    if (fs.existsSync(destFolder)) {
      // fs.emptyDirSync(destFolder);
      // we have to do it sub-folder by sub-folder for now
      fs.emptyDirSync(`${destFolder}/_test`);
      fs.emptyDirSync(`${destFolder}/components`);
      fs.emptyDirSync(`${destFolder}/content`);
      fs.emptyDirSync(`${destFolder}/foundations`);
      fs.emptyDirSync(`${destFolder}/overrides`);
      fs.emptyDirSync(`${destFolder}/utilities`);
    } else {
      fs.mkdirsSync(destFolder);
    }
  } catch (err) {
    console.error(err);
  }

  // process the HBS files
  glob(sourceFolder + '/**/*.hbs', {}, async function (_error, files) {
    // loop on every HBS file found in the source folder
    for (const filePath of files) {
      // get the relative path of the file, in relation to the "source" folder
      const fileRelativePath = path.relative(sourceFolder, filePath);

      // DEBUG
      // console.log(
      //   `Copying file "${filePath}" to "${destFolder}/${fileRelativePath.replace(
      //     '.hbs',
      //     '.md'
      //   )}"`
      // );

      await fs.copy(
        filePath,
        `${destFolder}/${fileRelativePath.replace('.hbs', '.md')}`
      );
    }
  });
}
