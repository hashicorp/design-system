/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { LinkTo } from '@ember/routing';
import { array } from '@ember/helper';

import { hdsResolveLinkToExternal } from '../../../utils/hds-resolve-link-to-external.ts';
import { hdsLinkToModels } from '../../../helpers/hds-link-to-models.ts';
import { hdsLinkToQuery } from '../../../helpers/hds-link-to-query.ts';

import type Owner from '@ember/owner';
import type { LinkTo as LinkToSignature } from '@ember/routing';

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
  @tracked linkToExternal: LinkToSignature | null = null;

  constructor(owner: Owner, args: HdsInteractiveSignature['Args']) {
    super(owner, args);

    // we want to avoid resolving the component if it's not needed
    if (args.isRouteExternal) {
      void this.resolveLinkToExternal();
    }
  }

  async resolveLinkToExternal() {
    this.linkToExternal = await hdsResolveLinkToExternal(
      this.args.isRouteExternal
    );
  }

  get isHrefExternal() {
    return this.args.isHrefExternal ?? true;
  }

  get isRouteExternal() {
    return this.args.isRouteExternal ?? false;
  }

  onKeyUp = (event: KeyboardEvent) => {
    if (event.key === ' ' || event.code === 'Space') {
      (event.target as HTMLElement).click();
    }
  };

  <template>
    {{! IMPORTANT: we removed the newlines before/after the yield to reduce the issues with unexpected whitespaces (see https://github.com/hashicorp/design-system/pull/231#issuecomment-1123502499) }}
    {{! IMPORTANT: we need to add "squishies" here (~) because otherwise the whitespace added by Ember becomes visible in the link (being an inline element) - See https://handlebarsjs.com/guide/expressions.html#whitespace-control }}
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
