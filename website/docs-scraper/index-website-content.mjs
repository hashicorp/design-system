/* eslint-env node */
/* eslint-disable no-console */

import dotenv from 'dotenv';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

// import { pick } from 'lodash'; // not sure why this doesn't work in a `.mjs` module
import _ from 'lodash';

import algoliasearch from 'algoliasearch';

import { walkDir } from './parts/walkDir.mjs';
import { populateAlgoliaRecords } from './parts/populateAlgoliaRecords.mjs';

// read the environment variables from the ".env" file
dotenv.config();

// TODO understand if it's possible to generalize this
// import { getTocSectionsBundle } from '../app/components/doc/page/sidebar.js';
const ABOUT = ['about', 'whats-new', 'getting-started'];
const FOUNDATIONS = ['foundations', 'icons'];
const COMPONENTS = ['components', 'layouts', 'overrides', 'utilities'];
const PATTERNS = ['patterns'];
const TESTING = ['testing'];
const getPageTopRoute = (section) => {
  if (ABOUT.includes(section)) {
    return ABOUT[0];
  } else if (FOUNDATIONS.includes(section)) {
    return FOUNDATIONS[0];
  } else if (COMPONENTS.includes(section)) {
    return COMPONENTS[0];
  } else if (PATTERNS.includes(section)) {
    return PATTERNS[0];
  } else if (TESTING.includes(section)) {
    return TESTING[0];
  } else {
    // eg. the website "root" index page
    return [];
  }
};

// SCRIPT CONFIG

// const distDocsFolder = path.resolve(__dirname, '../dist/docs');
const distDocsFolder = path.resolve('dist/docs');
const tokensJsonFilePath = path.resolve(
  '../packages/tokens/dist/docs/products/tokens.json'
);
const flightIconsJsonFilePath = path.resolve(
  '../packages/flight-icons/catalog.json'
);

// used in development mode to skip API calls
const DEV_SKIP_API_CALLS = false;
// used in development to process only the "testing" markdown files
const DEV_MARKDOWN_TESTING = false;

// ===================================================

// INDEX WEBSITE CONTENT

(async () => {
  try {
    console.log(
      `\n==========\n${chalk.cyan(
        'Website content indexing started...'
      )}\n==========\n`
    );

    await indexWebsiteContent();

    console.log(
      `\n==========\n${chalk.cyan(
        'Website content indexing completed.'
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
  if (!DEV_SKIP_API_CALLS) {
    await algoliaIndex.clearObjects();
    console.log(chalk.green(`Algolia - Reset index "${ALGOLIA_INDEX_ID}"\n`));
  } else {
    console.log(
      chalk.magenta(
        `\n[DEV-MODE] Algolia - Skipped resetting index ${ALGOLIA_INDEX_ID}"\n`
      )
    );
  }

  // we batch the records "add" operation for better efficiency
  // TODO - or better to have atomic operations?
  const algoliaRecords = [];

  // --------------------------------
  // MARKDOWN FILES
  // --------------------------------

  // get all the files in the `website/dist/docs` folder
  const files = await walkDir(distDocsFolder);

  for (const file of files) {
    const fileFullPath = file;
    const fileRelativePath = path.relative(distDocsFolder, fileFullPath);

    // we want to process only the JSON file (extra precaution)
    if (path.extname(file) !== '.json') {
      continue;
    }

    if (DEV_MARKDOWN_TESTING) {
      // DEBUG - we use ONLY the "playground" markdown file
      if (fileRelativePath !== 'testing/markdown/scraping-playground.json') {
        continue;
      }
      // DEBUG - we use ONLY the "testing" folder
      // if (fileRelativePath.match(/^testing/) === null) {
      //   continue;
      // }
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
      // PAGE
      pageSection: pageSection,
      pageTopRoute: pageTopRoute,
      filePath: fileRelativePath,
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

    // console.log('========================================');
    console.log(chalk.white(`Processing file: ${fileRelativePath}`));

    if (matches.length) {
      // extract from each "section" the tab name and the actual content
      matches.forEach(async (match) => {
        const tabName = match[1];
        const tabContent = match[2];
        const currBaseRecord = _.merge({}, algoliaBaseRecord, {
          pageURL: `${pageURL}?tab=${encodeURIComponent(
            tabName.toLowerCase()
          )}`,
          pageTab: tabName,
        });
        console.log(chalk.gray(`- Tab: ${tabName}`));
        const records = await populateAlgoliaRecords({
          record: currBaseRecord,
          content: tabContent,
        });
        algoliaRecords.push(...records);
      });
    } else {
      // there are no tabs, all the content is directly in the page
      const currBaseRecord = _.merge({}, algoliaBaseRecord, {
        pageURL: pageURL,
        pageTab: null,
      });
      const records = await populateAlgoliaRecords({
        record: currBaseRecord,
        content: pageContent,
      });
      algoliaRecords.push(...records);
    }
  }

  // --------------------------------
  // TOKENS
  // --------------------------------

  // read the JSON file for the tokens
  const tokensJsonData = await fs.readJSON(tokensJsonFilePath);

  tokensJsonData.forEach((token) => {
    algoliaRecords.push({
      // RECORD
      objectID: `record__token-${token.name}`, // https://www.algolia.com/doc-beta/guides/sending-and-managing-data/send-and-update-your-data#unique-object-identifiers
      // PAGE
      pageSection: 'foundations',
      pageTopRoute: 'foundations',
      pageURL: `/foundations/tokens?searchQuery=${token.name}`,
      //
      // METADATA
      // title: ???,
      // caption: ???,
      // previewImage: ???,
      //
      // CONTENT
      type: 'token',
      content: `${token.name} ${token.value}`,
      level: 9,
      source: 'token',
      // EXTRA
      'token-name': token.name,
      'token-value': token.value,
      'token-type': token.type, // notice: it may be `undefined`
      'token-group': token.group, // notice: it may be `undefined`
    });
  });

  console.log(chalk.white(`\nProcessed ${tokensJsonData.length} tokens`));

  // --------------------------------
  // ICONS
  // --------------------------------

  // read the JSON file for the Flight icons
  const flightIconsJsonData = await fs.readJSON(flightIconsJsonFilePath);

  const distinctIcons = _.uniqBy(flightIconsJsonData.assets, 'iconName');

  distinctIcons.forEach((icon) => {
    algoliaRecords.push({
      // RECORD
      objectID: `record__icon-${icon.iconName}`, // https://www.algolia.com/doc-beta/guides/sending-and-managing-data/send-and-update-your-data#unique-object-identifiers
      // PAGE
      pageSection: 'icons',
      pageTopRoute: 'foundations',
      pageURL: `/icons/library?searchQuery=${icon.iconName}`,
      //
      // METADATA
      // title: ???,
      // caption: ???,
      // previewImage: ???,
      //
      // CONTENT
      type: 'icon',
      content: `${icon.iconName}, ${icon.description}`,
      level: 9,
      source: 'icon',
      // EXTRA
      'icon-name': icon.iconName,
      'icon-aliases': icon.description,
    });
  });

  console.log(chalk.white(`\nProcessed ${distinctIcons.length} Flight icons`));

  // --------------------------------
  // PUSH TO ALGOLIA
  // --------------------------------

  if (!DEV_SKIP_API_CALLS) {
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
        `\nAlgolia - Added "${objectIDs.length}" objects to index ${ALGOLIA_INDEX_ID} with task "${taskID[ALGOLIA_INDEX_ID]}"\n`
      )
    );
  } else {
    console.log(
      chalk.magenta(
        `\n[DEV-MODE] Algolia - Skipped adding objects to index ${ALGOLIA_INDEX_ID}"\n`
      )
    );
  }
}
