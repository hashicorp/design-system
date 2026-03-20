import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import {
  HdsRichTooltip,
  HdsTextDisplay,
  HdsTextBody,
  HdsButton,
} from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  onClickButton = () => {
    console.log('Clicked the button!');
  };

  <template>
    <div class="doc-rich-tooltip-standalone-block-flex-layout">
      <HdsButton @text="Your action" {{on "click" this.onClickButton}} />
      <HdsRichTooltip as |RT|>
        <RT.Toggle @size="medium" @text="More info" @icon="info" />
        <RT.Bubble>
          <HdsTextDisplay @tag="h4" @size="200">Some title</HdsTextDisplay>
          <HdsTextBody @tag="p" @size="200">Some descriptive information</HdsTextBody>
        </RT.Bubble>
      </HdsRichTooltip>
    </div>
  </template>
}
