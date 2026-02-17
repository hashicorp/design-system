/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { or } from 'ember-truth-helpers';
import style from 'ember-style-modifier';
import PowerSelect from 'ember-power-select/components/power-select';

import type { PowerSelectSignature } from 'ember-power-select/components/power-select';
import type { Select } from 'ember-power-select/components/power-select';
import type { CalculatePositionResult } from 'ember-basic-dropdown/utils/calculate-position';

import {
  HdsFormSuperSelectHorizontalPositionValues,
  HdsFormSuperSelectHorizontalPositionToPlacementValues,
} from '../types.ts';
import anchoredPositionModifier from '../../../../../modifiers/hds-anchored-position.ts';
import HdsTextBody from '../../../text/body.gts';
import HdsFormSuperSelectOptionGroup from '../option-group.gts';
import HdsFormSuperSelectPlaceholder from '../placeholder.gts';
import HdsFormSuperSelectAfterOptions from '../after-options.gts';

import type { HdsFormSuperSelectHorizontalPositions } from '../types.ts';

export const DEFAULT_HORIZONTAL_POSITION: string =
  HdsFormSuperSelectHorizontalPositionValues.Left;
export const HORIZONTAL_POSITION_MAPPING =
  HdsFormSuperSelectHorizontalPositionToPlacementValues;

export interface HdsFormSuperSelectSingleBaseSignature {
  Args: Omit<PowerSelectSignature['Args'], 'resultCountMessage'> & {
    showAfterOptions?: boolean;
    afterOptionsContent?: string;
    resultCountMessage?:
      | string
      | PowerSelectSignature['Args']['resultCountMessage'];
    dropdownMaxWidth?: string;
    matchTriggerWidth?: boolean;
    isInvalid?: boolean;
  };
  Blocks: PowerSelectSignature['Blocks'];
  Element: PowerSelectSignature['Element'];
}

export default class HdsFormSuperSelectSingleBase extends Component<HdsFormSuperSelectSingleBaseSignature> {
  @tracked powerSelectAPI?: Select;

  get horizontalPosition(): HdsFormSuperSelectHorizontalPositions {
    const { horizontalPosition = DEFAULT_HORIZONTAL_POSITION } = this.args;
    return horizontalPosition as HdsFormSuperSelectHorizontalPositions;
  }

  get resultCountMessageText(): string {
    if (typeof this.args.resultCountMessage === 'string') {
      return this.args.resultCountMessage;
    }

    return `${this.powerSelectAPI?.resultsCount || 0} total`;
  }

  get resultCountMessageFunction(): PowerSelectSignature['Args']['resultCountMessage'] {
    if (typeof this.args.resultCountMessage === 'function') {
      return this.args.resultCountMessage;
    }

    return undefined;
  }

  /**
   * This action sets the powerSelectAPI property and optionally calls a registerAPI function.
   *
   * @param {Object} powerSelectAPI - The API object for the PowerSelect component.
   *
   * If a `registerAPI` function is passed in through the component's arguments,
   * this function will be called with the `powerSelectAPI` as its argument.
   * This allows parent components or controllers to have access to the PowerSelect API.
   *
   * The `powerSelectAPI` is also stored on the component instance and used in `clearSelected`
   */
  setPowerSelectAPI = (powerSelectAPI: Select): void => {
    if (typeof this.args.registerAPI === 'function') {
      this.args.registerAPI(powerSelectAPI);
    }
    this.powerSelectAPI = powerSelectAPI;
  };

  calculatePosition = (
    trigger: Element,
    content: HTMLElement
  ): CalculatePositionResult => {
    // use `hds-anchored-position` to calculate and set position
    // @ts-expect-error: known issue with type of invocation
    anchoredPositionModifier(content, [trigger], {
      placement: HORIZONTAL_POSITION_MAPPING[this.horizontalPosition],
      offsetOptions: 4,
      enableCollisionDetection: true,
    });
    // prevent PowerSelect from setting position
    return {
      horizontalPosition: 'auto',
      verticalPosition: 'auto',
      style: {},
    };
  };

  get showAfterOptions(): boolean | string {
    return this.args.showAfterOptions ?? this.args.afterOptionsContent ?? false;
  }

  get searchPlaceholder(): string {
    return this.args.searchPlaceholder ?? 'Search';
  }

  get dropdownMaxWidthStyle(): Record<string, string> {
    const maxWidthStyle: { [key: string]: string } = {};
    if (this.args.dropdownMaxWidth) {
      maxWidthStyle['--hds-form-super-select-dropdown-max-width'] =
        this.args.dropdownMaxWidth;
    }
    return maxWidthStyle;
  }

  get classNames(): string {
    const classes = ['hds-form-super-select', 'hds-form-super-select-single'];

    // add a class based on the @matchTriggerWidth argument or whether dropdownMaxWidth is set
    if (this.args.matchTriggerWidth === false || this.args.dropdownMaxWidth) {
      classes.push('hds-form-super-select--dropdown-content-auto-width');
    }

    // add a class based on the @isInvalid argument
    if (this.args.isInvalid) {
      classes.push(`hds-form-super-select--is-invalid`);
    }

    return classes.join(' ');
  }

  <template>
    {{! Important: if an argument is added in base.hbs, it must also be added/processed in the Base component used in field.hbs }}
    <div class={{this.classNames}} {{style this.dropdownMaxWidthStyle}}>
      <PowerSelect
        @afterOptionsComponent={{if
          this.showAfterOptions
          (or
            @afterOptionsComponent
            (component
              HdsFormSuperSelectAfterOptions
              content=@afterOptionsContent
              resultCountMessage=this.resultCountMessageText
            )
          )
        }}
        @ariaDescribedBy={{@ariaDescribedBy}}
        @ariaInvalid={{@ariaInvalid}}
        @ariaLabel={{@ariaLabel}}
        @ariaLabelledBy={{@ariaLabelledBy}}
        @beforeOptionsComponent={{@beforeOptionsComponent}}
        @calculatePosition={{if
          @verticalPosition
          undefined
          this.calculatePosition
        }}
        @closeOnSelect={{@closeOnSelect}}
        @disabled={{@disabled}}
        @dropdownClass={{@dropdownClass}}
        @extra={{@extra}}
        @groupComponent={{HdsFormSuperSelectOptionGroup}}
        @horizontalPosition={{@horizontalPosition}}
        @initiallyOpened={{@initiallyOpened}}
        @labelText={{@labelText}}
        @loadingMessage={{@loadingMessage}}
        @matcher={{@matcher}}
        @matchTriggerWidth={{if @dropdownMaxWidth false @matchTriggerWidth}}
        @noMatchesMessage={{@noMatchesMessage}}
        @onBlur={{@onBlur}}
        @onChange={{@onChange}}
        @onClose={{@onClose}}
        @onFocus={{@onFocus}}
        @onInput={{@onInput}}
        @onKeydown={{@onKeydown}}
        @onOpen={{@onOpen}}
        @options={{@options}}
        @optionsComponent={{@optionsComponent}}
        @placeholder={{@placeholder}}
        @placeholderComponent={{HdsFormSuperSelectPlaceholder}}
        @preventScroll={{@preventScroll}}
        @registerAPI={{this.setPowerSelectAPI}}
        @renderInPlace={{true}}
        @resultCountMessage={{this.resultCountMessageFunction}}
        @scrollTo={{@scrollTo}}
        @search={{@search}}
        @searchEnabled={{@searchEnabled}}
        @searchField={{@searchField}}
        @searchFieldPosition="before-options"
        @searchMessage={{@searchMessage}}
        @searchPlaceholder={{this.searchPlaceholder}}
        @selected={{@selected}}
        @selectedItemComponent={{@selectedItemComponent}}
        @tabindex={{@tabindex}}
        @triggerClass={{@triggerClass}}
        @triggerComponent={{@triggerComponent}}
        @triggerId={{@triggerId}}
        @triggerRole={{@triggerRole}}
        @typeAheadOptionMatcher={{@typeAheadOptionMatcher}}
        @verticalPosition={{@verticalPosition}}
        ...attributes
        as |option select|
      >
        <HdsTextBody>{{yield option select}}</HdsTextBody>
      </PowerSelect>
    </div>
  </template>
}
