/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import fs from 'fs';
import matter from 'gray-matter';

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

const getComponentPaths = (baseDir) => {
  const components = [];
  try {
    const folders = fs.readdirSync(baseDir, { withFileTypes: true });
    folders.forEach((folder) => {
      if (folder.isDirectory()) {
        const componentPath = `${baseDir}/${folder.name}`;
        const partialsPath = `${componentPath}/partials`;
        if (fs.existsSync(partialsPath)) {
          components.push(componentPath.replace('./docs/', ''));
        } else {
          // For component docs that are nested, we need to recursively get their paths
          components.push(...getComponentPaths(componentPath));
        }
      }
    });
  } catch (err) {
    console.error(`Error reading components from ${baseDir}:`, err);
  }
  return components;
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

const extractComponentChangelogEntries = (components, lastVersionContent) => {
  const componentChangelogEntries = {};

  components.forEach((componentName) => {
    const regex = new RegExp(
      `^(<!-- START ${componentName})((.|\n)*?)(<!-- END -->)$`,
      'gm',
    );
    const matches = lastVersionContent.match(regex);
    if (matches) {
      const cleanedMatches = [];
      matches.forEach((match) => {
        // Remove the start and end comments to get the changelog entry
        const cleanMatch = match
          .replace(`<!-- START ${componentName} -->`, '')
          .replace(`<!-- END -->`, '')
          .trim();
        cleanedMatches.push(cleanMatch);
      });
      componentChangelogEntries[componentName] = cleanedMatches;
    }
  });

  checkUnknownComponentChangelogEntries(
    componentChangelogEntries,
    lastVersionContent,
  );

  return componentChangelogEntries;
};

const checkUnknownComponentChangelogEntries = (
  componentChangelogEntries,
  lastVersionContent,
) => {
  const baseRegex = new RegExp(`^(<!-- START)((.|\n)*?)(<!-- END -->)$`, 'gm');

  const matches = lastVersionContent.match(baseRegex);
  if (matches) {
    matches.forEach((match) => {
      let componentNameFound = false;
      Object.keys(componentChangelogEntries).forEach((componentName) => {
        if (match.includes(`<!-- START ${componentName} -->`)) {
          componentNameFound = true;
        }
      });
      if (!componentNameFound) {
        console.warn(
          `No path found for changelog entry: ${match.substring(match.indexOf('<!-- START') + 11, match.indexOf(' -->'))}`,
        );
      }
    });
  }
};

const updateComponentVersionHistory = (componentChangelogEntries, version) => {
  Object.keys(componentChangelogEntries).forEach((componentName) => {
    const versionHistoryPath = `./docs/${componentName}/partials/version-history/version-history.md`;
    let versionHistoryContent = '';

    if (fs.existsSync(versionHistoryPath)) {
      versionHistoryContent = fs.readFileSync(versionHistoryPath, 'utf8');
    } else {
      fs.mkdirSync(
        `./docs/${componentName}/partials/version-history/version-history`,
        { recursive: true },
      );
    }

    // prevent duplicate sections if the script is called multiple times
    if (!versionHistoryContent.includes(`## ${version}`)) {
      // for each entry, remove the component name and keep only the description (assuming the "`ComponentName` - Description" format)
      const newEntries = componentChangelogEntries[componentName]
        .map((entry) => {
          // If the component is a form primitive or layout, we want to keep the component name in the description
          if (
            componentName === 'components/form/primitives' ||
            componentName === 'components/form/layout'
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
  Object.keys(componentChangelogEntries).forEach((componentName) => {
    const indexPath = `${componentName}/index.md`;

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

const cleanComponentFrontMatter = (components, version) => {
  Object.keys(components).forEach((componentName) => {
    const indexPath = `${components[componentName]}/index.md`;

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
const componentPaths = getComponentPaths('./docs/components');
const layoutComponentPaths = getComponentPaths('./docs/layouts');
const overrideComponentPaths = getComponentPaths('./docs/overrides');
const utilityComponentPaths = getComponentPaths('./docs/utilities');
const allComponentPaths = [
  ...componentPaths,
  ...layoutComponentPaths,
  ...overrideComponentPaths,
  ...utilityComponentPaths,
];

// Read the main changelog entry for components
const changelogContent = readChangelogContent(
  './docs/whats-new/release-notes/partials/components.md',
);
// Extract the changelog for current version
const currentVersionContent = extractVersion(changelogContent, version);

// Extracts changelog entries for each components
const componentChangelogEntries = extractComponentChangelogEntries(
  allComponentPaths,
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
