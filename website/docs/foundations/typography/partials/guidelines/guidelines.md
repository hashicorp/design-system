## How typography is referenced

The construction of typographic styles varies heavily depending on context and tooling. This overview will clarify how HDS typography standards are implemented in different tools.

In Figma, reusable text styles are called “Text Styles” and are categorized and stored in the “text panel” to be used in text-based elements. Text styles directly reference font family, weight, line height, size, and many other text-based properties within a single style and are manually maintained. Some Figma styles include:

- `Display/500/Bold`
- `Body/300/Regular`
- `Code/300/Regular`

In code, these styles are constructed differently, using “Tokens.” Tokens are generated from an agnostic JSON file and differ from Figma “Text Styles” because a single token does not reference multiple font properties. Instead, each Token defines the different properties of a single text style. This means that constructing the equivalence of Figma’s Text Style `Display/500/Bold` would utilize the following tokens:

- `font-family: var(--token-typography-display-500-font-family);`
- `font-size:var(--token-typography-display-500-font-size);`
- `line-height:var(--token-typography-display-500-line-height);`
- `font-weight:var(--token-typography-font-weight-bold);`

Rather than calling upon each of these tokens in code every time text is styled, the [Text Component](/components/text) was created to replicate how Figma styles group text-based properties.

## Font families

Helios uses the default system fonts available on each OS. These system fonts are stable and support internationalization, code, tabular data, data visualization, etc. Additionally, they improve performance by reducing the number of resources to be loaded, which is important for large applications like those at HashiCorp.

While text styling varies slightly across operating systems, users will have a consistent and expected experience within each OS.

### Sans-serif

![sans-serif on mac](/assets/foundations/typography/sans-serif-mac.png =660x*)

![sans-serif on windows](/assets/foundations/typography/sans-serif-windows.png =660x*)

![sans-serif on linux](/assets/foundations/typography/sans-serif-linux.png =660x*)

### Monospace

![monospace on mac](/assets/foundations/typography/monospace-mac.png =660x*)

![monospace on windows](/assets/foundations/typography/monospace-windows.png =660x*)

![monospace on linux](/assets/foundations/typography/monospace-linux.png =660x*)

## Font weights

In addition to font size, font weight helps create different levels of emphasis throughout the UI. Font weights include:

- 400 (regular)
- 500 (medium)
- 600 (semi bold)
- 700 (bold)

Within these ranges, bold is used only for display and some code text styles, while regular is associated with body text styles which may include code.

## Text styles

### Display

Display styles should be used for headings or hierarchical emphasis (like remaining balances). Unless used for hierarchical emphasis, if the display text looks like a page heading, it should use an [HTML heading tag](https://www.w3.org/WAI/WCAG22/Understanding/section-headings.html).

Display text styles are available in the following sizes and weights:

![Display 500 at 30px font size, with bold font weight. Display 400 at 24px font size, with bold, semibold and medium font weights. Display 300 at 18px font size, with bold, semibold and medium font weight. Display 200 at 16px font size, with semibold font weight. Display 100 at 13px font size, with medium font weight.](/assets/foundations/typography/typography-display-options.png)

### Body

Body styles should be used for all general page content. Commonly placed within components (like buttons) and blocks of text, this style supports different font weights and sizes to establish a clear visual hierarchy. Body 200 is used as the default body content size as the majority of HashiCorp products are data dense. Body 100 is often used as secondary text for hierarchical purposes while Body 300 is used for bigger UI elements like the `large` variant of the `Button` component.

Body text styles are available in the following weights and sizes:

![Body 300 at 16px font size, with semibold, medium and regular font weights. Body 200 at 14px font size, with semibold, medium and regular font weights. Body 100 at 13px font size, with semibold, medium and regular font weights.](/assets/foundations/typography/typography-body-options.png)

### Code

Code styles are used exclusively for text representing code in the UI (like the [Code Block component](/components/code-block)). 

Code text styles come in the following weights and sizes:

![Code 300 at 16px font size, with bold and regular font weights. Code 200 at 14px font size, with bold and regular font weights. Bode 100 at 13px font size, with bold and regular font weights.](/assets/foundations/typography/typography-code-options.png)

## How typography is used

### Body content

Body 200 is the default font size for body content. Scaling up or down is used as a means to create visual hierarchy in page UI, or component usage. As an example, Helio’s `Button`, `medium` (default) variant is sized at Body 200 while the `large` variant is Body 300.

![Two buttons, one medium and one large](/assets/foundations/typography/typography-button-example.png)

Similarly, form fields’ labels and input texts are Body 200, while any other secondary information, like helper text or error messages are sized at Body 100. This ensures that from a hierarchy perspective, the primary information is more prominent with the larger size of the two.

![A form field set with label, helper text an input field errored out along with an error message.](/assets/foundations/typography/typography-form-example.png)

For more details about form patterns, read the [form patterns](/patterns/form-patterns) documentation for additional details.

### Semantic heading or not?

Even though Helio’s Text Component does not equate a specific style (Body, Display, or Code) with a specific HTML semantic structure (like `<p/>`, `<h1/>` or `<span>`), this is up to the consumer to define the logical order in which the text is being displayed as. To ensure accessible page content, the scaling of the Display styles often are associated with the scaling of the HTML headings such as:

- Display 500 -> H1
- Display 400 -> H2
- Display 300 -> H3
- Display 200 -> H4
- Display 100 -> H5

However, there are instances where a Display text style will be used as a means to communicate something of value that is not a page heading. This is used to emphasize an important piece of information, such as remaining balances, so that users are able to visually understand the level of importance of this information on the page.

![A piece of UI showing primarily an account balance, highlighting the differences between the two display styles. One a heading and the other one not.](/assets/foundations/typography/typography-remaining-balance-example.png)

An important note: The page is still following the semantically correct logical order of headings, where “Total period usage” is a heading (an H3 with semibold weight), while the balance below it is not (medium weight as a span or paragraph). Font weight is used to create the visual hierarchy here instead size.