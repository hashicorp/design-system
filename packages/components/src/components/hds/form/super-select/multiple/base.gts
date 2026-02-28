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
import HdsFormSuperSelectAfterOptions from '../after-options.gts';
import HdsFormSuperSelectOptionGroup from '../option-group.gts';

import type { HdsFormSuperSelectHorizontalPositions } from '../types.ts';

export const DEFAULT_HORIZONTAL_POSITION: string =
  HdsFormSuperSelectHorizontalPositionValues.Left;
export const HORIZONTAL_POSITION_MAPPING =
  HdsFormSuperSelectHorizontalPositionToPlacementValues;

export interface HdsFormSuperSelectMultipleBaseSignature {
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

export default class HdsFormSuperSelectMultipleBase extends Component<HdsFormSuperSelectMultipleBaseSignature> {
  @tracked private _powerSelectAPI?: Select;
  @tracked private _showOnlySelected = false;
  @tracked private _showNoSelectedMessage = false;

  get horizontalPosition(): HdsFormSuperSelectHorizontalPositions {
    const { horizontalPosition = DEFAULT_HORIZONTAL_POSITION } = this.args;
    return horizontalPosition as HdsFormSuperSelectHorizontalPositions;
  }

  get selectedCount(): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return this._powerSelectAPI?.selected?.length || '0';
  }

  get optionsCount(): string {
    return this._powerSelectAPI?.resultsCount.toString() || '0';
  }

  get resultCountMessageText(): string {
    if (typeof this.args.resultCountMessage === 'string') {
      return this.args.resultCountMessage;
    }

    return `${this.optionsCount} total`;
  }

  get resultCountMessageFunction(): PowerSelectSignature['Args']['resultCountMessage'] {
    if (typeof this.args.resultCountMessage === 'function') {
      return this.args.resultCountMessage;
    }

    return undefined;
  }

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
    this._powerSelectAPI = powerSelectAPI;
  };

  showSelected = (): void => {
    this._showNoSelectedMessage = this.selectedCount === '0';
    this._showOnlySelected = true;
  };

  showAll = (): void => {
    this._showNoSelectedMessage = false;
    this._showOnlySelected = false;
  };

  clearSelected = (): void => {
    this._powerSelectAPI?.actions.select(null);
    // show all options after clearing all selection
    this._showNoSelectedMessage = false;
    this._showOnlySelected = false;
  };

  get showAfterOptions(): boolean {
    return this.args.showAfterOptions ?? true;
  }

  // NOTE: The searchPlaceholder doesn't currently work for the multiple select
  get searchPlaceholder(): string {
    return this.args.searchPlaceholder ?? 'Search';
  }

  get styles(): Record<string, string> {
    const styles: { [key: string]: string } = {};

    if (this.args.dropdownMaxWidth) {
      styles['--hds-form-super-select-dropdown-max-width'] =
        this.args.dropdownMaxWidth;
    }

    if (this.selectedCount === '0') {
      styles['--hds-form-super-select-selected-text-display'] = 'none';
    } else {
      styles['--hds-form-super-select-selected-text-display'] = 'flex';
    }

    styles['--hds-form-super-select-selected-text'] =
      `'${this.selectedCount} selected'`;

    return styles;
  }

  get classNames(): string {
    const classes = ['hds-form-super-select', 'hds-form-super-select-multiple'];

    // add a class based on the @matchTriggerWidth argument or whether dropdownMaxWidth is set
    if (this.args.matchTriggerWidth === false || this.args.dropdownMaxWidth) {
      classes.push('hds-form-super-select--dropdown-content-auto-width');
    }

    // add a class based on the @isInvalid argument
    if (this.args.isInvalid) {
      classes.push(`hds-form-super-select--is-invalid`);
    }

    // add a class based on the showOnlySelected
    if (this._showOnlySelected) {
      classes.push(`hds-form-super-select--show-only-selected`);
    }

    return classes.join(' ');
  }

  <template>
    {{! Important: if an argument is added in base.hbs, it must also be added/processed in the Base component used in field.hbs }}
    <div class={{this.classNames}} {{style this.styles}}>
      <PowerSelect
        tabindex="0"
        @afterOptionsComponent={{if
          this.showAfterOptions
          (or
            @afterOptionsComponent
            (component
              HdsFormSuperSelectAfterOptions
              content=@afterOptionsContent
              resultCountMessage=this.resultCountMessageText
              showNoSelectedMessage=this._showNoSelectedMessage
              showOnlySelected=this._showOnlySelected
              showSelected=this.showSelected
              showAll=this.showAll
              clearSelected=this.clearSelected
              selectedCount=this.selectedCount
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
        @closeOnSelect={{false}}
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
        @multiple={{true}}
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
        @placeholderComponent={{@placeholderComponent}}
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
        {{! even if technically what is yielded here are _a list_ of options, we've decided to keep the option name for consistency with the existing PowerSelect API }}
        {{yield option select}}
      </PowerSelect>
    </div>
  </template>
}
