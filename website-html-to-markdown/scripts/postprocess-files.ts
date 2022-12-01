import { glob } from 'glob';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const docsFolder = path.resolve(__dirname, '../../website/docs');

(async () => {
  try {
    console.log(
      `\n==========\n${chalk.cyan(
        'Postprocessing "docs" files...'
      )}\n`
    );

    await postprocess();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

async function postprocess() {
  // process the markdown files
  glob(docsFolder + '/**/*.md', {}, async function (_error, files) {
    // loop on every markdown file found in the source folder
    for (const filePath of files) {

      // we read the markdown source
      let markdownSource = await fs.readFile(filePath, 'utf8');

      // GLOBAL CHANGES
      // ----------------------------

      // <DummyPlaceholder> → <Doc::Placeholder>
      markdownSource = markdownSource.replace(/<DummyPlaceholder/g, '<Doc::Placeholder');
      markdownSource = markdownSource.replace(/<\/DummyPlaceholder/g, '</Doc::Placeholder');

      // <dummywcagsuccesscriterialist> → <Doc::WcagList>
      markdownSource = markdownSource.replace(/<dummywcagsuccesscriterialist data-list="(.*)">WCAG<\/dummywcagsuccesscriterialist>/g, (_match, list) => {
        return `<Doc::WcagList @criteriaList={{array "${list.split('|').join('" "')}" }} />\n`;
      });

      await fs.writeFile(filePath, markdownSource);
    }
  });
}
