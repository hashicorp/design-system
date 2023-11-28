/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

/* eslint-env node */
/* eslint-disable no-console */

// ===================================================

// DEV MODE VARIABLES

// used in development mode to skip API calls
const DEV_SKIP_API_CALLS = false;
// used in development to process only the "testing" markdown files
const DEV_MARKDOWN_TESTING = false;

// ===================================================

import dotenv from 'dotenv';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import hash from 'object-hash';

// import { pick } from 'lodash'; // not sure why this doesn't work in a `.mjs` module
import _ from 'lodash';

import algoliasearch from 'algoliasearch';

import { populateAlgoliaRecords } from './populateAlgoliaRecords.mjs';
import { walkDir } from './parts/walkDir.mjs';
import { getPageTopRoute } from './parts/getPageTopRoute.mjs';

// script config
import { config } from './config.mjs';

// read the environment variables from the ".env" file
dotenv.config();

// ===================================================

// INDEX WEBSITE CONTENT

(async () => {
  try {
    console.log(
      chalk.cyan(
        '\n==============================\nWebsite content indexing started...\n==============================\n'
      )
    );

    await indexWebsiteContent();

    console.log(
      chalk.cyan(
        '\n==============================\nWebsite content indexing completed\n==============================\n'
      )
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
  if (!DEV_SKIP_API_CALLS) {
    await algoliaIndex.clearObjects();
    console.log(chalk.green(`Algolia - Reset index "${ALGOLIA_INDEX_ID}"\n`));

    // used to wait for the `clearObjects` to execute on Algolia (the API response is immediate, but the execution could take some time)
    await new Promise((r) => setTimeout(r, 5000));

    // make sure the index is empty, otherwise trigger a warning
    const searchResults = await algoliaIndex.search('');
    if (searchResults.nbHits > 0) {
      console.error(
        chalk.red(
          `\nAlgolia - ERROR: - ${searchResults.nbHits} records are still available after resetting the index  ${ALGOLIA_INDEX_ID}"\n`
        )
      );
    }
  } else {
    console.log(
      chalk.magenta(
        `\n[DEV-MODE] Algolia - Skipped resetting index ${ALGOLIA_INDEX_ID}"\n`
      )
    );
  }

  // --------------------------------
  // MARKDOWN FILES
  // --------------------------------

  console.log(
    chalk.white('\n\n==========\nProcessing markdown content:\n==========\n')
  );

  const markdownRecords = [];

  // get all the files in the `website/dist/docs` folder
  const files = await walkDir(config.distDocsFolder);

  for (const file of files) {
    const fileFullPath = file;
    const fileRelativePath = path.relative(config.distDocsFolder, fileFullPath);

    // we want to process only the JSON file (extra precaution)
    if (path.extname(file) !== '.json') {
      continue;
    }

    if (DEV_MARKDOWN_TESTING) {
      // DEBUG - we use ONLY the "playground" markdown file
      if (fileRelativePath !== 'testing/markdown/scraping-playground.json') {
        continue;
      }
    } else {
      // we skip the "testing" folder
      if (fileRelativePath.match(/^testing/)) {
        continue;
      }
    }

    // read the JSON file
    const jsonData = await fs.readJSON(fileFullPath);

    if (!DEV_MARKDOWN_TESTING) {
      // skip hidden pages
      if (jsonData.data?.attributes?.navigation?.hidden) {
        continue;
      }
    }

    // strip away the "index" from the file path and remove the `.json` extension
    const pageURL = fileRelativePath.replace(/(\/index)?\.json$/, '');

    // routing categorization
    const pageSection = fileRelativePath.split('/')[0];
    const pageTopRoute = getPageTopRoute(pageSection);

    // extract the page content and relevant metadata
    const pageContent = jsonData.data.attributes.content ?? '';
    const pageMetadata = _.pick(jsonData.data.attributes, [
      'title',
      'caption',
      'navigation', // keywords | label | hidden]
      'previewImage',
    ]);

    // set the "base" algolia object so it can be shared across objects
    const algoliaBaseRecord = {
      // SOURCE
      originalFilePath: fileRelativePath,
      // PAGE
      pageMainCategory: pageTopRoute,
      pageSection: pageSection,
      pageTitle: pageMetadata.title,
      pageCaption: pageMetadata.caption,
      pageBaseURL: `/${pageURL}`, // for simplicity we want to store absolute paths
      searchResultURL: undefined, // will be populated later
      // METADATA
      aliases: pageMetadata.navigation?.keywords,
      // for simplicity we want to store absolute paths
      previewImage: pageMetadata.previewImage
        ? `/${pageMetadata.previewImage}`
        : undefined,
    };

    // check if the content is split in "sections"
    const matchAllResults = pageContent.matchAll(
      /<section data-tab="(.*?)">([\s|\S|.]*?)<\/section>/g
    );

    // notice: `matchAll` returns an iterable, not an array
    // plus once it's iterated over, you can't iterate again
    // so we need to destructure it on a reusable array
    const matches = [...matchAllResults];

    // console.log('========================================');
    console.log(`Processing file: ${fileRelativePath}`);

    if (matches.length) {
      // extract from each "section" the tab name and the actual content
      for (const match of matches) {
        const tabName = match[1];
        const tabContent = match[2];
        const currBaseRecord = _.merge({}, algoliaBaseRecord, {
          // for simplicity we want to store absolute paths
          searchResultURL: `/${pageURL}?tab=${encodeURIComponent(
            tabName.toLowerCase()
          )}`,
          pageTab: tabName,
        });
        console.log(chalk.gray(`- Tab: ${tabName}`));
        const records = await populateAlgoliaRecords({
          record: currBaseRecord,
          content: tabContent,
        });
        // add the objectID to the records and the page title to the records' hierarchy
        records.forEach((record) => {
          record.objectID = `record__content-${record.type}-${hash(record)}`; // https://www.algolia.com/doc-beta/guides/sending-and-managing-data/send-and-update-your-data#unique-object-identifiers
          record.hierarchy.lvl1 = pageMetadata.title;
        });
        // add the records to the algolia list
        markdownRecords.push(...records);
      }
    } else {
      // there are no tabs, all the content is directly in the page
      const currBaseRecord = _.merge({}, algoliaBaseRecord, {
        searchResultURL: `/${pageURL}`, // for simplicity we want to store absolute paths
        pageTab: null,
      });
      const records = await populateAlgoliaRecords({
        record: currBaseRecord,
        content: pageContent,
      });
      // add the objectID to the records and the page title to the records' hierarchy
      records.forEach((record) => {
        record.objectID = `record__content-${record.type}-${hash(record)}`; // https://www.algolia.com/doc-beta/guides/sending-and-managing-data/send-and-update-your-data#unique-object-identifiers
        record.hierarchy.lvl1 = pageMetadata.title;
      });
      // add the records to the algolia list
      markdownRecords.push(...records);
    }

    // add a custom entry for the top-page
    const topPageRecord = _.merge({}, algoliaBaseRecord, {
      objectID: `record__page-${hash(pageURL)}`, // https://www.algolia.com/doc-beta/guides/sending-and-managing-data/send-and-update-your-data#unique-object-identifiers
      type: 'page',
      searchResultURL: `/${pageURL}`,
      pageTab: null,
      level: 0, // we use `level=0` here to put it on top of the other pages
      content: '',
      hierarchy: {
        lvl1: pageMetadata.title,
        lvl2: null,
        lvl3: null,
        lvl4: null,
        lvl5: null,
        lvl6: null,
      },
    });
    markdownRecords.push(topPageRecord);
  }

  console.log(`\nProduced ${markdownRecords.length} content records`);

  // --------------------------------
  // TOKENS
  // --------------------------------

  console.log(chalk.white('\n\n==========\nProcessing tokens:\n==========\n'));

  let tokensRecords = [];

  // read the JSON file for the tokens
  const tokensJsonData = await fs.readJSON(config.tokensJsonFilePath);

  tokensJsonData.forEach((token) => {
    tokensRecords.push({
      // RECORD
      objectID: `record__token-${token.name}`, // https://www.algolia.com/doc-beta/guides/sending-and-managing-data/send-and-update-your-data#unique-object-identifiers
      // PAGE
      pageMainCategory: 'foundations',
      pageSection: 'foundations',
      // pageTitle: ???,
      // pageCaption: ???,
      pageBaseURL: '/foundations/tokens',
      searchResultURL: `/foundations/tokens?searchQuery=${token.name}`,
      // CONTENT
      source: 'token',
      type: 'token',
      content: `${token.name} ${token.value}`,
      level: 9,
      // EXTRA
      'token-name': token.name,
      'token-value': token.value,
      'token-type': token.type, // notice: it may be `undefined`
      'token-group': token.group, // notice: it may be `undefined`
    });
  });

  console.log(`Produced ${tokensRecords.length} token records`);

  // --------------------------------
  // ICONS
  // --------------------------------

  console.log(
    chalk.white('\n\n==========\nProcessing Flight icons:\n==========\n')
  );

  let iconsRecords = [];

  // read the JSON file for the Flight icons
  const flightIconsJsonData = await fs.readJSON(config.flightIconsJsonFilePath);

  const distinctIcons = _.uniqBy(flightIconsJsonData.assets, 'iconName');

  distinctIcons.forEach((icon) => {
    iconsRecords.push({
      // RECORD
      objectID: `record__icon-${icon.iconName}`, // https://www.algolia.com/doc-beta/guides/sending-and-managing-data/send-and-update-your-data#unique-object-identifiers
      // PAGE
      pageMainCategory: 'foundations',
      pageSection: 'icons',
      // pageTitle: ???,
      // pageCaption: ???,
      pageBaseURL: '/icons/library',
      searchResultURL: `/icons/library?searchQuery=${icon.iconName}`,
      // CONTENT
      type: 'icon',
      source: 'icon',
      content: `${icon.iconName}, ${icon.description}`,
      level: 9,
      // EXTRA
      'icon-name': icon.iconName,
      'icon-aliases': icon.description,
    });
  });

  console.log(`Produced ${iconsRecords.length} icon records`);

  // --------------------------------
  // PUSH RECORDS TO ALGOLIA
  // --------------------------------

  console.log(
    chalk.white('\n\n==========\nProcessing Algolia records:\n==========\n')
  );

  // we batch the records "add" operation for better efficiency
  const algoliaRecords = [
    ...markdownRecords,
    ...tokensRecords,
    ...iconsRecords,
  ];

  // make sure there are no duplicate records (with duplicate objectIDs)
  // this may happen for example if the same text in a paragraph (eg. `The code has been simplified for clarity`) appears in the same page section
  // or if we have multiple Component API properties (eg. `...attributes`) with the same description under the same "code" tab of a page
  let algoliaRecordsDistinct = [];
  let uniqueObjectIDs = [];
  algoliaRecords.forEach((record) => {
    if (!uniqueObjectIDs.includes(record.objectID)) {
      algoliaRecordsDistinct.push(record);
      uniqueObjectIDs.push(record.objectID);
    }
  });

  // reverse the array so the indexed content is in the "natural" order as one finds it in the web pages
  // otherwise Algolia will use the `objectID` field, in ascending order, and this leads to weird results
  // see: https://support.algolia.com/hc/en-us/articles/11461259527825-Is-there-a-way-to-change-the-default-descending-order-of-ObjectID-upon-an-empty-search-
  algoliaRecordsDistinct.reverse();

  console.log(
    `Ready to add ${algoliaRecordsDistinct.length} distinct records to Algolia index (out of ${algoliaRecords.length} collected)`
  );

  // DEBUG - leave for debugging
  // await fs.writeJSON('./ALGOLIA-RECORDS-DUMP.json', algoliaRecords, {
  //   spaces: 2,
  //   replacer: null,
  // });

  if (!DEV_SKIP_API_CALLS) {
    // here we construct the request to be sent to Algolia with the `batch/multiBatch` method
    // see: https://www.algolia.com/doc/api-reference/api-methods/batch/
    const algoliaRequests = algoliaRecordsDistinct.map((record) => {
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
        `\n\nAlgolia - Sent ${algoliaRequests.length} API requests → Added "${objectIDs.length}" records to index ${ALGOLIA_INDEX_ID} with task "${taskID[ALGOLIA_INDEX_ID]}"\n`
      )
    );
  } else {
    console.log(
      chalk.magenta(
        `\n\n[DEV-MODE] Algolia - Skipped adding objects to index ${ALGOLIA_INDEX_ID}"\n`
      )
    );
  }
}
