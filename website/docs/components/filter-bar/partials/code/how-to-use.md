## How to use this component

The Filter Bar component is used to apply and display filters to a data set. The component does not handle any filtering of the data itself, but provides a way for a user to apply filters, and a means for displaying any filters that have been applied.

To use this component, set the filter options available for a data set using the `Dropdown` and `FilterGroup` contextual components. When filters are applied, the `@onFilter` callback provides a data object of the applied filters. To show which filters have been applied, pass a data object of the same structure to the `@filters` argument.

The Filter Bar is also available as a contextual component of the [Advanced Table](/components/table/advanced-table?tab=code#filtering).

```handlebars
<Hds::FilterBar
  @filters={{this.demoFilters}}
  @onFilter={{this.demoUpdateFilters}}
  as |F|
>
  <F.Dropdown as |D|>
    <D.FilterGroup
      @key="project"
      @text="Project"
      @type="multi-select"
      as |F|
    >
      <F.Checkbox @value="project-1" @label="Project 1" />
      <F.Checkbox @value="project-2" @label="Project 2" />
      <F.Checkbox @value="project-3" @label="Project 3" />
    </D.FilterGroup>
    <D.FilterGroup
      @key="version"
      @text="Version"
      @type="single-select"
      as |F|
    >
      <F.Radio @value="1.0" @label="1.0" />
      <F.Radio @value="2.0" @label="2.0" />
      <F.Radio @value="3.0" @label="3.0" />
    </D.FilterGroup>
  </F.Dropdown>
</Hds::FilterBar>
```

### Filter dropdown

All filtering options are available through a dropdown in the Filter Bar. Inside the dropdown, each filter group is represented with its own tab. When a tab is selected, the filtering options available are visible, and users can add filters for that group. By clicking the "Apply filters" or "Clear all filters" buttons present in the dropdown footer, the user can apply the filters selected, or clear all that have been previously set.

Filtering options are passed to the Filter Bar through the `Dropdown` and `FilterGroup` contextual components. In the `FilterGroup`, the `@key` and `@text` arguments are required. The `@key` argument sets the key for that filter group in the data object of the `onFilter` callback. The `@text` argument sets the text for tab label. The `@type` argument specifies the type of filtering available for the group, with a default value is `single-select`. View more details on [available filter types](#filter-types) below.

```handlebars
<Hds::FilterBar @filters={{this.demoEmptyFilters}} as |F|>
  <F.Dropdown as |D|>
    <D.FilterGroup
      @key="demo-multi-select"
      @text="Multi-select"
      @type="multi-select"
      as |F|
    >
      <F.Checkbox @value="option-1" @label="Option 1" />
      <F.Checkbox @value="option-2" @label="Option 2" />
      <F.Checkbox @value="option-3" @label="Option 3" />
    </D.FilterGroup>
    <D.FilterGroup
      @key="demo-single-select"
      @text="Single-select"
      @type="single-select"
      as |F|
    >
      <F.Radio @value="option-1" @label="Option 1" />
      <F.Radio @value="option-2" @label="Option 2" />
      <F.Radio @value="option-3" @label="Option 3" />
    </D.FilterGroup>
    <D.FilterGroup
      @key="demo-number"
      @text="Number"
      @type="numerical"
    />
    <D.FilterGroup
      @key="date"
      @text="Date"
      @type="date"
    />
    <D.FilterGroup
      @key="demo-time"
      @text="Time"
      @type="time"
    />
    <D.FilterGroup
      @key="demo-datetime"
      @text="Datetime"
      @type="datetime"
    />
  </F.Dropdown>
</Hds::FilterBar>
```

### Applying filters

A user can apply, update, or clear filters within the filter dropdown. The `@onFilter` callback is used to listen for changes to the filters.

The callback provides a data object of applied filters which come from a user's filter selections. This object can be used to run any filtering operations on a data set, and then passed back into the `@filters` argument of the Filter Bar to show the applied filters.

Based on the applied filters passed to the `@filters` argument, dismissible tags will be shown for each applied filter. When these tags are dismissed, the `@onFilter` callback will be triggered, and that filter will be removed from the object.

```handlebars
<Hds::FilterBar
  @filters={{this.demoFilters}}
  @onFilter={{this.demoUpdateFilters}}
  as |F|
>
  <F.Dropdown as |D|>
    <D.FilterGroup
      @key="project"
      @text="Project"
      @type="multi-select"
      as |F|
    >
      <F.Checkbox @value="project-1" @label="Project 1" />
      <F.Checkbox @value="project-2" @label="Project 2" />
      <F.Checkbox @value="project-3" @label="Project 3" />
    </D.FilterGroup>
    <D.FilterGroup
      @key="version"
      @text="Version"
      @type="single-select"
      as |F|
    >
      <F.Radio @value="1.0" @label="1.0" />
      <F.Radio @value="2.0" @label="2.0" />
      <F.Radio @value="3.0" @label="3.0" />
    </D.FilterGroup>
  </F.Dropdown>
</Hds::FilterBar>
```

```javascript
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DemoFilterBar extends Component {
  @tracked demoFilters = {
    project: {
      type: 'multi-select',
      text: 'Project',
      data: [
        { value: 'project-1', label: 'Project 1' },
        { value: 'project-2', label: 'Project 2' },
      ],
    },
    version: {
      type: 'single-select',
      text: 'Version',
      data: {
        value: '1.0',
        label: '1.0',
      },
    }
  };

  @action
  demoUpdateFilters(newFilters) {
    // 1. Filter your data set based on the filters

    // 2. Update the filters object which is passed to the Filter Bar
    this.demoFilters = newFilters;
  }
}
```

#### Live filtering

By default, when filter selections are made in the dropdown, they are not applied automatically. They are only applied, and the callback triggered, once the user confirms their selections with the "Apply filters" button, or clears them with the "Clear all filters" button.

However, if the `@isLiveFilter` argument is set to `true`, then the `@onFilter` callback will be triggered as soon as a user makes a selection in the dropdown.

```handlebars
<Hds::FilterBar
  @filters={{this.demoLiveFilters}}
  @isLiveFilter={{true}}
  @onFilter={{this.demoUpdateLiveFilters}}
  as |F|
>
  <F.Dropdown as |D|>
    <D.FilterGroup
      @key="project"
      @text="Project"
      @type="multi-select"
      as |F|
    >
      <F.Checkbox @value="project-1" @label="Project 1" />
      <F.Checkbox @value="project-2" @label="Project 2" />
      <F.Checkbox @value="project-3" @label="Project 3" />
    </D.FilterGroup>
    <D.FilterGroup
      @key="version"
      @text="Version"
      @type="single-select"
      as |F|
    >
      <F.Radio @value="1.0" @label="1.0" />
      <F.Radio @value="2.0" @label="2.0" />
      <F.Radio @value="3.0" @label="3.0" />
    </D.FilterGroup>
  </F.Dropdown>
</Hds::FilterBar>
```

### Filter types

The Filter Bar supports various different types of filter groups, to support a variety of data types.

#### Single-select and Multi-select

The `single-select` and `multi-select` filter types are used for filtering a list of items by one or multiple values. The options available for selection can be set using the `Radio` and `Checkbox` contextual components inside the `FilterGroup`.

If the `@searchEnabled` argument in the `FilterGroup` is set to `true`, the list of options can be searched through using a provided search input.

The dismiss filter tag will display the `label` for a given filter, and if the `label` is not provided it will display the `value`.

```handlebars
<Hds::FilterBar
  @filters={{this.demoSelectionFilters}}
  @onFilter={{this.demoUpdateSelectionFilters}}
  as |F|
>
  <F.Dropdown as |D|>
    <D.FilterGroup
      @key="demo-single-select"
      @text="Single-select"
      @type="single-select"
      @searchEnabled={{true}}
      as |F|
    >
      <F.Radio @value="option-1" @label="Option 1" />
      <F.Radio @value="option-2" @label="Option 2" />
      <F.Radio @value="option-3" @label="Option 3" />
    </D.FilterGroup>
    <D.FilterGroup
      @key="demo-multi-select"
      @text="Multi-select"
      @type="multi-select"
      @searchEnabled={{true}}
      as |F|
    >
      <F.Checkbox @value="option-1" @label="Option 1" />
      <F.Checkbox @value="option-2" @label="Option 2" />
      <F.Checkbox @value="option-3" @label="Option 3" />
    </D.FilterGroup>
  </F.Dropdown>
</Hds::FilterBar>
```

```javascript
// example of filter data
{
  'demo-single-select': {
    type: 'single-select',
    text: 'Single-select',
    data: {
      value: 'option-1',
      label: 'Option 1',
    },
  },
  'demo-multi-select': {
    type: 'multi-select',
    text: 'Multi-select',
    data: [
      { value: 'option-1', label: 'Option 1' },
      { value: 'option-2', label: 'Option 2' },
    ],
  }
}
```

#### Numerical

The `numerical` filter type is used for any data numerical in nature. It provides options for all comparison operators including a `between` selector.

```handlebars
<Hds::FilterBar
  @filters={{this.demoNumericalFilters}}
  @onFilter={{this.demoUpdateNumericalFilters}}
  as |F|
>
  <F.Dropdown as |D|>
    <D.FilterGroup
      @key="demo-numerical-a"
      @text="Numerical A"
      @type="numerical"
    />
    <D.FilterGroup
      @key="demo-numerical-b"
      @text="Numerical B"
      @type="numerical"
    />
  </F.Dropdown>
</Hds::FilterBar>
```

```javascript
// example of filter data
{
  'demo-numerical-a': {
    type: 'numerical',
    text: 'Numerical A',
    data: {
      selector: 'less-than',
      value: 10,
    },
  },
  'demo-numerical-b': {
    type: 'numerical',
    text: 'Numerical B',
    data: {
      selector: 'between',
      value: {
        start: 10,
        end: 20,
      }
    },
  },
}
```

#### Date & time

There are filter types available for various date and time data through the `date`, `time`, and `datetime` filter types. All three types also support the `between` selector.

Dates and times are formatted in the applied filter tags using the [ember-intl](getting-started/for-engineers#internationalization) service.

```handlebars
<Hds::FilterBar
  @filters={{this.demoDateTimeFilters}}
  @onFilter={{this.demoUpdateDateTimeFilters}}
  as |F|
>
  <F.Dropdown as |D|>
    <D.FilterGroup
      @key="demo-date"
      @text="Date"
      @type="date"
    />
    <D.FilterGroup
      @key="demo-time"
      @text="Time"
      @type="time"
    />
    <D.FilterGroup
      @key="demo-datetime"
      @text="Datetime"
      @type="datetime"
    />
    <D.FilterGroup
      @key="demo-date-range"
      @text="Date range"
      @type="date"
    />
  </F.Dropdown>
</Hds::FilterBar>
```

```javascript
// example of filter data
{
  'demo-date': {
    type: 'date',
    text: 'Date',
    data: {
      selector: 'before',
      value: '2025-01-01',
    },
  },
  'demo-time': {
    type: 'time',
    text: 'Time',
    data: {
      selector: 'before',
      value: '12:00',
    },
  },
  'demo-datetime': {
    type: 'datetime',
    text: 'Datetime',
    data: {
      selector: 'before',
      value: '2025-01-01T12:00',
    },
  },
  'demo-date-range': {
    type: 'date',
    text: 'Date range',
    data: {
      selector: 'between',
      value: {
        start: '2024-01-01',
        end: '2025-01-01',
      }
    },
  }
}
```

#### Custom filtering

!!! Warning

**Consumer responsibility**

The accessibility compliance of any content used for a custom filter is the responsibility of the consumer. If a custom filter requires multiple form elements, it is recommended to use a `<fieldset>` element to group them.
!!!

For filtering support outside of the filter types supported above, an option for more customized filtering is available through the `generic` filter type, and the `Generic` contextual component inside the `FilterGroup`. The `Generic` contextual component provides an `updateFilter` argument function that can be used to trigger updates to the filter inside the filter dropdown.

The dismiss filter tag can be customized by setting `dismissTagText` on the filter. If this is not provided, the dismiss tag text will function similar to the `single-select` and `multi-select` filter types where the `value` or `label` is displayed.

```handlebars
<Hds::FilterBar
  @filters={{this.demoGenericFilters}}
  @onFilter={{this.demoUpdateGenericFilters}}
  as |F|
>
  <F.Dropdown as |D|>
    <D.FilterGroup
      @key="demo-generic"
      @text="Generic"
      @type="generic"
      as |F|
    >
      <F.Generic as |G|>
        <Hds::Button
          @text="Add custom filter"
          @color="secondary"
          @size="small"
          {{on "click" (fn this.onGenericFilterUpdate G.updateFilter)}}
        />
      </F.Generic>
    </D.FilterGroup>
  </F.Dropdown>
</Hds::FilterBar>
```

```javascript
// example of filter data
{
  'demo-generic': {
    type: 'generic',
    text: 'Generic',
    dismissTagText: 'equals lorem ipsum',
    data: {
      value: 'lorem ipsum',
    },
  }
}
```

### Search

The Filter Bar provides a search input, which can be used for searching across multiple areas of a data set. If the `@hasSearch` argument is set to `true`, a search input will be shown next to the dropdown.

On search input, a filter of type `search` will be included in the data object in the `@onFilter` callback.

```handlebars
<Hds::FilterBar
  @filters={{this.demoSearchFilters}}
  @onFilter={{this.demoUpdateSearchFilters}}
  @hasSearch={{true}}
  as |F|
>
  <F.Dropdown as |D|>
    <D.FilterGroup
      @key="project"
      @text="Project"
      @type="multi-select"
      as |F|
    >
      <F.Checkbox @value="project-1" @label="Project 1" />
      <F.Checkbox @value="project-2" @label="Project 2" />
      <F.Checkbox @value="project-3" @label="Project 3" />
    </D.FilterGroup>
    <D.FilterGroup
      @key="version"
      @text="Version"
      @type="single-select"
      as |F|
    >
      <F.Radio @value="1.0" @label="1.0" />
      <F.Radio @value="2.0" @label="2.0" />
      <F.Radio @value="3.0" @label="3.0" />
    </D.FilterGroup>
  </F.Dropdown>
</Hds::FilterBar>
```

```javascript
// example of filter data
{
  'search': {
    type: 'search',
    text: 'Search',
    data: {
      value: 'Lorem ipsum',
    },
  }
}
```

The search input's placeholder text is "Search" by default, but can be customized with the `@searchPlaceholder` argument.

```handlebars
<Hds::FilterBar
  @filters={{this.demoEmptyFilters}}
  @hasSearch={{true}}
  @searchPlaceholder="Search projects"
  as |F|
>
  <F.Dropdown as |D|>
    <D.FilterGroup
      @key="project"
      @text="Project"
      @type="multi-select"
      as |F|
    >
      <F.Checkbox @value="project-1" @label="Project 1" />
      <F.Checkbox @value="project-2" @label="Project 2" />
      <F.Checkbox @value="project-3" @label="Project 3" />
    </D.FilterGroup>
    <D.FilterGroup
      @key="version"
      @text="Version"
      @type="single-select"
      as |F|
    >
      <F.Radio @value="1.0" @label="1.0" />
      <F.Radio @value="2.0" @label="2.0" />
      <F.Radio @value="3.0" @label="3.0" />
    </D.FilterGroup>
  </F.Dropdown>
</Hds::FilterBar>
```

### Bulk actions

The Filter Bar provides an `ActionsDropdown` contextual component that can be used for bulk actions to be performed on a data set, or for other purposes. All contextual components from the [Dropdown](/components/dropdown) are yielded to the consumer except for the `ToggleButton`.

```handlebars
<Hds::FilterBar @filters={{this.demoEmptyFilters}} as |F|>
  <F.Dropdown as |D|>
    <D.FilterGroup
      @key="project"
      @text="Project"
      @type="multi-select"
      as |F|
    >
      <F.Checkbox @value="project-1" @label="Project 1" />
      <F.Checkbox @value="project-2" @label="Project 2" />
      <F.Checkbox @value="project-3" @label="Project 3" />
    </D.FilterGroup>
    <D.FilterGroup
      @key="version"
      @text="Version"
      @type="single-select"
      as |F|
    >
      <F.Radio @value="1.0" @label="1.0" />
      <F.Radio @value="2.0" @label="2.0" />
      <F.Radio @value="3.0" @label="3.0" />
    </D.FilterGroup>
  </F.Dropdown>
  <F.ActionsDropdown as |D|>
    <D.Interactive @icon="edit">Edit items</D.Interactive>
    <D.Interactive @icon="trash" @color="critical">Delete items</D.Interactive>
    <D.Separator />
    <D.Interactive @icon="check-circle">Select entire data set</D.Interactive>
    <D.Interactive @icon="rotate-ccw">Reset selection</D.Interactive>
  </F.ActionsDropdown>
</Hds::FilterBar>
```

The toggle button text of the dropdown defaults to "Actions", but can be customized with the `@toggleButtonText` argument. An icon can also be added with the `@toggleButtonIcon` argument.

```handlebars
<Hds::FilterBar @filters={{this.demoEmptyFilters}} as |F|>
  <F.Dropdown as |D|>
    <D.FilterGroup
      @key="project"
      @text="Project"
      @type="multi-select"
      as |F|
    >
      <F.Checkbox @value="project-1" @label="Project 1" />
      <F.Checkbox @value="project-2" @label="Project 2" />
      <F.Checkbox @value="project-3" @label="Project 3" />
    </D.FilterGroup>
    <D.FilterGroup
      @key="version"
      @text="Version"
      @type="single-select"
      as |F|
    >
      <F.Radio @value="1.0" @label="1.0" />
      <F.Radio @value="2.0" @label="2.0" />
      <F.Radio @value="3.0" @label="3.0" />
    </D.FilterGroup>
  </F.Dropdown>
  <F.ActionsDropdown
    @toggleButtonText="Item actions"
    @toggleButtonIcon="outline"
    as |D|
  >
    <D.Interactive @icon="edit">Edit items</D.Interactive>
    <D.Interactive @icon="trash" @color="critical">Delete items</D.Interactive>
    <D.Separator />
    <D.Interactive @icon="check-circle">Select entire data set</D.Interactive>
    <D.Interactive @icon="rotate-ccw">Reset selection</D.Interactive>
  </F.ActionsDropdown>
</Hds::FilterBar>
```

### Generic content

For more customization of the functionality in the Filter Bar, an `ActionsGeneric` contextual component is provided that can be used to pass in any other content.

```handlebars
<Hds::FilterBar @filters={{this.demoEmptyFilters}} as |F|>
  <F.Dropdown as |D|>
    <D.FilterGroup
      @key="project"
      @text="Project"
      @type="multi-select"
      as |F|
    >
      <F.Checkbox @value="project-1" @label="Project 1" />
      <F.Checkbox @value="project-2" @label="Project 2" />
      <F.Checkbox @value="project-3" @label="Project 3" />
    </D.FilterGroup>
    <D.FilterGroup
      @key="version"
      @text="Version"
      @type="single-select"
      as |F|
    >
      <F.Radio @value="1.0" @label="1.0" />
      <F.Radio @value="2.0" @label="2.0" />
      <F.Radio @value="3.0" @label="3.0" />
    </D.FilterGroup>
  </F.Dropdown>
  <F.ActionsGeneric>
    <Doc::Placeholder @height="24" @width="auto" @text="Generic content" @background="#e4e4e4" />
  </F.ActionsGeneric>
</Hds::FilterBar>
```

