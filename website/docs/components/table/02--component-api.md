---
title: Table
category: components
component: table
section: component-api
---

# Component API

<section>
<p class="dummy-paragraph" id="component-api-table">
    The
    <code class="dummy-code">Table</code>
    component itself is where most of options will be applied. Use of the component API (below) will automatically
    render sortable columns if desired.
  </p>
  <p class="dummy-paragraph">
    Additionally, there are child components that can also be used to provide custom options.
    <ul>
      <li class="dummy-paragraph">
        The
        <code class="dummy-code">Hds::Table::Tr</code>
        component is a template-only component. It supports
        <code class="dummy-code">...attributes</code>
        but is not eligible to receive interactions. It can contain
        <code class="dummy-code">Hds::Table::Th</code>
        or
        <code class="dummy-code">Hds::Table::Td</code>
        components.
      </li>
      <li class="dummy-paragraph">
        The
        <code class="dummy-code">Hds::Table::Th</code>
        component is a template-only component. It supports
        <code class="dummy-code">...attributes</code>
        but is not eligible to receive interactions itself, although it can contain interactive elements. However, it is
        not likely that you will need to add interactive elements to this component as the sorting is already otherwise
        provided for.
      </li>
      <li class="dummy-paragraph">
        The
        <code class="dummy-code">Hds::Table::Td</code>
        component is a template-only component. It supports
        <code class="dummy-code">...attributes</code>
        but is not eligible to receive interactions itself; however it can contain interactive elements.
      </li>
    </ul>
  </p>
  <dl class="dummy-component-props" aria-labelledby="component-api-table">
    <dt>&lt;:head&gt; <code>named block</code></dt>
    <dd>
      <p>This is a named block where the content for the table head (<code>&lt;thead&gt;</code>) is rendered.</p>
    </dd>
    <dt>&lt;:body&gt; <code>named block</code></dt>
    <dd>
      <p>This is a named block where the content for the table body (<code>&lt;tbody&gt;</code>) is rendered.</p>
    </dd>
    <dt>model <code>array</code></dt>
    <dd><p>If defined, sets the data source that gets yielded by the
        <code class="dummy-code">:body</code>
        named block.</p></dd>
    <dt>columns <code>array</code></dt>
    <dd><p>If defined, sets the column header content and indicates that the table should be sorted. For more
        information about how this array is shaped, look at the code examples in the "How to Use" section.</p></dd>
    <dt>sortingKeys <code>array</code></dt>
    <dd><p>If defined, indicates which columns should be sortable (if only
        <code class="dummy-code">columns</code>
        is defined, all columns will be sortable). For more information about how this array is shaped, look at the code
        examples in the "How to Use" section.</p></dd>
    <dt>sortBy <code>string</code></dt>
    <dd><p>If defined, indicates which column should be pre-sorted when the table is rendered. For more information
        about how this value, look at the code examples in the "How to Use" section.</p></dd>
    <dt>sortOrder <code>string</code></dt>
    <dd>
      <p>Use in conjunction with
        <code class="dummy-code">sortBy</code>. If defined, indicates which direction the column should be pre-sorted
        in. All columns are unsorted by default.</p>
      <p>Acceptable values:</p>
      <ol>
        <li class="default">asc</li>
        <li>desc</li>
      </ol>
    </dd>
    <dt>isStriped <code>boolean</code></dt>
    <dd>
      <p>Default: <span class="default">true</span></p>
      <p>If set to <code class="dummy-code">false</code>, zebra striping on the table will not be applied.</p>
    </dd>
    <dt>density <code>enum</code></dt>
    <dd>
      <p>If set, determines the density, or height, of the row.</p>
      <p>Acceptable values:</p>
      <ol>
        <li>short</li>
        <li class="default">medium</li>
        <li>tall</li>
      </ol>
    </dd>
    <dt>valign <code>enum</code></dt>
    <dd>
      <p>If set, determines the vertical alignment of table's cell (td) content. While the acceptable values contain all
        of the values that the CSS property accepts, the default (top) and middle are the values most likely to be used.</p>
      <p>Acceptable values:</p>
      <ol>
        <li class="default">top</li>
        <li>middle</li>
        <li>bottom</li>
        <li>baseline</li>
        <li>sub</li>
        <li>text-top</li>
      </ol>
    </dd>
    <dt>caption <code>string</code></dt>
    <dd><p>Adds a (non-visible) caption for users with assistive technology. If set on a sortable table, the provided
        table caption is paired with the automatically generated sorted message text.</p></dd>
    <dt>...attributes</dt>
    <dd><p>Supported for the <code class="dummy-code">Hds::Table</code> component.</p></dd>
  </dl>
</section>
