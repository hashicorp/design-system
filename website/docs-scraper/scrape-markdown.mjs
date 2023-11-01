/* eslint-env node */
/* eslint-disable no-console */

// import dotenv from 'dotenv';
import fs from 'fs-extra';
import path from 'path';

// import { pick } from 'lodash'; // not sure why this doesn't work in a `.mjs` module
import _ from 'lodash';

// read the environment variables from the ".env" file
// dotenv.config(); ➔ process.env.XXXX

// SCRIPT CONFIG

// const distDocsFolder = path.resolve(__dirname, '../dist/docs');
const distDocsFolder = path.resolve('dist/docs');

// UTILITIES

const walkDir = async (dir, fileList = []) => {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const stat = await fs.stat(path.join(dir, file));
    if (stat.isDirectory()) {
      fileList = await walkDir(path.join(dir, file), fileList);
    } else {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
};

// SCRAPE MARKDOWN

(async () => {
  try {
    const files = await walkDir(distDocsFolder);

    for (const file of files) {
      const fileFullPath = file;
      const fileRelativePath = path.relative(distDocsFolder, fileFullPath);
      // const fileParentFolder = path.dirname(fileFullPath);

      // we want to process only the JSON file (extra precaution)
      if (path.extname(file) !== '.json') {
        continue;
      }

      // we skip the "testing" folder
      if (fileRelativePath.match(/^testing/)) {
        continue;
      }

      // read the JSON file
      const jsonData = await fs.readJSON(fileFullPath);

      // skip hidden pages
      if (jsonData.data?.attributes?.navigation?.hidden) {
        continue;
      }

      // extract the page content and relevant metadata
      const pageId = jsonData.data.id;
      const pageContent = jsonData.data.attributes.content ?? '';
      const pageMetadata = _.pick(jsonData.data.attributes, [
        'title',
        'caption',
        'navigation', // keywords | label | hidden]
        'previewImage',
      ]);

      // check if the content is split in "sections"
      const matchAllResults = pageContent.matchAll(
        /<section data-tab="(.*?)">([\s|\S|.]*?)<\/section>/g
      );

      // notice: `matchAll` returns an iterable, not an array
      // plus once it's iterated over, you can't iterate again
      // so we need to destructure it on a reusable array
      const matches = [...matchAllResults];

      let markdownContent;
      if (matches.length) {
        // extract from each "section" the tab name and the actual content
        markdownContent = matches.map((match) => {
          // if (fileRelativePath === 'components/alert/index.json') {
          //   console.log(match);
          // }
          return {
            tabName: match[1],
            tabContent: match[2],
          };
        });
      } else {
        markdownContent = pageContent;
      }

      console.log('----------------------------');
      console.log(pageId, fileRelativePath);
      // if (fileRelativePath === 'about/support.json') {
      // }
      // if (fileRelativePath === 'components/alert/index.json') {
      //   console.log(markdownContent.map((item) => item.tabName));
      // }
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
