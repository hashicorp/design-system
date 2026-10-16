!!! Warning

**Updates coming soon to Figma**

HDS UI Kit changes are in progress and will be published in the coming weeks. Join [#team-design-systems](https://ibm.enterprise.slack.com/archives/C09L2MVUL5S), [#proj-hds-carbon](https://ibm.enterprise.slack.com/archives/C09L3JNMG2G), or [#team-product-experience](https://ibm.enterprise.slack.com/archives/C09LT8MDCE4) for updates.

!!!

As HashiCorp products integrate into the IBM ecosystem, adopting a shared design language ensures a seamless, familiar experience for users—no matter where they are in that ecosystem.

To achieve this, the Helios Design System (HDS) is aligning with the [Carbon Design System](https://carbondesignsystem.com/), the foundation of the IBM product ecosystem.

## Overview

While our visual styling aligns with Carbon, our underlying components stay true to HDS best practices and patterns. The [Helios Design System UI Kit](https://www.figma.com/files/902667414815738345/team/1030156573400567478) remains our **recommended and preferred kit**.

This approach makes HashiCorp products *look and feel* like IBM products without altering the underlying component APIs, best practices, or patterns defined in HDS. Continuing to use the HDS UI Kit ensures your Figma designs map directly to the Ember components.

## What's changing in Figma

You'll notice a few key updates in Figma:

- Addition of component variables
- Relocation of foundational variables into the Components v2.0 library
- Introduction of design modes

### Component variables

While we have supported [variables](https://help.figma.com/hc/en-us/articles/14506821864087-Overview-of-variables-collections-and-modes) since v2.0, we have now added component variables to support modes.

You can generally ignore these variables. However, if you build custom components or heavily modify existing ones, using component-level variables gives you built-in theming and consistency with HDS, saving you from defining custom tokens for every mode.

[TODO: add example]

See our [color guidelines](/foundations/colors) to learn more about HDS tokens.

### Foundational variables have moved

To co-locate all variables, we moved the foundational variables (`foreground-color`, `surface-color`, etc.) into the [Components v2.0 library](https://www.figma.com/design/iweq3r2Pi8xiJfD9e6lOhF/HDS-Components-v2.0?m=auto). We are deprecating the [Foundations v2.0 library](https://www.figma.com/design/uX4OEaJQdWfzULADchjAeN/HDS-Foundations-v2.0?m=auto) and will sunset it completely at a later date.

### Modes and themes

To support our shared design language, we introduced [modes](https://help.figma.com/hc/en-us/articles/14506821864087-Overview-of-variables-collections-and-modes#variable_modes) into the [HDS Components v2.0 library](https://www.figma.com/design/iweq3r2Pi8xiJfD9e6lOhF/HDS-Components-v2.0?m=auto). These modes control brand and color themes across HDS libraries:

- **HDS (Legacy)**: The default mode for existing designs.
- **CDS-0 (Recommended)**: Carbon's lightest theme.
- **CDS-10**: Carbon's secondary light theme.
- **CDS-90**: Carbon's secondary dark theme.
- **CDS-100 (Recommended)**: Carbon's darkest theme.

!!! Info

`cds-10` and `cds-90` are secondary theme variants available within Carbon. While some teams are already exploring them, we recommend HashiCorp products use `cds-0` for light mode and `cds-100` for dark mode. We will update this guidance as details about Carbon v12 become public.

!!!
