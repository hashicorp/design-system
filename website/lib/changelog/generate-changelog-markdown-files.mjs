/* eslint-env node */
/* eslint-disable no-console */

import fs from 'fs';

const changelogs = {
  'design-tokens': '../packages/tokens/CHANGELOG.md',
  'flight-icons': '../packages/flight-icons/CHANGELOG.md',
  'ember-flight-icons': '../packages/ember-flight-icons/CHANGELOG.md',
  components: '../packages/components/CHANGELOG.md',
};

const keepOnlySubsetOfEntries = (sourceText) => {
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

const replacePageTitleWithNpmInfo = (sourceText) => {
  const regex = RegExp(/^# (.*)$\n/gm);
  let matches = regex.exec(sourceText);
  let replacementText = '';
  if (matches) {
    const packageName = matches[1];
    const packageNameEncoded = encodeURIComponent(packageName);
    replacementText += '<p class="doc-whats-new-changelog-npm-info">\n';
    replacementText += `  <strong><code>npm package: ${packageName}</code></strong>\n`;
    replacementText += `  <a href="https://badge.fury.io/js/${packageNameEncoded}">\n    <img src="https://badge.fury.io/js/${packageNameEncoded}.svg" alt="npm version" height="20">\n  </a>\n`;
    replacementText += '</p>\n';
  } else {
    replacementText =
      "# ⚠️ An error occurred: page title didn't match the expected format";
  }
  return sourceText.replace(/^# (.*)$\n/gm, replacementText);
};

const increaseHeadingsLevelByOne = (sourceText) => {
  return sourceText.replace(/^#/gm, '##');
};

const replaceMajorMinorPatchHeadings = (sourceText) => {
  return sourceText.replace(
    /^### (Major|Minor|Patch) Changes/gm,
    '**$1 changes**'
  );
};

const appendExternalLinks = (sourceText, sourcePath) => {
  let externalLinks = '';
  externalLinks += '\n---\n\n';
  const relativePath = sourcePath.replace(/^..\//, '');
  externalLinks += `_[Read the full changelog](https://github.com/hashicorp/design-system/blob/main/${relativePath})_`;
  return sourceText + externalLinks;
};

Object.keys(changelogs).forEach((changelog) => {
  try {
    const sourcePath = changelogs[changelog];
    const changelogSource = fs.readFileSync(sourcePath, 'utf8');
    let changelogModified = changelogSource;
    changelogModified = replacePageTitleWithNpmInfo(changelogModified);
    changelogModified = keepOnlySubsetOfEntries(changelogModified);
    changelogModified = replaceMajorMinorPatchHeadings(changelogModified);
    // changelogModified = increaseHeadingsLevelByOne(changelogModified);
    changelogModified = appendExternalLinks(changelogModified, sourcePath);
    fs.writeFileSync(
      `./docs/whats-new/release-notes/partials/${changelog}.md`,
      changelogModified,
      'utf8'
    );
  } catch (err) {
    console.error(err);
  }
});
