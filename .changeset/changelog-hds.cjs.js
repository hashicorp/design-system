/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// THIS FILE IS A DIRECT PORTING (AND CUSTOMIZATION) FROM: https://github.com/changesets/changesets/blob/0c8829bf8729ed5080bd7da843a717f60ea4b84b/packages/changelog-github/src/index.ts
//
// Notice:
// - the file needs to live at the same level as the config file and `***.md` changeset files, otherwise it triggers an error "[Error: ENOENT: no such file or directory, open '/PATH/TO/hashicorp/design-system/.changeset/SUBFOLDER/changes.md']"
// - the file needs to be in "cjs" (`require()`) format, otherwise it doesn't work (at least, we weren't able to get it working) - [we have used the `node_modules/@changesets/changelog-github/dist/changelog-github.cjs.prod.js` compiled file in the NPM package as reference of what is the expected code syntax]
//

const dotenv = require("dotenv");
const getGithubInfo = require("@changesets/get-github-info");

dotenv.config();

const SKIP_USERS = [
  // HDS users
  'didoo',
  'KristinLBradley',
  'MelSumner',
  'alex-ju',
  'jorytindall',
  'Dhaulagiri',
  'heatherlarsen',
  'andgen404',
  'majedelass',
  'zamoore',
  'curthashicorp',
  'shleewhite',
  // bots
  'apps/dependabot',
  'apps/hashicorp-copywrite',
  'hashibot-hds',
]

const changelogFunctions = {
  getDependencyReleaseLine: async (
    changesets,
    dependenciesUpdated,
    options
  ) => {
    if (!options.repo) {
      throw new Error(
        'Please provide a repo to this changelog generator like this:\n"changelog": ["@changesets/changelog-github", { "repo": "org/repo" }]'
      );
    }
    if (dependenciesUpdated.length === 0) return "";

    const changesetLink = `**🔄 Updated dependencies:**`;
    const updatedDependenciesList = dependenciesUpdated.map(
      (dependency) => `  - ${dependency.name}@${dependency.newVersion}`
    );
    return [changesetLink, ...updatedDependenciesList].join('\n');
  },
  getReleaseLine: async (changeset, type, options) => {
    if (!options || !options.repo) {
      throw new Error(
        'Please provide a repo to this changelog generator like this:\n"changelog": ["@changesets/changelog-github", { "repo": "org/repo" }]'
      );
    }

    let prFromSummary;
    let commitFromSummary;
    let usersFromSummary = [];

    const replacedChangelog = changeset.summary
      .replace(/^\s*(?:pr|pull|pull\s+request):\s*#?(\d+)/im, (_, pr) => {
        let num = Number(pr);
        if (!isNaN(num)) prFromSummary = num;
        return "";
      })
      .replace(/^\s*commit:\s*([^\s]+)/im, (_, commit) => {
        commitFromSummary = commit;
        return "";
      })
      .replace(/^\s*(?:author|user|co-authored-by):\s*@?([^\s]+)/gim, (_, user) => {
        usersFromSummary.push(user);
        return "";
      })
      .trim();

    const [firstLine, ...moreLines] = replacedChangelog
      .split("\n")
      .map((l) => l.trimRight());

    const links = await (async () => {
      if (prFromSummary !== undefined) {
        let { links } = await getGithubInfo.getInfoFromPullRequest({
          repo: options.repo,
          pull: prFromSummary,
        });
        return links;
      }
      const commitToFetchFrom = commitFromSummary || changeset.commit;
      if (commitToFetchFrom) {
        let { links } = await getGithubInfo.getInfo({
          repo: options.repo,
          commit: commitToFetchFrom,
        });
        return links;
      }
      return {
        pull: null,
        user: null,
      };
    })();

    let contributors = null;
    if (usersFromSummary.length) {
      contributors = usersFromSummary
        .filter((user) => !SKIP_USERS.includes(user))
        .map((user) => `[@${user}](https://github.com/${user})`)
        .join(', ');
    } else if (links.user) {
      // this user is coming from the `getInfoFromPullRequest` method that returns a string in the format `[@USER](https://github.com/USER)` / `[@${user.login}](${user.url})`
      // see: https://github.com/changesets/changesets/blob/main/packages/get-github-info/src/index.ts#L215
      const match = links.user.match(/^\[@(.*)\]/);
      if (match) {
        const user = match[1];
        if (SKIP_USERS.includes(user)) {
          console.log(`skipped contributor: ${user} = ${links.user}`);
        } else {
          contributors = links.user;
        }
      }
    }

    const metadata = [];
    if (links.pull) {
      metadata.push(links.pull);
    }
    if (contributors) {
      metadata.push(`Thanks ${contributors} for the contribution! 🙏`);
    }

    let releaseEntry = "";
    releaseEntry += `\n`;
    releaseEntry += `${firstLine.replace(/^- /,'')}\n`;
    releaseEntry += `${moreLines.join('\n')}\n`;
    if (metadata) {
      releaseEntry += `\n<small class="doc-whats-new-changelog-metadata">${metadata.join(' - ')}</small>\n`;
    }
    releaseEntry += `\n<div class="doc-whats-new-changelog-separator"></div>\n`;
    return releaseEntry;
  },
};

exports.default = changelogFunctions;
