/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { LinkTo } from '@ember/routing';
import { eq } from 'ember-truth-helpers';

interface DocPageHeaderNavItemSignature {
  Args: {
    label: string;
    route: string;
    model?: unknown;
    currentTopRoute: string;
  };
  Element: HTMLLIElement;
}

const DocPageHeaderNavItem: TemplateOnlyComponent<DocPageHeaderNavItemSignature> =
  <template>
    <li class="doc-page-header__nav-item-text" ...attributes>
      {{#if @model}}
        <LinkTo
          class="{{if (eq @currentTopRoute @route) 'is-current-route'}}"
          @route={{@route}}
          @model={{@model}}
        >{{@label}}</LinkTo>
      {{else}}
        <LinkTo
          class="{{if (eq @currentTopRoute @route) 'is-current-route'}}"
          @route={{@route}}
        >{{@label}}</LinkTo>
      {{/if}}
    </li>
  </template>;

export default DocPageHeaderNavItem;
