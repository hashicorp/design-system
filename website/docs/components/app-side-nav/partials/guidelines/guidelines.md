## Usage

### When to use

- When navigating between subpages and nested pages within the application.

### When not to use

- For global navigation across an application, use the [App Header](/components/app-header) instead.
- To move between views within the same context or page, consider [Tabs](/components/tabs).

## Body

The body consists of a group of sections with vertical lists of links, typically to the most important parts of the application. Any generic content or component is also supported by an additional generic container.

### List

#### With title

![App Side Nav section with a title](/assets/components/app-side-nav/section-with-title.png)

#### Without title

![App Side Nav section without a title](/assets/components/app-side-nav/section-without-title.png)

- A title can help users scan the sections and provide context about the links inside each section.
- Titles should be meaningful and related to the content within the section.

### List items

#### Without icon

![List items without icons](/assets/components/app-side-nav/list-item-without-icon.png)

#### With icon

![List items with icons](/assets/components/app-side-nav/list-item-with-icon.png)

- Use icons to help users recognize and scan the links they are paired with.
- We recommend only using icons in the main or top level navigation.
- Avoid overwriting color styles in icons.

!!! Do

![List items with correct use of icons](/assets/components/app-side-nav/list-item-with-icon-do.png)

!!!

!!! Dont

![List items with incorrect use of icons](/assets/components/app-side-nav/list-item-with-icon-dont.png)

!!!

#### With badge

![List item with a badge](/assets/components/app-side-nav/list-item-with-badge.png)

#### With count

![List item with badge-count](/assets/components/app-side-nav/list-item-with-count.png)

#### With nested items

Use `hasSubItems` to show or signify that a link has a nested level of navigation.

![List item with sub-items](/assets/components/app-side-nav/list-item-with-nested-items.png)

#### External links

Use `isLinkExternal` to show that the list item is a hyperlink pointing to a page outside the product or platform.

![List item with a external link](/assets/components/app-side-nav/list-item-with-external-link.png)

!!! Warning

Use external links sparingly. Avoid using this property to link pages that are unrelated to the product's navigation.
!!!

### Generic content

The topGenericInstance and bottomGenericInstance properties support any additional generic content, local components, or Helios components within the body container via instance swap properties (`topGenericInstance`, `bottomGenericInstance`) in Figma.

![Generic container within the side-nav body](/assets/components/app-side-nav/custom-content-body.png)

## Positioning, and responsive behaviour

The App Side Nav should always be positioned on the left side of the viewport, occupying 100% of the viewport height to ensure that the navigation is always visible and accessible to the user..

On smaller viewports, the App Side Nav should collapse to maximize the available real estate on tablet and mobile devices. By tapping the menu icon, users can expand and access the full menu when needed.

![Responsive side-nav](/assets/components/app-side-nav/app-side-nav-position-and-responsive.png)

## Collapse functionality

If the `isCollapsible` property is set to `true`, a collapse toggle button will be exposed to the end-user allowing them to manually expand and collapse the component.

![App Side Nav collapse function](/assets/components/app-side-nav/app-side-nav-collapse-interaction.png)

On smaller viewports, the App Side Nav will be rendered in its collapsed state **by default** and will overlay the main page content in its expanded state.

![App Side Nav overlay on smaller viewports](/assets/components/app-side-nav/app-side-nav-overlay-small-viewport.png)

### Collapsed reflow

The collapse functionality of the App Side Nav gives control to the end-user to unlock more horizontal space in the main page. Thus, the main page content should reflow or reposition to occupy this space if the App Side Nav is in its collapsed state. If the main page content has a predetermined maximum width that is reached when the App Side Nav collapses, the content should transition smoothly to the new center of the main page area.

This is handled out of the box by the [AppFrame](/layouts/app-frame) component, but may need to be accounted for in custom implementations of the application/page layout.

<video width="100%" controls loop>
  <source
    src="/assets/components/app-side-nav/app-side-nav-expand-collapse.mp4"
    type="video/mp4"
  />
</video>
