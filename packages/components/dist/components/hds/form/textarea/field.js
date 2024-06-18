import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Form::Field\n  @layout=\"vertical\"\n  @extraAriaDescribedBy={{@extraAriaDescribedBy}}\n  @isRequired={{@isRequired}}\n  @isOptional={{@isOptional}}\n  @id={{@id}}\n  as |F|\n>\n  {{! Notice: the order of the elements is not relevant here, because is controlled at \"Hds::Form::Field\" component level }}\n  {{yield\n    (hash\n      Label=F.Label\n      isRequired=F.isRequired\n      isOptional=F.isOptional\n      HelperText=F.HelperText\n      Error=F.Error\n      CharacterCount=(component F.CharacterCount value=@value)\n    )\n  }}\n  <F.Control>\n    <Hds::Form::Textarea::Base\n      @value={{@value}}\n      @isInvalid={{@isInvalid}}\n      @width={{@width}}\n      @height={{@height}}\n      required={{@isRequired}}\n      ...attributes\n      id={{F.id}}\n      aria-describedby={{F.ariaDescribedBy}}\n    />\n  </F.Control>\n</Hds::Form::Field>");

var field = setComponentTemplate(TEMPLATE, templateOnly());

export { field as default };
//# sourceMappingURL=field.js.map
