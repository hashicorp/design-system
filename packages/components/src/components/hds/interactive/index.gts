/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { on } from '@ember/modifier';
import { LinkTo } from '@ember/routing';
import { array } from '@ember/helper';

import { getLinkToExternal } from '../../../utils/hds-link-to-external.ts';
import { hdsLinkToModels } from '../../../helpers/hds-link-to-models.ts';
import { hdsLinkToQuery } from '../../../helpers/hds-link-to-query.ts';

export interface HdsInteractiveSignature {
  Args: {
    href?: string;
    isHrefExternal?: boolean;
    isRouteExternal?: boolean;
    // the arguments and types below are mirroring the ones in LinkTo https://github.com/typed-ember/glint/blob/main/packages/environment-ember-loose/-private/intrinsics/link-to.d.ts#L9
    // because they're not exported we're unable to import them directly from glint
    route?: string;
    models?: unknown[];
    model?: unknown;
    query?: Record<string, unknown>;
    'current-when'?: string | boolean;
    replace?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLAnchorElement | HTMLButtonElement;
}

export default class HdsInteractive extends Component<HdsInteractiveSignature> {
  get linkToExternal(): typeof LinkTo | null {
    const component = getLinkToExternal();
    if (component === null) {
      assert(
        `HdsInteractive: You attempted to use an external link without configuring HDS with an external component. Please add this in your app.js file:

import LinkToExternal from 'ember-engines/components/link-to-external';
import { setLinkToExternal } from '@hashicorp/design-system-components/utils/hds-link-to-external';
setLinkToExternal(LinkToExternal);`
      );
    }
    return component;
  }

  get isHrefExternal(): boolean {
    return this.args.isHrefExternal ?? true;
  }

  get isRouteExternal(): boolean {
    return this.args.isRouteExternal ?? false;
  }

  onKeyUp = (event: KeyboardEvent): void => {
    if (event.key === ' ' || event.code === 'Space') {
      (event.target as HTMLElement).click();
    }
  };

  <template>
    {{! IMPORTANT: we removed the newlines before/after the yield to reduce the issues with unexpected whitespaces (see https://github.com/hashicorp/design-system/pull/231#issuecomment-1123502499) }}
    {{! NOTICE: we can't support the direct use of the "href" HTML attribute via ...attributes in the <a> elements, because we need to rely on the "@href" Ember argument to differentiate between different types of generated output }}
    {{~#if @route~}}
      {{~#if this.isRouteExternal~}}
        <this.linkToExternal
          @current-when={{@current-when}}
          @models={{hdsLinkToModels (array @model @models)}}
          @query={{hdsLinkToQuery (array @query)}}
          @replace={{@replace}}
          @route={{@route}}
          ...attributes
        >{{yield}}</this.linkToExternal>
      {{~else~}}
        <LinkTo
          @current-when={{@current-when}}
          @models={{hdsLinkToModels (array @model @models)}}
          @query={{hdsLinkToQuery (array @query)}}
          @replace={{@replace}}
          @route={{@route}}
          ...attributes
        >{{yield}}</LinkTo>
      {{~/if~}}
    {{~else if @href~}}
      {{~#if this.isHrefExternal~}}
        <a
          target="_blank"
          rel="noopener noreferrer"
          ...attributes
          href={{@href}}
          {{on "keyup" this.onKeyUp}}
        >{{yield}}</a>
      {{~else~}}
        <a
          ...attributes
          href={{@href}}
          {{on "keyup" this.onKeyUp}}
        >{{yield}}</a>
      {{~/if~}}
    {{~else~}}
      <button type="button" ...attributes>{{yield}}</button>
    {{~/if~}}
  </template>
}
