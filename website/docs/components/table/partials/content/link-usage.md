## Links within cells

By default, we recommend using `secondary` [Inline Links](/components/link/inline) within a table, to avoid overloading the UI with the actionable blue color. The `secondary` variant uses the `foreground-strong` color.

To increase the prominence and further differentiate links from other text content, we recommend using a font-weight of `medium`. In code, you can use the CSS helper classes `hds-typography-body-200` and `hds-font-weight-medium`. In Figma, you can use the text style `Body/200/Link`.

![Link example](/assets/components/table/link-example.png)

### Multiple links

If a table contains more than one column of links, consider using a `font-weight` of `medium` for the most important links, usually the title of the row or ID. For less important links, use a `font-weight` of `regular`.

![Multiple links within a table](/assets/components/table/multiple-links.png)

### Links in long-form content

If a cell contains long-form or descriptive content, use the link style that is most appropriate for the hierarchy and frequency of links within the content. If there are a minimal number of links, `primary` [Inline Links](/components/link/inline) may be appropriate, but if there are many links `secondary` [Inline Links](/components/link/inline) may work better.

![Links in long-form content](/assets/components/table/longform-content-links.png)