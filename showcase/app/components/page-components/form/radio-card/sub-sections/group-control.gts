/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import CodeFragmentWithGroupContent from 'showcase/components/page-components/form/radio-card/code-fragments/with-group-content';

import { HdsFormRadioCardGroup } from '@hashicorp/design-system-components/components';

export default class SubSectionGroupControl extends Component {
  onChange = (event: Event) => {
    const control = event.target as HTMLInputElement;
    const group = control.closest('.hds-form-group__control-fields-wrapper');
    group?.querySelectorAll('.hds-form-radio-card').forEach((radioCard) => {
      radioCard.classList.remove('hds-form-radio-card--checked');
    });
    control
      ?.closest('.hds-form-radio-card')
      ?.classList.add('hds-form-radio-card--checked');
  };

  <template>
    <ShwTextH2>"Group" of controls</ShwTextH2>

    <ShwTextH3>Card content</ShwTextH3>

    <ShwFlex @direction="column" as |SF|>
      <SF.Item @label="With standard content">
        <CodeFragmentWithGroupContent
          @name="radio-card-default"
          @onChange={{this.onChange}}
        />
      </SF.Item>
      <SF.Item @label="With custom content">
        <CodeFragmentWithGroupContent
          @name="radio-card-custom"
          @hasGeneric={{true}}
          @onChange={{this.onChange}}
        />
      </SF.Item>
      <SF.Item @label="With different content height">
        <HdsFormRadioCardGroup @name="radio-card-group-custom" as |G|>
          <G.Legend>Group legend</G.Legend>
          <G.RadioCard
            @maxWidth="330px"
            @checked={{true}}
            {{on "change" this.onChange}}
            as |R|
          >
            <R.Icon @name="hexagon" />
            <R.Label>Radio card with normal label</R.Label>
            <R.Badge @text="Badge" />
            <R.Description>This is the radio card description text.</R.Description>
          </G.RadioCard>
          <G.RadioCard @maxWidth="330px" {{on "change" this.onChange}} as |R|>
            <R.Icon @name="hexagon" />
            <R.Label>Radio card with long label that spans multiple lines</R.Label>
            <R.Badge @text="Badge" />
            <R.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Pellentesque erat elit, lacinia at magna eget, porttitor
              lobortis nulla.</R.Description>
          </G.RadioCard>
          <G.RadioCard @maxWidth="330px" {{on "change" this.onChange}} as |R|>
            <R.Label>37230f8be8ccf24075cf73805bbfa77537ea17ad</R.Label>
            <R.Description>This is the radio card description text.</R.Description>
          </G.RadioCard>
        </HdsFormRadioCardGroup>
      </SF.Item>
    </ShwFlex>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Control position</ShwTextH3>

    <ShwFlex @direction="column" as |SF|>
      <SF.Item @label="Bottom">
        <CodeFragmentWithGroupContent
          @name="radio-card-position-bottom"
          @controlPosition="bottom"
          @onChange={{this.onChange}}
        />
      </SF.Item>
      <SF.Item @label="Left">
        <CodeFragmentWithGroupContent
          @name="radio-card-position-left"
          @controlPosition="left"
          @onChange={{this.onChange}}
        />
      </SF.Item>
    </ShwFlex>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Card alignment</ShwTextH3>

    <ShwFlex @direction="column" as |SF|>
      <SF.Item @label="Left">
        <CodeFragmentWithGroupContent
          @name="radio-card-align-left"
          @alignment="left"
          @onChange={{this.onChange}}
        />
      </SF.Item>
      <SF.Item @label="Center">
        <CodeFragmentWithGroupContent
          @name="radio-card-align-center"
          @alignment="center"
          @onChange={{this.onChange}}
        />
      </SF.Item>
    </ShwFlex>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Card width</ShwTextH3>

    <ShwFlex @direction="column" as |SF|>
      <SF.Item @label="Flexible width (default)">
        <CodeFragmentWithGroupContent
          @name="radio-card-width-flexible"
          @onChange={{this.onChange}}
        />
      </SF.Item>
      <SF.Item @label="Fixed width">
        <CodeFragmentWithGroupContent
          @name="radio-card-width-fixed"
          @maxWidth="244px"
          @onChange={{this.onChange}}
        />
      </SF.Item>
    </ShwFlex>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Group content</ShwTextH3>

    <ShwFlex @direction="column" as |SF|>
      <SF.Item @label="With legend">
        <CodeFragmentWithGroupContent
          @name="radio-card-legend"
          @onChange={{this.onChange}}
        />
      </SF.Item>
      <SF.Item @label="With legend and helper text">
        <CodeFragmentWithGroupContent
          @name="radio-card-helper-text"
          @hasHelperText={{true}}
          @onChange={{this.onChange}}
        />
      </SF.Item>
      <SF.Item @label="With legend and error">
        <CodeFragmentWithGroupContent
          @name="radio-card-error-message"
          @hasError={{true}}
          @onChange={{this.onChange}}
        />
      </SF.Item>
      <SF.Item @label="With legend and required">
        <CodeFragmentWithGroupContent
          @name="radio-card-required"
          @isRequired={{true}}
          @onChange={{this.onChange}}
        />
      </SF.Item>
    </ShwFlex>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Group layout</ShwTextH3>

    <ShwFlex @direction="column" as |SF|>
      <SF.Item @label="Horizontal (default)">
        <CodeFragmentWithGroupContent
          @name="radio-card-layout-horizontal"
          @controlPosition="left"
          @layout="horizontal"
          @onChange={{this.onChange}}
        />
      </SF.Item>
      <SF.Item @label="Vertical">
        <CodeFragmentWithGroupContent
          @name="radio-card-layout-vertical"
          @controlPosition="left"
          @layout="vertical"
          @onChange={{this.onChange}}
        />
      </SF.Item>
      <SF.Item @label="Vertical, fixed width">
        <CodeFragmentWithGroupContent
          @name="radio-card-layout-vertical-fixed"
          @controlPosition="left"
          @layout="vertical"
          @maxWidth="330px"
          @onChange={{this.onChange}}
        />
      </SF.Item>
    </ShwFlex>
  </template>
}
