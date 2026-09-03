Use the theme selection pattern to provide users with a method to switch the application's visual theme between supported options. Theme selection is accessed from the existing User dropdown in the [App Header](/components/app-header)'s `utilityActions` and does not require a new top-level utility control.

![An example of the open user settings menu in the App Header with available theme selection options.](/assets/patterns/theme-selection/theme-selection.png)

In Ember applications, a [theme service (insert link here)](#) is provided to handle switching the theme based on the selected option.

## Placement

Place theme options as a new section within the User dropdown or settings menu in the [App Header](/components/app-header) after the existing account-level actions (Account settings, Sign out).

## Components

Compose the theme section within the settings menu with these [Dropdown](/components/dropdown) List Item components:

- **Separator**: adds visual differentiation between the theme selection and the account actions and settings.
- **Title**: section label; set the text to "Theme"
- **Checkmark**: one instance per theme option; includes a leading icon and accounts for the selected state

## Options

Use a [Checkmark List Item](/components/dropdown#selection-listitems) with a leading icon that best corresponds with the visual appearance of the theme for each theme option. Common examples include:

| Option          | Leading icon | Notes                                                            |
| --------------- | ------------ | ---------------------------------------------------------------- |
| HashiCorp theme | `hashicorp`  | Sets the theme to the HashiCorp Helios theme                     |
| System theme    | `monitor`    | Reflects the operating system's current light or dark preference |
| Light theme     | `sun`        | Sets light mode regardless of OS setting                         |
| Dark theme      | `moon`       | Sets dark mode regardless of OS setting                          |

## System theme detection

When a user selects the System theme option, the application should automatically match the user's operating system light or dark preference. This means the theme will update without any additional interaction from the user — if they switch their OS appearance from light to dark while the application is open, the theme should reflect that change immediately.

The [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) CSS media query is the standard mechanism for reading this preference and is what is used under the hood by the theme service provided by the design system.

## Persistence

When a user selects a theme, persisting that choice ensures they don't have to re-select it the next time they open the application. Storing the preference in `localStorage` or a user profile is the most common way to achieve this. Without persistence, the application will fall back to its default theme on every page load, which creates an inconsistent and potentially disruptive experience, particularly for users who rely on dark mode for accessibility or comfort reasons.
