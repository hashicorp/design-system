<section data-test-percy data-section="showcase">
  
  <h4 class="dummy-h4">Elevation:</h4>
  <div class="dummy-card-sample-grid">
    <p class="dummy-paragraph dummy-card-sample-grid__title">"level"</p>
    {{#each @model.CONTAINER_LEVELS as |level|}}
      <Hds::Card::Container @level={{level}}>
        <Doc::Placeholder @text={{level}} @width="200" @height="200" @background="transparent" />
      </Hds::Card::Container>
    {{/each}}
    <p class="dummy-paragraph dummy-card-sample-grid__title">"levelHover"</p>
    {{#each @model.CONTAINER_LEVELS as |level|}}
      <Hds::Card::Container @levelHover={{level}} mock-state-value="hover">
        <Doc::Placeholder @text={{level}} @width="200" @height="60" @background="transparent" />
      </Hds::Card::Container>
    {{/each}}
    <p class="dummy-paragraph dummy-card-sample-grid__title">"levelActive"</p>
    {{#each @model.CONTAINER_LEVELS as |level|}}
      <Hds::Card::Container @levelActive={{level}} mock-state-value="active">
        <Doc::Placeholder @text={{level}} @width="200" @height="60" @background="transparent" />
      </Hds::Card::Container>
    {{/each}}
  </div>

  <h4 class="dummy-h4">Border:</h4>
  <div class="dummy-card-base-sample">
    {{#each @model.CONTAINER_LEVELS as |level|}}
      <Hds::Card::Container @level={{level}} @hasBorder={{true}}>
        <Doc::Placeholder @text={{level}} @width="200" @height="200" @background="transparent" />
      </Hds::Card::Container>
    {{/each}}
  </div>

  <h4 class="dummy-h4">Background:</h4>
  <div class="dummy-card-base-sample">
    {{#each @model.CONTAINER_BACKGROUNDS as |background|}}
      <Hds::Card::Container @level="mid" @hasBorder={{true}} @background={{background}}>
        <Doc::Placeholder @text={{background}} @width="200" @height="200" @background="transparent" />
      </Hds::Card::Container>
    {{/each}}
  </div>

  <h4 class="dummy-h4">Overflow:</h4>
  <div class="dummy-card-base-sample">
    <Hds::Card::Container @level="mid" @hasBorder={{true}}>
      <div class="dummy-card-overflow__wrapper-relative">
        <Doc::Placeholder @text="hidden (default)" @width="200" @height="200" @background="#e1f5fe" />
        <div class="dummy-card-overflow__content-absolute"></div>
      </div>
    </Hds::Card::Container>
    <Hds::Card::Container @level="mid" @hasBorder={{true}} @overflow="visible">
      <div class="dummy-card-overflow__wrapper-relative">
        <Doc::Placeholder @text="visible" @width="200" @height="200" @background="#e1f5fe" />
        <div class="dummy-card-overflow__content-absolute"></div>
      </div>
    </Hds::Card::Container>
  </div>
</section>