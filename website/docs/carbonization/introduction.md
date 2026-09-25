---
title: From Helios to Carbon
navigation:
  order: 101
  label: From Helios to Carbon
related:
  - foundations/theming
  - patterns/theme-selection
---

## Aligning with IBM's design language

Following IBM's acquisition of HashiCorp, aligning on a shared visual and design language became an important step in our integration as a single organization. IBM has a mature design system called [Carbon Design System](https://carbondesignsystem.com/), which has been in use since 2015 and is the foundation of IBM's product ecosystem.

As HashiCorp products become part of that ecosystem, it's important that users experience them as consistent with the rest of IBM's portfolio — regardless of which product they're using or where in the IBM ecosystem they encounter HashiCorp. A shared design language is what makes that consistency possible.

### What this means for Helios

Helios is not going away. Over the past four years, the Design Systems Team has built a mature, accessible, and widely adopted design system that is foundational to every HashiCorp product. We're not starting from scratch.

Instead, we are transitioning to a **local system model**: Helios remains the official design system for HashiCorp products, while adopting IBM's visual language — the same visual language that underpins Carbon. This means HashiCorp products will look and feel like IBM products, while continuing to be built on the same technology stack.

In practical terms, this means:

- Foundations like colors, typography, spacing, and icons are being updated to match IBM's design language
- HDS components will be visually updated to reflect these new foundations
- Component APIs and behavior remain the same — this is a visual change, not an architectural one
- [Theming support](/foundations/theming) (including dark mode) is being introduced as a result of this alignment

### What this means for our consumers

For teams consuming HDS, the day-to-day workflow remains largely unchanged:

- Helios is still the official design system for HashiCorp products built with Ember
- The Helios documentation website, Figma UI Kits, and npm packages continue to be the source of truth
- Support channels and processes remain the same
- Component APIs are not changing — product code should not break

We'll continue to support and maintain HDS, prioritizing bug fixes and critical updates.

!!! Info

There is currently no requirement for HashiCorp products to migrate from Ember to React: framework decisions remain product-driven.

Similarly, there is no strict requirement to adopt the "carbonized" version of the HDS Design System, though if it's highly recommended to start planning for it.

!!!

#### What changes for designers

!!! Warning

TODO update this block

!!!

Product Designers will need to pull in Figma UI Kit updates (as they would normally do for a
new release) to obtain the new Foundations. If they’ve detached any HDS components,
patterns, or templates, or they have custom implementations, they will need to convert those to
the new foundations manually.

For more details, see [Carbonization for designers](/carbonization/for-designers).

#### What changes for engineers

!!! Warning

TODO update this block

!!!

Product Engineers will need to bump the version of any changed npm packages, as they would
normally do for a new release. They will need to update any existing local or custom styles or
components to adhere to the new visual language.

For more details, see [Carbonization for engineers](/carbonization/for-engineers).

## Project Solar

!!! Warning

**TODO**

- Add more content here!
- Move between "What this means for Helios" and "What this means for our consumers"?

!!!

The project to align Helios with IBM's design language is internally known as **Project Solar**. It's a collaboration between the HashiCorp Design Systems Team and IBM, including regular touchpoints with the Carbon Design System team.

The work is being done in phases. The first phase focuses on foundations — colors, typography, spacing, borders, elevation, and icons — and is the most visible: once complete, HashiCorp products will look like Carbon products, while continuing to use Helios components and patterns under the hood. Subsequent phases will address components and patterns more deeply.

## FAQ

**Why not just adopt Carbon directly?**

The vast majority of HashiCorp products are built with Ember.js, for which Carbon does not provide an official implementation, only for React and Web Components. We explored bringing Carbon's Web Components into our Ember codebases, but ran into fundamental incompatibilities with Ember's architecture (its routing, data flow, rendering, and lifecycle model don't map cleanly onto Web Components, at least not without significant refactoring or rearchitecting of the existing codebases).

**Will HDS be deprecated?**

No. The Helios Design System will not be deprecated as a whole. We are transitioning to a local system model where Helios remains the official implementation for HashiCorp products, while aligning visually and semantically with Carbon.

**Can I still submit feature requests and bug fixes?**

Absolutely. Please continue to submit your requests to the HDS team and we will triage them as they come in. As we focus on Project Solar, we will be prioritizing fewer new features and capabilities, but will continue to prioritize bug fixes.

## Get in touch

For questions about Project Solar, reach out on Slack at `#proj-hds-carbon` or visit the [support page](/about/support) for other ways to get in touch with the team.
