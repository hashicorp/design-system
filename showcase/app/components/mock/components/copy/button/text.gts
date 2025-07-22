import Component from '@glimmer/component';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH4 from 'showcase/components/shw/text/h4';

// HDS Components
import { HdsCopyButton } from '@hashicorp/design-system-components/components';

export default class CopyButtonText extends Component {
  get bigIntNumber() {
    const bigIntNumber = BigInt(12345678910);
    return bigIntNumber;
  }

  <template>
    <ShwFlex as |SF|>
      <SF.Item>
        <HdsCopyButton
          @text="Copy a secret key"
          @textToCopy="someSecretThingGoesHere"
        />
      </SF.Item>
      <SF.Item>
        {{! context: https://github.com/hashicorp/design-system/pull/1564 }}
        <HdsCopyButton @text="Copy a number" @textToCopy={{123456789}} />
      </SF.Item>
      <SF.Item>
        <HdsCopyButton
          @text="Copy a Bigint number"
          @textToCopy={{this.bigIntNumber}}
        />
      </SF.Item>
    </ShwFlex>

    <ShwTextH4>Special cases</ShwTextH4>

    <ShwFlex as |SF|>
      <SF.Item>
        <HdsCopyButton @text="Copy an empty string" @textToCopy="" />
      </SF.Item>
      <SF.Item>
        <HdsCopyButton @text="Copy the number '0'" @textToCopy={{0}} />
      </SF.Item>
    </ShwFlex>
  </template>
}
