/* eslint-env node */
/* eslint-disable no-console */

import fs from 'fs';

const changelogs = {
  'design-tokens': '../packages/tokens/CHANGELOG.md',
  'flight-icons': '../packages/flight-icons/CHANGELOG.md',
  'ember-flight-icons': '../packages/ember-flight-icons/CHANGELOG.md',
  components: '../packages/components/CHANGELOG.md',
};

const appendExternalLinks = (sourcePath) => {
  let externalLinks = '';
  externalLinks += '\n---\n\n';
  const relativePath = sourcePath.replace(/^..\//, '');
  externalLinks += `_[Read the full changelog](https://github.com/hashicorp/design-system/blob/main/${relativePath})_`;
  return externalLinks;
};

Object.keys(changelogs).forEach((changelog) => {
  try {
    const sourcePath = changelogs[changelog];
    const componentsChangelogSource = fs.readFileSync(sourcePath, 'utf8');
    let componentsChangelogModified = componentsChangelogSource.replace(
      /^#/gm,
      '##'
    );
    componentsChangelogModified += appendExternalLinks(sourcePath);
    fs.writeFileSync(
      `./docs/whats-new/release-notes/partials/${changelog}.md`,
      componentsChangelogModified,
      'utf8'
    );
  } catch (err) {
    console.error(err);
  }
});
