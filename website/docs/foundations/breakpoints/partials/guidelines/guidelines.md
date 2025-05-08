## Breakpoints

Breakpoints are the foundational blocks to responsive design. They are defined as the viewport widths/heights where page layouts adjust for varied screen size experiences. While both horizontal and vertical breakpoints can be used in responsive design, the standardization of these values will only be focused on the widths. 

These values are then used to create utilities and components to help standardize the re-adjusting of UI at different standardized screen sizes.

### The ranges

There are five defined breakpoints and they are: `sm`, `md`, `lg`, `xl`, and `xxl`.

| Name   | Value        | Application                   |
| ------ | ------------ | ----------------------------- |
| sm     | 480px        | 480 → 767                     |
| md     | 768px        | 768 → 1087                    |
| lg     | 1088px       | 1088 → 1439                   |
| xl     | 1440px       | 1440 → 1919                   |
| xxl    | 1920px       | 1920 and up                   |

When a breakpoint name is mentioned, it isn't only referencing the exact starting pixel value, instead, it is for the range of its application. This helps simplify language around what these ranges mean when designing. Implemention of these breakpoints has more flexibility and can be explored further in the Code tab.

### Working with custom values

The ranges provided are to create a cohesive *starting* experience. Although, in some rare circumstances a custom value may be needed to accomodate for specific use-cases that these values do not cover. For example: a team has learned that users with 2500px viewports started using a specific product, and require a nuanced approach in displaying the UI at that screen size. In cases like this, a value may be added on top of the established values to provide additional nuance to that experience.

!!! info

If a custom value already exists that is relatively close to an established range, it is recommended that it be migrated to the nearest standard breakpoint. This way, experiences become consistent and predictable for the user as they work within (and across) the HashiCorp product suite.

!!!


## Designing with purpose

Not all designs require redesigning at each of these breakpoints. Only when designs are considered complicated and/or constrained by UI placement should a designer take the time to show how they change as the viewport decreases in size. 

An example of this would be that a table-centered experience may not require additional UI adjustment at the `lg`, `xl`, and `xxl` breakpoints. The expectated beahvior for the table is to maintain its full width regardless of the breakpoint value, and that a design isn't required to elaborate this standard behavior.

![Wireframed table shown expanding in size.](/assets/foundations/breakpoints/breakpoints-table-example.png)

An example of a UI changing over varied screen sizes would be a landing page where cards are aligned and styled in an asymetric manner. As the screen size decreases, the cards not only shift, but the content within them does as well. This would be considered a complicated UI that requires more naunced designing at all breakpoints. In a scenario like this, designers would be expected to elaborate how this experience is adjusted in the `sm`, `md` and `lg` (if not more) screens.

![Three varied screen sizes of large, medium and small. In large, there are four rows of cards, the first with one, the second with two, the third with three and the fourth with four. In medium, the first and third rows have one card while the second and fourth have two. The small, there is only one card in each row.](/assets/foundations/breakpoints/breakpoints-card-designs-shfting.png)
