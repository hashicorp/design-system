---
title: Scraping playground
---

# TESTING

<Doc::ComponentApi as |C|>
  <C.Property @name="<:head>" @type="named block">
    This is a named block where the content for the table head (`<thead>`) is rendered. Note: most consumers are unlikely to need to use this named block directly.<br />
    It yields these internal properties:
    <Doc::ComponentApi as |C|>
      <C.Property @name="H.setSortBy" @type="yielded function">
      The function used internally by the table to set the `sortBy` and `sortOrder` tracked values.
      </C.Property>
      <C.Property @name="H.sortBy" @type="yielded value">
        The value of the internal `sortBy` tracked variable.
      </C.Property>
      <C.Property @name="H.sortOrder" @type="yielded value">
        The value of the internal `sortOrder` tracked variable.
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
  <C.Property @name="<:body>" @type="named block">
    This is a named block where the content for the table body (`<tbody>`) is rendered.<br />
    It yields these internal properties:
    <Doc::ComponentApi as |C|>
      <C.Property @name="B.sortBy" @type="yielded value">
        The value of the internal `sortBy` tracked variable.
      </C.Property>
      <C.Property @name="B.sortOrder" @type="yielded value">
        The value of the internal `sortOrder` tracked variable.
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
  <C.Property @name="model" @type="array">
    The data model to be used by the table.
  </C.Property>
  <C.Property @name="columns" @type="array">
    Array `hash` that defines each column with key-value properties that describe each column. Options:
    <Doc::ComponentApi as |C|>
      <C.Property @name="label" @type="string" @required="true">
      The column’s label.
      </C.Property>
      <C.Property @name="key" @type="string">
      The column’s key (one of the keys in the model's records); required if the column is sortable.
      </C.Property>
      <C.Property @name="isSortable" @type="boolean" @default="false">
        If set to `true`, indicates that a column should be sortable.
      </C.Property>
      <C.Property @name="align" @type="enum" @values={{array "left" "center" "right" }} @default="left">
        Determines the horizontal content alignment (sometimes referred to as text alignment) for the column header.
      </C.Property>
      <C.Property @name="width" @type="string" @valueNote="Any valid CSS">
        If set, determines the column’s width.
      </C.Property>
      <C.Property @name="sortingFunction" @type="function">
        Callback function to provide support for custom sorting logic. It should implement a typical bubble-sorting algorithm using two elements and comparing them. For more details, see the example of custom sorting in the How To Use section.
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
  <C.Property @name="sortBy" @type="string">
    If defined, the value should be set to the key of the column that should be pre-sorted.
  </C.Property>
  <C.Property @name="sortOrder" @type="string" @values={{array "asc" "desc" }} @default="asc">
    Use in conjunction with `sortBy`. If defined, indicates which direction the column should be pre-sorted in. If not defined, `asc` is applied by default.
  </C.Property>
  <C.Property @name="isStriped" @type="boolean" @default="false">
    Define on the table invocation. If set to `true`, even-numbered rows will have a different background color from odd-numbered rows.
  </C.Property>
  <C.Property @name="isFixedLayout" @type="boolean" @default="false">
    If set to `true`, the `table-display`(CSS) property will be set to `fixed`. See [MDN reference on table-layout](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout) for more details.
  </C.Property>
  <C.Property @name="density" @type="enum" @values={{array "short" "medium" "tall" }} @default="medium">
    If set, determines the density (height) of the table body’s rows.
  </C.Property>
  <C.Property @name="valign" @type="enum" @values={{array "top" "middle" }} @default="top">
    Determines the vertical alignment for content in a table. Does not apply to table headers (`th`). See [MDN reference on vertical-align](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align) for more details.
  </C.Property>
  <C.Property @name="caption" @type="string">
    Adds a (non-visible) caption for users with assistive technology. If set on a sortable table, the provided table caption is paired with the automatically generated sorted message text.
  </C.Property>
  <C.Property @name="identityKey" @type="'none'|string" @default="@identity">
    Option to [specify a custom key](https://api.emberjs.com/ember/release/classes/Ember.Templates.helpers/methods/each?anchor=each#:~:text=%3C/ul%3E-,Specifying%20Keys,-In%20order%20to) to the `each` iterator. If `identityKey="none"`, this is interpreted as an `undefined` value for the `@identity` key option.
  </C.Property>
  <C.Property @name="sortedMessageText" @type="string" @default="Sorted by (label), (asc/desc)ending">
    Customizable text added to `caption` element when a sort is performed.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
  <C.Property @name="onSort" @type="function">
    Callback function that is invoked when one of the sortable table headers is clicked (or has a keyboard interaction performed). The function receives the values of `sortBy` and `sortOrder` as arguments.
  </C.Property>
</Doc::ComponentApi>
