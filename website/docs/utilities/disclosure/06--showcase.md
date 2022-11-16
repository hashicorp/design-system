---
category: utilities
component: disclosure
section: showcase
---

<h1>Disclosure - Showcase</h1>

<section data-test-percy data-section="showcase">
  

  <h4 class="dummy-h4">Variants</h4>

  <p class="dummy-paragraph">with generic HTML
    <code class="dummy-code">&lt;button&gt;</code>
    and generic content (placeholder)</p>
  <div class="dummy-disclosure-container">
    <Hds::Disclosure>
      <:toggle as |t|>
        <button type="button" {{on "click" t.onClickToggle}}>
          Click me
          <FlightIcon @name={{if t.isOpen "chevron-up" "chevron-down"}} />
        </button>
      </:toggle>
      <:content>
        <DummyPlaceholder @text="some generic content here" @width="200" @height="90" @background="#FAFAFA" />
      </:content>
    </Hds::Disclosure>
  </div>

  <p class="dummy-paragraph">with generic HTML
    <code class="dummy-code">&lt;button&gt;</code>
    and generic list of
    <code class="dummy-code">&lt;a&gt;</code>
    links</p>
  <div class="dummy-disclosure-container">
    <Hds::Disclosure>
      <:toggle as |t|>
        <button type="button" {{on "click" t.onClickToggle}}>Click me</button>
      </:toggle>
      <:content as |c|>
        <ul class="dummy-disclosure-content-list-of-links">
          <li>
            <a href="https://google.com">Link to Google</a>
          </li>
          <li>
            <button type="button" {{on "click" c.close}}>Button that closes the disclosed content on click</button>
          </li>
        </ul>
      </:content>
    </Hds::Disclosure>
  </div>

  <p class="dummy-paragraph">with
    <code class="dummy-code">&lt;Hds::Button&gt;</code>
    and generic list of
    <code class="dummy-code">&lt;a&gt;</code>
    links</p>
  <div class="dummy-disclosure-container">
    <Hds::Disclosure>
      <:toggle as |t|>
        <Hds::Button @icon="chevron-down" @iconPosition="trailing" @text="Click me" {{on "click" t.onClickToggle}} />
      </:toggle>
      <:content as |c|>
        <ul class="dummy-disclosure-content-list-of-links">
          <li>
            <a href="https://google.com">Link to Google</a>
          </li>
          <li>
            <button type="button" {{on "click" c.close}}>Button that closes the disclosed content on click</button>
          </li>
        </ul>
      </:content>
    </Hds::Disclosure>
  </div>

  <p class="dummy-paragraph">with
    <code class="dummy-code">&lt;Hds::Button&gt;</code>
    inside a larger container and generic list of
    <code class="dummy-code">&lt;a&gt;</code>
    links</p>
  <div class="dummy-disclosure-container">
    <Hds::Disclosure>
      <:toggle as |t|>
        <div class="dummy-disclosure-button-wrapper">
          <Hds::Button @icon="chevron-down" @iconPosition="trailing" @text="Click me" {{on "click" t.onClickToggle}} />
        </div>
      </:toggle>
      <:content as |c|>
        <ul class="dummy-disclosure-content-list-of-links">
          <li>
            <a href="https://google.com">Link to Google</a>
          </li>
          <li>
            <button type="button" {{on "click" c.close}}>Button that closes the disclosed content on click</button>
          </li>
        </ul>
      </:content>
    </Hds::Disclosure>
  </div>

</section>
