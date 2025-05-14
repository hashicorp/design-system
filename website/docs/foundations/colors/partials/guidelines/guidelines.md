## Color tokens

Color-naming syntax and usage can vary depending on context and tooling. Naming conventions within our system allow us to implement standards in our libraries.

In Figma, we use Variables to define and organize color values. Variables allow us to create palettes that reference (or alias) each other. Our Core Palette is a collection of HEX values and their color ramps (`neutral-50`, `neutral-100`,...`neutral-700`). These values are connected to Semantic Variables. This alias connection allows us to designate multiple token uses for individual HEX values that lead back to the same Core Palette token.

Tokens in code are generated from platform-agnostic files, in our case JSON, and create atomic colors regardless of what platform or framework is used. Core Palette colors like `--token-color-palette-neutral-600` are directly referenced in `--token-color-foreground-primary`in the same way that Figma variables alias one another. 

![Diagram of token color inheritance with the levels (from left to right): hex code, core palette token, semantic token](/assets/foundations/color/colors-what-are-semantic-tokens.png)

## What are semantic colors?

The Semantic Palette embeds meaning into color names, which makes it easier to select proper color values and maintain consistent use across applications.

Semantic colors should be used for the purpose in their name. These colors are designed to meet accessibility standards when used in combination with one another. 
- Foreground colors are intended to be used with surface or page colors.
- Status color values have "surface," "on-surface," and "high-contrast" options to meet accessibility standards when used together. 

Some examples of semantic color combinations with their respective contrast ratios are:
- `Foreground/Strong` on `Surface/Primary` nets a ratio of 19.54:1
- `Foreground/Success-on Surface` on `Surface/Success` nets a ratio of 5.37:1
- `Foreground/Primary` on `Surface/Primary` nets a ratio of 10.82:1
- `Foreground/Action` on `Surface/Faint` nets a ratio of 4.86:1

![A Card component with the color contrast ratios for each of the color combinations labelled](/assets/foundations/color/colors-semantic-tokens-accessibility-examples.png)

### How are semantic names created

In semantic token naming, the **element** and the **role** are defined to make color decisions easier and more consistent.

HDS organizes semantic tokens into **element** categories with **roles** appended.

![Columns showing how the token name is broken down into a prefix, element, and role](/assets/foundations/color/colors-semantic-token-naming.png)

Examples of **element** naming include:

- **Foreground** - For text, link, status, and icon elements
- **Border** - For borders (or strokes) on components, containers, or dividers
- **Surface** - For the background (or surface) of a component or container
- **Page** - For page backgrounds

Examples of **role** in naming include: 

- Strong
- Primary
- Faint
- Action (not to be used outside of context)
- Disabled (not to be used outside of context)

### Foreground

Foreground colors are used for decorative and informational elements such as text, links, and icons.

Some common examples of semantic foreground colors include:

- `Foreground/Strong` for headings and secondary links
- `Foreground/Primary` for body text 
- `Foreground/Faint` for less prominent text and UI elements.
- `Foreground/Action` for primary calls to action such as links

![Samples of text with their color tokens labelled](/assets/foundations/color/colors-foreground-examples.png)

Status foreground colors contextualize responses from user actions or indicate status within a UI. These colors should be used sparingly and within the context of specific components, for example:

- [Alerts](/components/alert#color)
- [Toasts](/components/toast#color)
- [Badges](/components/badge#color).

![Sample positive, warning, and error status badges with their associated foreground color tokens labelled.](/assets/foundations/color/colors-status-examples.png)

### Border

Some examples of border colors include:

- `Border/Strong` for secondary Button border
- `Border/Primary` for Card border or divider
- `Border/{Status color}` for Alert borders

![Sample borders applied on a button, card, and alert with the border color tokens labelled](/assets/foundations/color/colors-border-examples.png)

### Surface

Surface colors are intended to be used for the background (or surface) of a component or container. 

Examples of surface colors include:

- `Surface/Strong` for the neutral Badge.
- `Surface/Primary` for component containers.
- `Surface/Faint` for the secondary Button.
- `Surface/{Status color}` for Alert backgrounds.

![Sample surface colors being applied to a badge, card, button, and alert with the surface color token labelled.](/assets/foundations/color/colors-surface-examples.png)

### Page

Page colors are used for page backgrounds. HDS components do not use these tokens; however, we recommend `Page/Primary` for all standard page backgrounds and `Page/Faint` as a means to create a secondary level on a page if necessary.

## Accessible color combinations

We are conformant with WCAG 2.2 Level AA requirements. For color contrast, this means a luminosity ratio of 4.5:1 for normal sized text, and 3:1 for large text (commonly 22px). Further details are outlined on [WCAG’s understanding of Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). 

HDS semantic color tokens provide accessible color combinations out of the box when used according to their naming conventions (`Surface/{Status color}`is compliant in combination with `Foreground/{Status color on surface}`). Using other color token combinations requires manual validation.

It is important to note that we [do not recommend the usage of disabled elements](/patterns/disabled-patterns), especially isolating disabled colors out of context, as they are not accessible.

### Using palette colors

If Semantic tokens do not meet your needs, the Core Palette is published for general use. These values are usage-agnostic, which can introduce challenges in consistently scaling designs but also allow more freedom and flexibility in color pairing. 

When pairing colors from the Core Palette, check that adjacent colors meet accessible contrast ratios. To validate your color combinations, use free tools like the [WebAIM contrast checker](https://webaim.org/resources/contrastchecker/) or [Stark’s Figma plugin](https://www.figma.com/community/plugin/732603254453395948/stark-contrast-accessibility-checker).
