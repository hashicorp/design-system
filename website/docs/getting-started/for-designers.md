---
title: Getting started for designers
order: 101
---


!!! Info

Many resources and links on this page are only available to HashiCorp employees.
!!!

The Design Systems Team maintains and publishes Figma libraries which contain foundational styles, components, patterns, and icons.

For documentation around broader Figma best practices within HashiCorp design teams, reach out to the [Design Ops team](https://sites.google.com/hashicorp.com/designknowledgehub/design-system) or visit the [#design-ops slack channel](https://hashicorp.slack.com/archives/C029GL8GJDV).

## Enabling Helios libraries

1. Open the Library modal via one of the following methods:
    
    - Click the `Assets` panel in the left sidebar, then click the `book` icon to open the modal. 
    
    ![Opening the library modal via the assets panel](/assets/getting-started/designers/enable-libraries-icon.png =295x*)
    
    - Click the `Figma` icon in the top toolbar, then click "Libraries". 
    
    ![Opening the library modal via the menu](/assets/getting-started/designers/enable-libraries-menu.png =290x*)

    - Or use the keyboard shortcut: 

        - Mac: `⌥ option`+`3`
        - Windows: `alt`+`3`

2. Enable the libraries by locating the **HDS Design System UI Kit** team and toggling on the following:

    - [HDS - Product Components](https://www.figma.com/file/noyY6dUMDYjmySpHcMjhkN/HDS-Product---Components?t=Ooe3pkDap3cGcgAH-1)
    - [HDS - Product Foundations](https://www.figma.com/file/oQsMzMMnynfPWpMEt91OpH/HDS-Product---Foundations?t=4kdgl88SMIiEYhbA-1)
    - [Flight Icons](https://www.figma.com/file/TLnoT5AYQfy3tZ0H68BgOr/Flight-Icons?t=nEh4FAxdjRsVInyL-1)

    ![Opening the library selection menu](/assets/getting-started/designers/enable-libraries-toggle.png)

!!! Info

If you are not a member of the HDS Design System UI Kit team, you will need to look under the **Other teams** tab. If you’re having trouble finding these, search for "HDS" to find the Foundations and Components libraries and "Flight" to find the Icon library.
!!!

Once the libraries have been enabled you’ll have access to the components from the [assets panel](https://help.figma.com/hc/en-us/articles/360038663994-Name-and-organize-components#assetspanel) or via the [resources menu](https://help.figma.com/hc/en-us/articles/360039150413-Swap-components-and-instances#quick-insert) (`shift`+`i`) in the toolbar, while styles published by the Foundations library are available in the [design panel](https://help.figma.com/hc/en-us/articles/360039832014-Design-prototype-and-inspect-right-sidebar-#design) within the right sidebar.

## Foundational styles

Styles, sometimes referred to as Tokens, allow consistent application of color (as a fill or stroke), typography, and effects (as a shadow) within Figma. These are published in the [Product Foundations library](https://www.figma.com/file/oQsMzMMnynfPWpMEt91OpH/HDS-Product---Foundations?node-id=2916%3A4&t=5MKbTaM2QzE0F5KA-1). 

Because usage of Helios Foundations reinforces consistency across the products, we don’t recommend detaching from these styles within your designs.

### Using styles in your project

1. Select the object(s) you want to add a style to (e.g. text layer, shape, or frame).

2. In the properties panel, click the style icon (looks like four dots) next to the appropriate property (e.g. text, color, stroke, or effect).

3. Select the style you wish to apply from the list of options. Ensure you’re selecting styles from within the **HDS - Product Foundations** library.

![Applying styles to a text layer](/assets/getting-started/designers/apply-text-style.png)

[Learn more about applying styles to object(s)](https://help.figma.com/hc/en-us/articles/360040316193-Apply-Styles-to-layers-and-objects)

## Components

A component inserted from a library into a project is referred to as an [instance](https://help.figma.com/hc/en-us/articles/360039150173-Create-and-insert-component-instances). Instances maintain a link to the main component in the library, which has significant benefits for deploying updates and iterating quickly on designs.

### Adding components to your project

Helios components can be added to your design project by inserting the component directly from the assets panel, resources menu, or by copying the component from the stickersheet and pasting it into your project. 

#### Inserting from the assets panel

1. Open the [assets panel](https://help.figma.com/hc/en-us/articles/360038663994-Name-and-organize-components#assetspanel) by clicking "Assets" in the top of the left sidebar. 

2. Scroll through the list or use the search feature to locate the component you’d like to use.

    - Figma’s search feature returns results based on the component’s name, category, and description.

3. Click and drag the component into the canvas or frame.

4. Configure the component properties as necessary in the right sidebar. 

![Inserting components from the assets panel](/assets/getting-started/designers/component-assets-panel.png =895x*)

#### Inserting from the resources menu

Open the [resources menu](https://help.figma.com/hc/en-us/articles/360039150413-Swap-components-and-instances#quick-insert) (`shift`+`i`) in the toolbar to expose a list of recently used components, plugins, and widgets enabled in your project. Use this method to access your more commonly or recently used components quickly.  

![Inserting components from the resources menu](/assets/getting-started/designers/component-resources-panel.png =321x*)

#### Copying from the stickersheet

If you prefer to select a component visually, the [Product Components](https://www.figma.com/file/noyY6dUMDYjmySpHcMjhkN/HDS-Product---Components?t=Ooe3pkDap3cGcgAH-1) library has a stickersheet for each component displaying the different variants and properties available. Just like when using the direct inserts, this method maintains the link to the main component in the library, which means it will receive updates as they become available.

1. Open the [Product Components](https://www.figma.com/file/noyY6dUMDYjmySpHcMjhkN/HDS-Product---Components?t=Ooe3pkDap3cGcgAH-1) library.

2. Navigate to the relevant component page.

3. Select and copy the component variant from the stickersheet. 

4. Navigate back to your project file and paste the component wherever you need it. 

![Copy from the stickersheet](/assets/getting-started/designers/copy-from-stickersheet.png =752x*)

### Working with components 

#### Detaching components

Our Figma components are tightly coupled with their code counterparts to maintain consistency in the API and design language. In most scenarios, we don’t recommend detaching a component from the library.

When you detach a component, it no longer receives updates from the library. This can cause designs and production applications to drift out of sync quickly.

If you find that a component doesn’t meet your needs, reach out to us for [support](/support) or [submit a request](https://docs.google.com/forms/d/e/1FAIpQLScpMXgrUTVT5fYriu4Pp48r4Nl_eCPluVnJLg0Yg3NXsRWvIA/viewform) for a new component.

#### Overriding component styles

While styles in our components can technically be overridden without detaching the component, we recommend against doing this without consulting the Design Systems Team first. It may seem simple to change the color or the font size within the component, but this can have trickle-down effects in code.

Overriding styles forces engineers to create custom classes and styles to implement the changes. This can have unexpected long-term effects within the [CSS cascade](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade#:~:text=The%20cascade%20is%20an%20algorithm,a%20property%20on%20an%20element) and lead to tech debt.

In addition to being difficult to scale, overrides nudge the design language of your product out of sync with Helios and the rest of the HashiCorp product suite.

#### Resizing components

Helios components are designed and built to be layout-agnostic, meaning the task of laying out components in a design is left to the consumer.

Unless specifically mentioned in the documentation, the component in code will fill the parent container it is used in. For designers, it's helpful to use [auto layout](https://help.figma.com/hc/en-us/articles/5731482952599-Using-auto-layout#:~:text=You%20can%20add%20auto%20layout%20to%20a%20selected%20frame%2C%20component,and%20select%20Add%20Auto%20layout) wherever possible which closely mimics [CSS Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) and other layout mechanisms in the browser. Helios Figma components are flexible and can be set to `fill container` within an auto layout container, which replicates the experience of a development environment.

!!! Warning

**Fixed width components**

Setting a component to a fixed width in Figma is akin to setting an explicit `width` value on a component or element in code. This generally goes against fluid and responsive best practices and should be avoided in Figma. Instead, use auto layout wherever possible.
!!!

### Designing local components

Components and patterns that are unique to your product should be designed and built locally, extending Helios components and foundations.

![Local component patterns](/assets/getting-started/designers/local-component-patterns.png)

When creating your own library of local components to use in your projects, it’s helpful to separate components from your main design work in their own Figma file. This simplifies library publishing and creates a single consistent dependency for your design files. For more information on creating and publishing libraries, visit [Figma’s official documentation.](https://www.figma.com/best-practices/components-styles-and-shared-libraries/organizing-and-creating-libraries/)

!!! Info

When designing and building local components, consider [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) methods whenever possible. Helios components generally correspond with the `atom` and `molecule` levels, with some more complex components being considered `organisms`.
!!!

We’ve spent much of the past year building lower level components, and therefore, don't yet offer <LinkTo class="doc-link-generic" @route="patterns">patterns</LinkTo>. See which patterns we plan to work on in the [Helios roadmap](https://go.hashi.co/hds-rollout).

[Official Figma component documentation](https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-components-in-Figma)

## Resources
While the steps included in this documentation are specific to HashiCorp’s Figma organization and libraries, [Figma’s documentation](https://help.figma.com/hc/en-us/articles/360041051154-Guide-to-libraries-in-Figma) is equally useful when learning how to enable libraries and use them in your projects.

We publish and maintain a set of core Figma libraries for use by any product team within HashiCorp. These libraries are only available for internal consumption.

- [Product Components](https://www.figma.com/file/noyY6dUMDYjmySpHcMjhkN/HDS-Product---Components?t=Ooe3pkDap3cGcgAH-1): the set of components published in the Helios Design System
- [Product Foundations](https://www.figma.com/file/oQsMzMMnynfPWpMEt91OpH/HDS-Product---Foundations?t=4kdgl88SMIiEYhbA-1): core styles including typography, color, and elevation that are consumed by Helios components for reuse in your projects
- [Icons](https://www.figma.com/file/TLnoT5AYQfy3tZ0H68BgOr/Flight-Icons?t=nEh4FAxdjRsVInyL-1): core icon set for reuse in your projects

All of these libraries are published under the [HDS Design System UI Kit](https://www.figma.com/files/team/1030156573400567478) team for use in HashiCorp product design. We do not currently support marketing design efforts directly, but occasionally play a consulting role in component and pattern design.

For a more detailed guide to using our Figma libraries, view the [setup guide](/getting-started/for-designers?tab=setup%20guide/).

### Recommended plugins

!!! Warning

**Warning**

As a general rule of thumb, we don’t recommend tying core design functionality to third-party plugins. These plugins are not supported directly by Figma and are subject to errors if Figma’s API or core functionality changes. Only use plugins as a support mechanism within your design files.

!!!

Plugins can be used to extend Figma’s native functionality and make life a little easier by simplifying repetitive tasks. Here is a small curation of the plugins that our team members like to use:

- [Lorem Ipsum](https://www.figma.com/community/plugin/736000994034548392): generate varying lengths of placeholder "lorem ipsum" content in a text layer.
- [Stark](https://www.figma.com/community/plugin/732603254453395948): a toolkit for measuring accessibility criteria in your designs.
- [Super Tidy](https://www.figma.com/community/plugin/731260060173130163): bulk rename, reorder, and reorganize layers, frames, and other elements within Figma.
- [Flyover](https://www.figma.com/community/plugin/1008819354278038466): showcase your designs with smooth animations in a presentation-like format.

The [Figma community](https://www.figma.com/community) contains many other useful resources for documenting your designs, wireframing, and collaborating with your team.

![Navigating to the Figma community from the desktop app](/assets/getting-started/designers/figma-community.png)

--- 

## Support

If you have any questions or need assistance using Helios libraries, don’t hesitate to <LinkTo class="doc-link-generic" @route="show" @model="about/support">reach out for support</LinkTo>.
