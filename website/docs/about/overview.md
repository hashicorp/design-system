---
title: Overview
caption: Get an overview of the design system.
description: Learn about the Helios Design System, why it exists, and the strategy behind the system.
navigation:
  order: 101
---

## What is a design system?

A design system is a set of guidelines, standards, assets, and processes to help organizations design, build, and deploy products rapidly and consistently.

Design systems are often equated with a UI kit or component library. In reality, an effective design system spans the entire lifecycle of a product, from ideation to iteration and everything in between.

## What is Helios

**Helios** is the design system developed by the HashiCorp Design System Team. It's commonly referred to as **HDS** for brevity.

Helios is available and recommended for all HashiCorp **product teams using Ember to build their applications**. We also support teams using alternative frameworks or libraries, such as HashiCorp Developer, via our design assets, tokens, and best practice guidance.

Using Helios ensures the different product lines use a common design language. We work closely with these teams on integration and implementation while collecting feedback to understand consumer needs better and inform our [roadmap](https://go.hashi.co/hds-rollout).

For more information on how to use the design system, visit our getting started guides for [designers](/getting-started/for-designers) and for [engineers](/getting-started/for-engineers) or visit our public [GitHub](https://github.com/hashicorp/design-system) repository.

## When to use Helios

### Consumer-facing products

Helios was specifically created for **consuming-facing products**.

All our **product teams** in HashiCorp have adopted Helios as the single source of truth for the design language, components, and patterns used to build the UIs of their consumer-facing products.

### Internal products

Helios is **not** meant to be used as a **general-purpose UI library**.

If you intend to use Helios for **internal products/tools** in HashiCorp, please [contact the Design Systems Team](/about/support) before starting: we need to discuss the implications for our system (it would increase the costs of change, maintenance, support, etc.)

### External products

Helios is **not** meant to be used **outside of HashiCorp**.

If you are **not an HashiCorp employee** and want to use the Helios design system as reference, you're more than welcome; but if you intend to use the Helios design system to build your own product/UI, know that we will not provide any form of support, and in any moment we may introduce changes to our assets or components that could potentially break your product/UI.

## Helios architecture

While the scale of a design system largely depends on the needs of those consuming it, the fundamental structure and architecture remain largely the same across systems.

In Helios, we offer the following:

- **Design Language**: colors, typography, icons, content strategy
- **Components**: component design, component development, tokens, development standards
- **Patterns**: repetitive combinations of components and foundational styles that yield more complex functions and features
- **Documentation**: education, issue tracking, contribution, content management, processes

We structure our components, icons, and design tokens in a [monorepo](https://github.com/hashicorp/design-system) using yarn workspaces and publish a collection of libraries in [Figma](https://www.figma.com/files/team/1030156573400567478).

## Benefits of using Helios

While increasing visual and functional consistency across products is the most visibly notable result of design system adoption, other benefits include the following:

- Increased velocity in the design and development of new products and features
- Dismantling silos between departments that adopt and use the system
- More time spent on solving complex problems, less time spent on duplicative work rebuilding small atoms and molecules
- Components, foundations, and usage guidelines published by the the Helios Design System meet or exceed WCAG 2.1 AA conformance out of the box in accordance with our [accessibility statement](/about/accessibility-statement)

## Resources

### Design system inspiration

These design systems inspire us and have paved the way for the greater design system community.

- [Carbon Design System (IBM)](https://carbondesignsystem.com/)
- [Polaris Design System (Shopify)](https://polaris.shopify.com/)
- [Material Design (Google)](https://m3.material.io/)
- [Pajamas Design System (GitLab)](https://design.gitlab.com/)
- [Primer Design System (GitHub)](https://primer.style/)
- [Atlassian Design System](https://atlassian.design/)

### Learn more about design systems

- [Design Systems 101 (NNGroup)](https://www.nngroup.com/articles/design-systems-101/)
- [Designing with a system (Shopify)](https://polaris.shopify.com/contributing/designing-with-a-system)
- [How Carbon works (IBM)](https://next.carbondesignsystem.com/about-carbon/how-carbon-works#the-carbon-ecosystem)
