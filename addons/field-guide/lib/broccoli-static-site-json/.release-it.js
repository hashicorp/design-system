module.exports = {
  git: {
    changelog: 'npx auto-changelog --template changelog.template --unreleased-only --stdout --load-github-issue-data --github-cache-dir .changelog',
  },
  hooks: {
    'after:bump': 'npx auto-changelog --template changelog.template --unreleased-only --prepend --load-github-issue-data --github-cache-dir .changelog --package',
  },
  github: {
    release: true,
  }
};