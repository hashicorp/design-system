import { glob } from 'glob';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const sourceFolder = path.resolve(__dirname, '../temp/original');
const destFolder = path.resolve(__dirname, '../temp/split-files');

(async () => {
  try {
    console.log(`\n==========\n${chalk.cyan('Source files splitting...')}\n`);

    await split();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

async function split() {
  // prepare the destingation folder
  try {
    // console.log('Preparing the "dest" folder');
    if (fs.existsSync(destFolder)) {
      fs.emptyDirSync(destFolder);
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
      // get the relative path of the file (and its parent folder), in relation to the "source" folder
      const fileRelativePath = path.relative(sourceFolder, filePath);
      const parentRelativePath = fileRelativePath.replace('.hbs','');

      // we need to skip some files...
      if (
        [
          'index.hbs',
          'application.hbs',
          'components.hbs',
          'content.hbs',
          'foundations.hbs',
          'overrides.hbs',
          'utilities.hbs',
          'content/writing-guidelines.hbs',
        ].includes(fileRelativePath)
      ) {
        continue;
      }

      // DEBUG - let's use a single file for testing
      // if (fileRelativePath !== 'components/alert.hbs') {
      //   continue;
      // }

      // DEBUG
      // console.log(`Processing HBS file ${fileRelativePath}`);

      // we read the handlebars source (made of HTML + Handlebars code) to process it
      const hbsSource = await fs.readFile(filePath, 'utf8');

      // ===========================================================================

      // get the page title

      const pageTitleMatchResults = hbsSource.match(/{{page-title "(.*)"}}/);
      let pageTitle;
      if (pageTitleMatchResults) {
        pageTitle = pageTitleMatchResults[1].replace(/\s?component$/i,'');
      } else {
        pageTitle = "Missing component title";
      }

      // ===========================================================================

      // get the "section" blocks (and their meta-information) and then save them as independent files

      const sectionMatchAllResults = hbsSource.matchAll(
        // see: https://regex101.com/r/4ugOzI/1
        /<section(?:(?!\/section>).|\n)*(?=\/section>)........./gm
      );

      // used to differentiate generic "sections" that we don't know how to handle
      let genericCounter = 1;

      // notice: matchAll returns a IterableIterator and each item is a RegExpMatchArray so we need some special code here
      for (const matchResultArray of sectionMatchAllResults) {
        // extract the section ID (if exists)
        const sectionContent = matchResultArray[0];
        const sectionIDMatchResults = sectionContent.match(
          /<section.*data-section="(.*?)".*>/
        );
        const sectionID = sectionIDMatchResults
          ? sectionIDMatchResults[1]
          : `generic-${genericCounter}`;

        let sectionFileName;
        switch (sectionID) {
          case 'overview':
            sectionFileName = '01--overview';
            break;
          case 'component-api':
            sectionFileName = '02--component-api';
            break;
          case 'how-to-use':
            sectionFileName = '03--how-to-use';
            break;
          case 'design-guidelines':
            sectionFileName = '04--design-guidelines';
            break;
          case 'accessibility':
            sectionFileName = '05--accessibility';
            break;
          case 'showcase':
            sectionFileName = '06--showcase';
            break;
          default:
            sectionFileName = `1${genericCounter}--generic`;
            break;
        }

        // we use 'outputFile' instead of 'writeFile' to automatically create the sub-folders
        await fs.outputFile(
          `${destFolder}/${parentRelativePath}/${sectionFileName}.hbs`,
          `<!-- %%% ${pageTitle} %%% -->\n\n${sectionContent}\n`
        );
        genericCounter++;
      }

      // we add an "index" file that will contains the component "metadata" (index) used to build the custom TOC/navigation
      await fs.outputFile(
        `${destFolder}/${parentRelativePath}/index.hbs`,
        `<!-- %%% ${pageTitle} %%% -->\n`
      );
    }
  });
}
