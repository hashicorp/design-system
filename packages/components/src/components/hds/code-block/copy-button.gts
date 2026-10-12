/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { service } from '@ember/service';

import HdsCopyButton from '../copy/button/index.gts';

import type { HdsCopyButtonSignature } from '../copy/button/index.gts';
import type HdsIntlService from '../../../services/hds-intl.ts';

export interface HdsCodeBlockCopyButtonSignature {
  Args: {
    targetToCopy?: HdsCopyButtonSignature['Args']['targetToCopy'];
    text?: HdsCopyButtonSignature['Args']['text'];
    onCopy?: HdsCopyButtonSignature['Args']['onSuccess'];
    copySuccessMessageText?: HdsCopyButtonSignature['Args']['ariaMessageText'];
  };
  Blocks: {
    default: [];
  };
  Element: HdsCopyButtonSignature['Element'];
}

export default class HdsCodeBlockCopyButton extends Component<HdsCodeBlockCopyButtonSignature> {
  @service declare readonly hdsIntl: HdsIntlService;

  get text(): HdsCopyButtonSignature['Args']['text'] {
    return this.args.text
      ? this.args.text
      : this.hdsIntl.t('hds.components.code-block.copy-button', {
          default: 'Copy',
        });
  }

  <template>
    <HdsCopyButton
      class="hds-code-block__copy-button"
      @text={{this.text}}
      @isIconOnly={{true}}
      @size="small"
      @targetToCopy={{@targetToCopy}}
      @onSuccess={{@onCopy}}
      @ariaMessageText={{@copySuccessMessageText}}
      ...attributes
    />
  </template>
}
