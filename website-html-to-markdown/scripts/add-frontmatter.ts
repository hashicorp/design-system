import { glob } from 'glob';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const sourceFolder = path.resolve(__dirname, '../temp/split-files');

(async () => {
  try {
    console.log(
      `\n==========\n${chalk.cyan(
        'Adding frontmatter...'
      )}\n`
    );

    await addFrontmatter();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

async function addFrontmatter() {
  glob(sourceFolder + '/**/*.hbs', {}, async function (_error, files) {
    for (const filePath of files) {
      // get the relative path of the file, in relation to the "source" folder
      const fileRelativePath = path.relative(sourceFolder, filePath);

      let category;
      let group;
      let component;
      let file;

      const fileParts = fileRelativePath.split('/');
      if (fileParts.length === 3) {
        [category, component, file] = fileParts;
      } else if (fileParts.length === 4) {
        [category, group, component, file] = fileParts;
      }
      const section = file?.replace(/\d+--(.*)\.hbs/, '$1');

      // we read the file source
      let hbsSource = await fs.readFile(filePath, 'utf8');

      // extract the page title from the special comment
      const titleRegex = new RegExp(/^<!-- %%% (.*) %%% -->\n$/, 'm');
      const titleMatch = hbsSource.match(titleRegex);

      let title;
      if (titleMatch) {
        title = titleMatch[1].replace(/\s?component$/i,'');
      } else {
        title = "Missing component title";
      }

      // strip the special comment from the file
      hbsSource = hbsSource.replace(titleRegex, '');

      // prepare the "frontmatter" block (inside special comment)
      let frontmatter = '';
      frontmatter += '<!-- %%%\n';
      frontmatter += '---\n';
      frontmatter += `title: ${title}\n`;
      frontmatter += `category: ${category}\n`;
      if (group) {
        frontmatter += `group: ${group}\n`;
      }
      frontmatter += `component: ${component}\n`;
      frontmatter += `section: ${section}\n`;
      frontmatter += '---\n';
      frontmatter += '%%% -->\n';

      await fs.writeFile(filePath, `${frontmatter}${hbsSource}`);
    }
  });
}
