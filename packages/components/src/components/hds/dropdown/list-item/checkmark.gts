/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { array } from '@ember/helper';

import { hdsLinkToModels } from '../../../../helpers/hds-link-to-models.ts';
import { hdsLinkToQuery } from '../../../../helpers/hds-link-to-query.ts';
import HdsIcon from '../../icon/index.gts';
import HdsTextBody from '../../text/body.gts';
import HdsInteractive from '../../interactive/index.gts';

import type { HdsIconSignature } from '../../icon/index.gts';
import type { HdsInteractiveSignature } from '../../interactive/index.gts';

export interface HdsDropdownListItemCheckmarkSignature {
  Args: HdsInteractiveSignature['Args'] & {
    count?: string | number;
    icon?: HdsIconSignature['Args']['name'];
    selected?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HdsInteractiveSignature['Element'];
}

export default class HdsDropdownListItemCheckmark extends Component<HdsDropdownListItemCheckmarkSignature> {
  get classNames(): string {
    const classes = [
      'hds-dropdown-list-item',
      'hds-dropdown-list-item--color-action',
      'hds-dropdown-list-item--variant-checkmark',
    ];

    // add a class based on the @selected argument
    if (this.args.selected) {
      classes.push('hds-dropdown-list-item--variant-checkmark-selected');
    }

    return classes.join(' ');
  }

  <template>
    {{! template-lint-disable no-invalid-role require-context-role require-presentational-children }}
    <li class={{this.classNames}} role="none">
      <HdsInteractive
        @current-when={{@current-when}}
        @models={{hdsLinkToModels (array @model @models)}}
        @query={{hdsLinkToQuery (array @query)}}
        @replace={{@replace}}
        @route={{@route}}
        @isRouteExternal={{@isRouteExternal}}
        @href={{@href}}
        @isHrefExternal={{@isHrefExternal}}
        class="hds-dropdown-list-item__interactive"
        ...attributes
        role="option"
        aria-selected={{if @selected "true" "false"}}
      >
        {{#if @icon}}
          <span
            class="hds-dropdown-list-item__interactive-icon hds-dropdown-list-item__interactive-icon--leading"
          >
            <HdsIcon @name={{@icon}} />
          </span>
        {{/if}}
        <HdsTextBody
          @tag="span"
          @size="200"
          @weight="medium"
          class="hds-dropdown-list-item__interactive-text"
        >{{yield}}</HdsTextBody>
        {{#if @count}}
          <HdsTextBody
            class="hds-dropdown-list-item__count"
            @tag="span"
            @size="100"
            @weight="medium"
            @color="faint"
          >{{@count}}</HdsTextBody>
        {{/if}}
        <span class="hds-dropdown-list-item__checkmark">
          {{#if @selected}}
            <HdsIcon
              class="hds-dropdown-list-item__checkmark-icon"
              @name="check"
            />
          {{/if}}
        </span>
      </HdsInteractive>
    </li>
    {{! template-lint-enable no-invalid-role require-context-role require-presentational-children }}
  </template>
}
