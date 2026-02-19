/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import HdsIcon from '../icon/index.gts';
import HdsTextDisplay from '../text/display.gts';
import HdsInteractive from '../interactive/index.gts';

import type { HdsIconSignature } from '../icon/index.gts';
import type { HdsInteractiveSignature } from '../interactive/index.gts';

export interface HdsAppHeaderHomeLinkSignature {
  Args: HdsInteractiveSignature['Args'] & {
    icon: HdsIconSignature['Args']['name'];
    isIconOnly?: boolean;
    color?: string;
    text: string;
  };
  Element: HdsInteractiveSignature['Element'];
}

export default class HdsAppHeaderHomeLink extends Component<HdsAppHeaderHomeLinkSignature> {
  get text(): string {
    const { text } = this.args;

    assert(
      '@text for "Hds::AppHeader::HomeLink" must have a valid value',
      text !== undefined
    );

    return text;
  }

  get icon(): HdsIconSignature['Args']['name'] {
    const { icon } = this.args;

    assert(
      '@icon name for "Hds::AppHeader::HomeLink" must be provided',
      icon !== undefined
    );

    return icon;
  }

  get isIconOnly(): boolean {
    return this.args.isIconOnly ?? true;
  }

  <template>
    <HdsInteractive
      class="hds-app-header__home-link"
      @current-when={{@current-when}}
      @models={{@models}}
      @model={{@model}}
      @query={{@query}}
      @replace={{@replace}}
      @route={{@route}}
      @isRouteExternal={{@isRouteExternal}}
      @href={{@href}}
      @isHrefExternal={{@isHrefExternal}}
      ...attributes
      aria-label={{if this.isIconOnly this.text null}}
    >
      <HdsIcon @name={{@icon}} @color={{@color}} @stretched={{true}} />
      {{#unless this.isIconOnly}}
        <HdsTextDisplay @size="100" @color="foreground-high-contrast">
          {{this.text}}
        </HdsTextDisplay>
      {{/unless}}
    </HdsInteractive>
  </template>
}
