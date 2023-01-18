When choosing what colors to use, we recommend starting with semantic colors as their usage is clearly defined and common color pairings are accessible out of the box.

## Using semantic colors

Semantic color tokens help ensure proper color usage across applications by building the meaning directly into the token name. 

![example of semantic colors in context](/assets/foundations/color/color-tokens-example.png =660x*)

### Foreground
Foreground colors are for text, links, icons, etc. For example:

- `Foreground/Primary` is used for primary text elements or elements that sit on top of a surface background.
- `Foreground/Action` is used for an actionable or interactive element within a component or page (e.g., a [Link](/components/link/standalone)).

### Border
Border colors are for borders on components or containers and for horizontal rules.

### Surface
Surface colors are for the main background (or surface) of a component or container. For example:

- `Surface/Primary` is used as the container background of a component.

### Page
Page colors are for page backgrounds. For example:

- `Page/Secondary` is used to highlight a section background on the main page. 

## Using palette colors

If you don’t find a semantic color that meets your needs, a set of base [`Palette`](/foundations/colors?tab=palette#core-palette) colors are also available. These styles are usage agnostic which can introduce challenges in consistently scaling a complex design, but allow more freedom and flexibility in color pairing.