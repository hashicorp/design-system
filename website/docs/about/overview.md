---
title: Overview
caption: Get an overview of the design system.
description: Learn about the HashiCorp Design System, why it exists, and the strategy behind the system.
order: 101
---

## What is a design system?

A design system is a set of guidelines, standards, assets, and processes to help organizations rapidly design, build, and deploy products in a consistent manner.

Design systems are often equated with a UI kit or component library; in reality an effective design system spans the entire lifecycle of a product through ideation to iteration and everything in between.

## Architecture

While the scale of a design system largely depends on the needs of those consuming it, the fundamental structure and architecture remains largely the same across systems.

- **Visual Language**: colors, typography, icons, imagery, content strategy
- **Components**: component design, component development, tokens, development standards
- **Patterns**: repetitive combinations of components and foundational styles that yield more complex functions and features
- **Documentation**: education, issue tracking, contribution, content management, processes

At HaschiCorp we structure our components, icons, and design tokens in a [monorepo](https://github.com/hashicorp/design-system) using yarn workspaces and publish a collection of libraries in [Figma](https://www.figma.com/files/team/1030156573400567478) for designers.

## Why use the HashiCorp Design System?

While increasing visual and functional consistency across products is the most visibly notable result of design system adoption, the intrinsic value a design system brings can result in complimentary benefits:

- Increased velocity in the design and development of new products and features
- Dismantling of silos between departments that adopt and use the system
- More time spent on solving complex problems, less time spent on duplicative work rebuilding small atoms and molecules
- Components, foundations, and usage guidelines published by the the HashiCorp Design System meet or exceed WCAG 2.1 AA conformance out of the box in accordance with our [accessibility statement](/about/accessibility-statement).

## Our consumers

HashiCorp develops and maintains a number of different products with varying sub-brands and approaches to the user experience. In an effort to bring these different product lines and teams towards a common visual language and single source of truth, the HashiCorp Design System was born.

Adoption of the HashiCorp Design System across teams is driven by a number of high-value user personas to identify convergence across products:

- HashiCorp products are rich in data and often showcase complex objects, functions, and onboarding procedures
- HashiCorp personas are largely comprised of highly-technical users with advanced engineering and system adminstrator roles.
- While HashiCorp users are technical and have experience with complex user interfaces, they have limited time and need to accomplish tasks quickly.
- A subset of HashiCorp users are in decision-making roles and benefit from viewing high-level metrics when making informed financial decisions.

The HashiCorp Design System is tasked with bringing different product lines closer to a single source of truth in visual language, user experience, and developer experience, and is adopted at varying levels by all products within the R&D organization. We work closely with these teams at the integration and implementation level while collecting feedback to better understand consumer needs and inform our [roadmap](https://go.hashi.co/hds-rollout).

For more information on adoption, visit our getting started documentation (for [engineers](/getting-started/for-engineers) and [designers](/getting-started/for-designers)) or visit our public [GitHub](https://github.com/hashicorp/design-system) repository.

## Resources

### Design system inspiration

As part of our design process we analyze and compare the strategy and implementation of prominent design systems across industries. These examples inspire us and helped paved the way for the design system community.

- [Carbon Design System (IBM)](https://carbondesignsystem.com/)
- [Polaris Design System (Shopify)](https://polaris.shopify.com/)
- [Material Design (Google)](https://m3.material.io/)
- [Pajamas Design System (GitLab)](https://design.gitlab.com/)
- [Primer Design System (GitHub)](https://primer.style/)
- [Atlassian Design System](https://atlassian.design/)

### Additional reading

- [Design Systems 101 (NNGroup)](https://www.nngroup.com/articles/design-systems-101/)
- [Designing with a system (Shopify)](https://polaris.shopify.com/contributing/designing-with-a-system)
- [How Carbon works (IBM)](https://next.carbondesignsystem.com/about-carbon/how-carbon-works#the-carbon-ecosystem)
