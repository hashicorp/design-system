## Breakpoints

Breakpoints are the foundational blocks to responsive design. They are defined as the viewport widths/heights where page layouts adjust for varied screen size experiences. While both horizontal and vertical breakpoints can be used in responsive design, the standardization of these values will only be focused on horizontal experiences. 

These values arethen used to create utilities and components to help standardize the re-adjusting of UI at different defined screen sizes.

### The ranges

There are five defined breakpoints and they are: `sm`, `md`, `lg`, `xl`, and `xxl`.

| Name   | Value        | Application     |
| ------ | ------------ | --------------- |
| sm     | 480px        | 480 → 767       |
| md     | 768px        | 768 → 1087      |
| lg     | 1088px       | 1088 → 1439     |
| xl     | 1440px       | 1440 → 1919     |
| xxl    | 1920px       | 1920 and up     |

When a breakpoint name is mentioned, it isn't referencing the exact starting pixel value, instead, it is for the range of its application. For example, when mentioning `sm`, the reference is for the pixel range of 480 to 767 instead of only the starting value of 480.

### Working with custom values

The ranges provided are to create a cohesive *starting* experience. Although, in some rare circumstances a custom value may be needed to accomodate for specific use-cases that these values do not cover. For example: a product has learned that users with 2500px viewports started using a specific product, and require a nuanced approach in displaying the UI at that screen size. In cases like this, a value may be added on top of the established values to provide additional nuance to the experience.

!!! info

If a custom value already exists that is relatively close to an established range, HDS recommends that it be migrated to the nearest standard breakpoint. This way experiences become consistent and predictable for the user as they work within (and across) the HashiCorp product suite.

!!!


## Designing with these in mind