---
name: add-release-notes
description: "Update release notes prior to a release of the @hashicorp/design-system-components package"
---

## Context

This skill provides instructions on how to update changelogs and website docs with release notes prior to a release of the `@hashicorp/design-system-components` package from `packages/components`. It is to be run on the `changeset-release/main` branch prior to the PR for that branch being merged to trigger a release.

## Non-negotiables

- Do not run this skill on any branch except for `changeset-release/main`
- Do not push any changes to the git remote

## Procedure

1. Review changelog entries
  - In `packages/components/CHANGELOG.md` review all of the entries related to components in the upcoming release to ensure they follow the rules listed in `.bob/rules/directories/components/changeset.instructions.md`
  - Check that all of the `<!-- START {components/path} -->` paths match those component's docs path in `website/docs`
  - Raise any issues caught with the user and wait for their response to proceed

2. Update the components package release notes
  - Determine the new package release version number from `packages/components/package.json`
  - Open `packages/components/CHANGELOG.md`
  - Add a link to the upcoming components package release after the heading for that release
    - Example: `[X.Y.Z documentation](https://hds-website-X-Y-Z.vercel.app/)`
  - In the root of the repo, run `pnpm --filter website run generate-changelog-markdown-files`
    - This will copy content from `packages/components/CHANGELOG.md` to `website/docs/whats-new/release-notes/index.md`
  - Make a commit with these changes with the message `Chore: Add link to X.Y.Z docs`.

3. Update website version history and release badges for changed components
  - In the root of the repo, run `pnpm --filter website run generate-component-changelog-entries`
    - This will copy relevant changelog entries for each component from the main `packages/components/CHANGELOG.md` to `website/docs/components/[component-name]/partials/version-history/version-history.md`
    - It will update the frontmatter:
      - Removes any previous badges if the new release is a minor or major release.
      - Sets the current version in `status.updated` for each changed component.
  - Review each changed component doc:
    - Check all entries have been copied to the component's `version-history.md` file
      - If a component's `version-history.md` file was newly created, add a new section into the `index.md` file
        ```
          <section data-tab="Version history">
            @include "partials/version-history/version-history.md"
          </section>
        ```
    - If a component is new for this release, change `status.updated` to `status.added` in `index.md` frontmatter.
  - Make a commit with these changes with the message `Chore: Update badges and website history of components`.