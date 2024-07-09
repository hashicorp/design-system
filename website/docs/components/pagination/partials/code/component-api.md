## Component API

The term “`Pagination` component” is an umbrella term used to indicate a set of Pagination-related components and sub-components, each with their own APIs.

There are two main **high-level “container” components**, which control the layout and some of the logic that connects the different sub-components:

- `Pagination::Numbered` - used when the number of items is known (this component handles all the complexity of the pagination information shown to the user: "info", "page numbers", "current page", "page size")
- `Pagination::Compact` - used when the number of items is unknown or the pagination needs to be [cursor-based](https://jsonapi.org/profiles/ethanresnick/cursor-pagination/) (so there is no concept of "current page")

For more details on when and how to use these two components, refer to the "How to use" section below.

There is also a set of **low-level sub-components**, used to build the Numbered and Compact variants:

- `Pagination::Info` - used to display the current range of items shown and the total number of items
- `Pagination::Nav::Arrow` - used to provide "prev/next" navigation controls
- `Pagination::Nav::Number` - used to provide "page number" navigation controls
- `Pagination::Nav::Ellipsis` - used to display an ellipsis instead of a set of page numbers
- `Pagination::SizeSelector` - used to allow users to change the number of items displayed per page

These Pagination sub-elements may be used directly if you need to cover a very specific use case that is not covered by the Numbered or Compact Pagination components. In that case, refer to their specific APIs below.

### Pagination::Numbered

<Doc::ComponentApi as |C|>
<C.Property @name="ariaLabel" @type="string" @default="Pagination">
    Accepts a localized string.
</C.Property>
<C.Property @name="totalItems" @required={{true}} @type="number">
Pass the total number of items to be paginated. If no value is defined an error will be thrown.
</C.Property>
<C.Property @name="showLabels" @type="boolean" @default="false">
Used to control the visibility of the "prev/next" text labels.
</C.Property>
<C.Property @name="isTruncated" @type="boolean" @default="true">
Used to to limit the number of page numbers displayed (to save space, it will display an ellipsis for some numbers).
</C.Property>
<C.Property @name="currentPage" @type="integer" @values={{array 1 "integer" }} @default={{1}}>
Set a custom initial selected page.
</C.Property>
<C.Property @name="showSizeSelector" @type="boolean" @default="true">
Used to control the visibility of the "size selector".
</C.Property>
<C.Property @name="sizeSelectorLabel" @type="string" @default="Items per page">
  Add a custom string for the label text overriding the default value.
</C.Property>
<C.Property @name="pageSizes" @type="array" @values={{array "[10, 30, 50]" "array of integers" }} @default="[10, 30, 50]">
Set the page sizes users can select from. Example: `@pageSizes=\{{array 5 20 30}}`.
</C.Property>
<C.Property @name="currentPageSize" @type="number">
Pass the maximum number of items to display on each page. If no value is defined, the first page size in `pageSizes` will be used. Default is `10` if custom `pageSizes` are not defined.
</C.Property>
<C.Property @name="route/model/models/replace">
These are the parameters that are passed down as arguments to the `Hds::Pagination::Arrow`/`Hds::Pagination::Number` child components, and from them to the `Hds::Interactive` component (used internally). For more details about how this low-level component works please refer to [its documentation page](/utilities/interactive/).
</C.Property>
<C.Property @name="queryFunction" @type="function">
A function that returns an object that can be provided as `query` argument for the routing, and that is passed down to the to the child components together with the other routing parameters. The function receives the value of the "go to" page and "page size" as arguments (integer numbers).
</C.Property>
<C.Property @name="onPageChange" @type="function">
Callback function invoked (if provided) when one of the navigation controls is clicked, and a "page" change is triggered. The function receives the value of the "go to" page and "page size" as arguments (integer numbers).
</C.Property>
<C.Property @name="onPageSizeChange" @type="function">
Callback function invoked (if provided) when the page size selector is changed, and a "page size" change is triggered. The function receives the value of the "page size" as argument (an integer number).
</C.Property>
<C.Property @name="...attributes">
This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
</C.Property>
</Doc::ComponentApi>

### Pagination::Compact

<Doc::ComponentApi as |C|>
<C.Property @name="ariaLabel" @type="string" @default="Pagination">
    Accepts a localized string.
</C.Property>
<C.Property @name="showLabels" @type="boolean" @default="true">
Used to control the visibility of the "prev/next" text labels.
</C.Property>
<C.Property @name="isDisabledPrev/isDisabledNext" @type="boolean" @default="false">
Used to disable the "prev" or "next" controls. Notice: when the control is disabled, it’s always rendered as an HTML `<button>` element.
</C.Property>
<C.Property @name="showSizeSelector" @type="boolean" @default="false">
Used to control the visibility of the "size selector".
</C.Property>
<C.Property @name="sizeSelectorLabel" @type="string" @default="Items per page">
  Add a custom string for the label text overriding the default value.
</C.Property>
<C.Property @name="pageSizes" @type="array" @values={{array "[10, 30, 50]" "array of integers" }} @default="[10, 30, 50]">
Set the page sizes users can select from. Example: `@pageSizes=\{{array 5 20 30}}`.
</C.Property>
<C.Property @name="currentPageSize" @type="number">
Pass the maximum number of items to display on each page. If no value is defined, the first page size in `pageSizes` will be used. Default is `10` if custom `pageSizes` are not defined.
</C.Property>
<C.Property @name="route/model/models/replace">
These are the parameters that are passed down as arguments to the `Hds::Pagination::Arrow` child components, and from them to the `Hds::Interactive` component (used internally). For more details about how this low-level component works, please refer to [its documentation page](/utilities/interactive/).
</C.Property>
<C.Property @name="queryFunction" @type="function">
A function that returns an object that can be provided as `query` argument for the routing, and that is passed down to the to the child components together with the other routing parameters. The function receives as arguments one of two possible cursor directions (`prev` / `next`) and the value of the "page size" (integer number).
<br/>
**Notice**: on page size change, the function returns `null` as cursor direction, to allow the consumers to handle the pagination logic accordingly.
</C.Property>
<C.Property @name="onPageChange" @type="function">
Callback function invoked (if provided) when a "prev" or "next" control is clicked. The function receives as argument one of two possible values: `prev` / `next`
</C.Property>
<C.Property @name="onPageSizeChange" @type="function">
Callback function invoked (if provided) when the page size selector is changed, and a "page size" change is triggered. The function receives the value of the "page size" as argument (an integer number).
</C.Property>
<C.Property @name="...attributes">
This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
</C.Property>
</Doc::ComponentApi>

### Base elements

#### Pagination::Info

<Doc::ComponentApi as |C|>
<C.Property @name="itemsRangeStart" @required={{true}} @type="string|number">
The "start" value of the range in the informational text.
</C.Property>
<C.Property @name="itemsRangeEnd" @required={{true}} @type="string|number">
The "end" value of the range in the informational text.
</C.Property>
<C.Property @name="totalItems" @required={{true}} @type="string|number">
The "out of" total items in the informational text. Not required if `showTotalItems` is set to `false`.
</C.Property>
<C.Property @name="showTotalItems" @type="boolean" @default="true">
Controls the visibility of the total items in the informational text.
</C.Property>
</Doc::ComponentApi>

#### Pagination::Nav::Arrow

<Doc::ComponentApi as |C|>
<C.Property @name="direction" @required={{true}} @type="enum" @values={{array "prev" "next"}}>
Sets the "direction" of the icon and label in the control.
</C.Property>
<C.Property @name="route/models/model/query/replace">
These are the parameters that are passed down as arguments to the `Hds::Interactive` component (used internally). For more details about how this low-level component works, please refer to [its documentation page](/utilities/interactive/).
</C.Property>
<C.Property @name="disabled" @type="boolean" @default="false">
Sets the control as disabled. Notice: when the control is disabled, it’s always rendered as an HTML `Button` element.
</C.Property>
<C.Property @name="showLabel" @type="boolean" @default="true">
Used to control the visibility of the text label in the control.
</C.Property>
<C.Property @name="onClick" @type="function">
Callback function invoked (if provided) when the control is clicked.
</C.Property>
<C.Property @name="...attributes">
This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
</C.Property></Doc::ComponentApi>

#### Pagination::Nav::Number

<Doc::ComponentApi as |C|>
<C.Property @name="page" @required={{true}} @type="number">
The value that should go in the control as page number.
</C.Property>
<C.Property @name="isSelected" @type="boolean" @default="false">
If the page has a "selected" visual state (usually used to highlight the current page).
</C.Property>
<C.Property @name="route/models/model/query/replace">
These are the parameters that are passed down as arguments to the `Hds::Interactive` component (used internally). For more details about how this low-level component works, please refer to [its documentation page](/utilities/interactive/).
</C.Property>
<C.Property @name="onClick" @type="function">
Callback function invoked (if provided) when the control is clicked.
</C.Property>
<C.Property @name="...attributes">
This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering). _Notice: it will not be applied to the `<li>` wrapping element but to the nested `<button>/<a>` controls._
</C.Property>
</Doc::ComponentApi>

#### Pagination::Nav::Ellipsis

<Doc::ComponentApi as |C|>
<C.Property @name="...attributes">
This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering). _Notice: it will not be applied to the `<li>` wrapping element but to the nested `<button>/<a>` controls._
</C.Property>
</Doc::ComponentApi>

#### Pagination::SizeSelector

<Doc::ComponentApi as |C|>
<C.Property @name="pageSizes" @required={{true}} @type="array of integers">
Set the page sizes users can select from. If no value is defined an error will be thrown. Example: `@pageSizes=\{{array 5 20 30}}`
</C.Property>
<C.Property @name="selectedSize" @type="integer">
Used to indicate which of the provided `sizes` options is pre-selected. Normally this value is passed automatically by the Pagination wrapper component but can be provided as argument to the `Pagination::SizeSelector` component itself when used as a stand alone component.
</C.Property>
<C.Property @name="label" @type="string" @default="Items per page">
  Add a custom string for the label text overriding the default value.
</C.Property>
<C.Property @name="onChange" @type="function">
Callback function invoked (if provided) when the page size selector is changed. The function receives the value of the "page size" as argument (an integer number).
</C.Property>
<C.Property @name="...attributes">
This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering). _Notice: it will not be applied to the `<li>` wrapping element but to the nested `<button>/<a>` controls._
</C.Property>
</Doc::ComponentApi>
