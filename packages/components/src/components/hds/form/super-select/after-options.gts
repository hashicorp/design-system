/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { on } from '@ember/modifier';
import { notEq, or } from 'ember-truth-helpers';

import hdsT from '../../../../helpers/hds-t.ts';
import HdsTextBody from '../../text/body.gts';
import HdsButton from '../../button/index.gts';

export interface HdsFormSuperSelectAfterOptionsSignature {
  Args: {
    clearSelected: () => void;
    content?: string;
    resultCountMessage?: string;
    selectedCount?: string;
    showAll: () => void;
    showNoSelectedMessage?: boolean;
    showOnlySelected?: boolean;
    showSelected: () => void;
  };
}

const HdsFormSuperSelectAfterOptions: TemplateOnlyComponent<HdsFormSuperSelectAfterOptionsSignature> =
  <template>
    {{#if @showNoSelectedMessage}}
      <HdsTextBody
        @tag="div"
        @size="200"
        class="hds-form-super-select__no-options-selected hds-foreground-strong"
      >
        {{hdsT
          "hds.components.form.super-select.after-options.no-options-selected"
          default="No options selected"
        }}
      </HdsTextBody>
    {{/if}}
    <div class="hds-form-super-select__after-options">
      {{#if @content}}
        <HdsTextBody @tag="div" @size="100" class="hds-foreground-strong">
          {{@content}}
        </HdsTextBody>
      {{else}}
        {{#if (or @showAll @showSelected @clearSelected)}}
          {{#if @showOnlySelected}}
            <HdsButton
              @text={{hdsT
                "hds.components.form.super-select.after-options.show-all"
                default="Show all"
              }}
              @size="small"
              @color="secondary"
              {{on "click" @showAll}}
            />
          {{else}}
            <HdsButton
              @text={{hdsT
                "hds.components.form.super-select.after-options.show-selected"
                default="Show selected"
              }}
              @size="small"
              @color="secondary"
              {{on "click" @showSelected}}
            />
          {{/if}}
          {{#if (notEq @selectedCount "0")}}
            <HdsButton
              @text={{hdsT
                "hds.components.form.super-select.after-options.clear-selected"
                default="Clear selected"
              }}
              @size="small"
              @color="secondary"
              {{on "click" @clearSelected}}
            />
          {{/if}}
        {{/if}}
        <HdsTextBody
          @tag="div"
          @size="100"
          class="hds-form-super-select__result-count hds-foreground-strong"
        >
          {{@resultCountMessage}}
        </HdsTextBody>
      {{/if}}
    </div>
  </template>;

export default HdsFormSuperSelectAfterOptions;
