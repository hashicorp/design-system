/* eslint-env node */
/* eslint-disable no-console */

console.log('Hi!');

import fs from 'fs';

const changelogs = {
  'design-tokens': '../packages/tokens/CHANGELOG.md',
  'flight-icons': '../packages/flight-icons/CHANGELOG.md',
  'ember-flight-icons': '../packages/ember-flight-icons/CHANGELOG.md',
  components: '../packages/components/CHANGELOG.md',
};

Object.keys(changelogs).forEach((changelog) => {
  try {
    const sourcePath = changelogs[changelog];
    const componentsChangelogSource = fs.readFileSync(sourcePath, 'utf8');
    const componentsChangelogModified = componentsChangelogSource.replace(
      /^#/gm,
      '##'
    );
    fs.writeFileSync(
      `./docs/whats-new/release-notes/partials/${changelog}.md`,
      componentsChangelogModified,
      'utf8'
    );
  } catch (err) {
    console.error(err);
  }
});
