---
title: From Helios to Carbon
navigation:
  order: 101
  label: From Helios to Carbon
related:
  - foundations/theming
  - patterns/theme-selection
previewImage: assets/illustrations/carbonization/helios-to-carbon.jpg
---

!!! Info

While adopting the "carbonized" version of the Helios Design System (HDS) is not strictly required, we strongly recommend that teams start planning for it.

!!!

## Aligning with IBM's design language

As HashiCorp products integrate into the IBM ecosystem, adopting a shared design language ensures a seamless, familiar experience for users—no matter where they are in that ecosystem.

### What this means for Helios

Helios is migrating to IBM's design language by aligning with the [Carbon Design System](https://carbondesignsystem.com/), the foundation of IBM's product ecosystem. Because HDS remains foundational to HashiCorp products, **Helios is not going away**.

Instead of starting from scratch, we are shifting to a **local system model**. Helios remains the official design system for HashiCorp products, but it is now built on IBM's design language. Your products will *look and feel* like IBM products while running on the same technology stack.

In practical terms:

- Foundations such as colors, typography, spacing, and icons match IBM's design language.
- HDS components receive visual updates to reflect these foundational changes.
- Component APIs and behavior stay the same because this is a visual update, not an architectural one.
- [Theming support](/foundations/theming) (including dark mode) is now available.

### What this means for our consumers

Your day-to-day workflow remains largely unchanged:

- Helios is still the official design system for HashiCorp products built with Ember.
- The Helios documentation website, Figma UI Kits, and `npm` packages remain our source of truth.
- Support channels and processes stay the same.
- Component APIs do not change, so your product code should not break.

We continue to support and maintain HDS, prioritizing bug fixes and critical updates.

#### What changes for designers

Product Designers currently using HDS will see minimal impact on day-to-day workflows, but keep a few key updates in mind:

- Update your files to the latest release of HDS [Components v2.0 library](https://www.figma.com/design/iweq3r2Pi8xiJfD9e6lOhF/HDS-Components-v2.0?m=auto) to work with modes.
- Five modes are available for designing and testing: 1 legacy HDS mode (default) and 4 themed Carbon modes.
- Avoid using the Carbon Figma libraries directly, as an Ember counterpart does not exist.
- Detached or custom components require manual conversion to themed tokens (we can help with this).
- Once your product migrates to v7.0 and uses the Carbon themes, create new design work in the appropriate Carbon mode and test it in both light and dark themes.

See the [Carbonization for designers](/carbonization/for-designers) migration guide for details.

#### What changes for engineers

!!! Callout

Products are not required to migrate from Ember to React; framework decisions remain product-driven.

!!!

The three biggest changes at code level introduced with the "carbonization" of the design system are:

- support for [multiple themes](/foundations/theming) for the HDS foundations and components ("classic" HDS + IBM Carbon "light/dark")
- a new nomenclature for the [HDS design tokens](/foundations/tokens) (from `--token` to `--hds`, plus a reorganization of the names themselves)
- asynchronous and theme-aware [icon loading](/components/icon?tab=carbon%20theme) (no more upfront injection of an SVG sprite)

These changes impact only the visual styling of the HDS components: their APIs and interaction behavior remain unchanged.

That said, because these updates to the tokens introduce breaking changes, the HDS packages have been released as new major versions, and this requires specific [migration steps](/foundations/theming?tab=code#migrating).

After migrating, developers will need to start testing their application across the different themes to catch theme-specific issues.

For more details, see [Carbonization for engineers](/carbonization/for-engineers).

## New design system ecosystem

Introducing the Carbon Design System visual language via the Helios v7.0.0 release shifts the existing design system ecosystem for HashiCorp products.

### What design systems are available to use?

- **Helios Design System**: A core design system built for HashiCorp products available in [Ember](https://github.com/hashicorp/design-system) and [Figma](https://www.figma.com/files/902667414815738345/team/1030156573400567478).
    - Legacy HDS: Uses HashiCorp’s visual language
    - Carbonized HDS: Uses IBM’s visual language
- **Carbon Design System**: A design system built to be used across IBM products, marketing, etc. It includes a core design system and is extended by additional systems, such as AI, Charts, Product, Cloud, etc. Carbon is available in [React](https://github.com/carbon-design-system/carbon/tree/main/packages/react), [Web Components](https://github.com/carbon-design-system/carbon/tree/main/packages/web-components), and [Figma](https://www.figma.com/files/902667414815738345/folder/57645777).

### Which system should you use?

- If your product is built using **Ember** and:
    - **Has adopted Carbonized HDS**: continue using the Helios Design System. However, build and test everything in the cds light (`cds-0`) and dark (`cds-100`) modes.
    - **Has not adopted Carbonized HDS**: use the Helios Design System in the legacy mode (`hds`).
- If your product is built using **React**: use the [Carbon Design System](https://www.carbondesignsystem.com/) directly.
- If your product is net new: determine the framework first.

![](/assets/carbonization/hds-decision-tree.png)

### Can they be used together?

It depends.  

Once a team has upgraded to HDS v7.0.0+ and started to use the light and dark modes, the product will look like a part of the larger IBM portfolio and thus the Carbon Design System.

There may be instances where the Carbon Design System offers a component or pattern that the Helios Design System does not, such as [Charts](https://www.carbondesignsystem.com/building-blocks/data-visualization/overview). When this happens, Designers will need to speak with their Engineering and Product teams to understand the level of effort for implementation. In Figma, use the [Carbon Design System components](https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/-v11--Carbon-Design-System?m=auto) directly. In code, there are two paths:

- Use [Carbon Web Components](https://github.com/carbon-design-system/carbon/tree/main/packages/web-components).
    - [Read more about using Carbon Web Components](https://ibm.sharepoint.com/:w:/r/sites/hermes/Shared%20Documents/DraftDocuments_New/DS-Results%20from%20Carbon%20Web%20Component%20explorations%20with%20Helios.docx?d=w5c2f002b75784fdfbf3f32bf1bf52c44&csf=1&web=1&e=eccWb9).
- Collaborate with the HDS team to implement the missing component/pattern in Ember.
    - **This does not mean that HDS will build it.** Our involvement would depend on the current roadmap. If we can’t build it, we can collaborate with the team that is and may even consider bringing the final implementation into HDS for others to use.

## FAQ

**Why not adopt Carbon directly?**

Most HashiCorp products use Ember.js, which Carbon does not support (Carbon only provides React and Web Components). We explored bringing Carbon's Web Components into our Ember codebases, but encountered fundamental architectural incompatibilities with Ember's routing, data flow, rendering, and lifecycle models.

**Will HDS be deprecated?**

No. We are transitioning to a local system model where Helios remains the official implementation for HashiCorp products while aligning visually and semantically with Carbon.

**Can I still submit feature requests and bug fixes?**

Absolutely. Send requests to the HDS team for triage. While we focus on the Carbon migration, we may prioritize fewer new features, but we will continue to prioritize bug fixes.

## Get in touch

Contact us on Slack at [#proj-hds-carbon](https://ibm.enterprise.slack.com/archives/C09L3JNMG2G) or visit the [support page](/about/support) for other ways to get in touch with us.
