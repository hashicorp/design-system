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
      let section;

      const fileParts = fileRelativePath.split('/');
      if (fileParts.length === 3) {
        [category, component, file] = fileParts;
      } else if (fileParts.length === 4) {
        [category, group, component, file] = fileParts;
      }
      if (file !== 'index.hbs') {
        section = file?.replace(/\d+--(.*)\.hbs/, '$1');
      }

      // we read the file source
      let hbsSource = await fs.readFile(filePath, 'utf8');

      // extract the page title from the special comment
      const titleRegex = new RegExp(/^<!-- %%% (.*) %%% -->\n$/, 'm');
      const titleMatch = hbsSource.match(titleRegex);

      let title;
      if (titleMatch) {
        title = titleMatch[1];
      } else {
        title = "Missing component title";
      }

      // strip the special comment from the file
      hbsSource = hbsSource.replace(titleRegex, '');

      // prepare the "frontmatter" block (inside special comment)
      let frontmatter = '';
      frontmatter += '<!-- %%%\n';
      frontmatter += '---\n';
      if (file === 'index.hbs') {
        frontmatter += `title: ${title}\n`;
      } else {
        frontmatter += `category: ${category}\n`;
        if (group) {
          frontmatter += `group: ${group}\n`;
        }
        frontmatter += `component: ${component}\n`;
        // these are the "sections" used by the "tabs" in the page
        frontmatter += `section: ${getSection(section)}\n`;
        // we use the old "section" as subsection, now that we split pages via "tabs"
        frontmatter += `subsection: ${section}\n`;
        }
      frontmatter += '---\n';
      frontmatter += '%%% -->\n';

      await fs.writeFile(filePath, `${frontmatter}${hbsSource}`);
    }
  });
}

const getSection = (section) => {
  switch (section) {
    case 'overview':
      return 'guidelines';
    case 'design-guidelines':
      return 'specification';
    case 'accessibility':
      return 'accessibility';
    case 'how-to-use':
    case 'component-api':
    case 'showcase':
      return 'code';
    default:
      return section;
  }
}
