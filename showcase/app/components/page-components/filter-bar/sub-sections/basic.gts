/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import ShwDivider from 'showcase/components/shw/divider';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsFilterBar } from '@hashicorp/design-system-components/components';

export default class SubSectionBasic extends Component {
  private _filters = {};

  <template>
    <ShwTextH2>Basic usage</ShwTextH2>

    <HdsFilterBar @filters={{this._filters}} @hasSearch={{true}} as |F|>
      <F.ActionsGeneric>
        <ShwPlaceholder @text="generic content" @height="24" />
      </F.ActionsGeneric>
      <F.ActionsDropdown as |D|>
        <D.ToggleButton @text="Actions" @color="secondary" @size="small" />
        <D.Checkbox>Action 1</D.Checkbox>
        <D.Checkbox>Action 2</D.Checkbox>
        <D.Checkbox>Action 3</D.Checkbox>
      </F.ActionsDropdown>
      <F.Dropdown as |D|>
        <D.FilterGroup
          @key="multi-select"
          @text="Multi-select"
          @type="multi-select"
          @searchEnabled={{true}}
          as |F|
        >
          <F.Checkbox @value="1">Option 1</F.Checkbox>
          <F.Checkbox @value="2">Option 2</F.Checkbox>
          <F.Checkbox @value="3">Option 3</F.Checkbox>
        </D.FilterGroup>
        <D.FilterGroup
          @key="single-select"
          @text="Single-select"
          @type="single-select"
          @searchEnabled={{true}}
          as |F|
        >
          <F.Radio @value="1">Option 1</F.Radio>
          <F.Radio @value="2">Option 2</F.Radio>
          <F.Radio @value="3">Option 3</F.Radio>
        </D.FilterGroup>
        <D.FilterGroup @key="numerical" @text="Numerical" @type="numerical" />
        <D.FilterGroup @key="date" @text="Date" @type="date" />
        <D.FilterGroup @key="datetime" @text="Datetime" @type="datetime" />
        <D.FilterGroup @key="time" @text="Time" @type="time" />
      </F.Dropdown>
    </HdsFilterBar>

    <ShwDivider />
  </template>
}
