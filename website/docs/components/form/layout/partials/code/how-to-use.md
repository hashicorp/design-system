## How to use this component

Use the `Form` to contain other Form layout components and form content. This establishes consistent spacing for each `FormSection` and the other content.

### Form

[[code-snippets/form-layout-basic execute=false]]

The `Form` renders as an HTML `form` element by default. Use the `tag` argument to optionally use an HTML `div` instead.

[[code-snippets/form-layout-tag execute=false]]

### Form Header, Title, & Description

!!! Info

The default Form Header Title `@tag` is `"div"` because the correct value is dependent on the individual page. We strongly encourage consumers to update the Title `@tag` to meet WCAG Success Criterion [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) as the visual experience should match what is presented to the user with assistive technology.

!!!

Use the optional `FormHeader` to include a `Title` and `Description` for your `Form`.

[[code-snippets/form-layout-header]]

#### Form Header Title tag & size

The `@tag` argument changes the HTML element that wraps the `FormHeaderTitle` content. When organizing the content on a webpage, the heading levels should reflect the structure of the page. For example, if a `FormHeaderTitle` appears directly below the main heading of the page, it should be `"h2"`.

To specify which size the `FormHeaderTitle` displays at, use the `@size` argument.

[[code-snippets/form-title-tag]]

### Form Section

!!! Warning

You should use at least one `FormSection` to wrap Form Field content otherwise the content won’t be spaced properly or use a max-width.

!!!

Use `FormSection` components to wrap and group together related Form Fields and other form content. This establishes a consistent max-width and spacing for the content.

While the `FormSection` is typically used to contain Form Fields, it can also be used to contain and set a consistent max-width for other content as needed such as an `Alert`.

[[code-snippets/form-layout-section]]

Pass an `isFullWidth` argument to override the default max-width of an individual `FormSection` if needed.

[[code-snippets/form-layout-section-full-width]]

### Section Header, Title, & Description

!!! Insight

The default Form Section Header Title `@tag` is `"div"` because the correct value is dependent on the individual page. We strongly encourage consumers to update the Title `@tag` to meet WCAG Success Criterion [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) as the visual experience should match what is presented to the user with assistive technology.

!!!

Similarly to the `Form`, each `FormSection` can optionally include its own `SectionHeader` with `Title` and `Description`.

[[code-snippets/form-layout-section-header]]

#### Section Header Title tag & size

The `@tag` argument changes the HTML element that wraps the `SectionHeaderTitle` content. When organizing the content on a webpage, the heading levels should reflect the structure of the page. For example, if the `FormHeaderTitle` tag is `"h3"`, the Section Title should be `"h4"`.

To specify which size the `SectionHeaderTitle` displays at, use the `@size` argument.

[[code-snippets/form-layout-section-title-tag]]

### Section Multi Field Group

To lay out related Form Fields or controls in a row, use the `SectionMultiFieldGroup`.

[[code-snippets/form-layout-multi-field]]

To control the widths of individual elements within a `SectionMultiFieldGroup`, you can wrap the element with an `Item` and pass in a `width` value. Fields not wrapped with an `Item` will take up the remaining available width.

[[code-snippets/form-layout-multi-field-width]]

#### Responsive layout

In screen widths below 768px (the [“md” breakpoint](/foundations/breakpoints)), the `SectionMultiFieldGroup` content layout will automatically stack.

[[code-snippets/form-layout-responsive]]

### Form Separator

If further visual separation between Form Sections is desired, add a `FormSeparator` in-between.

[[code-snippets/form-layout-separator]]

### Form Footer

The `FormFooter` should be used at the bottom of the other `Form` content to contain form actions. Use the yielded `ButtonSet` to wrap and set spacing for Buttons.

[[code-snippets/form-layout-footer]]

## Putting it all together

An example form with Sections using the default max-width together with a full-width Section:

[[code-snippets/form-layout-policy-form]]

### Setting a custom max-width

If needed, you can set a custom max-width for all Form Sections and other content at once vs. overriding the default max-width Section by Section.

[[code-snippets/form-layout-section-custom-width execute=false]]

If you set a custom max-width for Form content, you can still override it on an individual Section allowing certain Sections to expand to full width.

[[code-snippets/form-layout-override-custom-width execute=false]]
