## How to implement the language selector

!!! Warning

**Consumer responsibility**

While HDS components support [internationalization](/getting-started/for-engineers#internationlization), the technical implementation and translations are the responsibility of consumers.
!!!

### Basic implementation

Use the [Dropdown](/components/dropdown) to create the language selector in [the App Header](/components/app-header). Connect the selection to your i18n implementation by switching locales, loading translated content, and persisting the user's preference.

[[code-snippets/language-selector]]
