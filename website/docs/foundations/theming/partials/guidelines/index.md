## How theming works in HDS

Theming allows applications to switch between visual appearances at runtime, e.g., light and dark. Introduced in HDS [v7.0](/whats-new/release-notes#700), it supports our transition from the "classic" Helios visual language to [IBM's visual language](https://www.ibm.com/design/language/).

See [From Helios to Carbon](/carbonization/introduction) for more details about this process.

We expect product teams to "carbonize" their applications at their own pace. Some applications will continue using the "classic" HDS visual language for some time. Others will start migrating and need both visual languages to coexist in the same application. Once fully migrated, they will use only the "carbonized" HDS visual language.

This means that two visual languages need to be supported in HDS at the same time:

- **"classic" HDS** is the original, light-only visual language. It doesn't have theming.
- **"carbonized" HDS** is the IBM Carbon visual language applied to HDS. It supports light and dark variants, more precisely described as color modes.

## Themes and modes

We distinguish between two related concepts:

- A **theme** is what an application exposes to its users: `default` (the "classic" HDS appearance), `light`/`dark` (the IBM Carbon-like appearance), and `system` (light or dark appearance based on the user's operating system preference).
- A **mode** is the underlying IBM Carbon configuration that provides the values for a Carbon `light` or `dark` theme: `cds-g0` or `cds-g10` for `light`, `cds-g90` or `cds-g100` for `dark`.

Themes and modes are related but not interchangeable. A theme is a product-facing choice, while a mode is the underlying configuration used to render that choice.

Applications can support different sets of themes and modes depending on their needs and stage of migration, but in general most products should expose themes rather than individual modes to their end users.

## Applying themes

A theme applies a coordinated set of HDS values across an application. It is not limited to swapping individual colors. Components and foundations can change together to support the selected visual language and appearance.

Use one theme for the application by default. A local theme can be applied to a bounded portion of the interface when it has a clear and durable purpose, such as application chrome. Avoid using local themes only to add decorative contrast or to compensate for unsupported styling.

For implementation details, see the [Code](?tab=code) tab. For guidance on the user interface and behavior of a theme switcher, see the [theme selection pattern](/patterns/theme-selection).

## Adopting theming

Adopting theming is part of the broader process of ["carbonizing" an application](/carbonization/introduction). This process is typically gradual because it requires updating the visual language of an existing application. Before you begin, [contact the Design Systems Team](/about/support) to plan the migration.

The migration of existing applications usually progresses through three stages.

1. **Not yet migrated:** Applications can continue to use the "classic" visual language until they are ready to begin the migration.
2. **Migrating:** Applications can support the "classic" and "carbonized" visual languages at the same time while product teams migrate their interfaces incrementally. Treat this as a temporary migration state. Coordinate the initial effort with the [Design Systems Team](/about/support).
3. **Fully migrated:** Once an application is fully migrated, it uses the "carbonized" visual language and supports the themes that the product has chosen to expose.
