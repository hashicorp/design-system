## Usage

### When to use

- Provide consistent global navigation across an application.
- Offer quick access to important utilities such as search, help, and user settings.
- Establish a clear visual hierarchy and brand presence at the top of the application.

### When not to use

- Navigate within subpages of an organization or project; instead, use the [Side Nav](/components/side-nav).

### Navigation hierarchy

The App Header provides consistent navigation between global application areas, such as organizations and projects, while facilitating easy access to utilities like support and user settings.

In the hierarchy of navigational elements, the App Header sits at the top and is followed by:

- The [Side Nav](/components/side-nav), which focuses on contextual pages and subpages within a project or organization.
- The [App Footer](/components/app-footer), which focuses on non-essential metadata and general links.

![Example of the hierarchy of navigation elements](/assets/components/app-header/app-header-hierarchy.png)

## Global navigation

### Home link

The Home Link gives users quick, consistent access to the application's home page or dashboard.

For cloud products, the icon should always be the `hcp`. For standalone or open-source products, it should be the product’s service icon (e.g. `terraform`).

![Examples of the Home link using different logos](/assets/components/app-header/app-header-home-link.png)

### Context switcher

The context switcher allows users to switch between different global contexts within the product or application, such as navigating between different organizations or projects. This element only exists in Figma. For implementation in code, use the HDS [Dropdown](/components/dropdown) or, if necessary, create your own custom component styled after the Dropdown.

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

Search within the App Header is triggered by a standard HDS [Button](/components/button) themed to match the App Header’s styles. The application teams are responsible for building search capabilities themselves.

![Search in the App Header](/assets/components/app-header/app-header-search.png)

## Sizes

The App Header supports basic responsive behavior out of the box with a single breakpoint at 1088px. The Figma component offers two variants:

- `Large`: applicable for most desktop-sized viewports with a minimum width of 1088px.
- `Small`: applicable for most mobile and some tablet-sized viewports with a maximum width of 1088px.

![Large size of the App Header](/assets/components/app-header/app-header-size-large.png)

![Small size of the App Header](/assets/components/app-header/app-header-size-small.png)

## Menu

In the Ember component, the controls (context switcher, help/user dropdown, etc) contained within the App Header will collapse automatically into a vertical menu that can be toggled open and closed with the Menu button.

In Figma, we publish a separate Menu component for UI’s and prototypes for smaller viewports.

![Example of the App Header menu at smaller viewports](/assets/components/app-header/app-header-menu.png)

### Responsive characteristics

By default (and if used within the App Frame), the App Header will occupy 100% of the viewport width. As the viewport width condenses, the components' controls will collapse into a menu that can be toggled open/closed with a menu button (shown conditionally based on the viewport width).

At smaller viewports, the menu containing the App Header controls will occupy 100% of the viewport height and prevent scrolling content on the main page.

## Usage in the App Frame

The App Header is intended to be used within the [App Frame](/layouts/app-frame) component (only supported in code), where a location is reserved for the component out of the box.

If you intend to use the App Header without the App Frame, contact the HDS team for assistance and guidance on implementation.
