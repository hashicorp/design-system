/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { LinkTo } from '@ember/routing';

import { HdsIcon } from '@hashicorp/design-system-components/components';

import ShwTextBody from 'showcase/components/shw/text/body';

export interface ShwBodyLinkToRouteSignature {
  Args: {
    route: string;
    isRouteExternal?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLAnchorElement;
}

const ShwBodyLinkToRoute: TemplateOnlyComponent<ShwBodyLinkToRouteSignature> =
  <template>
    <ShwTextBody>
      <LinkTo
        target={{if @isRouteExternal "_blank" null}}
        rel={{if @isRouteExternal "noopener noreferrer" null}}
        class="shw-body-link-to-route"
        @route={{@route}}
        ...attributes
      >
        {{yield}}
        {{#if @isRouteExternal}}
          <HdsIcon @name="external-link" />
        {{/if}}
      </LinkTo>
    </ShwTextBody>
  </template>;

export default ShwBodyLinkToRoute;
