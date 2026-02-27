/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { array, hash } from '@ember/helper';

import type { WithBoundArgs } from '@glint/template';

import { hdsLinkToModels } from '../../../../helpers/hds-link-to-models.ts';
import { hdsLinkToQuery } from '../../../../helpers/hds-link-to-query.ts';
import { HdsDropdownListItemInteractiveColorValues } from './types.ts';
import HdsTextBody from '../../text/body.gts';
import HdsIcon from '../../icon/index.gts';
import HdsInteractive from '../../interactive/index.gts';
import HdsBadge from '../../badge/index.gts';

import type { HdsIconSignature } from '../../icon/index.gts';
import type { HdsInteractiveSignature } from '../../interactive/index.gts';
import type { HdsDropdownListItemInteractiveColors } from './types.ts';

export const DEFAULT_COLOR = HdsDropdownListItemInteractiveColorValues.Action;
export const COLORS: HdsDropdownListItemInteractiveColors[] = Object.values(
  HdsDropdownListItemInteractiveColorValues
);

export interface HdsDropdownListItemInteractiveSignature {
  Args: HdsInteractiveSignature['Args'] & {
    color?: HdsDropdownListItemInteractiveColors;
    icon?: HdsIconSignature['Args']['name'];
    isLoading?: boolean;
    trailingIcon?: HdsIconSignature['Args']['name'];
  };
  Blocks: {
    default?: [
      {
        Badge?: WithBoundArgs<typeof HdsBadge, 'size'>;
      },
    ];
  };
  Element: HTMLDivElement | HdsInteractiveSignature['Element'];
}

export default class HdsDropdownListItemInteractive extends Component<HdsDropdownListItemInteractiveSignature> {
  get color(): HdsDropdownListItemInteractiveColors {
    const { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::Dropdown::ListItem::Interactive" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
  }

  get classNames(): string {
    const classes = [
      'hds-dropdown-list-item',
      'hds-dropdown-list-item--variant-interactive',
    ];

    // add a class based on the @color argument
    classes.push(`hds-dropdown-list-item--color-${this.color}`);

    return classes.join(' ');
  }

  <template>
    <li class={{this.classNames}}>
      {{#if @isLoading}}
        <div
          class="hds-dropdown-list-item__interactive-loading-wrapper"
          ...attributes
        >
          <div
            class="hds-dropdown-list-item__interactive-icon hds-dropdown-list-item__interactive-icon--leading"
          >
            <HdsIcon @name="loading" />
          </div>
          <HdsTextBody
            @tag="div"
            @size="100"
            @weight="regular"
            class="hds-dropdown-list-item__interactive-text"
          >
            {{yield (hash Badge=(component HdsBadge size="small"))}}
          </HdsTextBody>
        </div>
      {{else}}
        <HdsInteractive
          @current-when={{@current-when}}
          @models={{hdsLinkToModels (array @model @models)}}
          @query={{hdsLinkToQuery (array @query)}}
          @replace={{@replace}}
          @route={{@route}}
          @isRouteExternal={{@isRouteExternal}}
          @href={{@href}}
          @isHrefExternal={{@isHrefExternal}}
          ...attributes
        >
          {{#if @icon}}
            <span
              class="hds-dropdown-list-item__interactive-icon hds-dropdown-list-item__interactive-icon--leading"
            >
              <HdsIcon @name={{@icon}} />
            </span>
          {{/if}}
          <HdsTextBody
            class="hds-dropdown-list-item__interactive-text"
            @tag="span"
            @size="200"
            @weight="medium"
          >
            {{yield (hash Badge=(component HdsBadge size="small"))}}
          </HdsTextBody>
          {{#if @trailingIcon}}
            <span
              class="hds-dropdown-list-item__interactive-icon hds-dropdown-list-item__interactive-icon--trailing"
            >
              <HdsIcon @name={{@trailingIcon}} />
            </span>
          {{/if}}
        </HdsInteractive>
      {{/if}}
    </li>
  </template>
}
