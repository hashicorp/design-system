/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { hash } from '@ember/helper';

import { HdsFlyout } from '@hashicorp/design-system-components/components';

// types
import type { HdsFlyoutSignature } from '@hashicorp/design-system-components/components/hds/flyout/index';

export interface CodeFragmentWithTriggerSignature {
  Args: {
    triggerText?: string;
    size?: HdsFlyoutSignature['Args']['size'];
    returnFocusTo?: HdsFlyoutSignature['Args']['returnFocusTo'];
    onOpen?: HdsFlyoutSignature['Args']['onOpen'];
    onClose?: HdsFlyoutSignature['Args']['onClose'];
  };
  Blocks: {
    trigger: [{ openFlyout: () => void }];
    flyout: [
      HdsFlyoutSignature['Blocks']['default'][0] & {
        close: () => void;
        isOpen: boolean;
      },
    ];
  };
  Element: HdsFlyoutSignature['Element'];
}

export default class CodeFragmentWithTrigger extends Component<CodeFragmentWithTriggerSignature> {
  @tracked isFlyoutOpen = false;

  openFlyout = () => {
    this.isFlyoutOpen = true;
    this.args.onOpen?.();
  };

  closeFlyout = () => {
    this.isFlyoutOpen = false;
    // Create a mock event for the onClose callback
    const mockEvent = new Event('close');
    this.args.onClose?.(mockEvent);
  };

  <template>
    {{#if (has-block "trigger")}}
      {{yield (hash openFlyout=this.openFlyout) to="trigger"}}
    {{else}}
      <button type="button" {{on "click" this.openFlyout}}>
        {{@triggerText}}
      </button>
    {{/if}}

    {{#if this.isFlyoutOpen}}
      <HdsFlyout
        @size={{@size}}
        @returnFocusTo={{@returnFocusTo}}
        @onClose={{this.closeFlyout}}
        ...attributes
        as |F|
      >
        {{yield
          (hash
            Header=F.Header
            Description=F.Description
            Body=F.Body
            Footer=F.Footer
            close=this.closeFlyout
            isOpen=this.isFlyoutOpen
          )
          to="flyout"
        }}
      </HdsFlyout>
    {{/if}}
  </template>
}
