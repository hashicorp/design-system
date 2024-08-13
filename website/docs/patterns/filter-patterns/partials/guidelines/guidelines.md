## Structure

A filtering pattern consists of a number of Helios components that work together functionally and enforce a consistent layout. These elements are variable depending on the data set's content and the context within the application and can be combined in different ways to achieve an experience that benefits the end user.

### Data set

A data set is a broad term for an array of items, objects, or related information presented as separate but related records. A data set is commonly represented via a [Table](/components/table) but may be expressed in other formats depending on the type of information.

![Data set represented by a table](/assets/patterns/filter-patterns/example-data-set-tabular-data.png =1048x*)
<Doc::ImageCaption @text="Data set represented by a table"/>

![Data set represented by a grid](/assets/patterns/filter-patterns/example-data-set-non-tabular-data.png =878x*)
<Doc::ImageCaption @text="Data set represented by a grid"/>

### Filters

Filters are responsible for the functional aspect of limiting a data set and for displaying the [parameters](/patterns/filter-patterns?tab=core%20concepts#parameter) which a user can filter upon. Filter positioning is largely dependent on the complexity of the data set and the scope to which the filters are being applied. For example, are the filters applied at the page level or only to the data set they are paired with?

Filters often consist of numerous parameters that mirror the columns of a table or parameters contained within the data set. For more details on mirroring filters and parameters within a data set, refer to the filtering [core concepts](/patterns/filter-patterns?tab=core%20concepts#mirror-of-parameters).

#### Filter bar

Organizing filters in a **filter bar** is a common positioning method and consists of one or more dropdowns, buttons, or input components that are used to select values from a set of parameters. A [Segmented Group](/components/segmented-group) can be used within a filter bar to group similar parameters and support complex filtering.

![Filters represented by a filter bar](/assets/patterns/filter-patterns/filter-bar-segmented-group.png =724x*)

![Example of a horizontal filter bar paired with a data set expressed as a table.](/assets/patterns/filter-patterns/layout-filter-bar.png =559x*)
<Doc::ImageCaption @text="Example of a horizontal filter bar paired with a data set expressed as a table."/>

Depending on the filter type and how they are related, multiple [Segmented Groups](/components/segmented-group) can be used to group similar filters together. For example; a [Search Input](/components/form/text-input#search) grouped with a [Dropdown](/components/dropdown) to limit the filter parameters that are included in the search.

![An example limiting the returned search results to a specific parameter](/assets/patterns/filter-patterns/filter-bar-similar-filters.png =718x*)
<Doc::ImageCaption @text="An example limiting the returned search results to a specific parameter"/>

#### Sidebar

If space permits, filters can be positioned vertically in a **sidebar** at the page level or in line with the data set.

##### Page-level sidebar

Page-level sidebars can be used to filter a data set presented in a non-tabular fashion and if filtering the content of the entire page is required. A sidebar should be oriented on the left (start) side of the viewport.

![Vertical orientation of the filter bar](/assets/patterns/filter-patterns/layout-sidebar-left-page-level.png =559x*)

##### In-line sidebar

In-line sidebars can be used when the number of filterable parameters is minimal and if space permits.

![Vertical orientation of the filter bar on the left](/assets/patterns/filter-patterns/layout-sidebar-left-inline.png =559x*)

### Applied filters

Display the **applied filters** and provide the user with a method to clear all filters at once. Applied filters should be represented using a [Tag](/components/tag) component, which allows for the individual dismissal of a filter value.

![Applied filters](/assets/patterns/filter-patterns/applied-filters.png =547x*)

#### Positioning with filter bars

Applied filters should be positioned between the data set and the filter bar with a `16px` gap between elements.

![Applied filters with filter bar positioning](/assets/patterns/filter-patterns/applied-filters-positioning-filter-bar.png =559x*)

If the filters are positioned in a page-level sidebar, the applied filters should be positioned directly above the dataset with a `16px` gap.

![Applied filters with filter sidebar](/assets/patterns/filter-patterns/applied-filters-positioning-sidebar.png =559x*)

### Global filter functions

Depending on the fetching method and complexity of the data set, global filter functions can be used to expose methods that effect the entire data set. Global functions should be differentiated from the primary filters and aligned to the end of the data set. Examples include:

- Manually refreshing the data set.
- Triggering a [Flyout](/components/flyout) with more complex filters.

![Multiple global filter functions](/assets/patterns/filter-patterns/global-filter-functions.png =874x*)
<Doc::ImageCaption @text="Multiple global filter functions"/>

![Single global function](/assets/patterns/filter-patterns/global-filter-functions-single.png =874x*)
<Doc::ImageCaption @text="Single global function"/>

In the case a multiple filter functions, use the [Segmented Group](/components/segmented-group). If only a single function is necessary, use the secondary [Button](/components/button#secondary).

### Pagination

Use pagination to break down the filtered data set into pages. For more details, refer to the [Pagination](/components/pagination) guidelines.

![Pagination example](/assets/patterns/filter-patterns/pagination-layout.png =559x*)

## Filtering methods

Depending on the fetching strategy, size, and rendering method of the data set, how filters are applied and the impact on the user experience varies.

### Live filtering

Live filtering refers to updating the records within a data set immediately after a user makes a selection. This method results in a responsive user experience, but may not be possible with large data sets or complex filtering methods.

<video width="100%" controls loop>
  <source
    src="/assets/patterns/filter-patterns/live-filtering.mp4"
    type="video/mp4"
  />
</video>

### Per-filter

Applying filters one at a time lets the user to "finalize" their decision before applying, avoiding the distraction of the data set constantly updating in the background. This method is useful when the user may want to select multiple values in a single dropdown, but requires an extra step to apply the filters.

<video width="100%" controls loop>
  <source
    src="/assets/patterns/filter-patterns/per-filter.mp4"
    type="video/mp4"
  />
</video>

### Batch filtering

Batch filtering supports the user making multiple selections across different parameters and only updating the results of the data set when the user interacts with a global "apply" function. This method is useful when the data set is very large or when the filter parameters are complex.

<video width="100%" controls loop>
  <source
    src="/assets/patterns/filter-patterns/batch-filtering.mp4"
    type="video/mp4"
  />
</video>

## Displaying selected filters

Communicate that values corresponding with a filter parameter have been applied within the [Dropdown](/components/dropdown) by adding a `BadgeCount` within the filter.

![Communicating that two values within a parameter have been applied in the Dropdown](/assets/patterns/filter-patterns/filter-bar-dropdown-count.png =661x*)
<Doc::ImageCaption @text="Communicating that two values within a parameter have been applied in the Dropdown"/>

This, when combined with the applied filters provides a detailed snapshot of what specific filter values are applied to the data set and the relevant parameters that they correspond with.

![Communicating that multiple filter parameters have been applied](/assets/patterns/filter-patterns/filter-bar-dropdown-count-multiple.png =728x*)
<Doc::ImageCaption @text="Communicating that multiple filter parameters have been applied"/>

## Empty state

Empty state within a filter pattern is expressed in two different ways:

1. Applied filters have resulted in no records being returned in the data set.
2. No filters have been applied resulting in no tags in the applied filters area.

### Within a data set

Depending on the applied filters, there may not be any records returned from a data set that match parameters and values selected. In this case, communicate the empty state to the user and highlight instructions to adjust the filters or provide a method to clear all filters.

Use the Helios [Application State](/components/application-state) component to communicate the lack of results and steps the user can take to remedy the situation.

![Empty state example](/assets/patterns/filter-patterns/filter-patterns-empty-state.png =559x*)

### Within applied filters

If no filters have been applied, use a [Tooltip](/components/tooltip) coupled with the applied filters label to guide the user to the filter functions. Not only does this provide context and direct the user to the filters, but it prevents unnecessary layout shift upon applying filters.

![Empty state in applied filters](/assets/patterns/filter-patterns/applied-filters-empty-state.png =450x*)

### Avoiding an empty state

As filtering is reductive in nature and driven by a user action, it’s not always possible to avoid an empty state.

If technically feasible, use the `count` property within the Dropdown ListItem to call attention to filters that will return zero results.

In this example, "Status > Pending" does not return any results.

![Count property in ListItem](/assets/patterns/filter-patterns/avoid-empty-state-list-item-count.png)

### Reverting filters

If applying filters to a data set yields no results, offer users an option to clear all or specific filters.

This can be done by adding a "Clear all" action to the [Application State](/components/application-state) or by including dismissible [Tags](/components/tag) for each applied filter.

## Filter overflow

Depending on the data complexity and expected user interactions, it may be necessary to consider how filter pattern elements might overflow into other areas of the UI.

- What happens when there are many filters applied to a data set?
- Is there a specific hierarchy or importance in the filter parameters that might determine how they are ordered or displayed to the user?
- What happens when there are many parameters that can be filtered upon?

These scenarios can clutter the UI, detracting from a table's primary purpose: organizing data categorically, relationally, and structurally.

### Applied filters overflow

#### Basic example

For simple data sets or Tables with a few columns, managing filter overflow may not be necessary. As more filters are applied, wrapping to new lines follows a common browser reflow pattern. This approach is predictable: the user's explicit filter action is directly reflected in the UI, providing positive reinforcement and allowing easy scanning of applied filters.

![Basic example of applied filters and reflow](/assets/patterns/filter-patterns/applied-filters-overflow-basic-example.png)

<Doc::ImageCaption @text="Allowing applied filters to wrap and reflow naturally." />

#### Intermediate example

Filtering a complex data set may result in numerous filters overwhelming the UI and detracting from the Table's content.

In this scenario, consider moving the applied filter [Tags](/components/tag) to a `small`, `card` [Accordion](/components/accordion) using the `containsInteractive` variant. This pattern:

- Accommodates numerous applied filters
- Simplifies the UI, reducing cognitive load
- Supports complex, interactive content within the Accordion (e.g., a "Clear all filters" function)

![Intermediate example of applied filters within an open Accordion](/assets/patterns/filter-patterns/applied-filters-overflow-intermediate-example-open.png)

<Doc::ImageCaption @text="Moving the applied filters to an Accordion." />

### Filter parameters overflow

In complex data sets with numerous filterable parameters, considering establishing a hierarchy of filters by:

1. Prioritizing crucial filters directly in the UI and associating them directly with the Table and data set
2. Moving less important filter parameters to a [Flyout](/components/flyout), using [Checkbox groups](/components/form/checkbox) for each parameter and its values.

This approach offers a scalable solution for highly complex data sets while communicating a natural hierarchy of filter importance.

![Trigger the overflow of filter parameters with a Button](/assets/patterns/filter-patterns/filter-parameters-overflow-more-filters.png)

<Doc::ImageCaption @text="Use a secondary Button to trigger a Flyout." />

![Display the overflow of filter parameters within a Flyout](/assets/patterns/filter-patterns/filter-parameters-overflow-flyout.png)

<Doc::ImageCaption @text="Display the overflow of filter parameters in a Flyout" />

#### Accordions within a Flyout

For excessive filter parameters causing a long scroll in the [Flyout](/components/flyout), consider placing each parameter in a `flush`, `small` [Accordion](/components/accordion), and optionally, add an "Expand/Collapse All" Button. This approach gives users more control over the UI and allows for visual comparison between filter parameters.

![Accordions within a Flyout containing filter parameters](/assets/patterns/filter-patterns/filter-parameters-overflow-flyout-accordion.png)

<Doc::ImageCaption @text="Use Accordions within a Flyout to support an excessive number of filter parameters." />

### Filter hierarchy

Filter parameters vary in importance, which should be reflected in their organization in the UI. Moving frequently used filters to a [Flyout](/components/flyout) can be detrimental, as accessing common filters may require multiple steps.

!!! Info

Impact and priority of filters should be determined by each product and application team. User needs and priorities vary across products and user journeys, affecting the prioritization of UI elements.
!!!

### Putting it all together

An effective filter pattern support overflow in common scenarios will consist of:

1. A filter bar with high-impact parameters, plus a secondary [Button](/components/button) that triggers a [Flyout](/components/flyout) for less common filters.
2. An Accordion displaying all applied filters with a bulk dismiss option.

![A holistic filter pattern support overflow](/assets/patterns/filter-patterns/filter-overflow-holistic-example.png)

This contextual example demonstrates a comprehensive yet simple method of composing multiple Helios components to support these overflow concepts. It is interactive but doesn't include any functional logic.

```handlebars

<div class="doc-filter-patterns-wrapper">

  <div class="doc-filter-patterns-filter-bar">

    <Hds::SegmentedGroup as |SG|>
      {{#each this.model.demoFilters as |filter|}}
        <SG.Dropdown @listPosition="bottom-left" as |D|>
          <D.ToggleButton @color="secondary" @text={{filter.name}} />
          {{#each filter.options as |option|}}
            <D.Checkbox>{{option.name}}</D.Checkbox>
          {{/each}}
        </SG.Dropdown>
      {{/each}}
    </Hds::SegmentedGroup>
    <Hds::Button
      @text="More filters"
      @icon="filter"
      @iconPosition="leading"
      @color="secondary"
      {{on "click" (fn this.activateFlyout "filterFlyoutActive")}}
    />
  </div>

  {{#if this.filterFlyoutActive}}
    <Hds::Flyout
      id="filter-flyout"
      @onClose={{fn this.deactivateFlyout "filterFlyoutActive"}}
      as |F|
    >
      <F.Header @icon="filter">More filters</F.Header>
      <F.Body>
        <Hds::Accordion @type="flush" @size="small" as |A|>
          {{#each this.model.demoOverflowFilters as |overflowFilter|}}
            <A.Item>
              <:toggle>{{overflowFilter.label}}</:toggle>
              <:content>
                <Hds::Form::Checkbox::Group
                  @name={{overflowFilter.label}} as |G|
                >
                  {{#each overflowFilter.values as |value|}}
                    <G.CheckboxField as |F|>
                      <F.Label>{{value.name}}</F.Label>
                    </G.CheckboxField>
                  {{/each}}
                </Hds::Form::Checkbox::Group>
              </:content>
            </A.Item>
          {{/each}}
        </Hds::Accordion>
      </F.Body>
      <F.Footer>
        <Hds::ButtonSet>
          <Hds::Button
            @color="primary"
            @text="Apply filters"
            {{on "click" (fn this.deactivateFlyout "filterFlyoutActive")}}
          />
          <Hds::Button
            @text="Cancel"
            @color="secondary"
            {{on "click" (fn this.deactivateFlyout "filterFlyoutActive")}}
          />
        </Hds::ButtonSet>
      </F.Footer>
    </Hds::Flyout>
  {{/if}}

  <Hds::Accordion @size="small" @type="card" as |A|>
    <A.Item @containsInteractive={{true}}>
      <:toggle>
        <div class="doc-filter-patterns-accordion-toggle">
          <Hds::Text::Body
            @color="strong"
            @size="200"
            @weight="semibold"
          >Applied filters (25)</Hds::Text::Body>
          <Hds::Button
            @size="small"
            @color="tertiary"
            @icon="x"
            @iconPosition="leading"
            @text="Clear all filters"
            {{on "click" this.clearAllFilters}}
          />
        </div>
      </:toggle>
      <:content>
        <div class="doc-filter-patterns-applied-filters">
          {{#each this.model.demoAppliedFilters as |appliedFilter|}}
            <Hds::Tag
              @text={{appliedFilter}}
              @onDismiss={{this.filterDismissFunction}}
            />
          {{/each}}
        </div>
      </:content>
    </A.Item>
  </Hds::Accordion>

</div>

```

### More complex filtering scenarios

These guidelines cover common methods for handling overflow in filter patterns, but exclude more complex scenarios such as:

- Filtering based on complex queries
- Conditional statement-dependent filtering
- Saving and recalling applied filters
- Product and business logic-specific use cases.

For projects exceeding the complexity outlined here, please [contact the HDS team](/about/support) for support and recommendations.
