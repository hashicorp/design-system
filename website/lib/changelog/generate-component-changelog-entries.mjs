/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import fs from 'fs';
import matter from 'gray-matter';
import { glob } from 'glob';

const readVersionFromPackageJson = (filePath) => {
  try {
    const packageJson = fs.readFileSync(filePath, 'utf8');
    const packageData = JSON.parse(packageJson);
    return packageData.version;
  } catch (err) {
    console.error(`Error reading version from ${filePath}:`, err);
    return null;
  }
};

const getComponentPaths = async () => {
  const componentPaths = await glob(
    './docs/{components,layouts,overrides,utilities}/**/partials/',
    { onlyDirectories: true },
  );
  const regex = new RegExp(
    `(components|layouts|overrides|utilities)\/((?!\/partials).)*`,
  );
  const cleanedComponentPaths = componentPaths.map((path) => {
    return path.match(regex)[0];
  });
  return cleanedComponentPaths;
};

const readChangelogContent = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content;
  } catch (err) {
    console.error(`Error reading changelog content from ${filePath}:`, err);
    return null;
  }
};

const extractVersion = (changelogContent, version) => {
  const regex = new RegExp(`## ${version}[\\s\\S]*?(?=## |$)`);
  const match = changelogContent.match(regex);
  return match ? match[0] : null;
};

const extractComponentChangelogEntries = (lastVersionContent) => {
  const componentChangelogEntries = {};

  // Regular expression to match and capture a block of text delimited by two HTML comments used as START/END markers:
  // <!-- START ... -->
  //   ... (any content, including newlines)
  // <!-- END -->
  //
  // Captures the following groups:
  // - $1 = The full opening comment line (e.g., <!-- START ... -->\n)
  // - $2 = The component path identifier declared in the "START" marker
  // - $3 = The content between the start and end comments (non-greedy)
  // - $4 = The last character of the content
  // - $4 = The full closing comment line (\n<!-- END -->)
  //
  // Flags:
  // - 'g': global search (find all matches)
  // - 'm': multiline mode (^ and $ match start/end of line)
  //
  // Explanation/demo: https://regex101.com/r/IDnaLU/1
  //
  const regex = new RegExp(
    `^(<!-- START (.*) -->\n)((.|\n)*?)(\n<!-- END -->)$`,
    'gm',
  );

  const matchesIterator = lastVersionContent.matchAll(regex);
  const matches = Array.from(matchesIterator);

  if (matches.length > 0) {
    matches.forEach((match) => {
      const [
        _fullString,
        _startMarker,
        componentPath,
        cleanContent,
        _entryLastChar,
        _endMarker,
      ] = match;
      if (fs.existsSync(`./docs/${componentPath}`)) {
        (componentChangelogEntries[componentPath] ??= []).push(cleanContent);
      } else {
        // If the path declared in the `START` marker is not present an error is thrown
        throw new Error(`No path found for changelog entry: ${componentPath}`);
      }
    });
  } else {
    console.warn(
      `No changelog entries found in last version content: ${lastVersionContent}`,
    );
  }

  return componentChangelogEntries;
};

const updateComponentVersionHistory = (componentChangelogEntries, version) => {
  Object.keys(componentChangelogEntries).forEach((componentPath) => {
    const versionHistoryPath = `./docs/${componentPath}/partials/version-history/version-history.md`;
    let versionHistoryContent = '';

    if (fs.existsSync(versionHistoryPath)) {
      versionHistoryContent = fs.readFileSync(versionHistoryPath, 'utf8');
    } else {
      fs.mkdirSync(`./docs/${componentPath}/partials/version-history`, {
        recursive: true,
      });
    }

    // prevent duplicate sections if the script is called multiple times
    if (!versionHistoryContent.includes(`## ${version}`)) {
      // for each entry, remove the component name and keep only the description (assuming the "`ComponentName` - Description" format)
      const newEntries = componentChangelogEntries[componentPath]
        .map((entry) => {
          // If the component is a form primitive or layout, we want to keep the component name in the description
          if (
            componentPath === 'components/form/primitives' ||
            componentPath === 'components/form/layout'
          ) {
            return entry;
          } else {
            return entry.split(' - ')[1];
          }
        })
        .join('\n\n');
      const newHeading = `## ${version}\n\n${newEntries}\n\n${versionHistoryContent}`;
      fs.writeFileSync(versionHistoryPath, newHeading, 'utf8');
    }
  });
};

const updateComponentFrontMatter = (componentChangelogEntries, version) => {
  Object.keys(componentChangelogEntries).forEach((componentPath) => {
    const indexPath = `./docs/${componentPath}/index.md`;

    if (fs.existsSync(indexPath)) {
      // Fetch the index markdown file
      const indexContent = fs.readFileSync(indexPath, 'utf8');

      // Parse the index file content
      const parsedFrontMatter = matter(indexContent);

      // Update the front matter
      if (!parsedFrontMatter.data.status) {
        parsedFrontMatter.data.status = {};
      }
      if (
        parsedFrontMatter.data.status.added !== version &&
        parsedFrontMatter.data.status.updated !== version
      ) {
        // Remove any potential added badge before setting the updated badge
        delete parsedFrontMatter.data.status.added;
        parsedFrontMatter.data.status.updated = version;
      }

      // Stringify the updated content
      const updatedContent = matter.stringify(
        parsedFrontMatter.content,
        parsedFrontMatter.data,
      );

      // Write the updated content back to the index markdown file
      fs.writeFileSync(indexPath, updatedContent);
    }
  });
};

const cleanComponentFrontMatter = (componentPaths, version) => {
  componentPaths.forEach((componentPath) => {
    const indexPath = `./docs/${componentPath}/index.md`;

    if (fs.existsSync(indexPath)) {
      // Fetch the index markdown file
      const indexContent = fs.readFileSync(indexPath, 'utf8');

      // Parse the index file content
      const parsedFrontMatter = matter(indexContent);

      // Clean the front matter status if 'added' or 'updated' are not matching the current version
      // Removing the deprecated status will be done manually as we cannot anticipate the removal
      if (
        parsedFrontMatter.data.status &&
        parsedFrontMatter.data.status.added !== version &&
        parsedFrontMatter.data.status.updated !== version &&
        (parsedFrontMatter.data.status.added ||
          parsedFrontMatter.data.status.updated)
      ) {
        delete parsedFrontMatter.data.status;
      }

      // Stringify the updated content
      const updatedContent = matter.stringify(
        parsedFrontMatter.content,
        parsedFrontMatter.data,
      );

      // Write the updated content back to the index markdown file
      fs.writeFileSync(indexPath, updatedContent);
    }
  });
};

const cleanChangelogContent = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const newLines = [];
    lines.forEach((line) => {
      if (!(line.startsWith('<!-- START') || line.startsWith('<!-- END'))) {
        newLines.push(line);
      }
    });
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
  } catch (err) {
    console.error(`Error cleaning changelog content from ${filePath}:`, err);
    return null;
  }
};

const isNotPatchVersion = (version) => {
  // eslint-disable-next-line no-unused-vars
  const [major, minor, patch] = version.split('.').map(Number);
  return patch === 0;
};

// Extract current version
const version = readVersionFromPackageJson(
  '../packages/components/package.json',
);

// Determine component paths
const allComponentPaths = await getComponentPaths();

// Read the main changelog entry for components
const changelogContent = readChangelogContent(
  './docs/whats-new/release-notes/partials/components.md',
);
// Extract the changelog for current version
const currentVersionContent = extractVersion(changelogContent, version);

// Extracts changelog entries for each components
const componentChangelogEntries = extractComponentChangelogEntries(
  currentVersionContent,
);

// Add changelog entries for each updated component
updateComponentVersionHistory(componentChangelogEntries, version);

// Check if the current version is a new minor version
if (isNotPatchVersion(version)) {
  // Clean previous front matter status for all components
  cleanComponentFrontMatter(allComponentPaths, version);
}

// Update front matter for each updated component
updateComponentFrontMatter(componentChangelogEntries, version);

// Clean the changelog entries for components
cleanChangelogContent('./docs/whats-new/release-notes/partials/components.md');
cleanChangelogContent('../packages/components/CHANGELOG.md');
