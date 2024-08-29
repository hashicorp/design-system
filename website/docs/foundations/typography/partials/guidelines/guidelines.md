## How typography is referenced

Typography styles change based on the tool. This overview explains how HDS typography standards work in each tool.

In Figma, reusable text styles are called “Text Styles” and are categorized and stored in the “text panel” to be used in text-based elements. Text styles directly reference font family, weight, line height, size, and many other text-based properties within a single style and are manually maintained. Some Figma styles include:

- `Display/500/Bold`
- `Body/300/Regular`
- `Code/300/Regular`

In code, these styles are constructed differently using “Tokens.” Tokens are generated from an agnostic JSON file and differ from Figma “Text Styles” because a single token does not reference multiple font properties. Instead, each Token defines the different properties of a single text style. This means that constructing the equivalence of Figma’s Text Style `Display/500/Bold` would use the following tokens:

- `font-family: var(--token-typography-display-500-font-family);`
- `font-size:var(--token-typography-display-500-font-size);`
- `line-height:var(--token-typography-display-500-line-height);`
- `font-weight:var(--token-typography-font-weight-bold);`

Rather than calling upon each of these tokens in code every time text is styled, the [Text Component](/components/text) was created to replicate how Figma styles group text-based properties. Additional [CSS helper classes](https://helios.hashicorp.design/foundations/typography?tab=code#css-helper-classes) have been created to ease the style creation process, if necessary.

## Font families

In code, Helios uses default system fonts because they are stable, support internationalization, and improve performance by reducing resource load—key for large applications at HashiCorp.

In Figma, our design tooling and libraries use SF Pro font family exclusively and we recommend using this font stack for consistency.

While text styling varies slightly across operating systems, users will have a consistent and expected experience within each OS.

### Sans-serif

#### Mac + iOS sans-serif font

Large text (20px and above): SF Pro Display

![](/assets/foundations/typography/typography-sans-serif-display-mac.png)

Small text (19px and lower): SF Pro Text

![](/assets/foundations/typography/typography-sans-serif-mac.png)

#### Windows sans-serif font

Large text (20px and above): Segoe UI Display

![](/assets/foundations/typography/typography-sans-serif-display-windows.png)

Small text (19px and lower): Segoe UI Text

![](/assets/foundations/typography/typography-sans-serif-windows.png)

#### Linux sans-serif font

Linux sans-serif system font dependant on the Linux distribution

![](/assets/foundations/typography/typography-sans-serif-linux.png)

### Monospace

#### Mac + iOS monospace font

Safari 13+: SF Mono

![](/assets/foundations/typography/typography-monospace-safari-13-mac.png)

All else: Menlo

![](/assets/foundations/typography/typography-monospace-menlo-mac.png)

#### Windows

Consolas

![](/assets/foundations/typography/typography-monospace-menlo-mac.png)

#### Linux

Linux monospace system font dependant on the Linux distribution

![](/assets/foundations/typography/typography-monospace-linux.png)

## Font weights

In addition to font size, font weight helps create different levels of emphasis throughout the UI. Font weights include:

- 400 (regular)
- 500 (medium)
- 600 (semi bold)
- 700 (bold)

Within these ranges, bold is used only for display and some code text styles, while regular is associated with body text styles which may include code.

## Text styles

### Display

Display styles should be used for headings or visual emphasis (like remaining balances). Unless used for visual emphasis, if the display text looks like a page heading, it should use an [HTML heading tag](https://www.w3.org/WAI/WCAG22/Understanding/section-headings.html).

Display text styles are available in the following sizes and weights:

<ul class="doc-typography-demo-display-list">
    <li class="hds-typography-display-500 hds-font-weight-bold doc-typography-list-item-gap">Display 500 (30px) - Bold</li>
    <li class="hds-typography-display-400 hds-font-weight-bold">Display 400 (24px) - Bold</li>
    <li class="hds-typography-display-400 hds-font-weight-semibold">Display 400 (24px) - Semibold</li>
    <li class="hds-typography-display-400 hds-font-weight-medium doc-typography-list-item-gap">Display 400 (24px) - Medium</li>
    <li class="hds-typography-display-300 hds-font-weight-bold">Display 300 (18px) - Bold</li>
    <li class="hds-typography-display-300 hds-font-weight-semibold">Display 300 (18px) - Semibold</li>
    <li class="hds-typography-display-300 hds-font-weight-medium doc-typography-list-item-gap">Display 300 (18px) - Medium</li>
    <li class="hds-typography-display-200 hds-font-weight-semibold doc-typography-list-item-gap">Display 200 (16px) - Semibold</li>
    <li class="hds-typography-display-100 hds-font-weight-semibold">Display 100 (13px) - Medium</li>
</ul>

### Body

Body styles should be used for all general page content. Commonly placed within components (like buttons) and blocks of text, this style supports different font weights and sizes to establish a clear visual hierarchy. Body 200 is used as the default body content size as the majority of HashiCorp products are data dense. Body 100 is often used as secondary text for hierarchical purposes while Body 300 is used for bigger UI elements like the `large` variant of the Button component.

Body text styles are available in the following weights and sizes:

<ul class="doc-typography-demo-display-list">
    <li class="hds-typography-body-300 hds-font-weight-semibold">Body 300 (16px) - Semibold</li>
    <li class="hds-typography-body-300 hds-font-weight-medium">Body 300 (16px) - Medium</li>
    <li class="hds-typography-body-300 hds-font-weight-regular doc-typography-list-item-gap">Body 300 (16px) - Regular</li>
    <li class="hds-typography-body-200 hds-font-weight-semibold">Body 200 (14px) - Semibold</li>
    <li class="hds-typography-body-200 hds-font-weight-medium">Body 200 (14px) - Medium</li>
    <li class="hds-typography-body-200 hds-font-weight-regular doc-typography-list-item-gap">Body 200 (14px) - Regular</li>
    <li class="hds-typography-body-100 hds-font-weight-semibold">Body 100 (13px) - Semibold</li>
    <li class="hds-typography-body-100 hds-font-weight-medium">Body 100 (13px) - Medium</li>
    <li class="hds-typography-body-100 hds-font-weight-regular">Body 100 (13px) - Regular</li>
</ul>

### Code

Code styles are used exclusively for text representing code in the UI (like the [Code Block component](/components/code-block)). 

Code text styles come in the following weights and sizes:

<ul class="doc-typography-demo-display-list">
    <li class="hds-typography-code-300 hds-font-weight-bold">Code 300 (16px) - Bold</li>
    <li class="hds-typography-code-300 hds-font-weight-regular doc-typography-list-item-gap">Code 300 (16px) - Regular</li>
    <li class="hds-typography-code-200 hds-font-weight-bold">Code 200 (14px) - Bold</li>
    <li class="hds-typography-code-200 hds-font-weight-regular doc-typography-list-item-gap">Code 200 (14px) - Regular</li>
    <li class="hds-typography-code-100 hds-font-weight-bold">Code 100 (13px) - Bold</li>
    <li class="hds-typography-code-100 hds-font-weight-regular">Code 100 (13px) - Regular</li>
</ul>

## How typography is used

### Body content

Body 200 is the default font size for body content. Scaling up or down is used as a means to create visual hierarchy in page UI, or component usage. As an example, the Button, `medium` (default) variant is sized at Body 200 while the `large` variant is Body 300.

![Two buttons, one medium and one large](/assets/foundations/typography/typography-button-example.png)

Similarly, form fields' labels and input texts are Body 200, while any other secondary information, like helper text or error messages are sized at Body 100. This ensures that primary information is more prominent with the larger size for visual hierarchy.

![A form field with label, helper text, an input field in an error state, and an error message.](/assets/foundations/typography/typography-form-example.png)

For more details about form patterns, read the [form patterns](/patterns/form-patterns) documentation.

### Semantic heading or not?

The [Text](/components/text) component does not equate a specific style (Body, Display, or Code) with a specific HTML semantic structure (like `<p/>`, `<h1/>` or `<span>`), it is up to the consumer to define the logical semantic element for the each piece of text. To ensure accessible page content, the scaling of the Display styles often are associated with the scaling of the HTML headings such as:

- Display 500 → H1
- Display 400 → H2
- Display 300 → H3
- Display 200 → H4
- Display 100 → H5

In general we recommend mapping Display font sizes sequentially to markup, but this is not always possible. Additionally, Display text styles do not always need to be headings. They may be used to emphasize important information, such as remaining balances, so that users are able to visually understand the level of importance of information on the page.

![A piece of UI showing primarily an account balance, highlighting the differences between the two display styles. One a heading and the other one not.](/assets/foundations/typography/typography-remaining-balance-example.png)

An important note: The card is still following the semantically correct logical order of headings, where “Total period usage” is a heading (an H3 with semibold weight), while the balance below it is not (medium weight as a span or paragraph). Font weight is used to create the visual hierarchy here instead size.