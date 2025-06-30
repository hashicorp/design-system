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
  const components = {};
  try {
    const folders = fs.readdirSync(baseDir, { withFileTypes: true });
    folders.forEach((folder) => {
      if (folder.isDirectory()) {
        const componentPath = `${baseDir}/${folder.name}`;
        const partialsPath = `${componentPath}/partials`;
        if (fs.existsSync(partialsPath)) {
          // we have some special cases where intermediate namespacing is used to group components:
          if (baseDir.endsWith('/copy')) {
            components[`copy-${folder.name}`] = componentPath;
          } else if (baseDir.endsWith('/form')) {
            if (folder.name === 'primitives') {
              const primitiveNames = [
                'character-count',
                'error',
                'field',
                'fieldset',
                'helper-text',
                'indicator',
                'label',
                'legend',
              ];
              primitiveNames.forEach((componentName) => {
                components[`form-${componentName}`] = componentPath;
              });
            } else if (folder.name === 'layout') {
              components[`form`] = componentPath;
            } else {
              components[`form-${folder.name}`] = componentPath;
            }
          } else if (baseDir.endsWith('/layouts')) {
            if (folder.name === 'app-frame') {
              components[`${folder.name}`] = componentPath;
            } else {
              components[`layout-${folder.name}`] = componentPath;
            }
          } else if (baseDir.endsWith('/link')) {
            components[`link-${folder.name}`] = componentPath;
          } else if (baseDir.endsWith('/stepper')) {
            // The components/stepper/indicator page contains both the Stepper::Step::Indicator and Stepper::Task::Indicator
            if (folder.name === 'indicator') {
              components[`stepper-step-${folder.name}`] = componentPath;
              components[`stepper-task-${folder.name}`] = componentPath;
            } else {
              components[`stepper-${folder.name}`] = componentPath;
            }
          } else {
            components[folder.name] = componentPath;
          }
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

const convertComponentNameFormat = (componentName) => {
  const twoLevelComponentNames = ['copy', 'form', 'layout', 'link', 'stepper'];
  const threeLevelComponentNames = [
    'stepper-step-indicator',
    'stepper-task-indicator',
  ];
  if (
    twoLevelComponentNames.includes(componentName.split('-')[0]) &&
    componentName != 'form'
  ) {
    let words = componentName
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    if (threeLevelComponentNames.includes(componentName)) {
      return words.join('::');
    } else {
      return words[0] + '::' + words.slice(1).join('');
    }
  } else {
    return componentName
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
};

const extractComponentChangelogEntries = (components, lastVersionContent) => {
  const componentChangelogEntries = {};

  Object.keys(components).forEach((componentName) => {
    const formattedComponentName = convertComponentNameFormat(componentName);
    const regex = new RegExp(`^\`${formattedComponentName}\` - .*$`, 'gm');
    const matches = lastVersionContent.match(regex);
    if (matches) {
      componentChangelogEntries[componentName] = matches;
    }
  });

  return componentChangelogEntries;
};

const updateComponentVersionHistory = (componentChangelogEntries, version) => {
  Object.keys(componentChangelogEntries).forEach((componentName) => {
    const versionHistoryPath = `${allComponentsPath[componentName]}/partials/version-history/version-history.md`;
    let versionHistoryContent = '';

    if (fs.existsSync(versionHistoryPath)) {
      versionHistoryContent = fs.readFileSync(versionHistoryPath, 'utf8');
    } else {
      fs.mkdirSync(
        `${allComponentsPath[componentName]}/partials/version-history`,
        { recursive: true },
      );
    }

    // for each entry, remove the component name and keep only the description (assuming the "`ComponentName` - Description" format)
    const newEntries = componentChangelogEntries[componentName]
      .map((entry) => {
        // If the component is a form primitive, we want to keep the component name in the description
        if (
          allComponentsPath[componentName] ===
            './docs/components/form/primitives' ||
          allComponentsPath[componentName] === './docs/components/form/layout'
        ) {
          return entry;
        } else {
          return entry.split(' - ')[1];
        }
      })
      .join('\n\n');
    // prevent duplicate sections if the script is called multiple times
    if (!versionHistoryContent.includes(newEntries)) {
      if (versionHistoryContent.includes(`## ${version}`)) {
        // If the version already exists, append the new entries to that section
        versionHistoryContent = versionHistoryContent.replace(
          `## ${version}\n\n`,
          '',
        );
      }
      const newHeading = `## ${version}\n\n${newEntries}\n\n${versionHistoryContent}`;
      fs.writeFileSync(versionHistoryPath, newHeading, 'utf8');
    }
  });
};

const updateComponentFrontMatter = (componentChangelogEntries, version) => {
  Object.keys(componentChangelogEntries).forEach((componentName) => {
    const indexPath = `${allComponentsPath[componentName]}/index.md`;

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
const copyComponentPaths = getComponentPaths('./docs/components/copy');
const formComponentPaths = getComponentPaths('./docs/components/form');
const linkComponentPaths = getComponentPaths('./docs/components/link');
const stepperComponentPaths = getComponentPaths('./docs/components/stepper');
const tableComponentPaths = getComponentPaths('./docs/components/table');
const layoutComponentPaths = getComponentPaths('./docs/layouts');
const overrideComponentPaths = getComponentPaths('./docs/overrides');
const utilityComponentPaths = getComponentPaths('./docs/utilities');
const allComponentsPath = {
  ...componentPaths,
  ...copyComponentPaths,
  ...formComponentPaths,
  ...linkComponentPaths,
  ...stepperComponentPaths,
  ...tableComponentPaths,
  ...layoutComponentPaths,
  ...overrideComponentPaths,
  ...utilityComponentPaths,
};

// Read the main changelog entry for components
const changelogContent = readChangelogContent(
  './docs/whats-new/release-notes/partials/components.md',
);
// Extract the changelog for current version
const currentVersionContent = extractVersion(changelogContent, version);

// Extracts changelog entries for each components
const componentChangelogEntries = extractComponentChangelogEntries(
  allComponentsPath,
  currentVersionContent,
);

// Add changelog entries for each updated component
updateComponentVersionHistory(componentChangelogEntries, version);

// Check if the current version is a new minor version
if (isNotPatchVersion(version)) {
  // Clean previous front matter status for all components
  cleanComponentFrontMatter(allComponentsPath, version);
}

// Update front matter for each updated component
updateComponentFrontMatter(componentChangelogEntries, version);
