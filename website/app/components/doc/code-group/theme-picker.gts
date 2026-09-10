/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { eq } from 'ember-truth-helpers';
import { guidFor } from '@ember/object/internals';

import docTrackEvent from 'website/modifiers/doc-track-event';

interface DocCodeGroupThemePickerSignature {
  Args: {
    themeOptions: Array<{ label: string; value: string }>;
    currentTheme: string;
    onThemeChange: (event: Event) => void;
    eventName: string;
  };
  Element: HTMLFieldSetElement;
}

export default class DocCodeGroupThemePicker extends Component<DocCodeGroupThemePickerSignature> {
  id = guidFor(this);

  <template>
    <div class="doc-code-group__theme-picker-container">
      <label
        for={{this.id}}
        class="doc-code-group__theme-picker-label"
      >Theme:</label>

      <select
        name="theme-picker-{{this.id}}"
        id={{this.id}}
        class="doc-code-group__theme-picker"
        {{docTrackEvent triggerEvent="change" eventName=@eventName}}
        {{on "change" @onThemeChange}}
      >
        {{#each @themeOptions as |optionData|}}
          <option
            selected={{eq @currentTheme optionData.value}}
            value={{optionData.value}}
          >{{optionData.label}}</option>
        {{/each}}
      </select>
    </div>
  </template>
}
