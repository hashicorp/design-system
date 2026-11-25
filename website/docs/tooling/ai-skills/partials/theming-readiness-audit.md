## Theming readiness audit

!!! Warning

**Experimental**

This skill is experimental. It has limitations and may change as we learn from usage.

!!!

The `theming-readiness-audit` skill reviews your application's components and styles and identifies what may need to change to support light and dark themes.

Theming allows applications to switch between visual appearances at runtime, e.g., light and dark. Introduced in HDS [v7.0](/whats-new/release-notes#700), it supports our transition from the "classic" Helios visual language to [IBM's visual language](https://www.ibm.com/design/language/). For more details about theming in HDS/Carbon, how it works, and how it could be used in your application, see [From Helios to Carbon](/carbonization/introduction) and [theming foundations](/foundations/theming).

[Download the `theming-readiness-audit` skill (.zip)](/assets/tooling/ai-skills/theming-readiness-audit-skill-v1.zip)

### Theme-responsive styles

Certain styles in applications will need to be updated to support the introduction of light and dark themes, and further alignment to the IBM visual language.

Any hard-coded styles for values like colors, typography, border radius, etc. will not respond to theming. These need to be evaluated for potential updates to use HDS tokens.

Additionally, [HDS core palette colors](/foundations/colors?tab=palette#core-palette), of the format `--hds-core-color`, have fixed values that don't change across themes. For this reason, core colors should be migrated to use [semantic color tokens](/foundations/colors?tab=palette#semantic-tokens), if possible, and be used **only** when an appropriate semantic token isn't available.

The skill contains two sets of core-to-semantic token maps. The first includes all 1:1 aliases between core and semantic tokens where the core token can be directly replaced with a semantic one. The second token map contains suggested core-to-semantic migrations. These migrations result in minor visual changes to existing HDS theme colors, but follow our suggestions on how to replace the usage of certain core tokens.

### What the skill does

- Review a repository's components and styles, and capture any styles that may not respond to theming.
- Review usage of `--hds-core-color` CSS variables and evaluate if there is a direct replacement or a suggested replacement.
- Generate an audit report with the full list of findings and suggested remediation steps.

To get support or report an issue, visit the [support](/about/support) page.
