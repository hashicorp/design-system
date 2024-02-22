!!! Info

Since it is the responsibility of consumers to implement this pattern, it is also their responsibility to ensure that all WCAG 2.1 AA success criteria are met or exceeded.
!!!

## Aria role

Due to its dynamic nature, updates to the selected count must be announced to those using assistive technology. This can be done by adding `role=status` to the element containing the count.

This is a _representative_ example of how this could be accomplished using HDS components and `role=status` to announce changes in the UI. Test it yourself by enabling voice over and incrementing the `selectedCount` with the "Add to count" button.

```hbs
<div role="status" class="doc-table-multi-select-role-example">

  <button {{on "click" this.updateSelectedCount}}>Add to count</button>

  <div class="doc-table-multi-select-pattern-wrapper">
    <Hds::Text::Body @tag="p" @size="200" @color="foreground-primary">
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

