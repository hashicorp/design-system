/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { concat } from '@ember/helper';
import { on } from '@ember/modifier';
import { element } from 'ember-element-helper';

import { HdsDialogPrimitiveHeaderTitleTagValues } from './types.ts';
import HdsIcon from '../icon/index.gts';
import HdsTextBody from '../text/body.gts';
import HdsTextDisplay from '../text/display.gts';
import HdsDismissButton from '../dismiss-button/index.gts';

import type { HdsIconSignature } from '../icon/index.gts';
import type { HdsDialogPrimitiveHeaderTitleTags } from './types.ts';

export interface HdsDialogPrimitiveHeaderSignature {
  Args: {
    contextualClassPrefix?: string;
    id?: string;
    icon?: HdsIconSignature['Args']['name'];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onDismiss?: (event: MouseEvent, ...args: any[]) => void;
    titleTag?: HdsDialogPrimitiveHeaderTitleTags;
    tagline?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const NOOP = (): void => {};

export default class HdsDialogPrimitiveHeader extends Component<HdsDialogPrimitiveHeaderSignature> {
  get titleTag(): HdsDialogPrimitiveHeaderTitleTags {
    return this.args.titleTag ?? HdsDialogPrimitiveHeaderTitleTagValues.Div;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get onDismiss(): (event: MouseEvent, ...args: any[]) => void {
    const { onDismiss } = this.args;

    // notice: this is a guard used in case the button is used as standalone element (eg. in the showcase)
    // in reality it's always used inside the main components as a yielded component, so the onDismiss handler is always defined
    if (typeof onDismiss === 'function') {
      return onDismiss;
    } else {
      return NOOP;
    }
  }

  <template>
    <div
      class="hds-dialog-primitive__header
        {{if
          @contextualClassPrefix
          (concat @contextualClassPrefix '__header')
        }}"
      ...attributes
    >
      {{#if @icon}}
        <HdsIcon
          class="hds-dialog-primitive__icon
            {{if
              @contextualClassPrefix
              (concat @contextualClassPrefix '__icon')
            }}"
          @name={{@icon}}
          @size="24"
        />
      {{/if}}

      {{#let (element this.titleTag) as |Tag|}}<Tag
          class="hds-dialog-primitive__title
            {{if
              @contextualClassPrefix
              (concat @contextualClassPrefix '__title')
            }}"
          id={{@id}}
        >
          {{#if @tagline}}
            <HdsTextBody
              class="hds-dialog-primitive__tagline
                {{if
                  @contextualClassPrefix
                  (concat @contextualClassPrefix '__tagline')
                }}"
              @tag="div"
              @size="100"
            >
              {{@tagline}}
            </HdsTextBody>
          {{/if}}

          {{yield}}
        </Tag>
      {{/let}}

      <HdsDismissButton
        class="hds-dialog-primitive__dismiss
          {{if
            @contextualClassPrefix
            (concat @contextualClassPrefix '__dismiss')
          }}"
        {{on "click" this.onDismiss}}
      />
    </div>
  </template>
}
