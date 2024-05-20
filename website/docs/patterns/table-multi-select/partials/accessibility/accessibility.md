!!! Info

It is the responsibility of consumers to implement this pattern and to ensure that all accessibility success criteria are met or exceeded.
!!!

## Aria role

Due to its dynamic nature, updates to the selected count must be announced to those using assistive technology. This can be done by adding [`role=status`](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA22) to the element containing the count.

This is a _representative_ example of how this could be accomplished using HDS components and `role=status` to announce changes in the UI. Test it yourself by enabling VoiceOver and incrementing the `selectedCount` with the "Add to count" button.

```handlebars
<div class="doc-table-multi-select-role-example">
  <button {{on "click" this.updateSelectedCount}}>Add to count</button>
  <div class="doc-table-multi-select-pattern-wrapper">
    <Hds::Text::Body role="status" @tag="p" @size="200" @color="foreground-primary" >
      {{this.selectedCount}} selected out of {{this.totalCount}}
    </Hds::Text::Body>
    <Hds::Dropdown as |DD|>
      <DD.ToggleButton @size="small" @text="Actions" @color="secondary" />
      <DD.Interactive @text="Edit" @icon="edit" />
      <DD.Interactive @text="Delete" @icon="trash" @color="critical" />
      <DD.Separator />
      <DD.Interactive @text="Select all" />
      <DD.Interactive @text="Reset selection" />
    </Hds::Dropdown>
  </div>
</div>
```

