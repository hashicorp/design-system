---
name: styling-audit
description: "Audit existing components and style to determine which will not respond to the implementation of theming"
---

## Context

This skill provides instructions on creating an audit of an application's components and styling to determine what components or styles will not respond to the implementation of theme support from `@hashicorp/design-system`.

### Theming support

The `@hashicorp/design-system` package supports multiple themes for its components and styles. A consumer can set a given theme for their application and all components and tokens in the library will automatically update to the appropriate styles based on the active theme.

- All `Hds::` components automatically respond to theming
- All library tokens of the format `--hds-` respond to theming
  - The only exception are `--hds-core-` tokens which are core values and not intended to be used by consumers

## Goal

Produce an audit, in the form of an `.md` document, that documents the component styles, global styles, and component features that will need to be changed in order to be themable.

## Unthemable content

All of the following items will not respond to theming:

- Inline styles using the `ember-style-modifier`
- Hard-coded CSS values
- CSS variables without the `--hds-` prefix
- CSS variables with the `--hds-core` prefix
  - These are internal tokens to the design system library and should not be used by consumers
- Sass variables not resolving to a `--hds-` CSS variable

### CSS properties to watch

Only the following styles need to be reviewed according to the rules listed above.

- Color
  - `background`
  - `background-color`
  - `color`
  - `border-color`
- Typography
  - `font-family`
  - `font-size`
  - `font-weight`
  - `line-height`
- Sizing
  - `border-radius`

### Styling to ignore

- CSS properties
  - Ignore all `height`, `width`, `padding`, `margin`, and `border-width`
  - Ignore when `none` or `transparent` is used as a hard-coded value for colors
  - Ignore when `border-radius` is set to 0
- Class usage
  - Do not review usage of any HDS helper classes on HTML elements of the format `.hds-`
- CSS and Sass variables
  - Ignore CSS or Sass variables which ultimately resolve to a CSS variable of the format `--hds-`

## Procedure

1. Gather scope from user
  - Required inputs from user
    - Scope of review, what components and styles to review
    - Path to available components
    - Path to available styles
    - Location to create the audit results document

2. Review CSS / SCSS files
  - For every `css` or `scss` file within scope, search for any unthemable styles as outlined above
  - Take note of the CSS selector attached to each unthemable style

3. Review component files
  - For every `gts`, `ts`, `js`, `hbs`, `css`, and `scss` file in scope for the components, search for any unthemable content as outlined above
  - Take note of which components contain unthemable content

4. Create an audit document outlining the results found, following the format listed below

## Audit format

Follow the structure below for the audit of the findings

### Overview

Summary of findings. Overall assessment of the level of content that is not themable

- Number of total issues
- Number of files with issues
- Percentage of files with issues out of the total number assessed

### Theme-readiness

#### Usage

If evaluating components, for components with issues, search through the entire application for their usage in other components and templates. Determine which components are used the most often, and thus the most high impact.

```markdown
| Component | Number of instances | Number of issues |
| --------- | ------------------- | ---------------- |
| card-container | 4 | 3 |
```

#### Number of issues

Provide a list of the top least theme-ready components or files

```markdown
| Component | Number of issues |
| --------- | ------------------- |
| card-container | 4 |
```

### Recommended remediation strategy

Based on all of the available findings, group them into similar areas and come up with a series of tasks that could be completed to fix the issues.

Order the steps based on perceived priority. Create an action plan for remediating the issues.

### Report

For each file with an issue, generate a markdown table outlining the issues. If the file contains more than 10 issues instead of listing all of them, provide a summary and indicate that there are additional issues not shown.

The markdown table should be compact with this structure:

```markdown
| Element | Unthemable styles | Notes |
| ------- | ----------------- | ----- |
| card-container | background-color, font-family | hard-coded values, usage of `--hds-core` variable |
```