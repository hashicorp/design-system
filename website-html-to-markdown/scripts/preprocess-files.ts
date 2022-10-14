import { glob } from 'glob';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

import { replaceLinkToDocsPages } from './preprocess-files-parts/replaceLinkToDocsPages';

const sourceFolder = path.resolve(__dirname, '../source/split-files');

(async () => {
  try {
    console.log(
      `\n==========\n${chalk.cyan(
        'Preprocessing source files started...'
      )}\n==========\n`
    );

    await preprocess();

    console.log(
      `\n==========\n${chalk.cyan(
        'Preprocessing source files completed.'
      )}\n==========\n`
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

async function preprocess() {
  // process the HBS files
  glob(sourceFolder + '/**/*.hbs', {}, async function (_error, files) {
    // loop on every HBS file found in the source folder
    for (const filePath of files) {
      // get the relative path of the file, in relation to the "source" folder
      const fileRelativePath = path.relative(sourceFolder, filePath);
      const fileName = fileRelativePath.split('/').pop();
      const sectionName = fileName?.replace('.hbs', '');

      // DEBUG - let's use a single file for testing
      // if (fileRelativePath !== 'components/alert/03_how-to-use.hbs') {
      //   continue;
      // }

      // DEBUG
      // console.log(`Preprocessing HBS file ${fileRelativePath}`);

      // we read the handlebars source (made of HTML + Handlebars code) to process it
      const hbsSource = await fs.readFile(filePath, 'utf8');

      switch (sectionName) {
        case '01_overview':
          // hbsSource = replaceLinkToDocsPages(hbsSource);
          break;
        case '02_component-api':
          // hbsSource = replaceLinkToDocsPages(hbsSource);
          break;
        case '03_how-to-use':
            // hbsSource = replaceLinkToDocsPages(hbsSource);
          break;
        case '04_design-guidelines':
          //
          break;
        case '05_accessibility':
          // hbsSource = replaceLinkToDocsPages(hbsSource);
          break;
      }

      await fs.writeFile(filePath, hbsSource);
    }
  });
}
