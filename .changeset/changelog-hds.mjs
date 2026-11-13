/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// THIS FILE IS A DIRECT PORTING (AND CUSTOMIZATION) FROM: https://github.com/changesets/changesets/blob/0c8829bf8729ed5080bd7da843a717f60ea4b84b/packages/changelog-github/src/index.ts
//
// Notice:
// - the file needs to live at the same level as the config file and `***.md` changeset files, otherwise it triggers an error "[Error: ENOENT: no such file or directory, open '/PATH/TO/hashicorp/design-system/.changeset/SUBFOLDER/changes.md']"
// - `@changesets/get-github-info` reads `GITHUB_TOKEN` from the environment or from a `.env` file in the working directory
//

import { getCommitInfo, getPullRequestInfo } from "@changesets/get-github-info";

const SKIP_USERS = [
  // HDS users
  "didoo",
  "KristinLBradley",
  "MelSumner",
  "alex-ju",
  "jorytindall",
  "Dhaulagiri",
  "heatherlarsen",
  "zamoore",
  "shleewhite",
  "LilithJames-HDS",
  "dchyun",
  "pkj-web",
  "annawanggg",
  // bots
  "apps/dependabot",
  "apps/hashicorp-copywrite",
  "dependabot",
  "hashibot-hds",
];

const changelogFunctions = {
  getDependencyReleaseLine: async (
    changesets,
    dependenciesUpdated,
    options,
  ) => {
    if (!options.repo) {
      throw new Error(
        'Please provide a repo to this changelog generator like this:\n"changelog": ["@changesets/changelog-github", { "repo": "org/repo" }]',
      );
    }
    if (dependenciesUpdated.length === 0) return "";

    const changesetLink = `**🔄 Updated dependencies:**`;
    const updatedDependenciesList = dependenciesUpdated.map(
      (dependency) => `  - ${dependency.name}@${dependency.newVersion}`,
    );
    return [changesetLink, ...updatedDependenciesList].join("\n");
  },
  getReleaseLine: async (changeset, type, options) => {
    if (!options || !options.repo) {
      throw new Error(
        'Please provide a repo to this changelog generator like this:\n"changelog": ["@changesets/changelog-github", { "repo": "org/repo" }]',
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
      .replace(
        /^\s*(?:author|user|co-authored-by):\s*@?([^\s]+)/gim,
        (_, user) => {
          usersFromSummary.push(user);
          return "";
        },
      )
      .trim();

    const [firstLine, ...moreLines] = replacedChangelog
      .split("\n")
      .map((l) => l.trimRight());

    const info = await (async () => {
      if (prFromSummary !== undefined) {
        return await getPullRequestInfo({
          repo: options.repo,
          pull: prFromSummary,
        });
      }
      const commitToFetchFrom = commitFromSummary || changeset.commit;
      if (commitToFetchFrom) {
        return await getCommitInfo({
          repo: options.repo,
          commit: commitToFetchFrom,
        });
      }
      return undefined;
    })();

    // the info may be `undefined` if the PR/commit can't be found
    const pullLink = info?.pull?.markdownLink;
    const userLink = info?.author?.markdownLink;

    let contributors = null;
    if (usersFromSummary.length) {
      contributors = usersFromSummary
        .filter((user) => !SKIP_USERS.includes(user))
        .map((user) => `[@${user}](https://github.com/${user})`)
        .join(", ");
    } else if (userLink) {
      // the markdown link has the format `[@USER](https://github.com/USER)`
      const match = userLink.match(/^\[@(.*)\]/);
      if (match) {
        const user = match[1];
        if (SKIP_USERS.includes(user)) {
          console.log(`skipped contributor: ${user} = ${userLink}`);
        } else {
          contributors = userLink;
        }
      }
    }

    const metadata = [];
    if (pullLink) {
      metadata.push(pullLink);
    }
    if (contributors) {
      metadata.push(`Thanks ${contributors} for the contribution! 🙏`);
    }

    let releaseEntry = "";
    releaseEntry += `\n`;
    releaseEntry += `${firstLine.replace(/^- /, "")}\n`;
    releaseEntry += `${moreLines.join("\n")}\n`;
    if (metadata) {
      releaseEntry += `\n<small class="doc-whats-new-changelog-metadata">${metadata.join(" - ")}</small>\n`;
    }
    releaseEntry += `\n<div class="doc-whats-new-changelog-separator"></div>\n\n`;
    return releaseEntry;
  },
};

export default changelogFunctions;
