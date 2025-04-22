/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert, deprecate } from '@ember/debug';
import { hash } from '@ember/helper';

import HdsIcon from '../../icon/index.gts';
import HdsTextBody from '../../text/body.gts';
import HdsInteractive from '../../interactive/index.gts';
import HdsBadge from '../../badge/index.gts';
import hdsLinkToModels from '../../../../helpers/hds-link-to-models.ts';
import hdsLinkToQuery from '../../../../helpers/hds-link-to-query.ts';
import { HdsDropdownListItemInteractiveColorValues } from './types.ts';

import type { HdsIconSignature } from '../../icon';
import type { HdsInteractiveSignature } from '../../interactive/index.gts';
import type { HdsDropdownListItemInteractiveColors } from './types.ts';
import type { ComponentLike } from '@glint/template';
import type { HdsBadgeSignature } from '../../badge/index.gts';
import type Owner from '@ember/owner';

export const DEFAULT_COLOR = HdsDropdownListItemInteractiveColorValues.Action;
export const COLORS: HdsDropdownListItemInteractiveColors[] = Object.values(
  HdsDropdownListItemInteractiveColorValues
);

export interface HdsDropdownListItemInteractiveSignature {
  Args: HdsInteractiveSignature['Args'] & {
    color?: HdsDropdownListItemInteractiveColors;
    icon?: HdsIconSignature['Args']['name'];
    isLoading?: boolean;
    /**
     * @deprecated The `@text` argument for "Hds::Dropdown::ListItem::Interactive" has been deprecated. Please put text in the yielded block. See: https://helios.hashicorp.design/components/dropdown?tab=version%20history#4100
     */
    text?: string;
    trailingIcon?: HdsIconSignature['Args']['name'];
  };
  Blocks: {
    default?: [
      {
        Badge?: ComponentLike<HdsBadgeSignature>;
      },
    ];
  };
  Element: HTMLDivElement | HdsInteractiveSignature['Element'];
}

export default class HdsDropdownListItemInteractive extends Component<HdsDropdownListItemInteractiveSignature> {
  constructor(
    owner: Owner,
    args: HdsDropdownListItemInteractiveSignature['Args']
  ) {
    super(owner, args);

    if (args.text !== undefined) {
      deprecate(
        'The `@text` argument for "Hds::Dropdown::ListItem::Interactive" has been deprecated. Please put text in the yielded block.',
        false,
        {
          id: 'hds.dropdown.list-item.interactive',
          until: '5.0.0',
          url: 'https://helios.hashicorp.design/components/dropdown?tab=version%20history#4100',
          for: '@hashicorp/design-system-components',
          since: {
            available: '4.10.0',
            enabled: '5.0.0',
          },
        }
      );
    }
  }

  get text(): string {
    const { text } = this.args;

    assert(
      '@text for "Hds::Dropdown::ListItem::Interactive" must have a valid value',
      text !== undefined
    );

    return text;
  }

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
            {{#if (has-block)}}
              {{yield (hash Badge=(component HdsBadge size="small"))}}
            {{else}}
              {{this.text}}
            {{/if}}
          </HdsTextBody>
        </div>
      {{else}}
        <HdsInteractive
          @current-when={{@current-when}}
          @models={{hdsLinkToModels @model @models}}
          @query={{hdsLinkToQuery @query}}
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
            {{#if (has-block)}}
              {{yield (hash Badge=(component HdsBadge size="small"))}}
            {{else}}
              {{this.text}}
            {{/if}}
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
