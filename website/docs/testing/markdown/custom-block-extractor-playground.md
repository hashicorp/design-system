---
title: Custom block extractor playground
---

## Custom component extraction playground

This page is a regression and integration test suite for the Showdown pre-processing pipeline that handles `Doc::` and `Hds::` component blocks in markdown documentation.

### Test 1 - pre inside Doc::Layout (original bug)

<Doc::Layout @spacing="12px">
  <pre>TEST pre inside Doc::Layout</pre>
</Doc::Layout>

### Test 2 - div inside Doc::Layout

<Doc::Layout @spacing="12px">
  <div>TEST div inside Doc::Layout</div>
</Doc::Layout>

### Test 3 - table inside Doc::Layout

<Doc::Layout @spacing="12px">
  <table><tr><td>TEST table inside Doc::Layout</td></tr></table>
</Doc::Layout>

### Test 4 - multiple block children

<Doc::Layout @spacing="12px">
  <pre>block one</pre>
  <div>block two</div>
  <pre>block three</pre>
</Doc::Layout>

### Test 5 - Hds::Alert with block params (existing working case)

<Hds::Alert @type="inline" as |A|>
  <A.Title>Recommended button usage</A.Title>
  <A.Description>Lorem ipsum dolar sit amet.</A.Description>
  <A.Button @text="Your action" @color="secondary" @onClick={{this.noop}} />
  <A.Button @color="tertiary" @icon="arrow-right" @iconPosition="trailing" @text="Tertiary" />
</Hds::Alert>

### Test 6 - Hds::Alert with pre inside

<Hds::Alert @type="inline" as |A|>
  <A.Title>Alert with pre</A.Title>
  <A.Description><pre>Lorem ipsum.</pre></A.Description>
  <A.Generic><pre>Lorem ipsum.</pre></A.Generic>
</Hds::Alert>

### Test 7 - nested same-prefix Doc::ComponentApi

<Doc::ComponentApi as |C|>
  <C.Property @name="<[G].Error>" @type="yielded component">
    Container that yields its content.
    <Doc::ComponentApi as |C|>
      <C.Property @name="<[E].Message>" @type="yielded component">
        Inner nested component API.
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
</Doc::ComponentApi>

### Test 8 - pre inside Hds:: (block element inside Hds:: namespace)

<Hds::Alert @type="inline" as |A|>
  <A.Title>Alert with block content below</A.Title>
</Hds::Alert>

<Doc::Layout @spacing="16px">
  <pre>pre inside Doc::Layout after Alert</pre>
  <div>div after pre</div>
</Doc::Layout>

### Test 9 - simple self-closing (regression guard)

<Doc::Placeholder @text="self-closing" @width="100" @height="100" @background="transparent" />

### Test 10 - Doc::Banner with block content (uses contentBlocks extension)

!!! Info

**Note**

Some content inside a banner.

!!!

### Test 11 - Mix & Match of HTML and Ember

<div>
  <Doc::Layout @spacing="12px">
    <pre>example code</pre>
  </Doc::Layout>
</div>

<div>
  <Hds::Alert @type="inline" as |A|>
    <A.Title>Alert with pre</A.Title>
    <A.Description><pre>Lorem ipsum.</pre></A.Description>
    <A.Generic><pre>Lorem ipsum.</pre></A.Generic>
  </Hds::Alert>
</div>

<div>
  <Doc::Layout @spacing="12px">
    <pre>example code</pre>
  </Doc::Layout>
  <Hds::Alert @type="inline" as |A|>
    <A.Title>Alert with pre</A.Title>
    <A.Description><pre>Lorem ipsum.</pre></A.Description>
    <A.Generic><pre>Lorem ipsum.</pre></A.Generic>
  </Hds::Alert>
</div>

### Test 12 - Self-closing tags

Two consecutive custom self-closing tags (the original trigger for the trailing-newline fix):

<Doc::Layout @spacing="12px" />
<Hds::Alert @type="inline" />

A custom self-closing tag immediately followed by a plain HTML self-closing tag:

<Doc::Placeholder @text="before br" @width="100" @height="100" @background="transparent" />
<br />

A custom self-closing tag immediately followed by a markdown list (no blank line in source):

<Doc::Placeholder @text="before list" @width="100" @height="100" @background="transparent" />
- list item one
- list item two

A custom self-closing tag immediately followed by a blockquote:

<Doc::Placeholder @text="before blockquote" @width="100" @height="100" @background="transparent" />
> This is a blockquote after a self-closing component.

A custom self-closing tag at the very end of a section (no trailing content):

<Doc::Placeholder @text="last in section" @width="100" @height="100" @background="transparent" />

### Test 13 - same-line nested Hds:: open+close inside a block

`<Hds::Link::Inline>text</Hds::Link::Inline>` on a single line inside a block caused the inner
depth scanner's CLOSE_TAG_RE (line-start anchored) to miss the close tag, leaving the stack
unbalanced and eating the rest of the file.

<Hds::Alert @type="inline" @color="critical" as |A|>
  <A.Title>Form submission error</A.Title>
  <A.Description>Correct the formatting of the following fields:</A.Description>
  <A.Description>
  <Hds::Link::Inline @href="#" @color="secondary">Email address</Hds::Link::Inline>
  </A.Description>
</Hds::Alert>

### Test 14 - Doc::WcagList self-closing with a Mustache array attribute

A self-closing tag whose attribute contains a Mustache `{{array ...}}` expression — the
real-world pattern from every component's accessibility page.

<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.4.1" "1.4.3" "1.4.10" "1.4.11" "1.4.12" "2.1.1" "2.1.2" "2.2.1" "2.5.3" "4.1.2" "4.1.3" }} />

---

<Doc::A11ySupport />

### Test 15 - Doc:: string inside a Mustache expression (should NOT be extracted)

Text referencing `{{component "Hds::Alert"}}` inline — the extractor should ignore the quoted string inside the Mustache.

<Doc::Placeholder @text="test-15 ok" @width="100" @height="100" @background="transparent" />

### Test 16 - Doc:: string inside a @name attribute value (should NOT be extracted)

<Doc::ComponentApi as |C|>
  <C.Property @name="<Hds::Alert>" @type="string">
    The <code>Hds::Alert</code> component name inside an attribute value.
  </C.Property>
</Doc::ComponentApi>

### Test 17 - Doc:: inside a markdown inline code span (should NOT be extracted, rendered as literal text)

Use `<Doc::Layout>` to wrap items. And `<Hds::Alert>` for alerts.

### Test 18 - Doc:: inside a fenced code block (should NOT be extracted)

```hbs
<Doc::Layout @spacing="12px">
  <pre>example code</pre>
</Doc::Layout>
```

### Test 19 - self-closing with no space before />

<Doc::Placeholder @text="no-space-self-close" @width="100" @height="100" @background="transparent"/>

### Test 20 - legitimate paragraph content inside a Doc:: component (Pass 1 must NOT strip it)

<Doc::ComponentApi as |C|>
  <C.Property @name="someArg" @type="string">
    This property description has a paragraph inside.
  </C.Property>
</Doc::ComponentApi>

### Test 21 - Doc:: inside a !!! banner block

!!! Info

**Banner containing a component reference**

Use <Doc::Badge @type="neutral">Neutral</Doc::Badge> inside a banner.

!!!

### Test 22 - inline Doc::Badge alongside regular text (must stay inline, not extracted as block)

Here is an inline badge <Doc::Badge @type="neutral">Beta</Doc::Badge> inside a sentence.

### Test 23 - named blocks (Doc::ComponentApi with named block syntax in attribute)

<Doc::ComponentApi as |C|>
  <C.Property @name="<:head>" @type="named block">
    Named block description.
  </C.Property>
  <C.Property @name="</:body>" @type="named block">
    Another named block.
  </C.Property>
</Doc::ComponentApi>

### Test 24 - Pass 2 must NOT eat a legitimate paragraph before non-custom content

<Doc::Placeholder @text="test-24 ok" @width="100" @height="100" @background="transparent" />

Some paragraph text after a self-closing component. This paragraph must not be eaten.

### Test 25 - backtick code spans inside C.Property descriptions

<Doc::ComponentApi as |C|>
  <C.Property @name="href">
    <!-- backtick span with HTML tag name (`<a>` element) -->
    Pass a custom href for the link. (URL parameter that's passed down to the `<a>` element.)
  </C.Property>
  <C.Property @name="tag">
    <!-- backtick span with closing HTML tag (`</div>`) -->
    Renders as a `</div>` closing tag in the output.
  </C.Property>
  <C.Property @name="attr">
    <!-- backtick span with double-quoted attribute (`href="value"`) -->
    Sets the `href="https://example.com"` attribute on the element.
  </C.Property>
  <C.Property @name="attr">
    <!-- backtick span with single-quoted attribute (`type='button'`) -->
    Sets the `type='button'` attribute on the element.
  </C.Property>
  <C.Property @name="value">
    <!-- backtick span with Mustache expression (`{{this.value}}`) -->
    Accessed as `{{this.value}}` in the template.
  </C.Property>
  <C.Property @name="text">
    <!-- backtick span with ampersand (`&amp;` entity reference) -->
    Use `&amp;` to render a literal ampersand in HTML.
  </C.Property>
  <C.Property @name="complex1">
    <!-- multiple special characters in a single backtick span -->
    Example: `<input type="text" value='hello' {{onChange}} />`.
  </C.Property>
  <C.Property @name="complex2">
    <!-- multiple backtick spans -->
    Example: `<input type="text" value='hello' />` with `{{onChange}}` handler.
  </C.Property>
</Doc::ComponentApi>

### Test 26 - markdown links with various content in the link text inside C.Property descriptions

<Doc::ComponentApi as |C|>
  <C.Property @name="plain-link">
    <!-- plain text link — baseline -->
    See the [Ember guides](https://guides.emberjs.com/) for more information.
  </C.Property>
  <C.Property @name="code-in-link">
    <!-- backtick code span as the entire link text -->
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
  <C.Property @name="bold-in-link">
    <!-- bold as the entire link text -->
    See [**important reference**](https://guides.emberjs.com/) for details.
  </C.Property>
  <C.Property @name="mixed-code-bold-in-link">
    <!-- backtick code + bold mixed in link text -->
    This component supports use of [the `...attributes` **argument**](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
  <C.Property @name="italic-in-link">
    <!-- italic as the entire link text -->
    See [_italic reference_](https://guides.emberjs.com/) for details.
  </C.Property>
  <C.Property @name="link-mid-sentence">
    <!-- link appears mid-sentence alongside other markdown -->
    Accepts any [icon](https://helios.hashicorp.design/icons/library) name, or `false` for no icon.
  </C.Property>
  <C.Property @name="multiple-links">
    <!-- multiple markdown links in the same description -->
    See [`Button`](/components/button) and [`LinkStandalone`](/components/link/standalone) for related components.
  </C.Property>
  <C.Property @name="link-with-quotes-in-code">
    <!-- backtick code containing quotes inside a link -->
    Sets the [`href="https://example.com"`](https://guides.emberjs.com/) attribute.
  </C.Property>
  <C.Property @name="mixed-inline-in-link">
    <!-- multiple different inline syntaxes combined within a single [] — code + bold + italic + plain text -->
    See [the `@color` **argument** _values_](https://guides.emberjs.com/) for the full list.
  </C.Property>
</Doc::ComponentApi>

### Test 27 - Doc:: component inside a markdown blockquote

> <Doc::Placeholder @text="inside blockquote" @width="100" @height="40" @background="transparent" />

### Test 28 - Doc:: component inside a markdown list item

- <Doc::Placeholder @text="list item one" @width="100" @height="40" @background="transparent" />
- Plain list item
- <Doc::Placeholder @text="list item three" @width="100" @height="40" @background="transparent" />

### Test 29 - Doc:: component inside an HTML table cell

<table>
  <tr>
    <td>Label</td>
    <td><Doc::Placeholder @text="inside table cell" @width="100" @height="40" @background="transparent" /></td>
  </tr>
</table>

### Test 30 - Doc::Badge inline inside a heading

#### A heading with an inline <Doc::Badge @type="neutral">Badge</Doc::Badge> inside it

### Test 31 - Doc::Badge inline inside a list item alongside text

- A list item with an inline <Doc::Badge @type="neutral">Badge</Doc::Badge> alongside text
- Another <Doc::Badge @type="success">Success</Doc::Badge> item

### Test 32 - Doc::Layout with all children on a single line

<Doc::Layout @spacing="16px"><div>block 1</div><div>block 2</div><div>block 3</div></Doc::Layout>

### Test 33 - C.Property description with bold, backtick, and br mixed

<Doc::ComponentApi as |C|>
  <C.Property @name="color" @type="enum" @values={{array "neutral" "highlight" "success"}} @default="neutral">
    Sets the color scheme for `background`, `border`, `title`, and `description`, which **cannot** be overridden.<br/><br/>`color` results in a default `icon`, which **can** be overridden.
  </C.Property>
</Doc::ComponentApi>

### Test 34 - bold and italic wrapping a backtick span (outside a link)

**`var foo = "bar";`** is bold code, and _`var foo = "bar";`_ is italic code.

### Test 35 - multi-line self-closing tag with attributes on separate lines

The `Doc::TokensList` / `Doc::IconsList` pattern: a self-closing tag whose
attributes each appear on their own line, with `/>` on the final line by itself.
`processInlineMarkdownInBlock` must NOT feed the attribute lines through Showdown.

<Doc::Placeholder
  @text="multi-line self-closing"
  @width="200"
  @height="60"
  @background="transparent"
/>

### Test 36 - multi-line opening tag inside an extracted block

A `C.Property` whose opening tag spans multiple lines (attributes on separate
lines, `>` on the last attribute line). `processInlineMarkdownInBlock` must keep
all attribute lines verbatim — the `insideOpenTag` flag must engage and disengage
correctly without treating `@values` lines as markdown text runs.

<Doc::ComponentApi as |C|>
  <C.Property
    @name="size"
    @type="enum"
    @values={{array "small" "medium" "large"}}
    @default="medium">
    Sets the size of the component.
  </C.Property>
  <C.Property
    @name="color"
    @type="enum"
    @values={{array "neutral" "highlight" "success" "warning" "critical"}}
    @default="neutral">
    Sets the color scheme. Accepts a markdown link like [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

Paragraph after the block — must render normally.
