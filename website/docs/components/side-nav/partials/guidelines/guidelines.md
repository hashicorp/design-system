## Usage

### When to use

- To display the primary navigation of the application on a page.

### When not to use

- To move between views within the same context or page, consider [Tabs](#).

## Header

The navigation header displays persistent UI elements that give users quick access to important sections and resources within the application or platform.

### Home link

The home link gives users consistent and quick access to the application's main page or section. Generally, the home or dashboard.

For cloud products, the icon set should always be the HCP service icon. For standalone or open-source products, it should be the product’s service icon (e.g. terraform).

![Home link in side-nav's header](/assets/components/side-nav/header-logo.png)

### Help dropdown

Use the help dropdown to provide users with access to support and helpful resources that can be easily accessible from anywhere within the application—for example, links to the help center, documentation, or tutorials.

Avoid placing non-help related links or actions, such as user settings or navigation links.

![Help dropdown menu in side-nav's header](/assets/components/side-nav/help-dropdown.png)

### User dropdown

Use the user dropdown to give users quick and easy access to their settings and preferences. The menu should contain links or actions related to the user's profile, settings, and/or preferences. 

Avoid placing links to unrelated pages or actions, such as support or navigation items.

![User dropdown menu in side-nav's header](/assets/components/side-nav/user-dropdown.png)

## Body

The body consists of a group of sections with vertical lists of links to the most important parts of the application.

### List

#### With title

![Side-nav section with a title](/assets/components/side-nav/section-with-title.png)

#### Without title

![Side-nav section without a title](/assets/components/side-nav/section-without-title.png)

- A title could help users scan the sections and provide context about the links inside each section.

- Titles should be meaningful and related to the content within the section.

### List items

#### Without icon

![List items without icons](/assets/components/side-nav/list-item-without-icon.png)

#### With icon

![List items with icons](/assets/components/side-nav/list-item-with-icon.png)

- Use icons to help users recognize and scan the links they are paired with.
- We recommend only using icons in the main or top level navigation.
- Avoid overwriting color styles in icons.

!!! Do

![List items with correct use of icons](/assets/components/side-nav/list-item-with-icon-do.png)
!!!

!!! Dont

![List items with incorrect use of icons](/assets/components/side-nav/list-item-with-icon-dont.png)
!!!

#### With badge

![List item with a badge](/assets/components/side-nav/list-item-with-badge.png)

#### With count

![List item with badge-count](/assets/components/side-nav/list-item-with-count.png)

#### With nested items

Set hasSubItems to show or signify that a link has a nested level of navigation.

![List item with sub-items](/assets/components/side-nav/list-item-with-nested-items.png)

#### External links

Use isLinkExternal to show that the list item is a hyperlink pointing to a page outside the product or platform.

![List item with a external link](/assets/components/side-nav/list-item-with-external-link.png)

!!! Warning

Use external links sparingly. Avoid using this property to link pages that are unrelated to the product's navigation.
!!!

## Footer

### Context switcher

The context switcher allows users to switch between different contexts within your product or application. For example, the side navigation can display different links and content based on a particular organization or workspace the user selects.

![Context switcher](/assets/components/side-nav/footer-context-switcher.png)

## Height

The side navigation should take the full height of the viewport to ensure that the navigation is always visible and accessible to the user.

![Side-nav height](/assets/components/side-nav/sidenav-height.png)

## Positioning and responsive behaviour

The SideNav should always be positioned on the left side of the viewport, occupying 100% of the viewport height.

On smaller viewports, the SideNav should collapse to maximize the real estate available on tablet and mobile devices. By tapping the menu icon, users can expand and access the full menu when needed.

![Responsive side-nav](/assets/components/side-nav/sidenav-position-and-responsive.png)
