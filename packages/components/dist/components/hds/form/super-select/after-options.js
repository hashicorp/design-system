import templateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{#if @showNoSelectedMessage}}\n  <Hds::Text::Body @tag=\"div\" @size=\"200\" class=\"hds-form-super-select__no-options-selected hds-foreground-strong\">\n    No options selected\n  </Hds::Text::Body>\n{{/if}}\n<div class=\"hds-form-super-select__after-options\">\n  {{#if @content}}\n    <Hds::Text::Body @tag=\"div\" @size=\"100\" class=\"hds-foreground-strong\">\n      {{@content}}\n    </Hds::Text::Body>\n  {{else}}\n    {{#if (or @showAll @showSelected @clearSelected)}}\n      {{#if @showOnlySelected}}\n        <Hds::Button @text=\"Show all\" @size=\"small\" @color=\"secondary\" {{on \"click\" @showAll}} />\n      {{else}}\n        <Hds::Button @text=\"Show selected\" @size=\"small\" @color=\"secondary\" {{on \"click\" @showSelected}} />\n      {{/if}}\n      {{#if (not-eq @selectedCount \"0\")}}\n        <Hds::Button @text=\"Clear selected\" @size=\"small\" @color=\"secondary\" {{on \"click\" @clearSelected}} />\n      {{/if}}\n    {{/if}}\n    <Hds::Text::Body @tag=\"div\" @size=\"100\" class=\"hds-form-super-select__result-count hds-foreground-strong\">\n      {{@resultCountMessage}}\n    </Hds::Text::Body>\n  {{/if}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsFormSuperSelectAfterOptions = templateOnlyComponent();
var afterOptions = setComponentTemplate(TEMPLATE, HdsFormSuperSelectAfterOptions);

export { afterOptions as default };
//# sourceMappingURL=after-options.js.map
