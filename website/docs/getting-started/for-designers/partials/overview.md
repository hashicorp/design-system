If you're a designer new to the HashiCorp Design System or are looking to get up to speed on the strategy, best practices, and design language used, this getting started guide should be your first stop. We'll walk through enabling relevant Figma libraries, how to use them, and best practices when working in Figma and using the HashiCorp Design System components and styles.

This guide contrasts [getting started for engineers](/getting-started/engineers), but understanding the core concepts of each will aid in communicating your designs and understanding the implementation methods in code.

## Figma libraries

The HashiCorp design system team publishes and maintains a set of core Figma libraries for use in any HashiCorp team within our Figma organization. These libraries are currently not available for public consumption outside of HashiCorp.

- [Product Components](https://www.figma.com/file/noyY6dUMDYjmySpHcMjhkN/HDS-Product---Components?t=Ooe3pkDap3cGcgAH-1): the primary set of components published in the HashiCorp Design System
- [Product Foundations](https://www.figma.com/file/oQsMzMMnynfPWpMEt91OpH/HDS-Product---Foundations?t=4kdgl88SMIiEYhbA-1): core styles including typography, color, and elevation that are consumed by HDS components and published for reuse in your products
- [Flight Icons](https://www.figma.com/file/TLnoT5AYQfy3tZ0H68BgOr/Flight-Icons?t=nEh4FAxdjRsVInyL-1): core icon set for reuse in your products

All of these libraries are published under the [HDS Design System UI Kit](https://www.figma.com/files/team/1030156573400567478) team for use in HashiCorp product design. We do not currently support marketing design efforts directly, but occasionally plays a consulting role in component and pattern design.

For a more detailed guide for using our Figma libraries, view the **setup guide** tab.

## Recommended plugins

Plugins can be used to extend Figma's native functionality and make life a little easier by simplifying repetitve tasks.

- [Lorem Ipsum](https://www.figma.com/community/plugin/736000994034548392): generate varying lengths of placeholder "lorem ipsum" content in a text layer.
- [Stark](https://www.figma.com/community/plugin/732603254453395948): a toolkit for measuring accessibility criteria in your designs.
- [Super Tidy](https://www.figma.com/community/plugin/731260060173130163): bulk rename, reorder, and organize layers, frames, and other elements within Figma.
- [Flyover](https://www.figma.com/community/plugin/1008819354278038466): showcase your designs with smooth animations in a presentation-like format.

This is just a small selection of the plugins that can be found in the [Figma community](https://www.figma.com/community) as well as other resources for documenting your designs, wireframing, and collaborating with your team.

![Navigating to the Figma community from the desktop app](/assets/getting-started/designers/figma-community.png)

!!! Warning

**Warning**

As a general rule of thumb, we don't recommend tying core design functionality to third-party plugins. While Figma's support is mostly broad, these plugins are not supported directly by Figma and are subject to errors if Figma's API or core functionality changes. Only use plugins as a support mechanism within your design files.

!!!

## Should I use the Figma desktop or web application?

While Figma's industry prominence as a design tool is largely driven by its feature set, platform-agnostic availability plays a large part in Figma's increased adoption.

Your organization, projects, and files can be accessed via any modern web browser as well as native [desktop applications](https://www.figma.com/downloads/) for macOS and Windows.

How you choose to access Figma is up to you, but the desktop application has several advantages over the web app:

- More efficient management of GPU resources from your system
- Native integration for using local fonts ([more information on using fonts within the browser application](https://help.figma.com/hc/en-us/articles/360039956894-Access-local-fonts-on-your-computer#browser))

Unfortunately Figma doesn't support any form of offline mode at this time, you must be connected to the internet to view and edit any of your design files and projects.
