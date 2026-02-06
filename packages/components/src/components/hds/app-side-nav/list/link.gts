/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

import HdsAppSideNavListItem from './item.gts';
import HdsInteractive from '../../interactive/index.ts';
import HdsIcon from '../../icon/index.ts';
import HdsBadge from '../../badge/index.ts';
import HdsBadgeCount from '../../badge-count/index.ts';
import { hdsLinkToModels } from '../../../../helpers/hds-link-to-models.ts';
import { hdsLinkToQuery } from '../../../../helpers/hds-link-to-query.ts';
import type { HdsIconSignature } from '../../icon';
import type { HdsInteractiveSignature } from '../../interactive';

export interface HdsAppSideNavListLinkSignature {
  Args: HdsInteractiveSignature['Args'] & {
    icon?: HdsIconSignature['Args']['name'];
    text?: string;
    badge?: string;
    count?: string;
    hasSubItems?: boolean;
    isActive?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HdsInteractiveSignature['Element'];
}

const HdsAppSideNavListLink =
  templateOnlyComponent<HdsAppSideNavListLinkSignature>();

export default HdsAppSideNavListLink;

<template>
  <HdsAppSideNavListItem>
    <HdsInteractive
      class="hds-app-side-nav__list-item-link {{if @isActive 'active'}}"
      @current-when={{@current-when}}
      @models={{hdsLinkToModels @model @models}}
      @query={{hdsLinkToQuery @query}}
      @replace={{@replace}}
      @route={{@route}}
      @isRouteExternal={{@isRouteExternal}}
      @href={{@href}}
      @isHrefExternal={{@isHrefExternal}}
      aria-current={{if @isActive "page"}}
      ...attributes
    >
      {{#if @icon}}
        <HdsIcon class="hds-app-side-nav__list-item-icon-leading" @name={{@icon}} />
      {{/if}}

      {{#if @text}}
        <span class="hds-app-side-nav__list-item-text hds-typography-body-200 hds-font-weight-medium">
          {{@text}}
        </span>
      {{/if}}

      {{#if @count}}
        <HdsBadgeCount @text={{@count}} @type="outlined" @size="small" />
      {{/if}}

      {{#if @badge}}
        <HdsBadge @text={{@badge}} @type="outlined" @size="small" />
      {{/if}}

      {{yield}}

      {{#if @hasSubItems}}
        <span class="hds-app-side-nav__list-item-icon-trailing">
          <HdsIcon @name="chevron-right" />
        </span>
      {{/if}}
      {{#if @isHrefExternal}}
        <span class="hds-app-side-nav__list-item-icon-trailing">
          <HdsIcon @name="external-link" />
        </span>
      {{/if}}
    </HdsInteractive>
  </HdsAppSideNavListItem>
</template>