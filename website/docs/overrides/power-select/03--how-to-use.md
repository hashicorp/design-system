<h1>PowerSelect Component - How to use</h1>

<section data-section="how-to-use">
  
  <p class="dummy-paragraph">
    To use this component in your application follow
    <a target="_blank" rel="noopener noreferrer" href="https://ember-power-select.com">the getting started guide on the
      add-on website</a>
    then add the PowerSelect overrides as shown below.
  </p>

  <h4 class="dummy-h4">Overrides import</h4>
  <p class="dummy-paragraph">If you are already using
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://github.com/hashicorp/design-system/blob/main/packages/components/README.md"
    >design-system-components</a>
    in your project the overrides import would look something like this:</p>
  
  
  <!-- prettier-ignore-start -->
```
@import "@hashicorp/design-system-components";
@import "@hashicorp/design-system-power-select-overrides";
```
<!-- prettier-ignore-end -->


  <p class="dummy-paragraph">If you are not yet using
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://github.com/hashicorp/design-system/blob/main/packages/components/README.md"
    >design-system-components</a>
    in your project but you want to use these PowerSelect custom styles you will need to add
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://github.com/hashicorp/design-system/blob/main/packages/tokens/README.md"
    >design-system-tokens</a>
    to your project.</p>

  <h4 class="dummy-h4">Basic usage</h4>

  <p class="dummy-paragraph">As these overrides rely on specificity, to apply them you need to wrap each PowerSelect
    instance in an element with
    <code class="dummy-code">hds-power-select</code>
    class applied to it.</p>
  <p class="dummy-paragraph">Invocation of the component with overrides would look something like this:</p>

  <!-- prettier-ignore-start -->
```handlebars
<div class="hds-power-select">
  <PowerSelect
    @options={{@model.OPTIONS}}
    @selected={{@model.SELECTED}}
    @onChange={{this.noop}}
    @renderInPlace={{true}}
    as |option|
  >
    {{option}}
  </PowerSelect>
</div>
```
<!-- prettier-ignore-end -->

  <p class="dummy-paragraph">Renders to:</p>
  <div class="dummy-power-select-container">
    <div class="hds-power-select">
      <PowerSelect
        @options={{@model.OPTIONS}}
        @selected={{@model.SELECTED}}
        @onChange={{this.noop}}
        @renderInPlace={{true}}
        as |option|
      >
        {{option}}
      </PowerSelect>
    </div>
  </div>

  <h4 class="dummy-h4">Search enabled</h4>

  <p class="dummy-paragraph">When used with the
    <code class="dummy-code">@searchEnabled</code>
    argument, the input is automatically styled to resemble the
    <a href="/components/form/text-input/01_overview/"><code class="dummy-code">Form::TextInput</code></a>
    component.</p>

  <!-- prettier-ignore-start -->
```handlebars
<div class="hds-power-select">
  <PowerSelect
    @options={{@model.OPTIONS}}
    @selected={{@model.SELECTED}}
    @onChange={{this.noop}}
    @renderInPlace={{true}}
    @searchEnabled={{true}}
    as |option|
  >
    {{option}}
  </PowerSelect>
</div>
```
<!-- prettier-ignore-end -->

  <p class="dummy-paragraph">Renders to:</p>
  <div class="dummy-power-select-container">
    <div class="hds-power-select">
      <PowerSelect
        @options={{@model.OPTIONS}}
        @selected={{@model.SELECTED}}
        @onChange={{this.noop}}
        @renderInPlace={{true}}
        @searchEnabled={{true}}
        as |option|
      >
        {{option}}
      </PowerSelect>
    </div>
  </div>

  <h4 class="dummy-h4">After options block</h4>
  <p class="dummy-paragraph">To consistently style the
    <code class="dummy-code">@afterOptionsComponent</code>
    use the
    <code class="dummy-code">hds-power-select__after-options</code>
    class on the outermost element of the after options component.</p>

  <!-- prettier-ignore-start -->
```handlebars
<div class="hds-power-select">
  <PowerSelect
    @options={{@model.OPTIONS}}
    @selected={{@model.SELECTED}}
    @afterOptionsComponent={{"power-select/after-options"}}
    @onChange={{this.noop}}
    @renderInPlace={{true}}
    as |option|
  >
    {{option}}
  </PowerSelect>
</div>
```
<!-- prettier-ignore-end -->

  <p class="dummy-paragraph">Where
    <code class="dummy-code">power-select/after-options.hbs</code>
    would look like this:</p>
  <!-- prettier-ignore-start -->
```handlebars
<div class="hds-power-select__after-options">
  5 results
</div>
```
<!-- prettier-ignore-end -->


  <p class="dummy-paragraph">Renders to:</p>
  <div class="dummy-power-select-container">
    <div class="hds-power-select">
      <PowerSelect
        @options={{@model.OPTIONS}}
        @selected={{@model.SELECTED}}
        @afterOptionsComponent={{component "power-select/after-options"}}
        @onChange={{this.noop}}
        @renderInPlace={{true}}
        as |option|
      >
        {{option}}
      </PowerSelect>
    </div>
  </div>

  <h4 class="dummy-h4">Multiple selection</h4>

  <p class="dummy-paragraph">When multiple options are allowed the selected items are automatically styled to resemble
    the
    <a href="/components/tag/01_overview/"><code class="dummy-code">Tag</code></a>
    component.</p>

  <!-- prettier-ignore-start -->
```handlebars
<div class="hds-power-select">
  <PowerSelectMultiple
    @options={{@model.OPTIONS}}
    @selected={{@model.SELECTEDMULTIPLE}}
    @onChange={{this.noop}}
    @renderInPlace={{true}}
    as |option|
  >
    {{option}}
  </PowerSelectMultiple>
</div>
```
<!-- prettier-ignore-end -->


  <p class="dummy-paragraph">Renders to:</p>
  <div class="dummy-power-select-container">
    <div class="hds-power-select">
      <PowerSelectMultiple
        @options={{@model.OPTIONS}}
        @selected={{@model.SELECTEDMULTIPLE}}
        @onChange={{this.noop}}
        @renderInPlace={{true}}
        as |option|
      >
        {{option}}
      </PowerSelectMultiple>
    </div>
  </div>

</section>
