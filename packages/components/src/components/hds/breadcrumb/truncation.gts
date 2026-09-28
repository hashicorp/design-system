/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import { service } from '@ember/service';

import HdsPopoverPrimitive from '../popover-primitive/index.gts';
import HdsIcon from '../icon/index.gts';
import type HdsIntlService from '../../../services/hds-intl';

export interface HdsBreadcrumbTruncationSignature {
  Args: {
    ariaLabel?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLLIElement;
}

export default class HdsBreadcrumbTruncation extends Component<HdsBreadcrumbTruncationSignature> {
  @service declare readonly hdsIntl: HdsIntlService;

  get ariaLabel(): string {
    return (
      this.args.ariaLabel ??
      this.hdsIntl.t('hds.components.breadcrumb.truncation.aria-label', {
        default: 'show more',
      })
    );
  }

  <template>
    <li
      class="hds-breadcrumb__item hds-breadcrumb__item--is-truncation"
      ...attributes
    >
      <HdsPopoverPrimitive @enableClickEvents={{true}} as |PP|>
        <div {{PP.setupPrimitiveContainer}}>
          <button
            type="button"
            class="hds-breadcrumb__truncation-toggle"
            aria-label={{this.ariaLabel}}
            aria-expanded={{if PP.isOpen "true" "false"}}
            {{PP.setupPrimitiveToggle}}
          >
            <HdsIcon @name="more-horizontal" @size="16" />
          </button>
          <div
            class="hds-breadcrumb__truncation-content"
            {{PP.setupPrimitivePopover
              anchoredPositionOptions=(hash
                placement="bottom-start" offsetOptions=4
              )
            }}
          >
            <ol class="hds-breadcrumb__sublist">
              {{yield}}
            </ol>
          </div>
        </div>
      </HdsPopoverPrimitive>
    </li>
  </template>
}
