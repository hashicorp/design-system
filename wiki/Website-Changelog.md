# Changelog authoring best practices

- [Tips for writing consistent changelog entries](#tips-for-writing-consistent-changelog-entries)
  - [General guidance](#general-guidance)
  - [Consistent terminology](#consistent-terminology)
  - [Component references](#component-references)
  - [Content formatting](#content-formatting)
    - [Component changes](#component-changes)
    - [New icons](#new-icons)
- [Templates](#templates)
  - [Templates for npm packages](#templates-for-npm-packages)
  - [Templates for Figma changelog entries](#templates-for-figma-changelog-entries)

---

## Tips for writing consistent changelog entries

### General guidance
- Changelog entries should always start with a paragraph (not a list).
- Consider using a list instead of a long paragraph of text to communicate multiple changes for one element.
- If there are changes to multiple components in the same entry, each change should be described in a new paragraph (and a list of details, if needed).
- If you need to include a note (like a migration tip), add it to the bottom of the entry in a new paragraph. If you need to draw more attention to the note, consider using emphasized text.
- Entries should use complete sentences but be short, clear, and descriptive enough to be helpful.
- Use past tense.
- Entries should always end with a period.

### Consistent terminology
- Use consistent terms for different types of changes: 
  - Bugfix: “Fixed”
  - New component, token, variant: “Added”
  - Update: “Changed”, “Refactored”
  - Removed or deleted: “Removed”
  - Other possible cases: “Upgraded”, “Reduced”, “Prevented”
 
### Component references
- When referencing components, use the plain-text component name, e.g., `Accordion`.
- All components or token names, including those in the summary, should be enclosed in backticks (`).

### Content formatting

While best practice guidelines are provided, clarity is most important, so use your best judgment. 

#### Component changes

For component changes, place the component name first and enclose it in backticks (`), followed by a dash (-), and then a brief summary.

| Do | Dont |
|:---|:-----|
| `Dropdown` - changed the `@height` property to use `max-height` instead of a fixed height.  | Changed the `@height` property in `Dropdown` to use `max-height` instead of a fixed height. |

#### New icons

For icons, use a comma-separated list instead of a bulleted list and start with the icon values. Icon names should be enclosed in backticks (`) and use the Ember value.

| Do | Dont |
|:---|:-----|
| `twitter-x`, `twitter-x-color`, `aws-cdk`, `aws-cdk-color`, `jfrog`, and `jfrog-color` icons added. | Added a new set of service icons: <ul><li>`twitter-x`</li><li>`twitter-x-color`</li><li>`aws-cdk`</li><li>`aws-cdk-color`</li><li>`jfrog`</li><li>`jfrog-color`</li></ul> | 

---

## Templates

### Templates for npm packages

Copy and paste this template and adjust as necessary when creating a new [changeset](https://github.com/hashicorp/design-system#changesets). _Replace all elements in brackets._

#### Simple entry
```
`{component-name}` - Fixed {...additional details}.
```

#### Multiple changes per element
```
`{component-name}` - Changed {...additional details}, including:
- {change 1}
- {change 2}
- etc

_{additional details}..._
```

#### Multiple elements changed
```
`{component-#1-name}` - Changed {...additional details}, including:
- {change 1}
- {change 2}

`{component-#2-name}` - Refactored {...additional details}

_{...important details}_
```

<details>
  <summary><h4>Example outputs for npm packages</h4></summary>
  <i>These examples are just outputs of the details provided as a part of the changeset. They do not include the PR links or contributors, which are added automatically.</i>
  <br/><br/>
  
  `TooltipButton` - Added `text-align: inherit` to the “button” element.
  
  `Dropdown` - Fixed a few accessibility failures, including:
  - Added `aria-hidden` to the separator,
  - Added `role=“none”` to the checkbox `<li>`.
    
  `Table` - Changed `height` to `min-height` for the table head cells and updated the cells' internal padding to align with the design specs in Figma.
  
  `Sidenav Link` - Fixed an issue resulting in an empty node.
  - This will lead to a minimal visual impact on some edge cases of `Alert` and `Toast` (multiple description items) and `Sidenav` (text and generic content).
  
  `Standalone Link` - Increased the space between the actions to 16px and reduced the size of the icon in the small variant to 12px.
  `Modal` and `Flyout` - Fixed the scroll management resulting in stray `style` attribute on the `<body>` element.
  Updated the CSS of multiple components to use flex `gap`.
  Upgraded Ember.js to the latest stable release 4.12, including upgrades to:
  - `ember-auto-import` from `2.6.0` to `2.6.3`
  - `ember-cli-htmlbars` from `6.1.0` to `6.2.0`
  
  Upgraded the following dependencies:
  - `ember-focus-trap` from `1.0.1` to `1.0.2`
  - `ember-keyboard` from `8.1.0` to `8.2.0`
  - `ember-truth-helpers` from `3.0.0` to `3.1.1`
  - `sass` from `1.58.3` to `1.62.1`
  
  Shifted our support version of Node.js from `12.* || 14.* || >= 16` to `14.* || 16.* || >= 18`
</details>

### Templates for Figma changelog entries

Entries made for the Figma Components and Foundations UI Kits require a few additional steps.

1. After publishing changes in Figma, copy and pasted the appropriate template into the relevant changelog file in the components package; either `packages/components/CHANGELOG-FIGMA-{COMPONENTS or FOUNDATIONS}` depending on what library the change was made in.
2. If the change in Figma has corresponding changes in code or requires an update to the documentation, the changelog entry can be added in the same PR as the rest of the changes. Otherwise, if the change only pertains to Figma and does not result in a documentation change, open a new PR to add a changelog entry.
3. Replace all elements in brackets with the specific component or style/token name.

#### Simple entry
```
### {month day, year}

`{component-name}` - Fixed {...additional details}.
```

#### Multiple changes per element
```
### {month day, year}

`{component-name}` - Changed {...additional details}, including:
- {change 1}
- {change 2}
- etc

_{additional details}..._
```

#### Breaking changes
```
### {month day, year}

#### Breaking change

`{component-name}` - Changed {...additional details}.

_{additional details}..._
```

<details>
  <summary><h4>Example outputs for Figma changes</h4></summary>

  <h3>September 15, 2023</h3>

  `SegmentedGroup` - Updated the following:
  - Fixed a bug that created an “inception” style loop of the inheritance between the published component library and the local components.
  - Added more straightforward support for the focus state of the Select component when nested within a SegmentedGroup.
  
  `Select` - Updated the focus state to bring consistency in how the `Select` and the other form controls account for this interactive state.

  <h4>Breaking change</h4>
  
  `Dropdown` - Refactored the component to utilize new Figma functionality and added the following new features:
  - Added ListItem variants: Checkmark, Checkbox, Radio.
  - Updated positioning options from Left and Right to Top left, Top right, Bottom left, Bottom right.
  - Improved accessibility on ToggleIcon by adding a border to indicate interactivity better.
  - Added small variants of the ToggleButton and ToggleIcon.
  - Added a Header and Footer to the List.
  - Added the ability to set a fixed height on the List resulting in the use of a scrollbar for longer lists.
</details>