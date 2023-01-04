## Showcase

### Generated element

<Hds::Button @icon="plus" @text="Lorem ipsum dolor" @color="primary" />
<Hds::Button @icon="plus" @text="Lorem ipsum dolor" @color="primary" disabled />

#### With `@href` ⇒ `a`

<Hds::Button @icon="plus" @text="Lorem ipsum dolor" @color="primary" @href="#" />
<Hds::Button @icon="plus" @text="Lorem ipsum dolor" @color="primary" @href="#" disabled />

#### With `@route` ⇒ `<LinkTo>`

<Hds::Button @icon="plus" @text="Lorem ipsum dolor" @color="primary" @route="index" />
<Hds::Button @icon="plus" @text="Lorem ipsum dolor" @color="primary" @route="index" disabled />

### Content

<Hds::Button @text="Only text" />
<Hds::Button @icon="plus" @iconPosition="leading" @text="Text + leading icon" />
<Hds::Button @icon="arrow-right" @iconPosition="trailing" @text="Text + trailing icon" />
<Hds::Button @icon="plus" @isIconOnly={{true}} @text="Icon only" />

<div class="dummy-button-max-width-container">
  <Hds::Button @icon="plus" @text="This is a very long text that should go on multiple lines" />
</div>

### Sizes

{{#each this.SIZES as |size|}}
  <Hds::Button @icon="plus" @text={{capitalize size}} @size={{size}} />
{{/each}}
<div class="dummy-button-full-width-container">
  <Hds::Button @icon="plus" @text="Full width" @isFullWidth={{true}} />
</div>

### Colors

{{#each this.COLORS as |color|}}
  <Hds::Button @icon="plus" @text={{capitalize color}} @color={{color}} />
{{/each}}

### States (in each size)

<!-- {{#each this.COLORS as |color|}}
  <h5 class="dummy-h5 dummy-button-states-grid__title">{{capitalize color}}</h5>
  {{#each this.SIZES as |size|}}
    {{#each this.STATES as |state|}}
      <div>
        <span class="dummy-text-small">{{capitalize size}}/{{state}}:</span>
        <br />
        <Hds::Button
          @icon="plus"
          @text={{capitalize state}}
          @size={{size}}
          @color={{color}}
          mock-state-value={{state}}
        />
      </div>
    {{/each}}
  {{/each}}
  {{#if (not-eq color "tertiary")}}
    {{#each this.STATES as |state|}}
      <div>
        <span class="dummy-text-small">Full width/{{color}}/{{state}}:</span>
        <br />
        <Hds::Button
          @icon="plus"
          @text={{capitalize state}}
          @color={{color}}
          @isFullWidth={{true}}
          mock-state-value={{state}}
        />
      </div>
    {{/each}}
  {{/if}}
{{/each}} -->

### Containers

<div class="dummy-button-containers-list">
  <div>
    <span class="dummy-text-small">Parent with <code class="dummy-code">display: inline-block</code></span>
    <br />
    <div class="dummy-button-containers-list-item__inline-block">
      <Hds::Button @icon="plus" @iconPosition="leading" @text="Text + leading icon" />
    </div>
  </div>
  <div>
    <span class="dummy-text-small">Parent with <code class="dummy-code">display: inline-flex</code></span>
    <br />
    <div class="dummy-button-containers-list-item__inline-flex">
      <Hds::Button @icon="plus" @iconPosition="leading" @text="Text + leading icon" />
    </div>
  </div>
  <div>
    <span class="dummy-text-small">Parent with <code class="dummy-code">flex-grow: 0</code></span>
    <br />
    <div class="dummy-button-containers-list-item__flex">
      <div class="dummy-button-containers-list-item__flex-grow-0">
        <Hds::Button @icon="plus" @iconPosition="leading" @text="Text + leading icon" />
      </div>
    </div>
  </div>
  <div>
    <span class="dummy-text-small">Parent with <code class="dummy-code">max-width: fit-content</code></span>
    <br />
    <div class="dummy-button-containers-list-item__max-width-fit-content">
      <Hds::Button @icon="plus" @iconPosition="leading" @text="Text + leading icon" />
    </div>
  </div>
</div>
