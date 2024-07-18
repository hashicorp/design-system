import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-modal__header\" ...attributes>\n  {{#if @icon}}\n    <FlightIcon class=\"hds-modal__icon\" @name={{@icon}} @size=\"24\" @isInlineBlock={{false}} />\n  {{/if}}\n  <Hds::Text::Display class=\"hds-modal__title\" @tag=\"div\" @size=\"300\" @weight=\"semibold\" id={{@id}}>\n    {{#if @tagline}}\n      <Hds::Text::Body class=\"hds-modal__tagline\" @tag=\"div\" @size=\"100\" @weight=\"regular\">\n        {{@tagline}}\n      </Hds::Text::Body>\n    {{/if}}\n    {{yield}}\n  </Hds::Text::Display>\n  <Hds::DismissButton class=\"hds-modal__dismiss\" {{on \"click\" @onDismiss}} />\n</div>");

var header = setComponentTemplate(TEMPLATE, TemplateOnlyComponent());

export { header as default };
//# sourceMappingURL=header.js.map
