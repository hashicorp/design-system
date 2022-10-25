<h1>Dropdown Component - How to use</h1>

<section data-section="how-to-use">
  
  <h4 class="dummy-h4">Invocation</h4>
  <p class="dummy-paragraph">To make the invocation more intuitive for developers, we've provided contextual components
    for the toggles and list-item items. For example,
    <code class="dummy-code">&lt;Hds::Dropdown::ListItem::Separator /&gt;</code>
    is yielded in a hash under the key
    <code class="dummy-code">&lt;XX.Separator /&gt;</code>
    when invoked:
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
&lt;Hds::Dropdown as |dd|&gt;
  &lt;dd.ToggleButton @text="..." /&gt;
  &lt;dd.Title @text="Lorem ipsum" /&gt;
  &lt;dd.Description @text="Lorem ipsum dolor sine qua non est." /&gt;
  &lt;dd.Interactive @href="..." @text="Add" /&gt;
  &lt;dd.Separator /&gt;
  &lt;dd.Interactive @route="..." @icon="trash" @text="Delete" @color="critical" /&gt;
&lt;/Hds::Dropdown&gt;
```
<!-- prettier-ignore-end -->

  
  

  <h4 class="dummy-h4">URLs and routes handling</h4>
  <p class="dummy-paragraph">The
    <code class="dummy-code">Interactive</code>
    list item renders the correct element based on the passing of an
    <code class="dummy-code">&commat;route</code>,
    <code class="dummy-code">&commat;href</code>, or the addition of a click event (i.e.,
    <code class="dummy-code">&lbrace;&lbrace;on "click" myAction&rbrace;&rbrace;</code>).</p>
  <p class="dummy-paragraph"><em>Notice: the
      <code class="dummy-code">Interactive</code>
      list item component internally uses the generic
      <code class="dummy-code">Hds::Interactive</code>
      component. For more details about how this low-level component works please refer to
      <a href="/utilities/interactive/01_overview/">its documentation page</a>.</em></p>

  <h5 class="dummy-h5">Basic use</h5>
  <p class="dummy-paragraph">If you don't pass a
    <code class="dummy-code">@href</code>
    or
    <code class="dummy-code">@route</code>
    argument a simple
    <code class="dummy-code">&lt;button&gt;</code>
    will be generated:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
&lt;Hds::Dropdown as |dd|&gt;
  ...
  &lt;dd.Interactive {{on "click" myAction}} @text="Run command" /&gt;
&lt;/Hds::Dropdown&gt;
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph"><em>Notice: in this case you will have to add your own event handling function to it.</em>
  </p>

  <h5 class="dummy-h5">With @href</h5>
  <p class="dummy-paragraph">If you pass a
    <code class="dummy-code">@href</code>
    argument a
    <code class="dummy-code">&lt;a&gt;</code>
    link will be generated:</p>
  
  <!-- prettier-ignore-start -->
```handlebars
&lt;Hds::Dropdown as |dd|&gt;
  ...
  &lt;dd.Interactive @href="https://www.hashicorp.com/request-demo/terraform" @text="Request a demo" /&gt;
&lt;/Hds::Dropdown&gt;
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">⚠️
    <strong>Important</strong>: when using the
    <code class="dummy-code">@href</code>
    argument the component adds by default the attributes
    <code class="dummy-code">target="_blank"</code>
    and
    <code class="dummy-code">rel="noopener noreferrer"</code>
    to the
    <code class="dummy-code">&lt;a&gt;</code>
    element (because this is the most common use case: internal links are generally handled using a
    <code class="dummy-code">@route</code>
    argument). If the
    <code class="dummy-code">href</code>
    points to an internal link, or uses a different protocol (eg. "mailto" of "ftp") you can pass
    <code class="dummy-code">@isHrefExternal=&lbrace;&lbrace;true&rbrace;&rbrace;</code>
    to the component and it will not add the
    <code class="dummy-code">target</code>
    and
    <code class="dummy-code">rel</code>
    attributes (but you can pass yours if needed, using the
    <code class="dummy-code">...attributes</code>
    spreading. For more details see the
    <a href="/utilities/interactive/01_overview/">Hds::Interactive component</a>.</p>

  <h5 class="dummy-h5">With @route</h5>
  <p class="dummy-paragraph">If you pass a
    <code class="dummy-code">@route</code>
    argument a
    <code class="dummy-code">&lt;a&gt;</code>
    link will be generated using a
    <code class="dummy-code">&lt;LinkTo&gt;</code>
    Ember component:</p>
  
  <!-- prettier-ignore-start -->
```handlebars
&lt;Hds::Dropdown as |dd|&gt;
  ...
  &lt;dd.Interactive @route="my.page.route" @model="my.page.model" @text="Activate cluster" /&gt;
&lt;/Hds::Dropdown&gt;
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">⚠️
    <strong>Important</strong>: if the route is external to your current engine you have to pass also
    <code class="dummy-code">@isRouteExternal=&lbrace;&lbrace;true&rbrace;&rbrace;</code>
    to the component so that it will use
    <code class="dummy-code">&lt;LinkToExternal&gt;</code>
    instead of a simple
    <code class="dummy-code">&lt;LinkTo&gt;</code>
    for the
    <code class="dummy-code">@route</code>. For more details see the
    <a href="/utilities/interactive/01_overview/">Hds::Interactive component</a></p>
  <p class="dummy-paragraph"><em>Notice: all the standard arguments for the
      <code class="dummy-code">&lt;LinkTo/LinkToExternal&gt;</code>
      components are supported (eg.
      <code class="dummy-code">models/model/query/current-when/replace</code>).</em></p>

  <h4 class="dummy-h4">Examples</h4>
  <h5 class="dummy-h5">ToggleButton + ListItem, Separator</h5>
  <p class="dummy-paragraph">
    This example demonstrates the use of a dropdown with a toggle-button, links, a separator and a link (color,
    critical):
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
&lt;Hds::Dropdown as |dd|&gt;
  &lt;dd.ToggleButton @text="Text Toggle" /&gt;
  &lt;dd.Interactive @route="..." @text="Item One" /&gt;
  &lt;dd.Interactive @route="..." @text="Item Two" /&gt;
  &lt;dd.Interactive @route="..." @text="Item Three" /&gt;
  &lt;dd.Interactive @text="Item Four (closes on click)" {{on "click" dd.close}} /&gt;
  &lt;dd.Separator /&gt;
  &lt;dd.Interactive @route="..." @text="Delete" @color="critical" @icon="trash" /&gt;
&lt;/Hds::Dropdown&gt;
```
<!-- prettier-ignore-end -->

  
  

  <p class="dummy-paragraph">Rendered (positioned to the right):</p>
  <nav class="dummy-nav-dropdown" aria-label="example positioned right">
    <ul class="dummy-nav-dropdown__list">
      <li class="dummy-nav-dropdown__list-item">
        <Hds::Dropdown as |dd|>
          <dd.ToggleButton @text="Text Toggle" />
          <dd.Interactive @route="components.dropdown" @text="Item One" />
          <dd.Interactive @route="components.dropdown" @text="Item Two" />
          <dd.Interactive @route="components.dropdown" @text="Item Three" />
          <dd.Interactive @text="Item Four (closes on click)" {{on "click" dd.close}} />
          <dd.Separator />
          <dd.Interactive @route="components.dropdown" @text="Delete" @color="critical" @icon="trash" />
        </Hds::Dropdown>
      </li>
    </ul>
  </nav>

  <h5 class="dummy-h5">ToggleButton + Title, Description, CopyItem, Separator</h5>
  <p class="dummy-paragraph">
    This example demonstrates the use of a dropdown with a toggle-button (color, secondary), title, description, a
    generic (which is yielding a Link::Standalone component), copy-item, a separator and a link (color, critical):
  </p>
  <p class="dummy-paragraph">
    To indicate that a secondary button style should be used for the "button" toggle, add
    <code class="dummy-code">@color="secondary"</code>. If no
    <code class="dummy-code">@color</code>
    is declared,
    <code class="dummy-code">primary</code>
    will be used by default.
  </p>
  
  
  {{! template-lint-disable no-whitespace-for-layout }}
  <!-- prettier-ignore-start -->
```handlebars
&lt;Hds::Dropdown as |dd| &gt;
  &lt;dd.ToggleButton @text="Integrate with Terraform Cloud" @color="secondary" /&gt;
  &lt;dd.Title @text="Integrate with Terraform Cloud" /&gt;
  &lt;dd.Description @text="Create a new run task in Terraform using the URL and key below." /&gt;
  &lt;dd.Generic&gt;
    &lt;Hds::Link::Standalone @text="Watch tutorial video" @icon="film" href="/" /&gt;
  &lt;/dd.Generic&gt;
  &lt;dd.CopyItem @text="https://api.cloud.hashicorp.com" @copyItemTitle="Endpoint URL" /&gt;
  &lt;dd.CopyItem @text="91ee1e8ef65b337f0e70d793f456c71d" @copyItemTitle="HMAC Key" /&gt;
&lt;/Hds::Dropdown&gt;
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Rendered as secondary variation (positioned to the right):</p>
  <nav class="dummy-nav-dropdown" aria-label="example secondary positioned right">
    <ul class="dummy-nav-dropdown__list">
      <li class="dummy-nav-dropdown__list-item">
        <Hds::Dropdown as |dd|>
          <dd.ToggleButton @text="Integrate with Terraform Cloud" @color="secondary" />
          <dd.Title @text="Integrate with Terraform Cloud" />
          <dd.Description @text="Create a new run task in Terraform using the URL and key below." />
          <dd.Generic>
            <Hds::Link::Standalone @text="Watch tutorial video" @icon="film" @href="/" />
          </dd.Generic>
          <dd.CopyItem @text="https://api.cloud.hashicorp.com" @copyItemTitle="Endpoint URL" />
          <dd.CopyItem @text="91ee1e8ef65b337f0e70d793f456c71d" @copyItemTitle="HMAC Key" />
        </Hds::Dropdown>
      </li>
    </ul>
  </nav>
  <p class="dummy-paragraph">
    <em>Notice: when using the "generic" list item the developer is completely responsible for any element yielded,
      including the accessibility of that element, as well as the layout of the content (we provide only the horizontal
      padding for consistency with the other items).</em></p>

  <h5 class="dummy-h5">ToggleIcon for "overflow" dropdown menus</h5>
  <p class="dummy-paragraph">
    Example: an "overflow" toggle for use only in a table element (per design). The dropdown has default and destructive
    (critical) links. This is the only use case where it is acceptable to use
    <code class="dummy-code">&commat;hasChevron=&lbrace;&lbrace;false&rbrace;&rbrace;</code>.
  </p>
  <p class="dummy-paragraph">Note that
    <code class="dummy-code">toggleText</code>
    is still required, because it supplies the
    <code class="dummy-code">aria-label</code>
    for the toggle button.
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
&lt;Hds::Dropdown as |dd|&gt;
  &lt;dd.ToggleIcon @icon="more-horizontal" @text="Overflow Options" @hasChevron={{false}} /&gt;
  &lt;dd.Interactive @route="..." @text="Create" /&gt;
  &lt;dd.Interactive @route="..." @text="Read" /&gt;
  &lt;dd.Interactive @route="..." @text="Update" /&gt;
  &lt;dd.Separator /&gt;
  &lt;dd.Interactive @route="..." @text="Delete" @color="critical" @icon="trash" /&gt;
&lt;/Hds::Dropdown&gt;
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Rendered in a table cell:</p>
  <table class="dummy-table dummy-dropdown-table-demo">
    <thead>
      <tr>
        <th>Column A</th>
        <th>Column B</th>
        <th>Column C</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Row 1, cell 1</td>
        <td>Row 1, cell 2</td>
        <td></td>
      </tr>
      <tr>
        <td>Row 2, cell 1</td>
        <td>Row 2, cell 2</td>
        <td>
          <Hds::Dropdown as |dd|>
            <dd.ToggleIcon @icon="more-horizontal" @text="Overflow Options" @hasChevron={{false}} />
            <dd.Interactive @route="components.dropdown" @text="Create" />
            <dd.Interactive @route="components.dropdown" @text="Read" />
            <dd.Interactive @route="components.dropdown" @text="Update" />
            <dd.Separator />
            <dd.Interactive @route="components.dropdown" @text="Delete" @color="critical" @icon="trash" />
          </Hds::Dropdown>
        </td>
      </tr>
      <tr>
        <td>Row 3, cell 1</td>
        <td>Row 3, cell 2</td>
        <td></td>
      </tr>
      <tr>
        <td>Row 4, cell 1</td>
        <td>Row 4, cell 2</td>
        <td></td>
      </tr>
    </tbody>
  </table>

  <h5 class="dummy-h5">With a loading "interactive" item</h5>
  <p class="dummy-paragraph">
    Example: there may be use cases when it's necessary to put an item in a "loading" state while the app performs some
    operations (eg. checking asynchronously the user's permission to execute a certain operation, once the toggle has
    been clicked).</p>
  <p class="dummy-paragraph">
    In that case the argument
    <code class="dummy-code">&commat;isLoading=&lbrace;&lbrace;true&rbrace;&rbrace;</code>
    can be passed to the item: this will show a "loading" icon (even if an argument
    <code class="dummy-code">@icon</code>
    is provided) and set the item as non-interactive until the value of
    <code class="dummy-code">@isLoading</code>
    is set to
    <code class="dummy-code">false</code>
    again.
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
&lt;Hds::Dropdown as |dd|&gt;
  &lt;dd.ToggleIcon @icon="more-horizontal" @text="Overflow Options" @hasChevron={{false}} /&gt;
  &lt;dd.Interactive @route="..." @isLoading={{true}} @text="Edit cluster" @color="action" @icon="edit" /&gt;
  &lt;dd.Interactive @route="..." @text="Delete" @color="critical" @icon="trash" /&gt;
&lt;/Hds::Dropdown&gt;
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Rendered in a table cell:</p>
  <table class="dummy-table dummy-dropdown-table-demo">
    <thead>
      <tr>
        <th>ID</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Cluster ABC</td>
        <td>Running</td>
        <td></td>
      </tr>
      <tr>
        <td>Cluster XYZ</td>
        <td>Idle</td>
        <td>
          <Hds::Dropdown as |dd|>
            <dd.ToggleIcon @icon="more-horizontal" @text="Overflow Options" @hasChevron={{false}} />
            <dd.Interactive
              @route="components.dropdown"
              @isLoading={{true}}
              @text="Edit cluster"
              @color="action"
              @icon="edit"
            />
            <dd.Separator />
            <dd.Interactive @route="components.dropdown" @text="Delete" @color="critical" @icon="trash" />
          </Hds::Dropdown>
        </td>
      </tr>
    </tbody>
  </table>

  <h5 class="dummy-h5">ToggleIcon as user menu</h5>
  <p class="dummy-paragraph">
    In this example, we have a user icon with a title, description, separator, and links.
  </p>
  <p class="dummy-paragraph">Note that
    <code class="dummy-code">toggleText</code>
    is still required, because it supplies the
    <code class="dummy-code">aria-label</code>
    for the toggle button.
  </p>
  
  <!-- prettier-ignore-start -->
```handlebars
&lt;Hds::Dropdown as |dd|&gt;
  &lt;dd.ToggleIcon @icon="user" @text="user menu" /&gt;
  &lt;dd.Title @text="Signed In" /&gt;
  &lt;dd.Description @text="design-systems@hashicorp.com" /&gt;
  &lt;dd.Separator /&gt;
  &lt;dd.Interactive @route="..." @text="Settings and Preferences" /&gt;
  &lt;dd.Interactive @route="..." @text="Delete" @color="critical" @icon="trash" /&gt;
&lt;/Hds::Dropdown&gt;
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Rendered as a toggle/icon for a user menu (positioned to the right):</p>
  <nav class="dummy-nav-dropdown" aria-label="example row user positioned right">
    <ul class="dummy-nav-dropdown__list">
      <li class="dummy-nav-dropdown__list-item">
        <Hds::Dropdown as |dd|>
          <dd.ToggleIcon @icon="user" @text="user menu" />
          <dd.Title @text="Signed In" />
          <dd.Description @text="design-systems@hashicorp.com" />
          <dd.Separator />
          <dd.Interactive @route="components.dropdown" @text="Settings and Preferences" />
          <dd.Interactive @route="components.dropdown" @text="Delete" @color="critical" @icon="trash" />
        </Hds::Dropdown>
      </li>
    </ul>
  </nav>
  <p class="dummy-paragraph">Here is a customized example to demonstrate how that would look like in dark mode (not
    supported by the design system yet):</p>
  <nav
    class="dummy-nav-dropdown background-black"
    aria-label="example row user bgblack positioned right with customization"
  >
    <ul class="dummy-nav-dropdown__list">
      <li class="dummy-nav-dropdown__list-item dummy-nav-dropdown__list-item-customized">
        <Hds::Dropdown @width="248px" as |dd|>
          <dd.ToggleIcon @icon="user" @text="user menu" />
          <dd.Title @text="Signed In" />
          <dd.Description @text="design-systems@hashicorp.com" />
          <dd.Separator />
          <dd.Interactive @route="components.dropdown" @text="Settings and Preferences" />
          <dd.Interactive @route="components.dropdown" @text="Delete" @color="critical" @icon="trash" />
        </Hds::Dropdown>
      </li>
    </ul>
  </nav>

  <h5 class="dummy-h5">ToggleIcon with other icons</h5>
  <p class="dummy-paragraph">
    In this example, we have a settings icon with a title, description, separator, and links.
  </p>
  <p class="dummy-paragraph">Note that
    <code class="dummy-code">toggleText</code>
    is still required, because it supplies the
    <code class="dummy-code">aria-label</code>
    for the toggle button.
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
&lt;Hds::Dropdown as |dd|&gt;
  &lt;dd.ToggleIcon @icon="settings" @text="settings menu" /&gt;
  &lt;dd.Title @text="Signed In" /&gt;
  &lt;dd.Description @text="design-systems@hashicorp.com" /&gt;
  &lt;dd.Separator /&gt;
  &lt;dd.Interactive @route="..." @text="Settings and Preferences" /&gt;
  &lt;dd.Interactive @route="..." @text="Delete" @color="critical" @icon="trash" /&gt;
&lt;/Hds::Dropdown&gt;
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Rendered (positioned to the right):</p>
  <nav class="dummy-nav-dropdown" aria-label="example row settings positioned right">
    <ul class="dummy-nav-dropdown__list">
      <li class="dummy-nav-dropdown__list-item">
        <Hds::Dropdown as |dd|>
          <dd.ToggleIcon @icon="settings" @text="settings menu" />
          <dd.Title @text="Signed In" />
          <dd.Description @text="design-systems@hashicorp.com" />
          <dd.Separator />
          <dd.Interactive @route="components.dropdown" @text="Settings and Preferences" />
          <dd.Interactive @route="components.dropdown" @text="Delete" @color="critical" @icon="trash" />
        </Hds::Dropdown>
      </li>
    </ul>
  </nav>
</section>
