## Usage

### When to use

- Provide consistent global navigation across an application.
- Offer quick access to important utilities such as user settings, help, and search.
- Establish a clear visual hierarchy and brand presence at the top of the application.

### When not to use

- To navigate within subpages of an organization or project, use the [App Side Nav](/components/app-side-nav) instead.

## Navigation hierarchy

The App Header provides consistent navigation between global application areas, such as organizations and projects, while facilitating easy access to utilities like support and user settings.

In the hierarchy of navigational elements, the App Header sits at the top and is followed by:

- The [App Side Nav](/components/app-side-nav), which focuses on contextual pages and subpages within a project or organization.
- The [App Footer](/components/app-footer), which focuses on non-essential metadata and general links.

![Example of the hierarchy of navigation elements](/assets/components/app-header/app-header-hierarchy.png)

## Global navigation

### Home link

The home link gives users quick, consistent access to the application's home page or dashboard.

For cloud products, the icon should always be `hcp`. For standalone or open-source products, it should be the product’s service icon; e.g., `terraform`.

![Examples of the Home link using different logos](/assets/components/app-header/app-header-home-link.png)

#### Text

The home link supports an optional `text` property to more explicitly title an application. We recommend using this property sparingly as it's often unnecessary to title a HashiCorp application in such an explicit manner.

![Example of text displayed in the Home Link that reads Admin UI](/assets/components/app-header/app-header-home-link-text.png)

### Context switcher

!!! Info

This element only exists in Figma. For implementation in code, use the HDS [Dropdown](/components/dropdown) or, if necessary, create your own custom component styled after the Dropdown.
!!!

The context switcher allows users to switch between different global contexts within the product or application, such as navigating between different organizations or projects. 

![Context switcher within the App Header](/assets/components/app-header/app-header-context-switcher.png)

## Utility navigation

### Help dropdown

Use the help dropdown to provide users with access to support and helpful resources that can be easily accessible from anywhere within the application, e.g., links to the help center, documentation, or tutorials.

Avoid placing non-help-related links within the help dropdown menu.

![Help dropdown in the App Header](/assets/components/app-header/app-header-help-dropdown.png)

### User dropdown

The user dropdown gives users quick and easy access to their settings and preferences. The menu should contain links or actions related to the user's profile, settings, and/or preferences.

Avoid placing links to unrelated pages within the user dropdown menu.

![User dropdown in the App Header](/assets/components/app-header/app-header-user-dropdown.png)

### Search

Search within the App Header is triggered by a standard HDS [Button](/components/button) themed to match the App Header’s styles. The application teams are responsible for building search capabilities themselves, if and when needed.

![Search in the App Header](/assets/components/app-header/app-header-search.png)

## Sizes

The `Hds::AppHeader` component supports basic responsive behavior out of the box with a single breakpoint at 1088px. The Figma component offers two variants:

- `Large`: applicable for most desktop-sized viewports with a minimum width of 1088px.
- `Small`: applicable for most mobile and some tablet-sized viewports with a maximum width of 1088px.

![Large size of the App Header](/assets/components/app-header/app-header-size-large.png)

![Small size of the App Header](/assets/components/app-header/app-header-size-small.png)

## Menu

In the Ember component, the controls (context switcher, help/user dropdown, etc) contained within the App Header will collapse automatically into a vertical menu that can be toggled open and closed with the Menu button.

In Figma, we publish a separate Menu component for UIs and prototypes for smaller viewports.

![Example of the App Header menu at smaller viewports](/assets/components/app-header/app-header-menu.png)

### Responsive characteristics

By default (and if used within the App Frame), the App Header will occupy 100% of the viewport width. As the viewport width condenses, the components' controls will collapse into a menu that can be toggled open/closed with the menu button (shown conditionally based on the viewport width).

At smaller viewports, the menu containing the App Header controls will occupy 100% of the viewport height and prevent scrolling content on the main page.

## Usage in the App Frame

The App Header is intended to be used within the [App Frame](/layouts/app-frame) component (only supported in code), where a location is reserved for the component out of the box.

If you intend to use the App Header without the App Frame, contact the HDS team for assistance and guidance on implementation.

## Theme selection

Use the theme selection pattern to provide users with a method to switch the application's visual theme between supported options. Theme selection is accessed from the existing User dropdown in the App Header's `utilityActions` and does not require a new top-level utility control.

![An example of the open user settings menu in the App Header with available theme selection options.](/assets/components/app-header/app-header-theme-selection.png)

In Ember applications, a [theme service (insert link here)](#) is provided to handle switching the theme based on the selected option.

### Placement

Place theme options as a new section within the User dropdown or settings menu after the existing account-level actions (Account settings, Sign out).

### Components

Compose the theme section within the settings menu with these HDS components List Item components:

- **Separator**: adds visual differentiation between the theme selection and the account actions and settings.
- **Title**: section label; set the text to "Theme"
- **Checkmark**: one instance per theme option; includes a leading icon and accounts for the selected state

### Options

Use a Checkmark List Item with a leading icon that best corresponds with the visual appearance of the theme for each theme option. Common examples include:

| Option          | Leading icon | Notes                                                            |
| --------------- | ------------ | ---------------------------------------------------------------- |
| HashiCorp theme | `hashicorp`  | Sets the theme to the HashiCorp Helios theme                     |
| System theme    | `monitor`    | Reflects the operating system's current light or dark preference |
| Light theme     | `sun`        | Sets light mode regardless of OS setting                         |
| Dark theme      | `moon`       | Sets dark mode regardless of OS setting                          |

### System theme detection

When a user selects the System theme option, the application should automatically match the user's operating system light or dark preference. This means the theme will update without any additional interaction from the user — if they switch their OS appearance from light to dark while the application is open, the theme should reflect that change immediately.

The [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) CSS media query is the standard mechanism for reading this preference and is what is used under the hood by the theme service provided by the design system.

### Persistence

When a user selects a theme, persisting that choice ensures they don't have to re-select it the next time they open the application. Storing the preference in `localStorage` or a user profile is the most common way to achieve this. Without persistence, the application will fall back to its default theme on every page load, which creates an inconsistent and potentially disruptive experience, particularly for users who rely on dark mode for accessibility or comfort reasons.

## Language selection

!!! Warning

**Consumer responsibility**

While HDS components support [internationalization](/getting-started/for-engineers#internationlization), the technical implementation and translations are a consumer responsibility.
!!!

Use the language selection pattern to provide users with a method to switch the application's language from anywhere within the product without leaving their current page or context.

![An example of the open language selection menu in the App Header with a list of available language options](/assets/components/app-header/app-header-language-selection.png)

### Placement

Place the language selector in the App Header's utility actions section along with other similar application-level controls like user settings, help, and support, and more.

### Components

Compose the language selection pattern using these HDS components:

- **Dropdown ToggleIcon (icon only):** entry point for selecting a language from a list of options; use the `globe` icon to communicate internationalization.
- **Title List Item:** used as a section label within the list with the text set to "Language".
- **Checkmark List Item:** used to display the list of available languages and highlight the current or active language. One instance per supported language. Only one language can be active at a time.

### Language list format

Each list item displays the language in two forms (with the exception of English): the native language name first, followed by the English name in parentheses, e.g., "Español (Spanish)" or "日本語 (Japanese)". English is listed simply as "English".

### Default language

Avoid making assumptions about user preference based on factors outside of the application and default to English even when other languages and translations are available. HashiCorp products are built and documented in English, making it a logical default and fallback choice.

!!! Warning

**Avoid inferring language from geographic location**

Determining a user's language from their IP address or geographic region is unreliable. A user's location does not indicate their language preference. For example, a user in Germany may prefer English or Japanese.
!!!

### Persistence

When a user selects a language, persisting that choice ensures they won't have to re-select it the next time they open the application which can be disruptive. Storing the selection so that it is restored on the next visit ensures a consistent experience and signals to the user that their preference has been respected.

