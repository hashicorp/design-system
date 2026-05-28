---
applyTo: "packages/components/translations/**"
description: "Instructions for how translation files should be structured and used."
---

### Translations
- Any UI text in a component must be defined as a translation string in the `packages/components/translations/hds` folder under a file with the same path as the component. No hardcoded text should be used in component templates or classes.
- In the `packages/components/translations/hds/components/<component-name>/en-us.yaml` file, define the translation strings as follows:
  ```yaml
  string-key: "Translation string value"
  ```
  **Note**: For sub-components `packages/components/src/components/hds/<component-name>/<sub-component-name>.gts`, the translation file path should be `packages/components/translations/hds/components/<component-name>/<sub-component-name>/en-us.yaml`, and the translation strings in that file should also use root-level keys because the namespace comes from the file path.
- Reference translation strings in the component template using the `hdsT` helper or in the component class functions using the `HdsIntlService`.
  ```hbs
  <div class="hds-component-name">
    {{hdsT "hds.components.component-name.string-key"}}
  </div>
  ```
  ```ts
  @service declare readonly hdsIntl: HdsIntlService;

  get someText(): string {
    return (
      this.hdsIntl.t('hds.components.component-name.string-key', {
        default: 'Translation string value',
      })
    );
  }
  ```

### Best practices
- Use kebab case for translation string keys, and group them by component and subcomponent.
- Use descriptive keys that indicate where the string is used in the component.
