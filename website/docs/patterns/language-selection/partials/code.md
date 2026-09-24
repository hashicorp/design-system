!!! Warning

**Consumer responsibility**

While HDS components support [internationalization](/getting-started/for-engineers#internationlization), the technical implementation and translations are the responsibility of consumers.
!!!

### Basic implementation

Use the [Dropdown](/components/dropdown) to create the language selector in [the App Header](/components/app-header). Connect the selection to your i18n implementation to manage the current language. This example uses [`ember-intl`](https://github.com/ember-intl/ember-intl) to set and store the user's preferred language. 

[[code-snippets/language-selector]]
