## Usage

### When to use

- On every screen of an application where universal links or content are required.

## Order of content

While the code allows flexibility in the ordering of links and content, we recommend the following structure for a consistent visual appearance across applications: 

- Status link
- Legal links
- Additional links
- Plain text items (or metadata, such as version numbers)
- Copyright

![Example of the recommended order of content within the AppFooter](/assets/components/app-footer/app-footer-order-priority.png)

## Status link

The Status link comes with default statuses that are often defined by a 3rd party tool, such as statuspage.io. If needed, they can be adjusted to suit the specific product needs.

![Example of status link options](/assets/components/app-footer/status-link-options.png)

## Legal links

We offer a set of standard "Legal" links, by default. These are recommended for customer-facing products, but can be turned on/off within the component, as needed. 

![Example of the AppFooter with legal links only](/assets/components/app-footer/app-footer-legal-links.png)

## Additional links

Additional links can be added, as necessary. Some examples may include: Changelog, GitHub, etc.

![Example of the AppFooter with additional links](/assets/components/app-footer/app-footer-additional-links.png)

## Plain text items

Plain text content can be added after the links. Often this is for displaying the version number or other metadata related to the product. 

![Example of the AppFooter with plain text list items](/assets/components/app-footer/app-footer-items.png)

## Extra content blocks

Extra content blocks are available before the list of links and before the copyright.

![Example of where additional content can go in the AppFooter](/assets/components/app-footer/app-footer-extra-content.png)

!!! Do

The extra content block can be used to add quick interactions that change the whole application, e.g., a theme switcher.

![Example of what additional content can go in the AppFooter](/assets/components/app-footer/app-footer-extra-content-do.png)
!!!

!!! Dont

Avoid adding information that's critical to the user's journey in the AppFooter. 

![Example of what additional content should not go in the AppFooter](/assets/components/app-footer/app-footer-extra-content-dont.png)
!!!

## Themes

The AppFooter supports both `Light` and `Dark` theme options. The dark theme can be used when there is a need for a footer on a dark background, e.g., a loading screen, but it should be used sparingly. 

![Example of the AppFooter in a dark theme](/assets/components/app-footer/app-footer-dark.png)

## Responsiveness

In Figma, we support two size variants `Large` and `Small`, to help illustrate how the component will respond to changing viewport sizes. In code, the component is responsive. 

!!! Warning 

Due to structural wrapping limitations in Figma, the component may not be a direct translation to what is in the browser. The Ember component should be the source of truth for proper wrapping.
!!!

### Large

All elements are displayed in a single row, depending on the amount of links and additional content added to the AppFooter. As the screen size is reduced, the content will wrap. 

_Please note, this screenshot is reduced in size to fit within the content container of the website._

![Example of the AppFooter at a large screen size](/assets/components/app-footer/app-footer-large.png)

### Small

![Example of the AppFooter at a small screen size](/assets/components/app-footer/app-footer-small.png)