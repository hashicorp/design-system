/* eslint-env node */
/* eslint-disable no-console */

import fs from 'fs';

const changelogs = {
  'design-tokens': '../packages/tokens/CHANGELOG.md',
  'flight-icons': '../packages/flight-icons/CHANGELOG.md',
  'ember-flight-icons': '../packages/ember-flight-icons/CHANGELOG.md',
  components: '../packages/components/CHANGELOG.md',
};

const keepOnlySubsetOfEntries = ({ sourceText }) => {
  const lines = sourceText.split(/\r?\n/);
  let entriesCounter = 0;
  let subsetText = '';

  lines.forEach((line) => {
    if (line.match(/^## /)) {
      entriesCounter++;
    }
    // configure here how many entries we want to keep
    if (entriesCounter > 10) {
      return;
    } else {
      subsetText += `${line}\n`;
    }
  });
  return subsetText;
};

const increaseHeadingsLevelByOne = ({ sourceText }) => {
  return sourceText.replace(/^#/gm, '##');
};

const replaceMajorMinorPatchHeadings = ({ sourceText }) => {
  return sourceText.replace(
    /^### (Major|Minor|Patch) Changes/gm,
    '**$1 changes**'
  );
};

const appendExternalLinks = ({ sourceText, sourcePath }) => {
  let externalLinks = '';
  externalLinks += '\n---\n\n';
  const relativePath = sourcePath.replace(/^..\//, '');
  externalLinks += `_[Read the full changelog](https://github.com/hashicorp/design-system/blob/main/${relativePath})_`;
  return sourceText + externalLinks;
};

Object.keys(changelogs).forEach((changelog) => {
  try {
    const sourcePath = changelogs[changelog];
    const componentsChangelogSource = fs.readFileSync(sourcePath, 'utf8');
    let componentsChangelogModified = componentsChangelogSource;
    componentsChangelogModified = keepOnlySubsetOfEntries({
      sourceText: componentsChangelogModified,
    });
    componentsChangelogModified = replaceMajorMinorPatchHeadings({
      sourceText: componentsChangelogModified,
    });
    componentsChangelogModified = increaseHeadingsLevelByOne({
      sourceText: componentsChangelogModified,
    });
    componentsChangelogModified = appendExternalLinks({
      sourceText: componentsChangelogModified,
      sourcePath,
    });
    fs.writeFileSync(
      `./docs/whats-new/release-notes/partials/${changelog}.md`,
      componentsChangelogModified,
      'utf8'
    );
  } catch (err) {
    console.error(err);
  }
});
