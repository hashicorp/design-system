import { glob } from 'glob';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const sourceFolder = path.resolve(__dirname, '../temp/split-files');

(async () => {
  try {
    console.log(
      `\n==========\n${chalk.cyan(
        'Preprocessing source files...'
      )}\n`
    );

    await preprocess();

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

      // DEBUG - let's use a single file for testing
      // if (fileRelativePath !== 'components/alert/03_how-to-use.hbs') {
      //   continue;
      // }

      // DEBUG
      // console.log(`Preprocessing HBS file ${fileRelativePath}`);

      // we read the handlebars source (made of HTML + Handlebars code) to process it
      let hbsSource = await fs.readFile(filePath, 'utf8');

      // FILE SPECIFIC CHANGES
      // ----------------------------

      if (fileRelativePath === 'components/tag/partials/code/how-to-use.hbs') {
        hbsSource = hbsSource.replace(/ your function here /g, 'this.yourOnDismissFunction');
        hbsSource = hbsSource.replace(/@route="components.tag"/g, '@href="#"');
      }
      if (fileRelativePath === 'components/toast/partials/code/how-to-use.hbs') {
        hbsSource = hbsSource.replace('<Hds::Toast @onDismiss={{ your function here }} as |T|>', '<Hds::Toast @onDismiss={{this.yourOnDismissFunction}} as |T|>');
        hbsSource = hbsSource.replace(/@onDismiss=\{\{\.\.\.\}\}/g, '@onDismiss={{this.yourOnDismissFunction}}');
        hbsSource = hbsSource.replace('@onClick={{ your function here }}', '@onClick={{this.yourOnClickFunction}}');
      }

      await fs.writeFile(filePath, hbsSource);
    }
  });
}
