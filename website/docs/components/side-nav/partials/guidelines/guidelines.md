## Usage

### When to use

- To display the primary navigation on a page.

### When not to use

- To move between views within the same context or page, consider [Tabs](#).

## Header

The navigation header displays persistent UI elements that give users quick access to important sections and resources within the application or platform.

### Home link

The home link gives users consistent and quick access to your application's main page or section. Generally, the home or dashboard.

For cloud products, the icon set should always be the HCP service icon. For standalone or open-source products, it should be the product’s service icon (e.g. terraform).

![Home link in side-nav's header](/assets/components/side-nav/header-logo.png)

### Help menu

TBD...

### User menu

TBD...

## Body

The body consists of a group of sections with vertical lists of links or buttons.

### Section

#### With title

![Side-nav section with a title](/assets/components/side-nav/section-with-title.png)

#### Without title

![Side-nav section without a title](/assets/components/side-nav/section-without-title.png)

A title could help users scan the sections and provide context about the links inside each section.

Titles should be meaningful and related to the content within the section.

### List items

#### Without icon

![List items without icons](/assets/components/side-nav/list-item-without-icon.png)

#### With icon

![List items with icons](/assets/components/side-nav/list-item-with-icon.png)

- Use icons to help users recognize and scan the links they are paired with.
- We recommend only using icons in the main level of the navigation.
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

Set hasSubItems to show that a link has a nested level of navigation.

![List item with sub-items](/assets/components/side-nav/list-item-with-nested-items.png)

#### External links

Use isLinkExternal to show that the link is a hyperlink pointing to a page outside the product or platform.

![List item with a external link](/assets/components/side-nav/list-item-with-external-link.png)

!!! Warning

Use this property only
!!!

## Footer

### Context switcher

TBD...

## Height

TBD...

## Collapsed / Responsive

TBD...

### Variant/property name

<!-- don’t forget to include real examples and do/don’t blocks, as necessary -->
{description}

## Content

- {description}
- {description}
- {description}
- {description}
- {description}

## Related

<!-- only include the 2 most similar/related components -->
- {[component name](#)}
- {[component name](#)}
