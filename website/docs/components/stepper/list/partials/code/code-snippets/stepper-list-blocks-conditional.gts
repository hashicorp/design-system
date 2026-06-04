import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import style from 'ember-style-modifier';

import {
  HdsStepperList,
  HdsButton,
} from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  @tracked showBlocks = true;

  toggleBlocks = () => {
    this.showBlocks = !this.showBlocks;
  };

  <template>
    <HdsStepperList @ariaLabel="Additional information" as |S|>
      <S.Step @status="complete">
        <:title>Completed step</:title>
        <:description>
          {{~#if this.showBlocks~}}
            Step description
          {{/if~}}
        </:description>
      </S.Step>
      <S.Step @status="progress">
        <:title>Current step</:title>
        <:description>
          {{~#if this.showBlocks~}}
            Step description
          {{/if~}}
        </:description>
        <:content>
          {{~#if this.showBlocks~}}
            <HdsButton @text="Do step action" />
          {{/if~}}
        </:content>
      </S.Step>
      <S.Step>
        <:title>Upcoming step</:title>
        <:description>
          {{~#if this.showBlocks~}}
            Step description
          {{/if~}}
        </:description>
      </S.Step>
    </HdsStepperList>
    <HdsButton
      @text={{if this.showBlocks "Hide blocks" "Show blocks"}}
      {{on "click" this.toggleBlocks}}
      {{style marginTop="24px"}}
    />
  </template>
}
