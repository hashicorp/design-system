<h1>Button component - How to use</h1>

<section data-section="how-to-use">
  
  <p class="dummy-paragraph">
    The button component is used to trigger an action or event. For accessibility, buttons should not be used to route
    to a URL.</p>

  <h4 class="dummy-h4">Basic use</h4>
  <p class="dummy-paragraph">The most basic invocation requires text to be passed:</p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Button @text="Copy to clipboard" />
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Button @text="Copy to clipboard" />

  <h4 class="dummy-h4">Add an icon</h4>
  <p class="dummy-paragraph">To add an icon to your button, give the
    <code class="dummy-code">@icon</code>
    a
    <a href="https://flight-hashicorp.vercel.app/">Flight icon</a>
    name:
  </p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Button @text="Copy to clipboard" @icon="clipboard-copy" />
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Button @text="Copy to clipboard" @icon="clipboard-copy" />

  <h4 class="dummy-h4">Icon position</h4>
  <p class="dummy-paragraph">By default, if you define an icon, it is placed before the text. If you would like to
    position the icon after the text, define
    <code class="dummy-code">@iconPosition</code>:
  </p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Button @text="Copy to clipboard" @icon="clipboard-copy" @iconPosition="trailing" />
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Button @text="Copy to clipboard" @icon="clipboard-copy" @iconPosition="trailing" />

  <h4 class="dummy-h4">Icon-only button</h4>
  <p class="dummy-paragraph">If you would like to create an icon-only button, set
    <code class="dummy-code">@isIconOnly</code>
    to
    <code class="dummy-code">true</code>. Note that you still have to define the
    <code class="dummy-code">@text</code>
    value; it will be used as the
    <code class="dummy-code">aria-label</code>
    attribute value on the
    <code class="dummy-code">button</code>
    element.
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Button @text="Copy to clipboard" @icon="clipboard-copy" @isIconOnly={{true}} />
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Button @text="Copy to clipboard" @icon="clipboard-copy" @isIconOnly={{true}} />
  <p class="dummy-banner dummy-banner--info dummy-paragraph"><span aria-hidden="true">✍️</span>
    If you need to add a tooltip to an icon-only button, here is an example of how to do it in an accessible way:
    <a href="https://codepen.io/melsumner/pen/bGGdmMV" target="_blank" rel="noopener noreferrer">Accessible Button
      Tooltip Pattern</a>.</p>

  <h4 class="dummy-h4">Color</h4>
  <p class="dummy-paragraph">
    There are four available colors for a button:
    <code class="dummy-code">primary</code>,
    <code class="dummy-code">secondary</code>,
    <code class="dummy-code">tertiary</code>, and
    <code class="dummy-code">critical</code>. The default is
    <code class="dummy-code">primary</code>. To use a different color, declare another value for
    <code class="dummy-code">@color</code>:
  </p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Button @text="Critical" @color="critical" />
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Button @icon="plus" @text="Primary action" />
  <br />
  <Hds::Button @icon="plus" @text="Secondary action" @color="secondary" />
  <br />
  <Hds::Button @icon="plus" @text="Tertiary action" @color="tertiary" />
  <br />
  <Hds::Button @icon="plus" @text="Critical action" @color="critical" />

  <h4 class="dummy-h4">Size</h4>
  <p class="dummy-paragraph">
    There are three sizes available for buttons:
    <code class="dummy-code">small</code>,
    <code class="dummy-code">medium</code>
    and
    <code class="dummy-code">large</code>. The default is
    <code class="dummy-code">medium</code>. To use a different size, declare a value for
    <code class="dummy-code">@size</code>:
  </p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Button @text="Large button" @size="large" />
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to (with icons):</p>
  <Hds::Button @text="Small button" @size="small" @icon="clipboard-copy" />
  <br />
  <Hds::Button @text="Medium button" @icon="clipboard-copy" />
  <br />
  <Hds::Button @text="Large button" @size="large" @icon="clipboard-copy" />

  <h4 class="dummy-h4">Full-width</h4>
  <p class="dummy-paragraph">
    This allows indication that a button should take up the full-width of the parent container. It is set to
    <code class="dummy-code">false</code>
    by default.
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Button @text="Copy to clipboard" @isFullWidth={{true}} />
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Button @text="Copy to clipboard" @isFullWidth={{true}} />

  <h4 class="dummy-h4">Type</h4>
  <p class="dummy-paragraph">This is the native button attribute,
    <code class="dummy-code">type</code>. There are three possible values:
    <code class="dummy-code">button</code>,
    <code class="dummy-code">submit</code>, and
    <code class="dummy-code">reset</code>. The default
    <code class="dummy-code">type</code>
    for the button is
    <code class="dummy-code">submit</code>. To prevent a button from submitting a form, set
    <code class="dummy-code">type</code>
    to
    <code class="dummy-code">button</code>.
  </p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Button @text="Submit" type="submit" />
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph"><em>Notice: if you're passing a
      <code class="dummy-code">@href</code>
      or a
      <code class="dummy-code">@route</code>
      argument to the component, this will generate a
      <code class="dummy-code">&lt;a&gt;</code>
      link, not a
      <code class="dummy-code">&lt;button&gt;</code>
      (see below). In this case no
      <code class="dummy-code">type</code>
      is needed.</em></p>

  <h4 class="dummy-h4">Actions</h4>
  <p class="dummy-paragraph">
    Define the action in your route or controller, and add it to the component invocation in your template:
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Button @text="Copy to clipboard" {{on "click" this.copyToClipboard}} />
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Read the Ember.js guides for more information:
    <a
      href="https://guides.emberjs.com/release/in-depth-topics/patterns-for-actions/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Patterns for Actions
    </a>.
  </p>

  <h4 class="dummy-h4">Links</h4>
  <p class="dummy-paragraph">You can generate a link with the visual appearence of a button passing a
    <code class="dummy-code">@href</code>
    or a
    <code class="dummy-code">@route</code>
    argument to the component.</p>
  <p class="dummy-paragraph"><em>Notice: the
      <code class="dummy-code">Hds::Button</code>
      component internally uses the generic
      <code class="dummy-code">Hds::Interactive</code>
      component. For more details about how this low-level component works please refer to
      <a href="/utilities/interactive/01_overview/">its documentation page</a>.</em></p>

  <h5 class="dummy-h5">With @href</h5>
  <p class="dummy-paragraph">If you pass a
    <code class="dummy-code">@href</code>
    argument a
    <code class="dummy-code">&lt;a&gt;</code>
    link will be generated:</p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Button @text="Visit website" @icon="external-link" @iconPosition="trailing" @href="https://hashicorp.com" />
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Button @text="Visit website" @icon="external-link" @iconPosition="trailing" @href="https://hashicorp.com" />
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

  <p class="dummy-paragraph">🚨
    <strong>Notice</strong>: if a
    <code class="dummy-code">href</code>
    HTML attribute is used instead of the
    <code class="dummy-code">@href</code>
    Ember argument we apply this visual treatment to alert the developer:</p>
  <Hds::Button @text="Copy to clipboard" href="#" />

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
<Hds::Button @text="Back to homepage" @icon="arrow-left" @route="index" />
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Button @text="Back to homepage" @icon="arrow-left" @route="index" />
  <p class="dummy-paragraph">⚠️
    <strong>Important</strong>: if the route is external to your current engine you have to pass also
    <code class="dummy-code">@isRouteExternal=&lbrace;&lbrace;true&rbrace;&rbrace;</code>
    to the component so that it will use
    <code class="dummy-code">&lt;LinkToExternal&gt;</code>
    instead of a simple
    <code class="dummy-code">&lt;LinkTo&gt;</code>
    for the
    <code class="dummy-code">@route</code>. For more details see the
    <a href="/utilities/interactive/01_overview/">Hds::Interactive component</a>.</p>
  <p class="dummy-paragraph"><em>Notice: all the standard arguments for the
      <code class="dummy-code">&lt;LinkTo/LinkToExternal&gt;</code>
      components are supported (eg.
      <code class="dummy-code">models/model/query/current-when/replace</code>).</em></p>

  <h4 class="dummy-h4">Disabled buttons</h4>
  <p class="dummy-paragraph">To disable a button, manually add the native
    <code class="dummy-code">disabled</code>
    attribute:
  </p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Button @text="Copy to clipboard" disabled />
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Button @text="Copy to clipboard" disabled />
  <p class="dummy-paragraph"><em>Notice: since a
      <code class="dummy-code">&lt;a&gt;</code>
      link can't be disabled, if you're passing a
      <code class="dummy-code">@href</code>
      or a
      <code class="dummy-code">@route</code>
      argument to the component you will need to take care of intercepting the events in case you want to disable it.
    </em></p>

</section>
