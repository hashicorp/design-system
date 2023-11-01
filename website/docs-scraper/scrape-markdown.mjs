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

    // console.log('FILES', files);

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
      if (jsonData.data.attributes.navigation.hidden) {
        continue;
      }

      // extract the page content and relevant metadata
      const pageId = _.pick(jsonData.data, 'id');
      const pageContent = _.pick(jsonData.data.attributes, 'content');
      const pageMetadata = _.pick(jsonData.data.attributes, [
        'title',
        'caption',
        'navigation', // keywords | label | hidden]
        'previewImage',
      ]);

      if (fileRelativePath === 'components/alert/index.json') {
        console.log('----------------------------');
        console.log(fileRelativePath, pageId, pageMetadata);
        console.log('----------------------------');
      }
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
