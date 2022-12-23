## Showcase

<section data-test-percy data-section="showcase">
  <h3>Toggles</h3>
  <h4>Toggle::Button</h4>
  <div class="dummy-dropdown-toggle-button-sample">
    <div>
      <span class="doc-text-body-small">primary</span>
      <Hds::Dropdown::Toggle::Button @text="Lorem ipsum" />
    </div>
    <div>
      <span class="doc-text-body-small">secondary</span>
      <Hds::Dropdown::Toggle::Button @text="Lorem ipsum" @color="secondary" />
    </div>
  </div>
  <br />
  <div class="dummy-dropdown-toggle-button-sample">
    <div>
      <span class="doc-text-body-small">primary small</span>
      <Hds::Dropdown::Toggle::Button @text="Lorem ipsum" @size="small" />
    </div>
    <div>
      <span class="doc-text-body-small">secondary small</span>
      <Hds::Dropdown::Toggle::Button @text="Lorem ipsum" @size="small" @color="secondary" />
    </div>
  </div>
  <h4>Toggle::Icon</h4>
  <div class="dummy-dropdown-toggle-icon-sample">
    <div>
      <span class="doc-text-body-small">with icon + chevron</span>
      <Hds::Dropdown::Toggle::Icon @icon="user" @text="user menu" />
    </div>
    <div>
      <span class="doc-text-body-small">icon only</span>
      <Hds::Dropdown::Toggle::Icon @icon="more-horizontal" @hasChevron={{false}} @text="overflow menu" />
    </div>
    <div>
      <span class="doc-text-body-small">with image (avatar)</span>
      <Hds::Dropdown::Toggle::Icon @imageSrc="/assets/images/avatar.png" @text="user menu" />
    </div>
  </div>
  <h4>States</h4>
  <div class="dummy-dropdown-toggle-states-grid">
    {{#each this.TOGGLE_BUTTON_COLORS as |color|}}
      {{#each @model.TOGGLE_STATES as |state|}}
        <div>
          <span class="doc-text-body-small">{{color}}/{{state}}:</span>
          <br />
          <Hds::Dropdown::Toggle::Button @text={{capitalize state}} @color={{color}} mock-state-value={{state}} />
        </div>
      {{/each}}
      <div>
        <span class="doc-text-body-small">{{color}}/open:</span>
        <br />
        <Hds::Dropdown::Toggle::Button @text="Opened" @isOpen={{true}} @color={{color}} />
      </div>
    {{/each}}

    {{#each @model.TOGGLE_STATES as |state|}}
      <div>
        <span class="doc-text-body-small">icon/{{state}}:</span>
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
      <span class="doc-text-body-small">icon/open:</span>
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
        <span class="doc-text-body-small">icon+chevron/{{state}}:</span>
        <br />
        <Hds::Dropdown::Toggle::Icon @icon="user" @text={{state}} mock-state-value={{state}} />
      </div>
    {{/each}}
    <div>
      <span class="doc-text-body-small">icon+chevron/open:</span>
      <br />
      <Hds::Dropdown::Toggle::Icon @icon="user" @text="open" @isOpen={{true}} />
    </div>

    {{#each @model.TOGGLE_STATES as |state|}}
      <div>
        <span class="doc-text-body-small">avatar+chevron/{{state}}:</span>
        <br />
        <Hds::Dropdown::Toggle::Icon @text={{state}} @imageSrc="/assets/images/avatar.png" mock-state-value={{state}} />
      </div>
    {{/each}}
    <div>
      <span class="doc-text-body-small">avatar+chevron/open:</span>
      <br />
      <Hds::Dropdown::Toggle::Icon @text="open" @isOpen={{true}} @imageSrc="/assets/images/avatar.png" />
    </div>
  </div>

  <hr class="dummy-divider" />

  <h3>List Items</h3>

  <h4>Title / Description / Separator</h4>
  <div class="dummy-dropdown-list-items-base-sample">
    <div>
      <span class="doc-text-body-small">default (min width)</span>
      <Doc::ListContainer class="hds-dropdown-list">
        <Hds::Dropdown::ListItem::Title @text="A simple title" />
        <Hds::Dropdown::ListItem::Description @text="A description." />
        <Hds::Dropdown::ListItem::Separator />
        <Hds::Dropdown::ListItem::Interactive @route="index" @text="Item" />
      </Doc::ListContainer>
    </div>
    <div>
      <span class="doc-text-body-small">default (max width)</span>
      <Doc::ListContainer class="hds-dropdown-list">
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
      </Doc::ListContainer>
    </div>
    <div>
      <span class="doc-text-body-small">fixed width</span>
      {{! template-lint-disable no-inline-styles }}
      <Doc::ListContainer class="hds-dropdown-list" style="width: 250px">
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
      </Doc::ListContainer>
      {{! template-lint-enable no-inline-styles }}
    </div>
  </div>

  <h4>Interactive</h4>
  <h5>Generated element</h5>
  <div class="dummy-dropdown-list-items-base-sample">
    <div>
      <span class="doc-text-body-small">default ⇒ <code class="dummy-code">&lt;button&gt;</code></span>
      <br />
      <Doc::ListContainer class="hds-dropdown-list">
        <Hds::Dropdown::ListItem::Interactive @text="Lorem ipsum dolor" />
      </Doc::ListContainer>
    </div>
    <div>
      <span class="doc-text-body-small">with
        <code class="dummy-code">@href</code>
        ⇒
        <code class="dummy-code">&lt;a&gt;</code></span>
      <br />
      <Doc::ListContainer class="hds-dropdown-list">
        <Hds::Dropdown::ListItem::Interactive @href="/" @text="Lorem ipsum dolor" />
      </Doc::ListContainer>
    </div>
    <div>
      <span class="doc-text-body-small">with
        <code class="dummy-code">@route</code>
        ⇒
        <code class="dummy-code">&lt;LinkTo&gt;</code>
        ⇒
        <code class="dummy-code">&lt;a&gt;</code></span>
      <br />
      <Doc::ListContainer class="hds-dropdown-list">
        <Hds::Dropdown::ListItem::Interactive @route="index" @text="Lorem ipsum dolor" />
      </Doc::ListContainer>
    </div>
  </div>

  <h5>Colors</h5>
  <div class="dummy-dropdown-list-items-base-sample">
    <Doc::ListContainer class="hds-dropdown-list">
      <Hds::Dropdown::ListItem::Interactive @icon="settings" @text="action (default)" @color="action" />
    </Doc::ListContainer>
    <Doc::ListContainer class="hds-dropdown-list">
      <Hds::Dropdown::ListItem::Interactive @icon="trash" @text="critical" @color="critical" />
    </Doc::ListContainer>
  </div>
  <h4>States (in each color)</h4>
  {{#each @model.ITEM_INTERACTIVE_COLORS as |color|}}
    <span class="doc-text-body-small">{{capitalize color}}</span>
    <div class="dummy-dropdown-list-items-base-sample">
      <Doc::ListContainer class="hds-dropdown-list">
        {{#each @model.ITEM_STATES as |state|}}
          <Hds::Dropdown::ListItem::Interactive @text={{state}} @color={{color}} mock-state-value={{state}} />
        {{/each}}
        <Hds::Dropdown::ListItem::Separator />
        <Hds::Dropdown::ListItem::Interactive @text="loading" @color={{color}} @isLoading={{true}} />
      </Doc::ListContainer>
      <Doc::ListContainer class="hds-dropdown-list">
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
      </Doc::ListContainer>
      <Doc::ListContainer class="hds-dropdown-list">
        {{#each @model.ITEM_STATES as |state|}}
          <Hds::Dropdown::ListItem::Interactive
            @icon={{if (eq color "critical") "trash" "settings"}}
            @text="{{state}} with a longer text string that may wrap since max-width is defined on the container"
            @color={{color}}
            mock-state-value={{state}}
          />
        {{/each}}
      </Doc::ListContainer>
    </div>
  {{/each}}

  <h4>Generic</h4>
  <div class="dummy-dropdown-list-items-base-sample">
    <Doc::ListContainer class="hds-dropdown-list">
      <Hds::Dropdown::ListItem::Generic>
        <Doc::Placeholder @text="some generic content here" @width="200" @height="40" @background="#e1f5fe" />
      </Hds::Dropdown::ListItem::Generic>
    </Doc::ListContainer>
  </div>

  <h4>CopyItem</h4>
  <h5>Content</h5>
  <div class="dummy-dropdown-list-items-base-sample">
    {{! template-lint-disable no-inline-styles }}
    <div>
      <span class="doc-text-body-small">base</span>
      {{! Notice: we want to emulate the case of a fixed width list }}
      <Doc::ListContainer class="hds-dropdown-list" style="width: 250px">
        <Hds::Dropdown::ListItem::CopyItem @text="91ee1e8ef65b337f0e70d793f456c71d" />
      </Doc::ListContainer>
    </div>
    <div>
      <span class="doc-text-body-small">with copyItemTitle</span>
      <Doc::ListContainer class="hds-dropdown-list" style="width: 250px">
        <Hds::Dropdown::ListItem::CopyItem
          @copyItemTitle="Lorem ipsum dolor"
          @text="91ee1e8ef65b337f0e70d793f456c71d"
        />
      </Doc::ListContainer>
    </div>
    {{! template-lint-enable no-inline-styles }}
  </div>
  <h5>States</h5>
  <div class="dummy-dropdown-list-items-base-sample">
    {{! Notice: we want to emulate the case of a fixed width list }}
    {{! template-lint-disable no-inline-styles }}
    <Doc::ListContainer class="hds-dropdown-list" style="width: 250px">
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
    </Doc::ListContainer>
    {{! template-lint-enable no-inline-styles }}
  </div>
</section>
