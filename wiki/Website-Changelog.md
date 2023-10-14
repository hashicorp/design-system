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

- The summary should be short clear and descriptive enough to be helpful. 
- If there are multiple changes for one element, use a nested list instead of a long paragraph of text.
- If additional details or notes are necessary about a given change, use a nested list.
- Use past tense.
- Summaries should always end with a period.
- Use consistent terms for different types of changes: 
    - Bugfix: “fixed…”
    - New component, token, variant: “added…”
    - Update: “changed…”
- If **updated dependencies** are list starts with the 🔄 emoji; each dependency is added to a nested list.

## Examples

### npm packages

![Example of npm package changelog entry](/images/doc-npm-packages.png)

### Figma libraries

![Example of figma library changelog entry](/images/doc-figma-libraries.png)
