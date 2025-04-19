/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { LinkTo } from '@ember/routing';
import { on } from '@ember/modifier';
import { assert } from '@ember/debug';
import { dependencySatisfies, importSync, macroCondition } from '@embroider/macros';
import hdsLinkToModels from '../../../helpers/hds-link-to-models.ts';
import hdsLinkToQuery from '../../../helpers/hds-link-to-query.ts';

import type Owner from '@ember/owner';

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
  linkToComponent = LinkTo;

  constructor(owner: Owner, args: HdsInteractiveSignature['Args']) {
    super(owner, args);

    if (this.args.isRouteExternal) {
      if (macroCondition(dependencySatisfies('ember-engines', '*'))) {
        // @ts-expect-error: shape is unknown
        this.linkToComponent = importSync(
          'ember-engines/components/link-to-external-component.js'
        ).default as LinkTo;
      } else {
        assert(
          `@isRouteExternal is only available when using the "ember-engines" addon. Please install it to use this feature.`,
          false
        );
      }
    }
  }

  /**
   * Determines if a @href value is "external" (it adds target="_blank" rel="noopener noreferrer")
   *
   * @param isHrefExternal
   * @type boolean
   * @default true
   */
  get isHrefExternal(): boolean {
    return this.args.isHrefExternal ?? true;
  }

  /**
   * Determines if a @route value is "external" (uses the LinkToExternal component instead of LinkTo)
   *
   * @param isRouteExternal
   * @type boolean
   * @default false
   */
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
    {{! IMPORTANT: we need to add "squishies" here (~) because otherwise the whitespace added by Ember becomes visible in the link (being an inline element) - See https://handlebarsjs.com/guide/expressions.html#whitespace-control }}
    {{! NOTICE: we can't support the direct use of the "href" HTML attribute via ...attributes in the <a> elements, because we need to rely on the "@href" Ember argument to differentiate between different types of generated output }}
    {{~#if @route~}}
      <this.linkToComponent
        @current-when={{@current-when}}
        @models={{hdsLinkToModels @model @models}}
        @query={{hdsLinkToQuery @query}}
        @replace={{@replace}}
        @route={{@route}}
        ...attributes
      >{{yield}}</this.linkToComponent>
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
