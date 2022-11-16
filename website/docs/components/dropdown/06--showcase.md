---
category: components
component: dropdown
section: showcase
---

<h1>Dropdown Component - Showcase</h1>

<section data-test-percy data-section="showcase">
  

  <h4 class="dummy-h4">Toggles</h4>
  <h5 class="dummy-h5">Toggle::Button</h5>
  <div class="dummy-dropdown-toggle-button-sample">
    <div>
      <span class="dummy-text-small">primary</span>
      <Hds::Dropdown::Toggle::Button @text="Lorem ipsum" />
    </div>
    <div>
      <span class="dummy-text-small">secondary</span>
      <Hds::Dropdown::Toggle::Button @text="Lorem ipsum" @color="secondary" />
    </div>
  </div>
  <br />
  <div class="dummy-dropdown-toggle-button-sample">
    <div>
      <span class="dummy-text-small">primary small</span>
      <Hds::Dropdown::Toggle::Button @text="Lorem ipsum" @size="small" />
    </div>
    <div>
      <span class="dummy-text-small">secondary small</span>
      <Hds::Dropdown::Toggle::Button @text="Lorem ipsum" @size="small" @color="secondary" />
    </div>
  </div>
  <h5 class="dummy-h5">Toggle::Icon</h5>
  <div class="dummy-dropdown-toggle-icon-sample">
    <div>
      <span class="dummy-text-small">with icon + chevron</span>
      <Hds::Dropdown::Toggle::Icon @icon="user" @text="user menu" />
    </div>
    <div>
      <span class="dummy-text-small">icon only</span>
      <Hds::Dropdown::Toggle::Icon @icon="more-horizontal" @hasChevron={{false}} @text="overflow menu" />
    </div>
    <div>
      <span class="dummy-text-small">with image (avatar)</span>
      <Hds::Dropdown::Toggle::Icon @imageSrc="/assets/images/avatar.png" @text="user menu" />
    </div>
  </div>
  <h5 class="dummy-h5">States</h5>
  <div class="dummy-dropdown-toggle-states-grid">
    {{#each @model.TOGGLE_BUTTON_COLORS as |color|}}
      {{#each @model.TOGGLE_STATES as |state|}}
        <div>
          <span class="dummy-text-small">{{color}}/{{state}}:</span>
          <br />
          <Hds::Dropdown::Toggle::Button @text={{capitalize state}} @color={{color}} mock-state-value={{state}} />
        </div>
      {{/each}}
      <div>
        <span class="dummy-text-small">{{color}}/open:</span>
        <br />
        <Hds::Dropdown::Toggle::Button @text="Opened" @isOpen={{true}} @color={{color}} />
      </div>
    {{/each}}

    {{#each @model.TOGGLE_STATES as |state|}}
      <div>
        <span class="dummy-text-small">icon/{{state}}:</span>
        <br />
        <Hds::Dropdown::Toggle::Icon
          @icon="more-horizontal"
          @text="overflow menu"
          @hasChevron={{false}}
          mock-state-value={{state}}
        />
      </div>
    {{/each}}
    <div>
      <span class="dummy-text-small">icon/open:</span>
      <br />
      <Hds::Dropdown::Toggle::Icon
        @icon="more-horizontal"
        @text="overflow menu"
        @hasChevron={{false}}
        @isOpen={{true}}
      />
    </div>

    {{#each @model.TOGGLE_STATES as |state|}}
      <div>
        <span class="dummy-text-small">icon+chevron/{{state}}:</span>
        <br />
        <Hds::Dropdown::Toggle::Icon @icon="user" @text={{state}} mock-state-value={{state}} />
      </div>
    {{/each}}
    <div>
      <span class="dummy-text-small">icon+chevron/open:</span>
      <br />
      <Hds::Dropdown::Toggle::Icon @icon="user" @text="open" @isOpen={{true}} />
    </div>

    {{#each @model.TOGGLE_STATES as |state|}}
      <div>
        <span class="dummy-text-small">avatar+chevron/{{state}}:</span>
        <br />
        <Hds::Dropdown::Toggle::Icon @text={{state}} @imageSrc="/assets/images/avatar.png" mock-state-value={{state}} />
      </div>
    {{/each}}
    <div>
      <span class="dummy-text-small">avatar+chevron/open:</span>
      <br />
      <Hds::Dropdown::Toggle::Icon @text="open" @isOpen={{true}} @imageSrc="/assets/images/avatar.png" />
    </div>
  </div>

  <hr class="dummy-divider" />

  <h4 class="dummy-h4">List Items</h4>

  <h5 class="dummy-h5">Title / Description / Separator</h5>
  <div class="dummy-dropdown-list-items-base-sample">
    <div>
      <span class="dummy-text-small">default (min width)</span>
      <ul class="hds-dropdown-list">
        <Hds::Dropdown::ListItem::Title @text="A simple title" />
        <Hds::Dropdown::ListItem::Description @text="A description." />
        <Hds::Dropdown::ListItem::Separator />
        <Hds::Dropdown::ListItem::Interactive @route="index" @text="Item" />
      </ul>
    </div>
    <div>
      <span class="dummy-text-small">default (max width)</span>
      <ul class="hds-dropdown-list">
        <Hds::Dropdown::ListItem::Title
          @text="A longer title that could span multiple lines if the characters surpass a certain length"
        />
        <Hds::Dropdown::ListItem::Description
          @text="A longer description that could span on multiple lines if the number of characters require more width than the dropdown provides by default."
        />
        <Hds::Dropdown::ListItem::Separator />
        <Hds::Dropdown::ListItem::Interactive
          @route="index"
          @text="A longer item that could span multiple lines if the characters surpass a certain length"
        />
      </ul>
    </div>
    <div>
      <span class="dummy-text-small">fixed width</span>
      {{! template-lint-disable no-inline-styles }}
      <ul class="hds-dropdown-list" style="width: 250px">
        <Hds::Dropdown::ListItem::Title
          @text="A longer title that could span multiple lines if the characters surpass a certain length"
        />
        <Hds::Dropdown::ListItem::Description
          @text="A longer description that could span on multiple lines if the number of characters require more width than the dropdown provides by default."
        />
        <Hds::Dropdown::ListItem::Separator />
        <Hds::Dropdown::ListItem::Interactive
          @route="index"
          @text="A longer item that could span multiple lines if the characters surpass a certain length"
        />
      </ul>
      {{! template-lint-enable no-inline-styles }}
    </div>
  </div>

  <h5 class="dummy-h5">Interactive</h5>
  <h6 class="dummy-h6">Generated element</h6>
  <div class="dummy-dropdown-list-items-base-sample">
    <div>
      <span class="dummy-text-small">default ⇒ <code class="dummy-code">&lt;button&gt;</code></span>
      <br />
      <ul class="hds-dropdown-list">
        <Hds::Dropdown::ListItem::Interactive @text="Lorem ipsum dolor" />
      </ul>
    </div>
    <div>
      <span class="dummy-text-small">with
        <code class="dummy-code">@href</code>
        ⇒
        <code class="dummy-code">&lt;a&gt;</code></span>
      <br />
      <ul class="hds-dropdown-list">
        <Hds::Dropdown::ListItem::Interactive @href="/" @text="Lorem ipsum dolor" />
      </ul>
    </div>
    <div>
      <span class="dummy-text-small">with
        <code class="dummy-code">@route</code>
        ⇒
        <code class="dummy-code">&lt;LinkTo&gt;</code>
        ⇒
        <code class="dummy-code">&lt;a&gt;</code></span>
      <br />
      <ul class="hds-dropdown-list">
        <Hds::Dropdown::ListItem::Interactive @route="components.dropdown" @text="Lorem ipsum dolor" />
      </ul>
    </div>
  </div>

  <h6 class="dummy-h6">Colors</h6>
  <div class="dummy-dropdown-list-items-base-sample">
    <ul class="hds-dropdown-list">
      <Hds::Dropdown::ListItem::Interactive @icon="settings" @text="action (default)" @color="action" />
    </ul>
    <ul class="hds-dropdown-list">
      <Hds::Dropdown::ListItem::Interactive @icon="trash" @text="critical" @color="critical" />
    </ul>
  </div>
  <h6 class="dummy-h6">States (in each color)</h6>
  {{#each @model.ITEM_INTERACTIVE_COLORS as |color|}}
    <span class="dummy-text-small">{{capitalize color}}</span>
    <div class="dummy-dropdown-list-items-base-sample">
      <ul class="hds-dropdown-list">
        {{#each @model.ITEM_STATES as |state|}}
          <Hds::Dropdown::ListItem::Interactive @text={{state}} @color={{color}} mock-state-value={{state}} />
        {{/each}}
        <Hds::Dropdown::ListItem::Separator />
        <Hds::Dropdown::ListItem::Interactive @text="loading" @color={{color}} @isLoading={{true}} />
      </ul>
      <ul class="hds-dropdown-list">
        {{#each @model.ITEM_STATES as |state|}}
          <Hds::Dropdown::ListItem::Interactive
            @icon={{if (eq color "critical") "trash" "settings"}}
            @text="{{state}} with icon"
            @color={{color}}
            mock-state-value={{state}}
          />
        {{/each}}
        <Hds::Dropdown::ListItem::Separator />
        <Hds::Dropdown::ListItem::Interactive
          @icon={{if (eq color "critical") "trash" "settings"}}
          @text="loading with icon"
          @color={{color}}
          @isLoading={{true}}
        />
      </ul>
      <ul class="hds-dropdown-list">
        {{#each @model.ITEM_STATES as |state|}}
          <Hds::Dropdown::ListItem::Interactive
            @icon={{if (eq color "critical") "trash" "settings"}}
            @text="{{state}} with a longer text string that may wrap since max-width is defined on the container"
            @color={{color}}
            mock-state-value={{state}}
          />
        {{/each}}
      </ul>
    </div>
  {{/each}}

  <h5 class="dummy-h5">Generic</h5>
  <div class="dummy-dropdown-list-items-base-sample">
    <ul class="hds-dropdown-list">
      <Hds::Dropdown::ListItem::Generic>
        <DummyPlaceholder @text="some generic content here" @width="200" @height="40" @background="#e1f5fe" />
      </Hds::Dropdown::ListItem::Generic>
    </ul>
  </div>

  <h5 class="dummy-h5">CopyItem</h5>
  <h6 class="dummy-h6">Content</h6>
  <div class="dummy-dropdown-list-items-base-sample">
    {{! template-lint-disable no-inline-styles }}
    <div>
      <span class="dummy-text-small">base</span>
      {{! Notice: we want to emulate the case of a fixed width list }}
      <ul class="hds-dropdown-list" style="width: 250px">
        <Hds::Dropdown::ListItem::CopyItem @text="91ee1e8ef65b337f0e70d793f456c71d" />
      </ul>
    </div>
    <div>
      <span class="dummy-text-small">with copyItemTitle</span>
      <ul class="hds-dropdown-list" style="width: 250px">
        <Hds::Dropdown::ListItem::CopyItem
          @copyItemTitle="Lorem ipsum dolor"
          @text="91ee1e8ef65b337f0e70d793f456c71d"
        />
      </ul>
    </div>
    {{! template-lint-enable no-inline-styles }}
  </div>
  <h6 class="dummy-h6">States</h6>
  <div class="dummy-dropdown-list-items-base-sample">
    {{! Notice: we want to emulate the case of a fixed width list }}
    {{! template-lint-disable no-inline-styles }}
    <ul class="hds-dropdown-list" style="width: 250px">
      {{#each @model.ITEM_STATES as |state|}}
        <Hds::Dropdown::ListItem::CopyItem
          @text="{{state}}: 91ee1e8ef65b337f0e70d793f456c71d"
          mock-state-value={{state}}
          mock-state-selector="button"
        />
      {{/each}}
      <Hds::Dropdown::ListItem::CopyItem
        @text="success: 91ee1e8ef65b337f0e70d793f456c71d91ee1e8ef65b337f0e70d793f456c71d91ee1e8ef65b337f0e70d793f456c71d"
        @isSuccess={{true}}
        mock-state-value="success"
        mock-state-selector="button"
      />
    </ul>
    {{! template-lint-enable no-inline-styles }}
  </div>
</section>
