/* eslint-disable no-undef */
// "classic" HDS
app.import('node_modules/@hashicorp/design-system-components/dist/styles/@hashicorp/design-system-components.css');

// "carbonized" HDS with support for "light/dark/system" (g0/g100 modes)
app.import('node_modules/@hashicorp/design-system-components/dist/styles/@hashicorp/themed-tokens/with-css-selectors/tokens.css');
app.import('node_modules/@hashicorp/design-system-components/dist/styles/@hashicorp/design-system-components-common.css');
app.import('node_modules/@hashicorp/design-system-components/dist/styles/@hashicorp/design-system-plex-fonts.css');

// "classic" HDS + "carbonized" HDS with support for "light/dark/system" (g0/g100 modes)
// useful during the migration from "classic" to "carbonized" HDS, when both visual languages must co-exist in the same UI application
app.import('node_modules/@hashicorp/design-system-components/dist/styles/@hashicorp/themed-tokens/with-css-selectors--migration/tokens.css');
app.import('node_modules/@hashicorp/design-system-components/dist/styles/@hashicorp/design-system-components-common.css');
app.import('node_modules/@hashicorp/design-system-components/dist/styles/@hashicorp/design-system-plex-fonts.css');

// "classic" HDS + "carbonized" HDS with support for "light/dark/system" (g0/g10/g90/g100 modes)
// useful if all the IBM Carbon modes need to be available in the application, alongside the "classic" HDS
app.import('node_modules/@hashicorp/design-system-components/dist/styles/@hashicorp/themed-tokens/with-css-selectors--advanced/tokens.css');
app.import('node_modules/@hashicorp/design-system-components/dist/styles/@hashicorp/design-system-components-common.css');
app.import('node_modules/@hashicorp/design-system-components/dist/styles/@hashicorp/design-system-plex-fonts.css');
