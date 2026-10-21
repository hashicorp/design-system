---
title: Getting started for designers
navigation:
  order: 101
  label: For designers
---

!!! Callout

Many resources and links on this page are only available to IBM employees.
!!!

The Design Systems Team maintains and publishes Figma libraries which contain foundational styles, components, patterns, and icons.

Please note, the release of v7.0 deprecates the Foundations library and consolidates tokens and styles into the Components library.

## Enabling Helios libraries

1. Open the Library modal via one of the following methods:

      - Click the "Assets" tab in the left navigation bar, then click the book icon to open the modal.

      ![Opening the library modal via the assets panel](/assets/getting-started/designers/enable-libraries-icon.png =295x*)

      - Click the Figma icon in the top toolbar, then select "Libraries."

      ![Opening the library modal via the menu](/assets/getting-started/designers/enable-libraries-menu.png =290x*)

      - Or use the keyboard shortcut:

         - Mac: `⌥ option`+`3`
         - Windows: `alt`+`3`

2. Enable the libraries by locating the **HDS Design System UI Kit** team and selecting "Add to file":

      - [HDS Product Components v2.0](https://www.figma.com/design/iweq3r2Pi8xiJfD9e6lOhF/HDS-Components-v2.0?node-id=2337-20575&t=gWdKy44MzTP4cTRo-1)
      - [HDS Product Patterns v2.0](https://www.figma.com/design/5Pv32j4QiOOD8lkFTD1dxC/HDS-Patterns-v2.0?node-id=2-45&t=cpJowBg8aXp4qAG1-1)
      - [HDS Icons](https://www.figma.com/design/TLnoT5AYQfy3tZ0H68BgOr/HDS-Icons?m=auto&node-id=164-0&t=uqfJ7Wtjy9AfhBtY-1)
      - [Carbon Charts](https://www.figma.com/design/k34tT4poC2p1RBQxVwZhW5/-Alpha--Carbon-Charts-Library-Kit-%E2%80%93-Carbon-Design-System--Copy-?node-id=3984-105570&t=YIZdjDNDhgDMtXBd-1)

   ![Opening the library selection menu](/assets/getting-started/designers/enable-libraries-toggle.png)

!!! Callout

If you are not a member of the HDS Design System UI Kit team, you will need to look under the **Other teams** tab. If you’re having trouble finding these, search for "HDS" to find the Components, Patterns, and Icon libraries.
!!!

Once the libraries are enabled, components will be accessible in the [assets panel](https://help.figma.com/hc/en-us/articles/360038663994-Name-and-organize-components#assetspanel) or via the [resources menu](https://help.figma.com/hc/en-us/articles/360039150413-Swap-components-and-instances#quick-insert) (`shift`+`i`) in the toolbar. Styles published in the Foundations library will be available in the [design panel](https://help.figma.com/hc/en-us/articles/360039832014-Design-prototype-and-inspect-right-sidebar-#design) in the right sidebar.

## Tokens and styles

Tokens create consistency in the application of color (as a fill or stroke), typography, and effects within Figma. Using Helios tokens aligns the values used in design to corresponding values for engineers implementing the design.

### Variables in Figma 

Tokens are stored in Figma as "variables". Variables attach to designs as hex values, strings, or numerical values. The HDS team has created variable sets in Figma that match the naming and values of tokens used by our engineering teams. This means attaching variables and typography styles to your designs in Figma will link those elements to HDS tokens. Please note, themes will not be accessible if you detach variables within your design, as this breaks the token link.

For more details on what tokens are and how they're used, visit the [HDS Academy design tooling page](https://w3.ibm.com/w3publisher/helios-design-system/hds-academy/design-tooling) on w3 where styles, tokens, and variables are featured in explainer videos.

!!! Callout

As of v7.0 of the design system, the Foundations library has been deprecated. All tokens, styles, and components are located in the [HDS Product Components Library](https://www.figma.com/design/iweq3r2Pi8xiJfD9e6lOhF/HDS-Components-v2.0?node-id=2337-20575&t=gWdKy44MzTP4cTRo-1).

!!!


### Using tokens in your project, applying Figma variables

1. Select the object(s) to which you want to add styling (e.g., text layer, shape, or frame).

2. In the properties panel, click the "Apply styles and variables" icon (looks like four dots) next to the appropriate property (e.g., typography, fill, stroke, or effects).

3. Apply the appropriate variable or style from the list of options. Ensure you choose styles within the **HDS Product Components** library. Typography and elevation are labelled styles while color, border radius, and numerical values are called variables within Figma. Each of these connects to named tokens created by the HDS team.

![](/assets/getting-started/designers/apply-text-style.png =784x*)

To learn more about HDS tokens and styles view [the Foundations section](/foundations/). 

## Modes and theming
Themes in Figma allow designers to view a frame in multiple visual languages. Typically this is used to view light or dark themes for a design. In our case, Figma modes will allow frames to be tranlsated from "classic" HDS (hds) to "carbonized" HDS (cds-0, cds-10, cds-90, cds-100).

During design migrations from the Helios Design System to Carbon, using theme swapping is the first step and will take care of translating properly linked variables and components to the desired Carbon themes. Selecting one of the "carbonized" HDS modes in the dropdown will trigger all properly linked tokens and components to swap to the IBM Carbon visual language.

### Changing modes in Figma

1. Select the frame(s) you want to swap.

2. In the properties panel, click the "Apply variable modes" icon (looks like a color swatch).

3. Choose the appropriate mode from the dropdown to apply the desired HDS or "carbonized" light or dark theme.

![](/assets/getting-started/designers/swapping-modes.png)


## Icons

In Figma, icons from the HDS Icons library are constructed to automatically swap along with the design tokens between the "classic" HDS theme to the "carbonized" theme. You will not need to manually replace icons from the Carbon Icon library when translating from HDS to Carbon. However, service icons using color variants will need to be updated to use dymanic values to support theme swapping. Check out the [Design Tooling Figma Plugin](/tooling/design-tooling-figma-plugin) for a quick and easy way to make this change in your files.

### Adding icons to your project

To use icons in your designs, connect the [Icons library](https://www.figma.com/design/TLnoT5AYQfy3tZ0H68BgOr/HDS-Icons?m=auto&node-id=164-0&t=uqfJ7Wtjy9AfhBtY-1) to your project (see [enabling Helios libraries](#enabling-helios-libraries)).

1.  Open your project file in Figma.

2.  Navigate to the [assets panel](https://help.figma.com/hc/en-us/articles/360038663994-Name-and-organize-components#assetspanel) by clicking "Assets" in the left navigation bar.

3.  Search or scroll to find the icon you need and drag it into your file.

!!! Insight

**Figma tip**

In Helios, icons are technically components. This means you can swap instances, sizes, and colors quickly within Figma’s design panel in the right sidebar.
!!!

## Components

A component inserted from a library into a project is called an [instance](https://help.figma.com/hc/en-us/articles/360039150173-Create-and-insert-component-instances). Instances maintain a link to the main component in the library, which has significant benefits for deploying updates and iterating quickly on designs.

### Adding components to your project

Add Helios components to your design project by inserting them directly from the assets panel, resources menu, or by copying the component from the stickersheet to paste into your project.

#### Inserting from the assets panel

1. Open the [assets panel](https://help.figma.com/hc/en-us/articles/360038663994-Name-and-organize-components#assetspanel) by clicking "Assets" at the top of the left sidebar.

2. Scroll through the list or use the search feature to locate the component you’d like to use. **Note:** Figma’s search feature returns results based on the component’s name, category, and description.

3. Click and drag the component into the canvas or frame.

4. Configure the component properties as necessary in the right sidebar.

![Inserting components from the assets panel](/assets/getting-started/designers/component-assets-panel.png =895x*)

#### Inserting from the resources menu

Open the [resources menu](https://help.figma.com/hc/en-us/articles/360039150413-Swap-components-and-instances#quick-insert) (`shift`+`i`) in the toolbar to expose a list of recently used components, plugins, and widgets enabled in your project. Use this method to access your more commonly or recently used components quickly.

![Inserting components from the resources menu](/assets/getting-started/designers/component-resources-panel.png)

#### Copying from the stickersheet

If you prefer to select a component visually, the [Product Components](https://www.figma.com/design/iweq3r2Pi8xiJfD9e6lOhF/HDS-Components-v2.0?node-id=67397-95918&t=gWdKy44MzTP4cTRo-1) library has a stickersheet for each component displaying the available variants and properties. Just like when using the direct inserts, this method maintains the link to the main component in the library, which means it will receive updates as they become available.

1. Open the [Product Components](https://www.figma.com/design/iweq3r2Pi8xiJfD9e6lOhF/HDS-Components-v2.0?node-id=2-7&t=GgYi9cGI4e06qHBZ-1) library.

2. Navigate to the relevant component page.

3. Select and copy the component variant from the stickersheet.

4. Navigate back to your project file and paste the component wherever needed.

![](/assets/getting-started/designers/copy-from-stickersheet.png =752x*)

### Working with components

#### Detaching components

Our Figma components are tightly coupled with their code counterparts to maintain API and design language consistency. Therefore, we don’t recommend detaching a component from the library in most scenarios.

When you detach a component, it no longer receives updates from the library, which can cause designs and production applications to drift out of sync quickly.

[Contact the Design Systems Team](https://go.hashi.co/hds-support) for support or to request a new component.

#### Overriding component styles

While overriding styles within a component without detaching it is possible, we recommend against doing so without consulting the Design Systems Team first.

Changing a component's color or font size may seem simple, but this can have trickle-down effects in code. Overriding styles forces engineers to create custom classes and styles to implement the changes. This may have unexpected long-term effects within the [CSS cascade](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade#:~:text=The%20cascade%20is%20an%20algorithm,a%20property%20on%20an%20element) and lead to tech debt. In addition to being difficult to scale, overrides nudge the design language of your product out of sync with Helios and the rest of the HashiCorp product suite.

#### Resizing components

Helios components are built to be layout-agnostic, meaning laying out components in a design is left to the consumer.

Unless specifically mentioned in the documentation, the implemented component will fill the parent container. For designers, it’s helpful to use [auto layout](https://help.figma.com/hc/en-us/articles/5731482952599-Using-auto-layout#:~:text=You%20can%20add%20auto%20layout%20to%20a%20selected%20frame%2C%20component,and%20select%20Add%20Auto%20layout) wherever possible. Auto layout closely mimics [CSS Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) and other browser layout mechanisms. Setting a Helios component to `fill container` within an auto layout frame typically replicates the experience of a development environment.

!!! Insight

**Figma tip**

Setting a component to a fixed width in Figma is the same as setting a `width` value on a component or element in code. Setting a fixed width generally goes against fluid and responsive best practices and should be avoided in Figma. Instead, use auto layout wherever possible.
!!!

### Designing local components

Components and patterns unique to your product should be designed and built locally, extending Helios components and foundations.

![Local component patterns](/assets/getting-started/designers/local-component-patterns.png =706x*)

Create local components for your product in a separate file from your main project files and house them in their own Figma library file. A dedicated library creates a consistent location for your product’s components so other designers on your team can access and use them.

Consider using [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) methods when designing and building local components. Helios components generally correspond with `atoms` and `molecules`, while more complex components correspond to `organisms`.

## Resources

### Helios Figma libraries

HashiCorp product teams can use the Helios libraries published under the [HDS Design System UI Kit](https://www.figma.com/files/817445202777874373/team/1030156573400567478) team within Figma.

- [HDS Product Components v2.0](https://www.figma.com/design/iweq3r2Pi8xiJfD9e6lOhF/HDS-Components-v2.0?m=auto&t=Rk02iW7PpBI5vhtJ-6): the set of components published in the Helios Design System
- [HDS Product Patterns v2.0](https://www.figma.com/design/5Pv32j4QiOOD8lkFTD1dxC/HDS-Patterns-v2.0?m=auto&t=Rk02iW7PpBI5vhtJ-6): patterns composed of HDS components published as detachable templates.
- [Icons](https://www.figma.com/design/TLnoT5AYQfy3tZ0H68BgOr/HDS-Icons?m=auto&node-id=164-0&t=uqfJ7Wtjy9AfhBtY-1): core icon set for reuse in your projects
- [A11Y Helper Annotation Kit](https://www.figma.com/design/EEfM1jjqLfUv59eYLopn5x/HDS-A11Y-Helper-UI-Kit?m=auto&t=JLqmUYB9fZbdWaa2-6): an annotation toolkit designed to enhance collaboration between designers and engineers, ensuring the work meets accessibility (a11y) standards.
- [Wireframe UI Kit](https://www.figma.com/design/w0ukydeAsbv6sJirLxZMBo/HDS-Wireframes?m=auto&t=JLqmUYB9fZbdWaa2-6): low-fidelity versions of HDS components designed to help quickly sketch ideas and build flows.
- [Utility UI Kit](https://www.figma.com/design/vqhh0wWZ8PwnRkvh1jk7jB/Utilities-UI-Kit?m=auto&t=JLqmUYB9fZbdWaa2-6): common UI helpers like documentation styles and annotations, and external utilities like browser scroll bars and cursors.

### Other Figma libraries

 - [Carbon Charts](https://www.figma.com/design/k34tT4poC2p1RBQxVwZhW5/-Alpha--Carbon-Charts-Library-Kit-%E2%80%93-Carbon-Design-System--Copy-?node-id=3984-105570&t=YIZdjDNDhgDMtXBd-1): a library including various data visualization components created by the Carbon Design Systems team.

### Recommended plugins

We don’t recommend tying core design functionality to third-party plugins because Figma doesn’t directly supported them. That said, we find the following plugins to be useful support mechanisms:

- [Lorem Ipsum](https://www.figma.com/community/plugin/736000994034548392): generate varying lengths of placeholder "lorem ipsum" content in a text layer.
- [Stark](https://www.figma.com/community/plugin/732603254453395948): a toolkit for measuring accessibility criteria in your designs.
- [Super Tidy](https://www.figma.com/community/plugin/731260060173130163): bulk rename, reorder, and reorganize layers, frames, and other elements within Figma.
- [Flyover](https://www.figma.com/community/plugin/1008819354278038466): showcase your designs with smooth animations in a presentation-like format.

The [Figma community](https://www.figma.com/community) contains other useful resources for documenting your designs, wireframing, and collaborating with your team. Access Figma's community by clicking the organization switcher in the dashboard and selecting "Community" or by clicking "Explore Community" in the toolbar.

![](/assets/getting-started/designers/figma-community.png =804x*)

### Figma documentation

Explore more content about libraries, components, and styles directly from Figma.

- [Guide to libraries in Figma](https://help.figma.com/hc/en-us/articles/360041051154-Guide-to-libraries-in-Figma)
- [Organizing and creating libraries](https://www.figma.com/best-practices/components-styles-and-shared-libraries/organizing-and-creating-libraries/)
- [Apply styles to layers and objects](https://help.figma.com/hc/en-us/articles/360040316193-Apply-Styles-to-layers-and-objects)
- [Guide to components](https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-components-in-Figma)

---

## Support

If you have questions or need assistance using Helios libraries, <LinkTo class="doc-link-generic" @route="show" @model="about/support">contact the Design Systems Team</LinkTo>.

If you have questions or need assistance using the Carbon Charts library, please contact the Carbon Design Team via the IBM Slack channel [#carbon-charts-design](https://ibm.enterprise.slack.com/archives/C01DTUSCQAJ) and/or [#carbon-charts](https://ibm.enterprise.slack.com/archives/CCA7L4MS9).
