## How to implement the theme selector

Add theme options using [Dropdown checkmark list items](/components/dropdown#selection-listitems) to your existing user menu in [the App Header](/components/app-header). 

To update the theme, use the `setTheme` method from the [Theming service](/theming/hds-theming). This conditionally applies the appropriate classes on the `<html>` element. The theme should persist across sessions.

Connect each option to the theming service so selection updates the theme immediately, and persist the selected preference in the method best suited for your application. In this example, the preference is stored in `localStorage`. 

For more information on theming, see [the Theming overview](/foundations/theming).

This example shows an application that has fully migrated to the "carbonized" HDS, so it only offers the `system`, `light`, and `dark` themes. While an application is [still migrating](/foundations/theming?tab=code#migrating), it can also offer the "classic" HDS appearance by adding a `default` option (the "HashiCorp theme" in the [guidelines](?tab=guidelines#options)).

[[code-snippets/theme-selector theming=false]]
