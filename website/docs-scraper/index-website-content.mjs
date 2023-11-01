/* eslint-env node */
/* eslint-disable no-console */

import dotenv from 'dotenv';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

// import { pick } from 'lodash'; // not sure why this doesn't work in a `.mjs` module
import _ from 'lodash';

import algoliasearch from 'algoliasearch';

// read the environment variables from the ".env" file
dotenv.config();

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
    console.log(
      `\n==========\n${chalk.cyan(
        'Markdown indexing started...'
      )}\n==========\n`
    );

    await indexWebsiteContent();

    console.log(
      `\n==========\n${chalk.cyan(
        'Markdown indexing completed.'
      )}\n==========\n`
    );
  } catch (err) {
    console.error(err);
    // useful to debug Algolia API errors
    if (err.name === 'ApiError') {
      console.log(
        chalk.red(`Algolia - ERROR: ${err.transporterStackTrace[0].request}`)
      );
    }
    process.exit(1);
  }
})();

async function indexWebsiteContent() {
  // store ENV variables as local variables for simplicity
  const ALGOLIA_APPLICATION_ID = process.env.ALGOLIA_APPLICATION_ID;
  const ALGOLIA_API_KEY_ADMIN = process.env.ALGOLIA_API_KEY_ADMIN;
  const ALGOLIA_INDEX_ID = process.env.ALGOLIA_INDEX_ID;

  // see: https://www.algolia.com/doc/api-client/getting-started/install/javascript/?client=javascript
  const algoliaClient = algoliasearch(
    ALGOLIA_APPLICATION_ID,
    ALGOLIA_API_KEY_ADMIN
  );
  // DEBUG - this returns informations about the methods available
  // console.log(algoliaClient);

  // notice: the `initIndex` method doesn't create a new index on Algolia’s servers. It creates an index object you can interact with
  // https://www.algolia.com/doc/api-client/methods/indexing/#creating-indices
  const algoliaIndex = algoliaClient.initIndex(ALGOLIA_INDEX_ID);

  // reset the index by removing all the existing objects
  await algoliaIndex.clearObjects();
  console.log(chalk.green(`Algolia - Reset index "${ALGOLIA_INDEX_ID}"`));

  // we batch the records "add" operation for better efficiency
  // TODO - or better to have atomic operations?
  const algoliaRecords = [];

  // get all the files in the `website/dist/docs` folder
  const files = await walkDir(distDocsFolder);

  for (const file of files) {
    const fileFullPath = file;
    const fileRelativePath = path.relative(distDocsFolder, fileFullPath);

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

    // strip away the "index" from the file path and remove the `.json` extension
    const pageURL = fileRelativePath.replace(/(\/index)?\.json$/, '');

    // extract the page content and relevant metadata
    const pageId = jsonData.data.id;
    const pageContent = jsonData.data.attributes.content ?? '';
    const pageMetadata = _.pick(jsonData.data.attributes, [
      'title',
      'caption',
      'navigation', // keywords | label | hidden]
      'previewImage',
    ]);

    // set the "base" algolia object so it can be shared across objects
    const algoliaBaseRecord = {
      // PAGE
      pageId: pageId,
      // METADATA
      title: pageMetadata.title,
      caption: pageMetadata.caption,
      aliases: pageMetadata.navigation?.keywords,
      altName: pageMetadata.navigation?.label,
      previewImage: pageMetadata.previewImage,
    };

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
      markdownContent = matches.map((match) => ({
        tabName: match[1],
        tabContent: match[2],
      }));
      markdownContent.forEach((sectionContent) => {
        // prepare a new record for Algolia
        algoliaRecords.push(
          _.merge({}, algoliaBaseRecord, {
            // https://www.algolia.com/doc-beta/guides/sending-and-managing-data/send-and-update-your-data#unique-object-identifiers
            // objectID: TODO
            pageURL: `${pageURL}/?tab=${sectionContent.tabName}`,
            pageTab: sectionContent.tabName,
            // TODO! this is to work around the 10K limitation of records in Algolia
            content: sectionContent.tabContent.slice(0, 100),
          })
        );
      });
    } else {
      markdownContent = pageContent;
      // prepare a new record for Algolia
      algoliaRecords.push(
        _.merge({}, algoliaBaseRecord, {
          // https://www.algolia.com/doc-beta/guides/sending-and-managing-data/send-and-update-your-data#unique-object-identifiers
          // objectID: TODO
          pageURL: pageURL,
          pageTab: null,
          // TODO! this is to work around the 10K limitation of records in Algolia
          content: markdownContent.slice(0, 100),
        })
      );
    }

    // DEBUG
    // console.log('----------------------------');
    // console.log(pageId, fileRelativePath);
    // if (fileRelativePath === 'about/support.json') {
    // }
    // if (fileRelativePath === 'components/alert/index.json') {
    //   console.log(markdownContent.map((item) => item.tabName));
    // }
  }

  // here we construct the request to be sent to Algolia with the `batch/multiBatch` method
  // see: https://www.algolia.com/doc/api-reference/api-methods/batch/
  const algoliaRequests = algoliaRecords.map((record) => {
    return {
      action: 'addObject',
      indexName: ALGOLIA_INDEX_ID,
      body: record,
    };
  });

  const { taskID, objectIDs } = await algoliaClient.multipleBatch(
    algoliaRequests
  );

  console.log(
    chalk.green(
      `Algolia - Added "${objectIDs.length}" objects to index ${ALGOLIA_INDEX_ID} with task "${taskID[ALGOLIA_INDEX_ID]}"`
    )
  );
}
