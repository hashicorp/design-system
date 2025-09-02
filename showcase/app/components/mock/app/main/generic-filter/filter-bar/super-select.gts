/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

import type { HdsFormSuperSelectSingleFieldSignature } from '@hashicorp/design-system-components/components/hds/form/super-select/single/field';
import type { HdsFormSuperSelectMultipleFieldSignature } from '@hashicorp/design-system-components/components/hds/form/super-select/multiple/field';

// HDS components
import {
  HdsFormSuperSelectMultipleField,
  HdsFormSuperSelectSingleField,
} from '@hashicorp/design-system-components/components';

import type { Filters, Filter } from './index';

export interface MockAppMainGenericFilterBarSuperSelectSignature {
  Args: HdsFormSuperSelectMultipleFieldSignature['Args'] & HdsFormSuperSelectSingleFieldSignature['Args'] & {
    key: string;
    text: string;
    filters: Filters;
    options: Array<string>;
    isMultiSelect?: boolean;
    onChange: (key: string, keyFilter?: Filter[]) => void;
  }
  Element: HTMLDivElement;
}

export default class MockAppMainGenericFilterBarSuperSelectFilter extends Component<MockAppMainGenericFilterBarSuperSelectSignature> {
  get keyFilter(): Filter[] | Filter | undefined {
    const { filters, key } = this.args;

    if (!filters) {
      return undefined;
    }
    return filters[key];
  }

  get selectedOptions(): string | string[] | null {
    if (this.keyFilter) {
      if (Array.isArray(this.keyFilter)) {
        const values = this.keyFilter.map((filter) => filter.value as string);
        return values;
      } else {
        return this.keyFilter.value as string;
      }
    }
    return null;
  }

  @action
  onChange(selectedValues: string | string[] | null): void {
    let filters: Filter[] | undefined;

    if (Array.isArray(selectedValues)) {
      if (selectedValues.length === 0) {
        filters = undefined;
      } else {
        filters = selectedValues.map((value) => ({
          text: value,
          value: value,
        }));
      }
    } else if (selectedValues != null) {
      filters = [{
        text: selectedValues,
        value: selectedValues,
      }];
    }

    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(this.args.key, filters);
    }
  }

  <template>
    <div class="filter__super-select">
      {{#if @isMultiSelect}}
        <HdsFormSuperSelectMultipleField
          @onChange={{this.onChange}}
          @selected={{this.selectedOptions}}
          @options={{@options}}
          @searchEnabled={{@searchEnabled}}
          as |F|
        >
          <F.Label>{{@text}}</F.Label>
          <F.Options>
            {{! @glint-expect-error - https://hashicorp.atlassian.net/browse/HDS-5090 }}
            {{F.options}}
          </F.Options>
        </HdsFormSuperSelectMultipleField>
      {{else}}
        <HdsFormSuperSelectSingleField
          @onChange={{this.onChange}}
          @selected={{this.selectedOptions}}
          @options={{@options}}
          as |F|
        >
          <F.Label>{{@text}}</F.Label>
          <F.Options>
            {{! @glint-expect-error - https://hashicorp.atlassian.net/browse/HDS-5090 }}
            {{F.options}}
          </F.Options>
        </HdsFormSuperSelectSingleField>
      {{/if}}
    </div>
  </template>
}
