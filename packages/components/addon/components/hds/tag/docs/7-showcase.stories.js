import { hbs } from 'ember-cli-htmlbars';
// not sure if it should work or not (it doesn't)
// import { COLORS } from '@hashicorp/design-system-components/components/hds/tag';
// import { COLORS } from '@hashicorp/design-system/addon/components/hds/tag';
// import { COLORS } from '../../../../../addon/components/hds/tag';

const NOOP = () => {};

// see https://storybook.js.org/tutorials/intro-to-storybook/ember/en/simple-component/

export default {
  title: 'Components / Tag / Showcase',
  args: { noop: NOOP },
};

// const Template = (args) => ({
//   template: hbs`<Hds::Tag @text={{this.text}} />`,
//   context: args,
// });

// export const Default = Template.bind({});
// Default.args = {
//   text: 'Test Tag',
// };

// export const Dismiss = (args) => ({
//   template: hbs`<div><Hds::Tag @text="My text tag" @onDismiss={{this.noop}} /></div>`,
//   context: args,
// });

export const Content = (args) => ({
  template: hbs`
    <div>
      <div class="dummy-tag-base-sample">
        <Hds::Tag @text="My text tag" @onDismiss={{this.noop}} />
        <Hds::Tag @text="My text tag" />
        <Hds::Tag @text="My link tag" @onDismiss={{this.noop}} @route="components.tag" />
        <Hds::Tag @text="My link tag" @route="components.tag" />
      </div>
      <div class="dummy-tag-base-sample">
        <p>This is a paragraph: <Hds::Tag @text="My text tag" /></p>
      </div>
    </div>
  `,
  context: args,
});

export const States = (args) => ({
  template: hbs`
    <div class="dummy-tag-states-grid">
      {{#each this.STATES as |state|}}
        <div>
          <span class="dummy-text-small">{{capitalize state}}:</span>
          <br />
          <div class="dummy-tag-states-subgrid">
            <Hds::Tag @text="My tag" @onDismiss={{this.noop}} mock-state-value={{state}} mock-state-selector="button" />
          </div>
        </div>
      {{/each}}
      {{#each this.COLORS as |color|}}
        <h5 class="dummy-h5 dummy-tag-states-grid__title">{{capitalize color}}</h5>
        {{#each this.STATES as |state|}}
          <div>
            <span class="dummy-text-small">{{capitalize state}}:</span>
            <br />
            <div class="dummy-tag-states-subgrid">
              <Hds::Tag
                @color={{color}}
                @text="My link tag"
                @onDismiss={{this.noop}}
                @href="#"
                mock-state-value={{state}}
                mock-state-selector="button"
              />
              <Hds::Tag
                @color={{color}}
                @text="My link tag"
                @onDismiss={{this.noop}}
                @href="#"
                mock-state-value={{state}}
                mock-state-selector="a"
              />
              <Hds::Tag
                @color={{color}}
                @text="My link tag"
                @href="#"
                mock-state-value={{state}}
                mock-state-selector="a"
              />
            </div>
          </div>
        {{/each}}
      {{/each}}
    </div>
  `,
  context: {
    ...args,
    STATES: ['default', 'hover', 'active', 'focus'],
    COLORS: ['primary', 'secondary'],
  },
});

export const Containers = (args) => ({
  template: hbs`
    <div class="dummy-tag-containers">
      {{#let (array "block" "flex" "grid") as |displays|}}
        {{#each displays as |display|}}
          <div>
            <span class="dummy-text-small">Parent with <code class="dummy-code">display: {{display}}</code></span>
            <br />
            <div class="dummy-tag-containers__{{display}}">
              <Hds::Tag @text="My text tag" @onDismiss={{this.noop}} />
              <Hds::Tag @text="My text tag" @onDismiss={{this.noop}} />
              <Hds::Tag @text="My slightly longer tag" @onDismiss={{this.noop}} />
              <Hds::Tag @text="My text tag" @onDismiss={{this.noop}} />
            </div>
          </div>
        {{/each}}
      {{/let}}
    </div>
  `,
  context: args,
});
