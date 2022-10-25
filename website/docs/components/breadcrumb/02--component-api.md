# Breadcrumb - Component API

The `Breadcrumb` component is composed by different parts, with their own APIs:

*   a main "container" (the breadcrumb itself)
*   an "item" sub-component (a single "crumb")
*   a "truncation" sub-component (a hidden list of "crumbs" that can be made visible via a toggle)

#### Breadcrumb

Here is the API for the main ("container") component:

<dl class="dummy-component-props" aria-labelledby="component-api-breadcrumb"><dt>itemsCanWrap <code>boolean</code></dt><dd><p>This controls if the breadcrumb items can wrap in case they can't fit in the container width.</p><p>Default: <span class="default">true</span></p></dd><dt>didInsert <code>function</code></dt><dd><p>This hook method is called when the component is inserted in the DOM.</p><p>Default: <span class="default">noop / () =&gt; {}</span></p><p><em>Notice: internally we use the "did-insert" modifier from @ember/render-modifiers.</em></p></dd><dt>...attributes</dt><dd><p><code class="dummy-code">...attributes</code> spreading is supported on this component.</p><p><em>Notice: by default an attribute <code class="dummy-code">aria-label="breadcrumbs"</code> is assigned to the component. If you want to localize it you can override it passing the same attribute with a different value.</em></p></dd></dl>

#### Breadcrumb::Item

Here is the API for the "item" sub-component:

<dl class="dummy-component-props" aria-labelledby="component-api-breadcrumb-item"><dt>text <code>string</code></dt><dd><p>The text to show as "crumb" for the item.</p></dd><dt>icon <code>string</code></dt><dd><p>Use this parameter to show an icon. Acceptable value: any Flight icon name.</p></dd><dt>route/models/model/query</dt><dd><p>These are the parameters that are passed down as arguments to the <code>&lt;LinkTo&gt;</code> component.</p></dd><dt>current <code>boolean</code></dt><dd><p>This controls if this is the last item in the breadcrumb (in which case it doesn't generate a link).</p></dd><dt>...attributes</dt><dd><p><code class="dummy-code">...attributes</code> spreading is supported on this component.</p></dd></dl>

#### Breadcrumb::Truncation

Here is the API for the "truncation" sub-component:

<dl class="dummy-component-props" aria-labelledby="component-api-breadcrumb-truncation"><dt>"yield"</dt><dd><p>Elements passed as children of this sub-component are yielded to the content of the <a href="../utilities/disclosure">Disclosure</a> component (used to show/hide the yielded breadcrumb items via a "toggle" button).</p></dd><dt>...attributes</dt><dd><p><code class="dummy-code">...attributes</code> spreading is supported on this component.</p></dd></dl>