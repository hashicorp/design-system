/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { eq } from 'ember-truth-helpers';
import { guidFor } from '@ember/object/internals';
import { service } from '@ember/service';

import EventTrackingService from 'website/services/event-tracking';

interface DocCodeGroupLanguagePickerSignature {
  Args: {
    currentLanguage: string;
    options: Array<{ label: string; value: string }>;
    onLanguageChange: (event: Event) => void;
    filename?: string;
  };
  Element: HTMLFieldSetElement;
}

export default class DocCodeGroupLanguagePicker extends Component<DocCodeGroupLanguagePickerSignature> {
  @service declare readonly eventTracking: EventTrackingService;

  id = guidFor(this);

  onClick = (event: Event) => {
    const { filename, onLanguageChange } = this.args;

    onLanguageChange(event);

    const target = event.target as HTMLInputElement;

    this.eventTracking.trackEvent(
      `Demo - ${filename} - Language Picker - ${target.value}`,
    );
  };

  <template>
    <fieldset
      class="doc-code-group__language-picker"
      aria-label="Code language"
      ...attributes
    >
      {{#each @options as |option|}}
        <label class="doc-code-group__language-picker-option">
          <span>{{option.label}}</span>
          <input
            type="radio"
            class="sr-only"
            name="language-picker-{{this.id}}"
            value="{{option.value}}"
            checked={{eq @currentLanguage option.value}}
            {{on "change" @onLanguageChange}}
          />
        </label>
      {{/each}}
    </fieldset>
  </template>
}
