/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { EnsureSafeComponentHelper as ensureSafeComponent } from '@embroider/util';
import style from 'ember-style-modifier';

import HdsFormField from '../field/index.gts';
import HdsFormTextInputBase from './base.gts';
import HdsFormVisibilityToggle from '../visibility-toggle/index.gts';
import HdsFormCharacterCountComponent from '../character-count/index.gts';

import type { ComponentLike, WithBoundArgs } from '@glint/template';
import type { HdsFormFieldSignature } from '../field/index.gts';
import type { HdsFormTextInputBaseSignature } from './base.gts';
import type { HdsFormErrorSignature } from '../error/index.gts';
import type { HdsFormHelperTextSignature } from '../helper-text/index.gts';
import type { HdsFormLabelSignature } from '../label/index.gts';
import type { HdsFormVisibilityToggleSignature } from '../visibility-toggle/index.gts';
import type Owner from '@ember/owner';

export interface HdsFormTextInputFieldSignature {
  Args: Omit<HdsFormFieldSignature['Args'], 'contextualClass' | 'layout'> &
    HdsFormTextInputBaseSignature['Args'] & {
      visibilityToggleAriaLabel?: HdsFormVisibilityToggleSignature['Args']['ariaLabel'];
      visibilityToggleAriaMessageText?: HdsFormVisibilityToggleSignature['Args']['ariaMessageText'];
    };
  Blocks: {
    default: [
      {
        Label?: ComponentLike<HdsFormLabelSignature>;
        HelperText?: ComponentLike<HdsFormHelperTextSignature>;
        Error?: ComponentLike<HdsFormErrorSignature>;
        CharacterCount?: WithBoundArgs<
          typeof HdsFormCharacterCountComponent,
          'value'
        >;
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

  @action
  onClickTogglePasswordReadability(): void {
    this._isPasswordMasked = !this._isPasswordMasked;
    this.type = this._isPasswordMasked ? 'password' : 'text';
  }

  <template>
    <HdsFormField
      @layout="vertical"
      @extraAriaDescribedBy={{@extraAriaDescribedBy}}
      @isRequired={{@isRequired}}
      @isOptional={{@isOptional}}
      @id={{@id}}
      as |F|
    >
      {{! Notice: the order of the elements is not relevant here, because is controlled at "Hds::Form::Field" component level }}
      {{yield (hash Label=F.Label HelperText=F.HelperText Error=F.Error)}}
      {{#if F.CharacterCount}}
        {{yield
          (hash
            CharacterCount=(component
              (ensureSafeComponent F.CharacterCount) value=@value
            )
          )
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
