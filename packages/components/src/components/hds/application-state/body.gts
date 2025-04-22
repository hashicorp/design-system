/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import HdsTextBody from '../text/body.gts';

import type { TOC } from '@ember/component/template-only';

export interface HdsApplicationStateBodySignature {
  Args: {
    text?: string;
  };
  Blocks: {
    default?: [];
  };
  Element: HTMLDivElement;
}

const HdsApplicationStateBody: TOC<HdsApplicationStateBodySignature> =
  <template>
    <div class="hds-application-state__body" ...attributes>
      {{#if (has-block)}}
        {{yield}}
      {{else}}
        <HdsTextBody
          class="hds-application-state__body-text"
          @tag="p"
          @size="300"
        >
          {{@text}}
        </HdsTextBody>
      {{/if}}
    </div>
  </template>;

export default HdsApplicationStateBody;
