/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import HdsTextBody from '../text/body.gts';

export interface HdsApplicationStateBodySignature {
  Args: {
    text?: string;
  };
  Blocks: {
    default?: [];
  };
  Element: HTMLDivElement;
}

const HdsApplicationStateBody: TemplateOnlyComponent<HdsApplicationStateBodySignature> =
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
