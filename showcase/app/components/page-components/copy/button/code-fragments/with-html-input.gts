/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { eq } from 'ember-truth-helpers';
import { capitalize } from '@ember/string';
import { get } from '@ember/object';

import { HdsCopyButton } from '@hashicorp/design-system-components/components';

type inputComponent =
  | 'text'
  | 'password'
  | 'number'
  | 'url'
  | 'email'
  | 'date'
  | 'time'
  | 'range'
  | 'color'
  | 'textarea'
  | 'select';

export const INPUT_COMPONENTS: inputComponent[] = [
  'text',
  'password',
  'number',
  'url',
  'email',
  'date',
  'time',
  'range',
  'color',
  'textarea',
  'select',
];

export interface CodeFragmentWithHtmlInputSignature {
  Args: {
    inputComponent: inputComponent;
  };
  Element: HTMLDivElement;
}

const inputComponentToValueMap: Record<inputComponent, string> = {
  text: 'Lorem ipsum dolor',
  password: 'Thisisapassword',
  number: '123456',
  url: 'https://www.hello.com',
  email: 'info@hello.com',
  date: '2018-07-22',
  time: '23:59',
  range: '6',
  color: '#e66465',
  textarea: 'Copy the generic textarea value',
  select: '',
};

const CodeFragmentWithHtmlInput: TemplateOnlyComponent<CodeFragmentWithHtmlInputSignature> =
  <template>
    <div class="shw-component-copy-button-flex-container" ...attributes>
      <div>
        <label for="test-input-{{@inputComponent}}" class="sr-only">
          {{capitalize @inputComponent}}
          input
        </label>

        {{#if (eq @inputComponent "textarea")}}
          <textarea
            id="test-input-{{@inputComponent}}"
            rows="3"
            value={{get inputComponentToValueMap @inputComponent}}
          ></textarea>
        {{else if (eq @inputComponent "select")}}
          <select id="test-input-{{@inputComponent}}">
            <option>Lorem ipsum dolor</option>
            <option>Sit amet</option>
            <option>Consectetur adipiscing elit</option>
          </select>
        {{else}}
          <input
            type={{@inputComponent}}
            value={{get inputComponentToValueMap @inputComponent}}
            id="test-input-{{@inputComponent}}"
            min={{if (eq @inputComponent "range") "0" undefined}}
            max={{if (eq @inputComponent "range") "10" undefined}}
          />
        {{/if}}
      </div>
      <HdsCopyButton
        @text="Copy the {{@inputComponent}} input value"
        @targetToCopy="#test-input-{{@inputComponent}}"
        @isIconOnly={{true}}
      />
    </div>
  </template>;

export default CodeFragmentWithHtmlInput;
