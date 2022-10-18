import { glob } from 'glob';
import fs from 'fs-extra';
import path from 'path';
// import del from 'del';
import chalk from 'chalk';

import { NodeHtmlMarkdown, NodeHtmlMarkdownOptions } from 'node-html-markdown'

const nhm = new NodeHtmlMarkdown(
  /* options (optional) */
  {},
  /* customTransformers (optional) */
  undefined,
  /* customCodeBlockTranslators (optional) */
  undefined
);

const sourceFolder = path.resolve(
  __dirname,
  '../../packages/components/tests/dummy/app/templates/'
);
const tempFolder = path.resolve(__dirname, './temp');

(async () => {
  try {
    console.log(
      `\n==========\n${chalk.cyan(
        'NHM conversion started...'
      )}\n==========\n`
    );

    await convert();

    console.log(
      `\n==========\n${chalk.green(
        'NHM conversion completed.'
      )}\n==========\n`
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

async function convert() {
  // prepare the temporary folder
  try {
    console.log('Preparing the "temp" folder');
    if (fs.existsSync(tempFolder)) {
      fs.emptyDirSync(tempFolder);
    } else {
      fs.mkdirsSync(tempFolder);
    }
  } catch (err) {
    console.error(err);
  }

  // process the HBS files
  glob(sourceFolder + '/**/*.hbs', {}, async function (_error, files) {
    // console.log(files);
    for (const filePath of files) {
      // get the relative path of the file, in relation to the "source" folder
      const fileRelativePath = path.relative(sourceFolder, filePath);

      // we need to skip some files...
      // if (
      //   [
      //     'index.hbs',
      //     'application.hbs',
      //     'components.hbs',
      //     'content.hbs',
      //     'foundations.hbs',
      //     'overrides.hbs',
      //     'utilities.hbs',
      //   ].includes(fileRelativePath)
      // ) {
      //   continue;
      // }

      // let's use a single file for testing
      if (fileRelativePath !== 'components/alert.hbs') {
        continue;
      }

      console.log(`Processing HBS file ${fileRelativePath}`);

      // we read the handlebars source (made of HTML + Handlebars code) to process it
      const hbsSource = await fs.readFile(filePath, 'utf8');

      // convert the file using node-html-markdown (NHM)
      const markdownContent = nhm.translate(hbsSource);

      // we use 'outputFile' instead of 'writeFile' to automatically create the sub-folders
      await fs.outputFile(
        `${tempFolder}/${fileRelativePath.replace('.hbs', '.md')}`,
        markdownContent
      );
    }
  });
}
