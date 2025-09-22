import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { on } from '@ember/modifier';
import { eq } from 'ember-truth-helpers';
import { hash } from '@ember/helper';

import {
  HdsButton,
  HdsDisclosurePrimitive,
  HdsIcon,
} from '@hashicorp/design-system-components/components';

export interface CodeFragmentWithGenericContentSignature {
  Args: {
    toggleType?: 'html-button' | 'hds-button';
    wrapperContainer?: boolean;
  };
  Blocks: {
    default: [
      {
        close: () => void;
      },
    ];
  };
}

const CodeFragmentWithGenericContent: TemplateOnlyComponent<CodeFragmentWithGenericContentSignature> =
  <template>
    <div
      class="shw-utility-disclosure-primitive-container
        {{if
          @wrapperContainer
          'shw-utility-disclosure-primitive-button-wrapper'
        }}"
    >
      <HdsDisclosurePrimitive>
        <:toggle as |t|>
          {{#if (eq @toggleType "hds-button")}}
            <HdsButton
              @icon="chevron-down"
              @iconPosition="trailing"
              @text="Click me"
              {{on "click" t.onClickToggle}}
            />
          {{else}}
            <button type="button" {{on "click" t.onClickToggle}}>
              Click me
              <HdsIcon @name={{if t.isOpen "chevron-up" "chevron-down"}} />
            </button>
          {{/if}}
        </:toggle>
        <:content as |c|>
          {{yield (hash close=c.close)}}
        </:content>
      </HdsDisclosurePrimitive>
    </div>
  </template>;

export default CodeFragmentWithGenericContent;
