---
title: Tabs
category: components
component: tabs
section: showcase
---


<section data-test-percy data-section="showcase">
  

  <h4 class="dummy-h4">Tab</h4>
  <button id="dummy-toggle-highlight" type="button" {{on "click" this.toggleHighlight}}>
    {{if this.showHighlight "Hide" "Show"}}
    layout highlight
  </button>
  <div class="{{if this.showHighlight 'dummy-tabs-layout-highlight'}}">
    <h5 class="dummy-h6">Content</h5>
    <div class="dummy-tab-base-sample">
      <div>
        <span class="dummy-text-small">Text only</span>
        <ul class="dummy-tab-ul-tab-wrapper">
          <Hds::Tabs::Tab>Lorem ipsum</Hds::Tabs::Tab>
        </ul>
      </div>
      <div>
        <span class="dummy-text-small">Icon + Text</span>
        <ul class="dummy-tab-ul-tab-wrapper">
          <Hds::Tabs::Tab @icon="hexagon">Lorem ipsum</Hds::Tabs::Tab>
        </ul>
      </div>
      <div>
        <span class="dummy-text-small">Text + Counter</span>
        <ul class="dummy-tab-ul-tab-wrapper">
          <Hds::Tabs::Tab @count="10">Lorem ipsum</Hds::Tabs::Tab>
        </ul>
      </div>
      <div>
        <span class="dummy-text-small">Icon + Text + Counter</span>
        <ul class="dummy-tab-ul-tab-wrapper">
          <Hds::Tabs::Tab @icon="hexagon" @count="10">Lorem ipsum</Hds::Tabs::Tab>
        </ul>
      </div>
    </div>

    <h5 class="dummy-h6">States</h5>
    <div class="dummy-tab-base-sample">
      <div class="dummy-tab-base-sample-item">
        <span class="dummy-text-small">Default:</span>
        <ul class="dummy-tab-ul-tab-wrapper">
          <Hds::Tabs::Tab>Lorem ipsum</Hds::Tabs::Tab>
        </ul>
        <ul class="dummy-tab-ul-tab-wrapper">
          <Hds::Tabs::Tab @icon="hexagon" @count="10">Lorem ipsum</Hds::Tabs::Tab>
        </ul>
      </div>
      <div class="dummy-tab-base-sample-item">
        <span class="dummy-text-small">Hover:</span>
        <ul class="dummy-tab-ul-tab-wrapper">
          <Hds::Tabs::Tab mock-state-value="hover">Lorem ipsum</Hds::Tabs::Tab>
        </ul>
        <ul class="dummy-tab-ul-tab-wrapper">
          <Hds::Tabs::Tab @icon="hexagon" @count="10" mock-state-value="hover">Lorem ipsum</Hds::Tabs::Tab>
        </ul>
      </div>
      <div class="dummy-tab-base-sample-item">
        <span class="dummy-text-small">Focus:</span>
        <ul class="dummy-tab-ul-tab-wrapper">
          <Hds::Tabs::Tab mock-state-value="focus" mock-state-selector="button">Lorem ipsum</Hds::Tabs::Tab>
        </ul>
        <ul class="dummy-tab-ul-tab-wrapper">
          <Hds::Tabs::Tab @icon="hexagon" @count="10" mock-state-value="focus" mock-state-selector="button">Lorem ipsum</Hds::Tabs::Tab>
        </ul>
      </div>
    </div>
  </div>

  <h4 class="dummy-h4">Panel</h4>
  <h5 class="dummy-h6">Content</h5>
  <Hds::Tabs::Panel>
    <DummyPlaceholder @text="Panel with generic content" @height="50" @background="#eee" />
  </Hds::Tabs::Panel>

  <h4 class="dummy-h4">Tabs</h4>
  <h5 class="dummy-h6">Basic usage</h5>
  <Hds::Tabs as |T|>
    <T.Tab>One</T.Tab>
    <T.Tab>Two</T.Tab>
    <T.Tab>Three</T.Tab>

    <T.Panel>
      <DummyPlaceholder @height="50" @background="#eee">
        <span>Content one with <a href="#">link to test tabbing</a></span>
      </DummyPlaceholder>
    </T.Panel>
    <T.Panel><DummyPlaceholder @text="Content two" @height="50" @background="#eee" /></T.Panel>
    <T.Panel><DummyPlaceholder @text="Content three" @height="50" @background="#eee" /></T.Panel>
  </Hds::Tabs>

  <h5 class="dummy-h6">With optional icon and badge count</h5>
  <Hds::Tabs as |T|>
    <T.Tab @count="5">One</T.Tab>
    <T.Tab @icon="info">Two</T.Tab>
    <T.Tab>Three</T.Tab>
    <T.Tab @icon="alert-triangle" @count="5">Four</T.Tab>

    <T.Panel><DummyPlaceholder @text="Content one" @height="50" @background="#eee" /></T.Panel>
    <T.Panel><DummyPlaceholder @text="Content two" @height="50" @background="#eee" /></T.Panel>
    <T.Panel><DummyPlaceholder @text="Content three" @height="50" @background="#eee" /></T.Panel>
    <T.Panel><DummyPlaceholder @text="Content four" @height="50" @background="#eee" /></T.Panel>
  </Hds::Tabs>

  <h5 class="dummy-h6">With pre-selected tab</h5>
  <Hds::Tabs as |T|>
    <T.Tab>One</T.Tab>
    <T.Tab>Two</T.Tab>
    <T.Tab @isSelected={{true}}>Three (selected on page load)</T.Tab>

    <T.Panel><DummyPlaceholder @text="Content one" @height="50" @background="#eee" /></T.Panel>
    <T.Panel><DummyPlaceholder @text="Content two" @height="50" @background="#eee" /></T.Panel>
    <T.Panel>
      <DummyPlaceholder @text="Content three (displayed on page load)" @height="50" @background="#eee" />
    </T.Panel>
  </Hds::Tabs>

  <h5 class="dummy-h6">With overflowing tabs</h5>
  <Hds::Tabs as |T|>
    <T.Tab>One one-thousand</T.Tab>
    <T.Tab>Two one-thousand</T.Tab>
    <T.Tab>Three one-thousand</T.Tab>
    <T.Tab>Four one-thousand</T.Tab>
    <T.Tab>Five one-thousand</T.Tab>
    <T.Tab>Six one-thousand</T.Tab>
    <T.Tab>Seven one-thousand</T.Tab>
    <T.Tab>Eight one-thousand</T.Tab>
    <T.Tab>Nine one-thousand</T.Tab>
    <T.Tab>Ten one-thousand</T.Tab>

    <T.Panel><DummyPlaceholder @text="Content one" @height="50" @background="#eee" /></T.Panel>
    <T.Panel><DummyPlaceholder @text="Content two" @height="50" @background="#eee" /></T.Panel>
    <T.Panel><DummyPlaceholder @text="Content three" @height="50" @background="#eee" /></T.Panel>
    <T.Panel><DummyPlaceholder @text="Content four" @height="50" @background="#eee" /></T.Panel>
    <T.Panel><DummyPlaceholder @text="Content five" @height="50" @background="#eee" /></T.Panel>
    <T.Panel><DummyPlaceholder @text="Content six" @height="50" @background="#eee" /></T.Panel>
    <T.Panel><DummyPlaceholder @text="Content seven" @height="50" @background="#eee" /></T.Panel>
    <T.Panel><DummyPlaceholder @text="Content eight" @height="50" @background="#eee" /></T.Panel>
    <T.Panel><DummyPlaceholder @text="Content nine" @height="50" @background="#eee" /></T.Panel>
    <T.Panel><DummyPlaceholder @text="Content ten" @height="50" @background="#eee" /></T.Panel>
  </Hds::Tabs>

  <h5 class="dummy-h6">Call a passed function when a tab is clicked</h5>
  <p class="dummy-paragraph">Logs the tab id to the console</p>

  <Hds::Tabs @onClickTab={{this.logClickedTab}} as |T|>
    <T.Tab>One</T.Tab>
    <T.Tab>Two</T.Tab>
    <T.Tab>Three</T.Tab>

    <T.Panel><DummyPlaceholder @text="Content one" @height="50" @background="#eee" /></T.Panel>
    <T.Panel><DummyPlaceholder @text="Content two" @height="50" @background="#eee" /></T.Panel>
    <T.Panel><DummyPlaceholder @text="Content three" @height="50" @background="#eee" /></T.Panel>
  </Hds::Tabs>
</section>
