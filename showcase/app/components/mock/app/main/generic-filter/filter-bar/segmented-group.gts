/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import type { WithBoundArgs } from '@glint/template';
import { hash } from '@ember/helper';

import MockAppMainGenericFilterBarDropdown from './dropdown';

// HDS components
import { HdsSegmentedGroup } from '@hashicorp/design-system-components/components';

import type { Filters, Filter } from './index';

export interface MockAppMainGenericFilterBarSegmentedGroupSignature {
  Args: {
    filters: Filters;
    isLiveFilter?: boolean;
    onChange: (key: string, keyFilter?: Filter[]) => void;
  };
  Blocks: {
    default: [
      {
        Dropdown?: WithBoundArgs<
          typeof MockAppMainGenericFilterBarDropdown,
          'dropdown' | 'filters' | 'isLiveFilter' | 'onChange'
        >;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class MockAppMainGenericFilterBarSegmentedGroup extends Component<MockAppMainGenericFilterBarSegmentedGroupSignature> {
  @action
  onChange(key: string, keyFilter?: Filter[]): void {
    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(key, keyFilter);
    }
  }

  <template>
    <HdsSegmentedGroup as |SG|>
      <SG.TextInput
        @type="search"
        name="demo-filter-search"
        placeholder="Search"
        aria-label="Search"
      />
      {{yield
        (hash
          Dropdown=(component
            MockAppMainGenericFilterBarDropdown
            dropdown=SG.Dropdown
            filters=@filters
            isLiveFilter=@isLiveFilter
            onChange=this.onChange
          )
        )
      }}
    </HdsSegmentedGroup>
  </template>
}
