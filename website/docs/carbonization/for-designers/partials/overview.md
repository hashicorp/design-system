!!! Warning

**Updates coming soon to Figma**

HDS UI Kit changes are in progress and will be published in the coming weeks. Join [#team-design-systems](https://ibm.enterprise.slack.com/archives/C09L2MVUL5S), [#proj-hds-carbon](https://ibm.enterprise.slack.com/archives/C09L3JNMG2G), or [#team-product-experience](https://ibm.enterprise.slack.com/archives/C09LT8MDCE4) for updates.

!!!

As HashiCorp products integrate into the IBM ecosystem, adopting a shared design language ensures a familiar experience for users across products. As such, the Helios Design System (HDS) is aligning with the [Carbon Design System](https://carbondesignsystem.com/), the foundation of the IBM product ecosystem.

While our visual styling aligns with Carbon, our underlying components stay true to HDS best practices and patterns. The [HDS UI Kit](https://www.figma.com/files/902667414815738345/team/1030156573400567478) remains our **recommended library**, ensuring your Figma designs map directly to Ember components.

## What is changing in Figma

Three major changes have been made in our Figma libraries to support Carbonization and theming:

- **Foundational variables relocated:** Foundational variables, e.g., `surface-color`, `foreground-color`, have been moved into the [Components v2.0 library](https://www.figma.com/design/iweq3r2Pi8xiJfD9e6lOhF/HDS-Components-v2.0?m=auto) to support theming. The [Foundations v2.0 library](https://www.figma.com/design/uX4OEaJQdWfzULADchjAeN/HDS-Foundations-v2.0?m=auto) is deprecated and will be sunset at a later date.
- **Design modes introduced:** [Modes](https://help.figma.com/hc/en-us/articles/14506821864087-Overview-of-variables-collections-and-modes#variable_modes) control brand and color themes across HDS libraries.
- **Component variables added:** While primarily intended for design system maintainers to support theming across HDS components, component [variables](https://help.figma.com/hc/en-us/articles/14506821864087-Overview-of-variables-collections-and-modes) are also public. They can be used to build custom components or patterns, maintaining built-in HDS consistency and automatic mode support.

## Available themes and modes

| Mode | Description |
| ---- | ----------- |
| `hds` (Legacy) | Default mode for existing designs |
| `cds-0` (Recommended) | Carbon's lightest theme |
| `cds-10` | Carbon's secondary light theme |
| `cds-90` | Carbon's secondary dark theme |
| `cds-100` (Recommended) | Carbon's darkest theme |

!!! Info

`cds-10` and `cds-90` are secondary theme variants available within Carbon. While some teams are already exploring them, we recommend HashiCorp products use `cds-0` for light mode and `cds-100` for dark mode. We will update this guidance as details about Carbon v12 become public.

!!!

See our [guidelines on theming](/foundations/theming) to learn how to use themes.
