# Changelog authoring best practices

While best practice guidelines are provided, clarity is most important, so use your best judgement. 

## Content structure

### Component changes

For component changes, place the component name first and enclosed in backticks (`), followed by a dash (-), then a brief summary.

| Do | Dont |
|:---|:-----|
| `Hds::Dropdown` - changed the `@height` property to use `max-height` instead of a fixed height.  | Changed the `@height` property in `Hds::Dropdown` to use `max-height` instead of a fixed height. |

### New icons

For icons, given that we often release multiple icons at once, we recommend using a nested list when 3+ icons are added since lists are easier to scan. When 1 or 2 icons are added, we recommend keeping the structure consistent with the list entries, like so: "Added `icon-name` icon."

Icon names should be enclosed in backticks (`) and use the Ember value.

| Do | Dont |
|:---|:-----|
| Added a new set of service icons: <ul><li>`twitter-x`</li><li>`twitter-x-color`</li><li>`aws-cdk`</li><li>`aws-cdk-color`</li><li>`jfrog`</li><li>`jfrog-color`</li></ul> | `twitter-x`, `twitter-x-color`, `aws-cdk`, `aws-cdk-color`, `jfrog`, and `jfrog-color` icons added. |

| Do | Dont |
|:---|:-----|
| Added `vault-secrets` and `vault-secrets-color` icons. | `vault-secrets` and `vault-secrets-color` icons added. |

### Breaking changes

For breaking changes, add “⛔️ **Breaking change** - ” after the component name/before the summary. Be sure to include relevant details about why this is a breaking change and what needs to be done on the consumer side in order to upgrade to this version.

| Do | Dont |
|:---|:-----|
| `Hds::Dropdown::ListItem` - ⛔️ **Breaking change** - Renamed internal CSS classes as follows: <ul><li>`hds-dropdown-list-item–copy-item` -> `hds-dropdown-list-item–variant-copy-item`</li><li>`hds-dropdown-list-item–description` -> `hds-dropdown-list-item–variant-description`</li><li>`hds-dropdown-list-item–generic` -> `hds-dropdown-list-item–variant-generic`</li><li>`hds-dropdown-list-item–interactive` -> `hds-dropdown-list-item–variant-interactive`</li><li>`hds-dropdown-list-item–separator` -> `hds-dropdown-list-item–variant-separator`</li><li>`hds-dropdown-list-item–title` -> `hds-dropdown-list-item–variant-title`</li></ul><br/>Note: If test assertions are relying on these class names, tests will fail. If extensions/overrides have been applied to these classes, they will suffer visual changes. | Renamed `Hds::Dropdown::ListItem` internal CSS classes. |

## Referencing components or tokens

When referencing components, use the full Ember component name, e.g. `Hds::Accordion`. All components or token names, including those in the summary, should be enclosed in backticks (`).

## Writing a clear summary

- The summary should be short, clear, and descriptive enough to be helpful.
- Use complete sentences.
- Use past tense.
- Summaries should always end with a period.
- Use consistent terms for different types of changes: 
    - Bugfix: “Fixed”
    - New component, token, variant: “Added”
    - Update: “Changed”, “Refactored”
    - Removed or deleted: “Removed”
    - Others: “Upgraded”, “Reduced”, “Prevented”
- If there are multiple changes for one element, use a nested list instead of a long paragraph of text.
- Use a nested list if additional details or notes are necessary.

## Template

Copy and paste this template and adjust as necessary when creating a new [changeset](https://github.com/hashicorp/design-system#changesets).

```
- **`{component-name}`** - Fixed {...additional details}.
- **`{component-name}`** - Added {...additional details}.
- **`{component-name}`** - Changed {...additional details}.
- **`{component-name}`** - Upgraded {...additional details}, including:
    - `{package-name}` from `{version number}` to `{version number}`.
    - `{package-name}` from `{version number}` to `{version number}`.
    - `{package-name}` from `{version number}` to `{version number}`.
```
### Example outputs
These examples are just outputs of the details provided as a part of the changeset. They do not include the PR links or contributors, which are added automatically.

- **`Hds::TooltipButton`** - Added `text-align: inherit` to the “button” element.
- **`Hds::Dropdown`** - Fixed a few accessibility failures, including:
    - Added `aria-hidden` to the separator
    - Added `role=“none”` to the checkbox `<li>`
- **`Hds::Table`** - Changed `height` to `min-height` for the table head cells and updated the cells' internal padding to align with the design specs in Figma.
- **`Hds::Sidenav::Link`** - Fixed an issue resulting in an empty node.
    - This will lead to a minimal visual impact on some edge cases of `Hds::Alert` and `Hds::Toast` (multiple description items) and `Hds::Sidenav` (text and generic content).
- **`Hds::Link::Standalone`** - Increased the space between the actions to 16px and reduced the size of the icon in the small variant to 12px.
- **`Hds::Modal`** and **`Hds::Flyout`** - Fixed the scroll management resulting in stray `style` attribute on the `<body>` element.
- Updated the CSS of multiple components to use flex `gap`.
- Upgraded Ember.js to the latest stable release 4.12, including upgrades to:
    - `ember-auto-import` from `2.6.0` to `2.6.3`
    - `ember-cli-htmlbars` from `6.1.0` to `6.2.0`
- Upgraded the following dependencies:
    - `ember-focus-trap` from `1.0.1` to `1.0.2`
    - `ember-keyboard` from `8.1.0` to `8.2.0`
    - `ember-truth-helpers` from `3.0.0` to `3.1.1`
    - `sass` from `1.58.3` to `1.62.1`
- Shifted our support version of Node.js from `12.* || 14.* || >= 16` to `14.* || 16.* || >= 18`
