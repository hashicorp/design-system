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
      // get the relative path of the file, in relation to the "source" folder
      const fileRelativePath = path.relative(sourceFolder, filePath);
      const fileParentCategory = fileRelativePath.split('/')[0];

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
        ].includes(fileRelativePath)
      ) {
        continue;
      }

      // DEBUG - let's use a single file for testing
      // if (fileRelativePath !== '_test.hbs') {
      //   continue;
      // }

      // DEBUG
      // console.log(`Processing HBS file ${fileRelativePath}`);

      // we read the handlebars source (made of HTML + Handlebars code) to process it
      const hbsSource = await fs.readFile(filePath, 'utf8');

      // ===========================================================================

      // get the page title

      const pageTitleMatchResults = hbsSource.match(/{{page-title "(.*)"}}/);
      const pageTitle = pageTitleMatchResults
        ? pageTitleMatchResults[1].replace(' component', '')
        : 'no-page-title';

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

        let sectionOrder;
        let sectionTitle;
        let sectionFileName;
        switch (sectionID) {
          case 'overview':
            sectionOrder = 1;
            sectionTitle = 'Overview';
            sectionFileName = 'index';
            break;
          case 'component-api':
            sectionOrder = 2;
            sectionTitle = 'Component API';
            sectionFileName = 'component-api';
            break;
          case 'how-to-use':
            sectionOrder = 3;
            sectionTitle = 'How to use';
            sectionFileName = 'how-to-use';
            break;
          case 'design-guidelines':
            sectionOrder = 4;
            sectionTitle = 'Design Guidelines';
            sectionFileName = 'design-guidelines';
            break;
          case 'accessibility':
            sectionOrder = 5;
            sectionTitle = 'Accessibility';
            sectionFileName = 'accessibility';
            break;
          case 'showcase':
            sectionOrder = 6;
            sectionTitle = 'Showcase';
            sectionFileName = 'showcase';
            break;
          default:
            sectionOrder = 7;
            sectionTitle = `Generic #${genericCounter}`;
            sectionFileName = `generic-${genericCounter}`;
            break;
        }

        let frontmatter = '';
        frontmatter += `---\n`;
        frontmatter += `order: ${sectionOrder}\n`;
        frontmatter += `title: ${pageTitle} - ${sectionTitle}\n`;
        frontmatter += `category: ${fileParentCategory}\n`;
        frontmatter += `---`;

        let content = '';
        content += `<h1>${pageTitle} - ${sectionTitle}</h1>\n\n`;
        content += `${sectionContent}\n`

        // we use 'outputFile' instead of 'writeFile' to automatically create the sub-folders
        await fs.outputFile(
          `${destFolder}/${fileRelativePath.replace(
            '.hbs',
            ''
          )}/${sectionFileName}.hbs`,
          content
        );
        await fs.outputFile(
          `${destFolder}/${fileRelativePath.replace(
            '.hbs',
            ''
          )}/${sectionFileName}.frontmatter`,
          frontmatter
        );
        genericCounter++;
      }
    }
  });
}
