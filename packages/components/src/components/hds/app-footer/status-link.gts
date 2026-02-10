/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { assert } from '@ember/debug';
import { array } from '@ember/helper';

import type { SafeString } from '@ember/template';
import type Owner from '@ember/owner';

import { HdsAppFooterStatusLinkStatusValues } from './types.ts';
import { hdsLinkToModels } from '../../../helpers/hds-link-to-models.ts';
import { hdsLinkToQuery } from '../../../helpers/hds-link-to-query.ts';
import HdsAppFooterLink from './link.gts';

import type { HdsAppFooterStatusTypes } from './types.ts';
import type { HdsAppFooterLinkSignature } from './link.gts';
import type { HdsIconSignature } from '../icon/index.gts';
import type { HdsInteractiveSignature } from '../interactive/index.gts';

export const STATUSES = HdsAppFooterStatusLinkStatusValues;

export interface HdsAppFooterStatusLinkSignature {
  Args: HdsInteractiveSignature['Args'] & {
    itemStyle?: SafeString;
    status?: HdsAppFooterStatusTypes;
    statusIcon?: HdsIconSignature['Args']['name'];
    statusIconColor?: string;
    text?: string;
  };
  Element: HdsAppFooterLinkSignature['Element'];
}

export default class HdsAppFooterStatusLink extends Component<HdsAppFooterStatusLinkSignature> {
  constructor(owner: Owner, args: HdsInteractiveSignature['Args']) {
    super(owner, args);

    assert(
      'Either @status or @text for "Hds::AppFooter::StatusLink" must have a valid value',
      this.args.text !== undefined || this.args.status
    );
  }

  get status(): HdsAppFooterStatusTypes | undefined {
    let status;
    if (this.args.status) {
      status = this.args.status.toLowerCase();
      assert(
        `@status for "Hds::AppFooter" must be one of the following: ${Object.keys(
          STATUSES
        ).join(', ')} received: ${this.args.status}`,

        status in STATUSES
      );
      return status as HdsAppFooterStatusTypes;
    }
    return status;
  }

  get statusIcon(): HdsIconSignature['Args']['name'] | undefined {
    return (
      this.args.statusIcon ??
      (this.status !== undefined ? STATUSES[this.status]?.iconName : undefined)
    );
  }

  get itemStyle(): SafeString | undefined {
    if (this.args.statusIconColor) {
      return htmlSafe(
        `--hds-app-footer-status-icon-color: ${this.args.statusIconColor}`
      );
    } else {
      return undefined;
    }
  }

  get text(): string | undefined {
    if (!this.args.text && this.status) {
      return STATUSES[this.status]?.text;
    }
    return this.args.text;
  }

  get href(): string {
    return this.args.href ?? 'https://status.hashicorp.com';
  }

  get classNames(): string {
    const classes = ['hds-app-footer__status-link'];

    // add a class based on status if no statusIconColor is explicitly specified
    if (this.status && !this.args.statusIconColor) {
      classes.push(`hds-app-footer__status-link--${this.status}`);
    }

    return classes.join(' ');
  }

  <template>
    <HdsAppFooterLink
      class={{this.classNames}}
      style={{this.itemStyle}}
      @current-when={{@current-when}}
      @models={{hdsLinkToModels (array @model @models)}}
      @query={{hdsLinkToQuery (array @query)}}
      @replace={{@replace}}
      @route={{@route}}
      @isRouteExternal={{@isRouteExternal}}
      @href={{this.href}}
      @isHrefExternal={{@isHrefExternal}}
      @icon={{this.statusIcon}}
      @iconPosition="leading"
      ...attributes
    >
      {{this.text}}
    </HdsAppFooterLink>
  </template>
}
