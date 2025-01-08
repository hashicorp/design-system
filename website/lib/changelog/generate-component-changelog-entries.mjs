import fs from 'fs';

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
          components[folder.name] = componentPath;
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
  return componentName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
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
        { recursive: true }
      );
    }

    // prevent duplicate sections if the script is called multiple times
    if (!versionHistoryContent.includes(`## ${version}`)) {
      const newEntries = componentChangelogEntries[componentName].join('\n\n');
      const newHeading = `## ${version}\n\n${newEntries}\n\n${versionHistoryContent}`;
      fs.writeFileSync(versionHistoryPath, newHeading, 'utf8');
    }
  });
};

// Extract current version
const version = readVersionFromPackageJson(
  '../packages/components/package.json'
);

// Determine component paths
const componentPaths = getComponentPaths('./docs/components');
const formComponentPaths = getComponentPaths('./docs/components/form');
const allComponentsPath = { ...componentPaths, ...formComponentPaths };

// Read the main changelog entry for components
const changelogContent = readChangelogContent(
  './docs/whats-new/release-notes/partials/components.md'
);
// Extract the changelog for current version
const currentVersionContent = extractVersion(changelogContent, version);

// Extracts changelog entries for each components
const componentChangelogEntries = extractComponentChangelogEntries(
  allComponentsPath,
  currentVersionContent
);

// Add changelog entries for each component
updateComponentVersionHistory(componentChangelogEntries, version);
