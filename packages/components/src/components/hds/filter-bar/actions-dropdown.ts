/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { service } from '@ember/service';

import type { HdsDropdownSignature } from '../dropdown/index.gts';
import type { HdsDropdownToggleButtonSignature } from '../dropdown/toggle/button.gts';
import type HdsIntlService from '../../../services/hds-intl';

export interface HdsFilterBarActionsDropdownSignature {
  Args: Pick<
    HdsDropdownSignature['Args'],
    | 'enableCollisionDetection'
    | 'width'
    | 'height'
    | 'preserveContentInDom'
    | 'onClose'
  > & {
    toggleButtonText?: HdsDropdownToggleButtonSignature['Args']['text'];
    toggleButtonIcon?: HdsDropdownToggleButtonSignature['Args']['icon'];
  };
  Blocks: {
    default: [HdsDropdownSignature['Blocks']['default'][0]];
  };
  Element: HdsDropdownSignature['Element'];
}

export default class HdsFilterBarActionsDropdown extends Component<HdsFilterBarActionsDropdownSignature> {
  @service hdsIntl!: HdsIntlService;

  get toggleButtonText(): string {
    return (
      this.args.toggleButtonText ??
      this.hdsIntl.t(
        'hds.components.filter-bar.actions-dropdown.toggle-button',
        {
          default: 'Actions',
        }
      )
    );
  }
}
