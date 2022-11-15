import { glob } from 'glob';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

import TurndownService from 'turndown';

const sourceFolder = path.resolve(__dirname, '../temp/split-files');
const destFolder = path.resolve(__dirname, '../temp/markdown');

(async () => {
  try {
    console.log(
      `\n==========\n${chalk.cyan(
        'Conversion of files to markdown (TURNDOWN) started...'
      )}\n`
    );

    await convert();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

async function convert() {
  // prepare the temporary folder
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
      const fileName = fileRelativePath.split('/').pop();

      // let's use a single file for testing
      // if (fileRelativePath !== 'components/alert/03--how-to-use.hbs') {
      //   continue;
      // }

      // console.log(`Converting HBS file ${fileRelativePath}`);

      // we read the handlebars source (made of HTML + Handlebars + Markdown code) to process it
      const hbsSource = await fs.readFile(filePath, 'utf8');

      // convert the file using Turndown
      const turndownService = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced',
      });

      let markdownContent;

      switch (fileName) {
        // OVERVIEW
        case '01--overview.hbs':
          markdownContent = turndownService.turndown(hbsSource);
          break;
        // COMPONENT API
        case '02--component-api.hbs':
          // turndownService.addRule('skip-dummy-component-props', {
          //   filter: function (node: HTMLElement) {
          //     const isRootNode =
          //       node.nodeName === 'DL' &&
          //       node.getAttribute('class') === 'dummy-component-props';
          //     const isChildNode =
          //       node.closest('.dummy-component-props') !== null;
          //     return isRootNode || isChildNode;
          //   },
          //   replacement: function (_content, node) {
          //     // TODO this loses the formatting (it's a string with whitespace removed), is there another way?
          //     // return node.innerHTML;
          //     return node.outerHTML;
          //   },
          // });
          turndownService.keep(['dl']);
          markdownContent = turndownService.turndown(hbsSource);
          break;
        // HOW TO USE
        case '03--how-to-use.hbs':
          markdownContent = turndownService.turndown(hbsSource);
          break;
        // DESIGN GUIDELINES
        case '04--design-guidelines.hbs':
          // we skip the showcase files for now
          markdownContent = hbsSource;
          break;
        // ACCESSIBILITY
        case '05--accessibility.hbs':
          turndownService.keep(['dummy-wcag-success-criteria-list']);
          markdownContent = turndownService.turndown(hbsSource);
          break;
        // SHOWCASE
        case '06--showcase.hbs':
          // we skip the showcase files for now
          markdownContent = hbsSource;
          break;
        // OTHER ("generic")
        default:
          // we skip the generic files for now
          markdownContent = hbsSource;
          break;
      }

      // we use 'outputFile' instead of 'writeFile' to automatically create the sub-folders
      await fs.outputFile(
        `${destFolder}/${fileRelativePath.replace('.hbs', '.md')}`,
        markdownContent
      );
    }
  });
}
