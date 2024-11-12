---
title: Getting started for designers
navigation:
  order: 101
  label: For designers
---

!!! Info

Many resources and links on this page are only available to HashiCorp employees.
!!!

The Design Systems Team maintains and publishes Figma libraries which contain foundational styles, components, patterns, and icons.

For documentation around broader Figma best practices within HashiCorp design teams, reach out to the [Design Ops team](https://sites.google.com/hashicorp.com/designknowledgehub/design-system) or visit the [#design-ops slack channel](https://hashicorp.slack.com/archives/C029GL8GJDV).

## Enabling Helios libraries

1. Open the Library modal via one of the following methods:

   - Click the `Assets` panel in the left sidebar, then click the `book` icon to open the modal.

   ![Opening the library modal via the assets panel](/assets/getting-started/designers/enable-libraries-icon.png =295x\*)

   - Click the `Figma` icon in the top toolbar, then click "Libraries".

   ![Opening the library modal via the menu](/assets/getting-started/designers/enable-libraries-menu.png =290x\*)

   - Or use the keyboard shortcut:

     - Mac: `⌥ option`+`3`
     - Windows: `alt`+`3`

<!-- @jory relink -->

2. Enable the libraries by locating the **HDS Design System UI Kit** team and toggling on the following:

   - [HDS - Product Components](https://www.figma.com/file/noyY6dUMDYjmySpHcMjhkN/HDS-Product---Components?t=Ooe3pkDap3cGcgAH-1)
   - [HDS - Product Foundations](https://www.figma.com/file/oQsMzMMnynfPWpMEt91OpH/HDS-Product---Foundations?t=4kdgl88SMIiEYhbA-1)
   - [Flight Icons](https://www.figma.com/file/TLnoT5AYQfy3tZ0H68BgOr/Flight-Icons?t=nEh4FAxdjRsVInyL-1)

   ![Opening the library selection menu](/assets/getting-started/designers/enable-libraries-toggle.png)

!!! Info

If you are not a member of the HDS Design System UI Kit team, you will need to look under the **Other teams** tab. If you’re having trouble finding these, search for "HDS" to find the Foundations and Components libraries and "Flight" to find the Icon library.
!!!

Once the libraries are enabled, you can access the components from the [assets panel](https://help.figma.com/hc/en-us/articles/360038663994-Name-and-organize-components#assetspanel) or via the [resources menu](https://help.figma.com/hc/en-us/articles/360039150413-Swap-components-and-instances#quick-insert) (`shift`+`i`) in the toolbar. In contrast, styles published by the Foundations library are available in the [design panel](https://help.figma.com/hc/en-us/articles/360039832014-Design-prototype-and-inspect-right-sidebar-#design) within the right sidebar.

## Foundational styles

<!-- @jory relink -->

Styles, sometimes referred to as Tokens, allow consistent application of color (as a fill or stroke), typography, and effects within Figma. You can find these in the [Product Foundations library](https://www.figma.com/file/oQsMzMMnynfPWpMEt91OpH/HDS-Product---Foundations?node-id=2916%3A4&t=5MKbTaM2QzE0F5KA-1).

Because the usage of Helios Foundations reinforces consistency across the products, we don’t recommend detaching from these styles within your designs.

### Using styles in your project

1. Select the object(s) to which you want to add a style (e.g., text layer, shape, or frame).

2. In the properties panel, click the style icon (looks like four dots) next to the appropriate property (e.g., text, color, stroke, or effect).

3. Select the style you wish to apply from the list of options. Ensure you choose styles within the **HDS - Product Foundations** library.

![Applying styles to a text layer](/assets/getting-started/designers/apply-text-style.png =784x\*)

To learn more about how to use the foundational styles, visit:

- [Colors](/foundations/colors)
- [Typography](/foundations/typography)
- [Elevation](/foundations/elevation)
- [Borders](/foundations/border)
- [Focus ring](/foundations/focus-ring)

## Icons

### Adding icons to your project

To use icons within your project, first ensure the [Icons library](https://www.figma.com/file/TLnoT5AYQfy3tZ0H68BgOr/Flight-Icons?node-id=164%3A0) is enabled for your project (see [enabling Helios libraries](#enabling-helios-libraries)).

1.  Open your project file within Figma.

2.  Navigate to the [assets panel](https://help.figma.com/hc/en-us/articles/360038663994-Name-and-organize-components#assetspanel) by clicking "Assets" at the top of the left sidebar.

3.  Search or scroll to find the icon you need and drag it into your file.

!!! Insight

In Helios, icons are technically components. This means you can swap instances, sizes, and colors quickly within Figma’s design panel in the right sidebar.
!!!

## Components

A component inserted from a library into a project is called an [instance](https://help.figma.com/hc/en-us/articles/360039150173-Create-and-insert-component-instances). Instances maintain a link to the main component in the library, which has significant benefits for deploying updates and iterating quickly on designs.

### Adding components to your project

Add Helios components to your design project by inserting them directly from the assets panel or resources menu or copying the component from the stickersheet and pasting it into your project.

#### Inserting from the assets panel

1. Open the [assets panel](https://help.figma.com/hc/en-us/articles/360038663994-Name-and-organize-components#assetspanel) by clicking "Assets" at the top of the left sidebar.

2. Scroll through the list or use the search feature to locate the component you’d like to use.

   - Figma’s search feature returns results based on the component’s name, category, and description.

3. Click and drag the component into the canvas or frame.

4. Configure the component properties as necessary in the right sidebar.

![Inserting components from the assets panel](/assets/getting-started/designers/component-assets-panel.png =895x\*)

#### Inserting from the resources menu

Open the [resources menu](https://help.figma.com/hc/en-us/articles/360039150413-Swap-components-and-instances#quick-insert) (`shift`+`i`) in the toolbar to expose a list of recently used components, plugins, and widgets enabled in your project. Use this method to access your more commonly or recently used components quickly.

![Inserting components from the resources menu](/assets/getting-started/designers/component-resources-panel.png =321x\*)

#### Copying from the stickersheet

<!-- @jory relink -->

If you prefer to select a component visually, the [Product Components](https://www.figma.com/file/noyY6dUMDYjmySpHcMjhkN/HDS-Product---Components?t=Ooe3pkDap3cGcgAH-1) library has a stickersheet for each component displaying the available variants and properties. Just like when using the direct inserts, this method maintains the link to the main component in the library, which means it will receive updates as they become available.

<!-- @jory relink -->

1. Open the [Product Components](https://www.figma.com/file/noyY6dUMDYjmySpHcMjhkN/HDS-Product---Components?t=Ooe3pkDap3cGcgAH-1) library.

2. Navigate to the relevant component page.

3. Select and copy the component variant from the stickersheet.

4. Navigate back to your project file and paste the component wherever needed.

![Copy from the stickersheet](/assets/getting-started/designers/copy-from-stickersheet.png =752x\*)

### Working with components

#### Detaching components

Our Figma components are tightly coupled with their code counterparts to maintain API and design language consistency. Therefore, we don’t recommend detaching a component from the library in most scenarios.

When you detach a component, it no longer receives updates from the library, which can cause designs and production applications to drift out of sync quickly.

[Contact the Design Systems Team](https://go.hashi.co/hds-support) for support or to request a new component if a component doesn’t meet your needs.

#### Overriding component styles

While you can technically override the styles within a component without detaching it, we recommend against doing so without consulting the Design Systems Team first.

Changing a component's color or font size may seem simple, but this can have trickle-down effects in code. Overriding styles forces engineers to create custom classes and styles to implement the changes. Overriding styles can have unexpected long-term effects within the [CSS cascade](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade#:~:text=The%20cascade%20is%20an%20algorithm,a%20property%20on%20an%20element) and lead to tech debt. In addition to being difficult to scale, overrides nudge the design language of your product out of sync with Helios and the rest of the HashiCorp product suite.

#### Resizing components

Helios components are built to be layout-agnostic, meaning laying out components in a design is left to the consumer.

Unless specifically mentioned in the documentation, the implemented component will fill the parent container. For designers, it’s helpful to use [auto layout](https://help.figma.com/hc/en-us/articles/5731482952599-Using-auto-layout#:~:text=You%20can%20add%20auto%20layout%20to%20a%20selected%20frame%2C%20component,and%20select%20Add%20Auto%20layout) wherever possible. Auto layout closely mimics [CSS Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) and other browser layout mechanisms. Setting a Helios component to `fill container` within an auto layout frame typically replicates the experience of a development environment.

!!! Warning

**Fixed width components**

Setting a component to a fixed width in Figma is the same as setting a `width` value on a component or element in code. Setting a fixed width generally goes against fluid and responsive best practices and should be avoided in Figma. Instead, use auto layout wherever possible.
!!!

### Designing local components

Components and patterns unique to your product should be designed and built locally, extending Helios components and foundations.

![Local component patterns](/assets/getting-started/designers/local-component-patterns.png =706x\*)

When creating local components for your product, it’s helpful to separate them from your main project files and house them in their own Figma library file. Using a dedicated library creates a consistent location for your product’s local components so that other designers on your team can access and use them.

!!! Insight

Consider using [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) methods when designing and building local components. Helios components generally correspond with `atoms` and `molecules`, while more complex components correspond to `organisms`.
!!!

## Resources

### Helios Figma libraries

<!-- @jory relink -->

HashiCorp product teams can use the Helios libraries published under the [HDS Design System UI Kit](https://www.figma.com/files/team/1030156573400567478) team within Figma.

<!-- @jory relink -->

- [Product Components](https://www.figma.com/file/noyY6dUMDYjmySpHcMjhkN/HDS-Product---Components?t=Ooe3pkDap3cGcgAH-1): the set of components published in the Helios Design System
- [Product Foundations](https://www.figma.com/file/oQsMzMMnynfPWpMEt91OpH/HDS-Product---Foundations?t=4kdgl88SMIiEYhbA-1): core styles including typography, color, and elevation that are consumed by Helios components for reuse in your projects
- [Icons](https://www.figma.com/file/TLnoT5AYQfy3tZ0H68BgOr/Flight-Icons?t=nEh4FAxdjRsVInyL-1): core icon set for reuse in your projects
- [A11Y Helper Annotation Kit](https://www.figma.com/design/EEfM1jjqLfUv59eYLopn5x/HDS-A11Y-Helper-UI-Kit?m=auto&t=JLqmUYB9fZbdWaa2-6): an annotation toolkit designed to enhance collaboration between designers and engineers, ensuring the work meets accessibility (a11y) standards.
- [Wireframe UI Kit](https://www.figma.com/design/w0ukydeAsbv6sJirLxZMBo/HDS-Wireframes?m=auto&t=JLqmUYB9fZbdWaa2-6): low-fidelity versions of HDS components designed to help quickly sketch ideas and build flows.
- [Utility UI Kit](https://www.figma.com/design/vqhh0wWZ8PwnRkvh1jk7jB/Utilities-UI-Kit?m=auto&t=JLqmUYB9fZbdWaa2-6): common UI helpers like documentation styles and annotations, and external utilities like browser scroll bars and cursors.

### Recommended plugins

We don’t recommend tying core design functionality to third-party plugins because Figma doesn’t directly supported them. That said, we find the following plugins to be useful support mechanisms:

- [Lorem Ipsum](https://www.figma.com/community/plugin/736000994034548392): generate varying lengths of placeholder "lorem ipsum" content in a text layer.
- [Stark](https://www.figma.com/community/plugin/732603254453395948): a toolkit for measuring accessibility criteria in your designs.
- [Super Tidy](https://www.figma.com/community/plugin/731260060173130163): bulk rename, reorder, and reorganize layers, frames, and other elements within Figma.
- [Flyover](https://www.figma.com/community/plugin/1008819354278038466): showcase your designs with smooth animations in a presentation-like format.

The [Figma community](https://www.figma.com/community) contains other useful resources for documenting your designs, wireframing, and collaborating with your team. Access Figma's community by clicking the organization switcher in the dashboard and selecting "Community" or by clicking "Explore Community" in the toolbar.

![Navigating to the Figma community from the desktop app](/assets/getting-started/designers/figma-community.png =804x\*)

### Figma documentation

Explore more content about libraries, components, and styles directly from Figma.

- [Guide to libraries in Figma](https://help.figma.com/hc/en-us/articles/360041051154-Guide-to-libraries-in-Figma)
- [Organizing and creating libraries](https://www.figma.com/best-practices/components-styles-and-shared-libraries/organizing-and-creating-libraries/)
- [Apply styles to layers and objects](https://help.figma.com/hc/en-us/articles/360040316193-Apply-Styles-to-layers-and-objects)
- [Guide to components](https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-components-in-Figma)

---

## Support

If you have questions or need assistance using Helios libraries, <LinkTo class="doc-link-generic" @route="show" @model="about/support">contact the Design Systems Team</LinkTo>.
