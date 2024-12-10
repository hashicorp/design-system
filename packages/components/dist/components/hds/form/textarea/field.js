import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Form::Field\n  @layout=\"vertical\"\n  @extraAriaDescribedBy={{@extraAriaDescribedBy}}\n  @isRequired={{@isRequired}}\n  @isOptional={{@isOptional}}\n  @id={{@id}}\n  as |F|\n>\n  {{! Notice: the order of the elements is not relevant here, because is controlled at \"Hds::Form::Field\" component level }}\n  {{yield (hash Label=F.Label HelperText=F.HelperText Error=F.Error)}}\n  {{#if F.CharacterCount}}\n    {{yield (hash CharacterCount=(component F.CharacterCount value=@value))}}\n  {{/if}}\n  <F.Control>\n    <Hds::Form::Textarea::Base\n      @value={{@value}}\n      @isInvalid={{@isInvalid}}\n      @width={{@width}}\n      @height={{@height}}\n      required={{@isRequired}}\n      ...attributes\n      id={{F.id}}\n      aria-describedby={{F.ariaDescribedBy}}\n    />\n  </F.Control>\n</Hds::Form::Field>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsFormTextareaField = TemplateOnlyComponent();
var field = setComponentTemplate(TEMPLATE, HdsFormTextareaField);

export { field as default };
//# sourceMappingURL=field.js.map
