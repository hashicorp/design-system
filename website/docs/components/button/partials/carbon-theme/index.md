## Secondary muted color

Both the Carbon and the HashiCorp design systems include a secondary variant for the Button component. However, the secondary variant in Carbon themes is much darker and more visually prominent than the secondary variant in the HDS classic theme. This difference in prominence was found to throw off the visual hierarchy when Carbon themes were used within HashiCorp applications.

To solve this issue, a lighter `secondary-muted` color option was added for the `@color` argument. When using one of the Carbon themes, `secondary-muted` can be used instead of `secondary` to preserve a consistent visual hierarchy. The `secondary` color can be used in cases where a stronger visual hierarchy is desired.

When using the classic HDS theme, the `secondary-muted` color will be visually the same as `secondary`.

<Doc::Carbonization::ComparisonGroup @display="flex" as |CG|>
  {{#each (array "default" "light" "dark") as |context|}}
    <CG.Item @context={{context}}>
      <Hds::Layout::Flex @gap="12" @direction="column">
        <Hds::Button @text="Secondary" @color="secondary" />
        <Hds::Button @text="Secondary muted" @color="secondary-muted" />
      </Hds::Layout::Flex>
    </CG.Item>
  {{/each}}
</Doc::Carbonization::ComparisonGroup>

### When to use secondary

- For secondary buttons which are in their own context
- For pairing with another Button of a different color

### When to use secondary-muted

- For pairing with another Button of the same color (e.g. [FilterBar](/components/filter-bar), [Segmented Group](/components/segmented-group))
