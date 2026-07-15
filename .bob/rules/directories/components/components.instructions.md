---
applyTo: "packages/components/src/components/hds/**"
description: "Instructions for how components should be built and used."
---

### Component file structure

All component files for a given `component-name` should be contained in a folder under `packages/components/src/components/hds/` with the path `packages/components/src/components/hds/component-name/`.

#### Required files
- `index.gts` - Primary entry point for the component, exporting the main component class, types, and template.

#### Supplemental files
- `types.ts` - TypeScript types for the component's arguments and blocks.
- `{subcomponent-name}.gts` - Entry point for subcomponents, exporting the main subcomponent class, types, and template.

### Code formatting

#### Arguments
- Define all arguments in the `Args` interface.
- Use camelCase for argument names.
- Use the `argument?: type` syntax.

#### Class names
- Use the `hds-<component-name>` prefix for all class names in component template files, TS functions, and SCSS files.
- Use BEM methodology for class names, where the block is the component name, elements are separated by double underscores (`__`), and modifiers are separated by double dashes (`--`).
  - Good examples
    - `hds-component-name__element--modifier`
    - `hds-component-name__title`
    - `hds-component-name--color-primary`
  - Bad examples
   - `hds-component-name-element`
   - `hdsComponentName`
- Use a consistent naming structure throughout all of a component's files.

### Styling

All styles for a component should be defined in its corresponding SCSS file under `packages/components/src/styles/components/`. See `.bob/rules/languages/scss.instructions.md` for further instructions on scss standards.

#### Required files
- `{component-name}.scss` - Main SCSS file for the component, containing styles for the component.
- `{component-name}/index.scss` - Main SCSS file for the component, importing any subcomponent styles from files in the same folder.

### Translations

**Note:** Any UI text in a component must be defined as a translation string, and not hardcoded in the component template or class. See `translations.instructions.md` for instructions on how to define and reference translation strings.

### Exports and registration

**Note:** All components must be exported in `src/components.ts` and registered in `src/template-registry.ts` for use in consuming Ember applications. See `exports.instructions.md` for instructions on how to export and register components.
