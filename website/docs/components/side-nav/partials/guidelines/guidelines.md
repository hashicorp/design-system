## Usage

### When to use

- To display the primary navigation of the application on a page.

### When not to use

- To move between views within the same context or page, consider [Tabs](#).

## Header

The navigation header displays persistent UI elements that give users quick access to important sections and resources within the application or platform.

### Home link

The home link gives users consistent and quick access to the application's main page or section. Generally, the home or dashboard.

For cloud products, the icon set should always be the HCP service icon. For standalone or open-source products, it should be the product’s service icon (e.g. Terraform).

![Home link in side-nav's header](/assets/components/side-nav/header-logo.png)

### Help dropdown

Use the help dropdown to provide users with access to support and helpful resources that can be easily accessible from anywhere within the application—for example, links to the help center, documentation, or tutorials.

Avoid placing non-help related links or actions, such as user settings or navigation links within the menu.

![Help dropdown menu in side-nav's header](/assets/components/side-nav/help-dropdown.png)

### User dropdown

The user dropdown gives users quick and easy access to their settings and preferences. The menu should contain links or actions related to the user's profile, settings, and/or preferences.

Avoid placing links to unrelated pages or actions, such as support or navigation items within the menu.

![User dropdown menu in side-nav's header](/assets/components/side-nav/user-dropdown.png)

### Custom content

The `custom` type supports any custom content, local components, or Helios components within the header via an instance swap property (customInstance) in Figma.

![Generic container within the side-nav header](/assets/components/side-nav/custom-header.png)

## Body

The body consists of a group of sections with vertical lists of links, typically to the most important parts of the application. Any custom content or component is also supported by an additional generic container.

### List

#### With title

![Side-nav section with a title](/assets/components/side-nav/section-with-title.png)

#### Without title

![Side-nav section without a title](/assets/components/side-nav/section-without-title.png)

- A title can help users scan the sections and provide context about the links inside each section.
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

Use `hasSubItems` to show or signify that a link has a nested level of navigation.

![List item with sub-items](/assets/components/side-nav/list-item-with-nested-items.png)

#### External links

Use `isLinkExternal` to show that the list item is a hyperlink pointing to a page outside the product or platform.

![List item with a external link](/assets/components/side-nav/list-item-with-external-link.png)

!!! Warning

Use external links sparingly. Avoid using this property to link pages that are unrelated to the product's navigation.
!!!

### Custom content

Toggle `hasCustomContent` on to support any additional custom content, local components, or Helios components within the body container via an instance swap property (customInstance) in Figma.

![Generic container within the side-nav body](/assets/components/side-nav/custom-content-body.png)

## Footer

### Context switcher

The context switcher allows users to switch between different contexts within your product or application. For example, the navigation or application can change based on a particular organization or workspace the user selects.

![Context switcher](/assets/components/side-nav/footer-context-switcher.png)

## Positioning, and responsive behaviour

The SideNav should always be positioned on the left side of the viewport, occupying 100% of the viewport height to ensure that the navigation is always visible and accessible to the user..

On smaller viewports, the SideNav should collapse to maximize the available real estate on tablet and mobile devices. By tapping the menu icon, users can expand and access the full menu when needed.

![Responsive side-nav](/assets/components/side-nav/sidenav-position-and-responsive.png)

## Collapse functionality

If the `isCollapsible` property is set to `true`, a collapse toggle button will be exposed to the end-user allowing them to manually expand and collapse the component.

![SideNav collapse function](/assets/components/side-nav/sidenav-collapse-interaction.png)

On smaller viewports, the SideNav will be rendered in its collapsed state **by default** and will overlay the main page content in its expanded state.

![SideNav overlay on smaller viewports](/assets/components/side-nav/sidenav-overlay-small-viewport.png)

### Collapsed reflow

The collapse functionality of the SideNav gives control to the end-user to unlock more horizontal space in the main page. Thus, the main page content should reflow or reposition to occupy this space if the SideNav is in its collapsed state. If the main page content has a predetermined maximum width that is reached when the SideNav collapses, the content should transition smoothly to the new center of the main page area.

This is handled out of the box by the [AppFrame](/components/app-frame) component, but may need to be accounted for in custom implementations of the application/page layout.

<video width="100%" controls loop>
  <source
    src="/assets/components/side-nav/sidenav-expand-collapse.mp4"
    type="video/mp4"
  />
</video>
