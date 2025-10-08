/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwGrid from 'showcase/components/shw/grid';
import ShwDivider from 'showcase/components/shw/divider';

import { HdsSegmentedGroup } from '@hashicorp/design-system-components/components';

const SubSectionStates: TemplateOnlyComponent = <template>
  <ShwTextH2>States</ShwTextH2>

  <ShwTextH3>Trailing</ShwTextH3>

  <ShwGrid @columns={{4}} as |SG|>
    <SG.Item @label="Button focused">
      <HdsSegmentedGroup as |SGR|>
        <SGR.TextInput
          aria-label="segmented-text-input-trailing-button-focused"
        />
        <SGR.Button
          @color="secondary"
          @text="Button"
          mock-state-value="focus"
        />
      </HdsSegmentedGroup>
    </SG.Item>
    <SG.Item @label="Dropdown focused">
      <HdsSegmentedGroup as |SGR|>
        <SGR.Select
          aria-label="segmented-select-trailing-dropdown-focused"
          as |SEL|
        >
          <SEL.Options>
            <option>Select</option>
            <option>Another option</option>
            <option>Yet another one</option>
          </SEL.Options>
        </SGR.Select>
        <SGR.Dropdown as |D|>
          <D.ToggleButton
            @color="secondary"
            @text="Dropdown"
            mock-state-value="focus"
          />
          <D.Interactive @href="#">Dropdown Item</D.Interactive>
        </SGR.Dropdown>
      </HdsSegmentedGroup>
    </SG.Item>
    <SG.Item @label="Button disabled">
      <HdsSegmentedGroup as |SGR|>
        <SGR.TextInput
          aria-label="segmented-text-input-trailing-button-disabled"
        />
        <SGR.Button @color="secondary" @text="Button" disabled />
      </HdsSegmentedGroup>
    </SG.Item>
    <SG.Item @label="Dropdown disabled">
      <HdsSegmentedGroup as |SGR|>
        <SGR.Select
          aria-label="segmented-text-input-trailing-dropdown-disabled"
          as |SEL|
        >
          <SEL.Options>
            <option>Select</option>
            <option>Another option</option>
            <option>Yet another one</option>
          </SEL.Options>
        </SGR.Select>
        <SGR.Dropdown as |D|>
          <D.ToggleButton @color="secondary" @text="Dropdown" disabled />
          <D.Interactive @href="#">Dropdown Item</D.Interactive>
        </SGR.Dropdown>
      </HdsSegmentedGroup>
    </SG.Item>
    <SG.Item @label="Input focused">
      <HdsSegmentedGroup as |SGR|>
        <SGR.Button @color="secondary" @text="Button" />
        <SGR.TextInput
          aria-label="segmented-trailing-text-input-focused"
          mock-state-value="focus"
        />
      </HdsSegmentedGroup>
    </SG.Item>
    <SG.Item @label="Select focused">
      <HdsSegmentedGroup as |SGR|>
        <SGR.Dropdown as |D|>
          <D.ToggleButton @color="secondary" @text="Dropdown" />
          <D.Interactive @href="#">Dropdown Item</D.Interactive>
        </SGR.Dropdown>
        <SGR.Select
          aria-label="segmented-trailing-select-focused"
          mock-state-value="focus"
          as |SEL|
        >
          <SEL.Options>
            <option>Select</option>
            <option>Another option</option>
            <option>Yet another one</option>
          </SEL.Options>
        </SGR.Select>
      </HdsSegmentedGroup>
    </SG.Item>
    <SG.Item @label="Input disabled">
      <HdsSegmentedGroup as |SGR|>
        <SGR.Button @color="secondary" @text="Button" />
        <SGR.TextInput
          aria-label="segmented-trailing-text-input-disabled"
          disabled
        />
      </HdsSegmentedGroup>
    </SG.Item>
    <SG.Item @label="Select disabled">
      <HdsSegmentedGroup as |SGR|>
        <SGR.Dropdown as |D|>
          <D.ToggleButton @color="secondary" @text="Dropdown" />
          <D.Interactive @href="#">Dropdown Item</D.Interactive>
        </SGR.Dropdown>
        <SGR.Select
          aria-label="segmented-trailing-select-disabled"
          disabled
          as |SEL|
        >
          <SEL.Options>
            <option>Select</option>
            <option>Another option</option>
            <option>Yet another one</option>
          </SEL.Options>
        </SGR.Select>
      </HdsSegmentedGroup>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Leading</ShwTextH3>

  <ShwGrid @columns={{4}} as |SG|>
    <SG.Item @label="Button focused">
      <HdsSegmentedGroup as |SGR|>
        <SGR.Button
          @color="secondary"
          @text="Button"
          mock-state-value="focus"
        />
        <SGR.TextInput
          aria-label="segmented-text-input-leading-button-focused"
        />
      </HdsSegmentedGroup>
    </SG.Item>
    <SG.Item @label="Dropdown focused">
      <HdsSegmentedGroup as |SGR|>
        <SGR.Dropdown as |D|>
          <D.ToggleButton
            @color="secondary"
            @text="Dropdown"
            mock-state-value="focus"
          />
          <D.Interactive @href="#">Dropdown Item</D.Interactive>
        </SGR.Dropdown>
        <SGR.Select
          aria-label="segmented-select-leading-dropdown-focused"
          as |SEL|
        >
          <SEL.Options>
            <option>Select</option>
            <option>Another option</option>
            <option>Yet another one</option>
          </SEL.Options>
        </SGR.Select>
      </HdsSegmentedGroup>
    </SG.Item>
    <SG.Item @label="Button disabled">
      <HdsSegmentedGroup as |SGR|>
        <SGR.Button @color="secondary" @text="Button" disabled />
        <SGR.TextInput
          aria-label="segmented-text-input-leading-button-disabled"
        />
      </HdsSegmentedGroup>
    </SG.Item>
    <SG.Item @label="Dropdown disabled">
      <HdsSegmentedGroup as |SGR|>
        <SGR.Dropdown as |D|>
          <D.ToggleButton @color="secondary" @text="Dropdown" disabled />
          <D.Interactive @href="#">Dropdown Item</D.Interactive>
        </SGR.Dropdown>
        <SGR.Select
          aria-label="segmented-select-leading-dropdown-disabled"
          as |SEL|
        >
          <SEL.Options>
            <option>Select</option>
            <option>Another option</option>
            <option>Yet another one</option>
          </SEL.Options>
        </SGR.Select>
      </HdsSegmentedGroup>
    </SG.Item>
    <SG.Item @label="Input focused">
      <HdsSegmentedGroup as |SGR|>
        <SGR.TextInput
          aria-label="segmented-leading-text-input-focused"
          mock-state-value="focus"
        />
        <SGR.Button @color="secondary" @text="Button" />
      </HdsSegmentedGroup>
    </SG.Item>
    <SG.Item @label="Select focused">
      <HdsSegmentedGroup as |SGR|>
        <SGR.Select
          aria-label="segmented-leading-select-focused"
          mock-state-value="focus"
          as |SEL|
        >
          <SEL.Options>
            <option>Select</option>
            <option>Another option</option>
            <option>Yet another one</option>
          </SEL.Options>
        </SGR.Select>
        <SGR.Dropdown as |D|>
          <D.ToggleButton @color="secondary" @text="Dropdown" />
          <D.Interactive @href="#">Dropdown Item</D.Interactive>
        </SGR.Dropdown>
      </HdsSegmentedGroup>
    </SG.Item>
    <SG.Item @label="Input disabled">
      <HdsSegmentedGroup as |SGR|>
        <SGR.TextInput
          aria-label="segmented-leading-text-input-disabled"
          disabled
        />
        <SGR.Button @color="secondary" @text="Button" />
      </HdsSegmentedGroup>
    </SG.Item>
    <SG.Item @label="Select disabled">
      <HdsSegmentedGroup as |SGR|>
        <SGR.Select
          aria-label="segmented-leading-select-disabled"
          disabled
          as |SEL|
        >
          <SEL.Options>
            <option>Select</option>
            <option>Another option</option>
            <option>Yet another one</option>
          </SEL.Options>
        </SGR.Select>
        <SGR.Dropdown as |D|>
          <D.ToggleButton @color="secondary" @text="Dropdown" />
          <D.Interactive @href="#">Dropdown Item</D.Interactive>
        </SGR.Dropdown>
      </HdsSegmentedGroup>
    </SG.Item>
  </ShwGrid>
</template>;

export default SubSectionStates;
