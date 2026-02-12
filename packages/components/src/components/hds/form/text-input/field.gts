/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { hash } from '@ember/helper';
import style from 'ember-style-modifier';

import type { WithBoundArgs } from '@glint/template';
import type Owner from '@ember/owner';

import HdsFormField from '../field/index.gts';
import HdsFormTextInputBase from './base.gts';
import HdsFormVisibilityToggle from '../visibility-toggle/index.gts';
import HdsFormCharacterCount from '../character-count/index.gts';

import type { HdsFormFieldSignature } from '../field/index.gts';
import type { HdsFormTextInputBaseSignature } from './base.gts';
import type { HdsFormVisibilityToggleSignature } from '../visibility-toggle/index.gts';

export interface HdsFormTextInputFieldSignature {
  Args: Omit<HdsFormFieldSignature['Args'], 'contextualClass' | 'layout'> &
    HdsFormTextInputBaseSignature['Args'] & {
      visibilityToggleAriaLabel?: HdsFormVisibilityToggleSignature['Args']['ariaLabel'];
      visibilityToggleAriaMessageText?: HdsFormVisibilityToggleSignature['Args']['ariaMessageText'];
    };
  Blocks: {
    default: [
      {
        Label?: HdsFormFieldSignature['Blocks']['default'][0]['Label'];
        HelperText?: HdsFormFieldSignature['Blocks']['default'][0]['HelperText'];
        Error?: HdsFormFieldSignature['Blocks']['default'][0]['Error'];
        CharacterCount?: WithBoundArgs<typeof HdsFormCharacterCount, 'value'>;
      },
    ];
  };
  Element: HdsFormFieldSignature['Element'];
}

export default class HdsFormTextInputField extends Component<HdsFormTextInputFieldSignature> {
  @tracked private _isPasswordMasked = true;
  @tracked type;

  constructor(owner: Owner, args: HdsFormTextInputFieldSignature['Args']) {
    super(owner, args);
    this.type = this.args.type ?? 'text';
  }

  get hasVisibilityToggle(): boolean {
    return this.args.hasVisibilityToggle ?? true;
  }

  get showVisibilityToggle(): boolean {
    return this.args.type === 'password' && this.hasVisibilityToggle;
  }

  get visibilityToggleAriaLabel(): string | undefined {
    if (this.args.visibilityToggleAriaLabel) {
      return this.args.visibilityToggleAriaLabel;
    } else if (this._isPasswordMasked) {
      return 'Show password';
    } else {
      return 'Hide password';
    }
  }

  get visibilityToggleAriaMessageText(): string | undefined {
    if (this.args.visibilityToggleAriaMessageText) {
      return this.args.visibilityToggleAriaMessageText;
    } else if (this._isPasswordMasked) {
      return 'Password is hidden';
    } else {
      return 'Password is visible';
    }
  }

  onClickTogglePasswordReadability = (): void => {
    this._isPasswordMasked = !this._isPasswordMasked;
    this.type = this._isPasswordMasked ? 'password' : 'text';
  };

  <template>
    <HdsFormField
      @layout="vertical"
      @extraAriaDescribedBy={{@extraAriaDescribedBy}}
      @isRequired={{@isRequired}}
      @isOptional={{@isOptional}}
      @id={{@id}}
      as |F|
    >
      {{! Notice: the order of the elements is not relevant here, because is controlled at "HdsFormField" component level }}
      {{yield (hash Label=F.Label HelperText=F.HelperText Error=F.Error)}}
      {{#if F.CharacterCount}}
        {{yield
          (hash CharacterCount=(component F.CharacterCount value=@value))
        }}
      {{/if}}
      <F.Control>
        <div class="hds-form-text-input__wrapper" {{style width=@width}}>
          <HdsFormTextInputBase
            @type={{this.type}}
            @value={{@value}}
            @isInvalid={{@isInvalid}}
            @isLoading={{@isLoading}}
            @hasVisibilityToggle={{this.showVisibilityToggle}}
            required={{@isRequired}}
            ...attributes
            id={{F.id}}
            aria-describedby={{F.ariaDescribedBy}}
          />
          {{#if this.showVisibilityToggle}}
            <HdsFormVisibilityToggle
              @isVisible={{this._isPasswordMasked}}
              @ariaLabel={{this.visibilityToggleAriaLabel}}
              @ariaMessageText={{this.visibilityToggleAriaMessageText}}
              aria-controls={{F.id}}
              class="hds-form-text-input__visibility-toggle"
              {{on "click" this.onClickTogglePasswordReadability}}
            />
          {{/if}}
        </div>
      </F.Control>
    </HdsFormField>
  </template>
}
