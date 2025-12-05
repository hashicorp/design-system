/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { eq } from 'ember-truth-helpers';
import { capitalize } from '@ember/string';
import { get } from '@ember/object';
import { guidFor } from '@ember/object/internals';

import { HdsCopyButton } from '@hashicorp/design-system-components/components';

export const INPUT_COMPONENTS = [
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
type inputComponent = (typeof INPUT_COMPONENTS)[number];

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

export default class CodeFragmentWithHtmlInput extends Component<CodeFragmentWithHtmlInputSignature> {
  id = guidFor(this);

  <template>
    <div class="shw-component-copy-button-flex-container">
      <div>
        <label for={{this.id}} class="sr-only">
          {{capitalize @inputComponent}}
          input
        </label>

        {{#if (eq @inputComponent "textarea")}}
          <textarea
            id={{this.id}}
            rows="3"
            value={{get inputComponentToValueMap @inputComponent}}
          ></textarea>
        {{else if (eq @inputComponent "select")}}
          <select id={{this.id}}>
            <option>Lorem ipsum dolor</option>
            <option>Sit amet</option>
            <option>Consectetur adipiscing elit</option>
          </select>
        {{else}}
          <input
            type={{@inputComponent}}
            value={{get inputComponentToValueMap @inputComponent}}
            id={{this.id}}
            min={{if (eq @inputComponent "range") "0" undefined}}
            max={{if (eq @inputComponent "range") "10" undefined}}
          />
        {{/if}}
      </div>
      <HdsCopyButton
        @text="Copy the {{@inputComponent}} input value"
        @targetToCopy="#{{this.id}}"
        @isIconOnly={{true}}
      />
    </div>
  </template>
}
