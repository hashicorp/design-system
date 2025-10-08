/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import { concat } from '@ember/helper';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwGrid from 'showcase/components/shw/grid';
import ShwDivider from 'showcase/components/shw/divider';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import {
  HdsSegmentedGroup,
  HdsFormTextInputBase,
  HdsButtonSet,
  HdsButton,
  HdsFormField,
} from '@hashicorp/design-system-components/components';
import type { HdsFormTextInputTypes } from '@hashicorp/design-system-components/components/hds/form/text-input/types';

const TEXT_INPUT_TYPES: HdsFormTextInputTypes[] = [
  'text',
  'search',
  'date',
  'time',
  'password',
];

const DROPDOWN_OPTIONS = [
  {
    name: 'virtualbox',
    count: 11,
  },
  { name: 'vmware', count: 1, checked: true },
  { name: 'docker', count: 10 },
  { name: 'hyperv', count: 0 },
];

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>

  <ShwTextH3>One segment</ShwTextH3>

  <ShwGrid @columns={{4}} as |SG|>
    <SG.Item @label="Button only">
      <HdsSegmentedGroup as |SGR|>
        <SGR.Button @color="secondary" @text="Button" />
      </HdsSegmentedGroup>
    </SG.Item>
    <SG.Item @label="Input only">
      <HdsSegmentedGroup as |SGR|>
        <SGR.TextInput aria-label="segmented-text-input-lone-item" />
      </HdsSegmentedGroup>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Two segments</ShwTextH3>

  <ShwGrid @columns={{4}} as |SG|>
    <SG.Item @label="Button trailing">
      <HdsSegmentedGroup as |SGR|>
        <SGR.TextInput aria-label="segmented-text-input-button-trailing" />
        <SGR.Button @color="secondary" @text="Button" />
      </HdsSegmentedGroup>
    </SG.Item>
    <SG.Item @label="Button leading">
      <HdsSegmentedGroup as |SGR|>
        <SGR.Button @color="secondary" @text="Button" />
        <SGR.TextInput aria-label="segmented-text-input-button-leading" />
      </HdsSegmentedGroup>
    </SG.Item>
    <SG.Item @label="Dropdown trailing">
      <HdsSegmentedGroup as |SGR|>
        <SGR.TextInput aria-label="segmented-text-input-dropdown-trailing" />
        <SGR.Dropdown as |D|>
          <D.ToggleButton @color="secondary" @text="Dropdown" />
          <D.Interactive @href="#">Dropdown Item</D.Interactive>
        </SGR.Dropdown>
      </HdsSegmentedGroup>
    </SG.Item>
    <SG.Item @label="Dropdown leading">
      <HdsSegmentedGroup as |SGR|>
        <SGR.Dropdown as |D|>
          <D.ToggleButton @color="secondary" @text="Dropdown" />
          <D.Interactive @href="#">Dropdown Item</D.Interactive>
        </SGR.Dropdown>
        <SGR.TextInput aria-label="segmented-text-input-dropdown-leading" />
      </HdsSegmentedGroup>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwGrid @columns={{3}} as |SG|>
    {{#each TEXT_INPUT_TYPES as |type|}}
      <SG.Item @label={{capitalize type}}>
        <HdsSegmentedGroup as |SGR|>
          <SGR.TextInput
            @type={{type}}
            aria-label={{concat "segmented-" type "-input"}}
          />
          <SGR.Button @color="secondary" @text="Button" />
        </HdsSegmentedGroup>
      </SG.Item>
    {{/each}}

    <SG.Item @label="Select">
      <HdsSegmentedGroup as |SGR|>
        <SGR.Select aria-label="segmented-select" as |SEL|>
          <SEL.Options>
            <option>Select</option>
            <option>Another option</option>
            <option>Yet another one</option>
          </SEL.Options>
        </SGR.Select>
        <SGR.Button @color="secondary" @text="Button" />
      </HdsSegmentedGroup>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Multiple segments</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Input, Button, Button">
      <HdsSegmentedGroup as |SGR|>
        <SGR.TextInput aria-label="segmented-input-button-button" />
        <SGR.Button @color="secondary" @text="Button" />
        <SGR.Button @color="secondary" @text="Button" />
      </HdsSegmentedGroup>
    </SG.Item>
    <SG.Item @label="Input, Button, Dropdown">
      <HdsSegmentedGroup as |SGR|>
        <SGR.TextInput aria-label="segmented-input-button-dropdown" />
        <SGR.Button @color="secondary" @text="Button" />
        <SGR.Dropdown as |D|>
          <D.ToggleButton @color="secondary" @text="Dropdown" />
          <D.Header @hasDivider={{true}}>
            <HdsFormTextInputBase @type="search" placeholder="Narrow results" />
          </D.Header>
          {{#each DROPDOWN_OPTIONS as |option|}}
            <D.Checkbox
              name="checkbox-item-dropdown"
              @count={{option.count}}
              checked={{option.checked}}
            >{{option.name}}</D.Checkbox>
          {{/each}}
          <D.Footer @hasDivider={{true}}>
            <HdsButtonSet>
              <HdsButton @text="Apply" @isFullWidth={{true}} @size="small" />
              <HdsButton
                @text="Cancel"
                @color="secondary"
                @isFullWidth={{true}}
                @size="small"
              />
            </HdsButtonSet>
          </D.Footer>
        </SGR.Dropdown>
      </HdsSegmentedGroup>
    </SG.Item>
    <SG.Item @label="Input, Dropdown, Button">
      <HdsSegmentedGroup as |SGR|>
        <SGR.TextInput aria-label="segmented-input-dropdown-button" />
        <SGR.Dropdown as |D|>
          <D.ToggleButton @color="secondary" @text="Dropdown" />
          <D.Header @hasDivider={{true}}>
            <HdsFormTextInputBase @type="search" placeholder="Narrow results" />
          </D.Header>
          {{#each DROPDOWN_OPTIONS as |option|}}
            <D.Checkbox
              name="checkbox-item-dropdown"
              @count={{option.count}}
              checked={{option.checked}}
            >{{option.name}}</D.Checkbox>
          {{/each}}
          <D.Footer @hasDivider={{true}}>
            <HdsButtonSet>
              <HdsButton @text="Apply" @isFullWidth={{true}} @size="small" />
              <HdsButton
                @text="Cancel"
                @color="secondary"
                @isFullWidth={{true}}
                @size="small"
              />
            </HdsButtonSet>
          </D.Footer>
        </SGR.Dropdown>
        <SGR.Button @color="secondary" @text="Button" />
      </HdsSegmentedGroup>
    </SG.Item>
    <SG.Item @label="Input, Input, Button">
      <HdsSegmentedGroup as |SGR|>
        <SGR.TextInput aria-label="segmented-input-input-button-1" />
        <SGR.TextInput aria-label="segmented-input-input-button-2" />
        <SGR.Button @color="secondary" @text="Button" />
      </HdsSegmentedGroup>
    </SG.Item>
    <SG.Item @label="Input, Select, Button">
      <HdsSegmentedGroup as |SGR|>
        <SGR.TextInput aria-label="segmented-input-select-button-1" />
        <SGR.Select aria-label="segmented-input-select-button-2" as |SEL|>
          <SEL.Options>
            <option>Select</option>
            <option>Another option</option>
            <option>Yet another one</option>
          </SEL.Options>
        </SGR.Select>
        <SGR.Button @color="secondary" @text="Button" />
      </HdsSegmentedGroup>
    </SG.Item>
    <SG.Item @label="Input, Select, Dropdown">
      <HdsSegmentedGroup as |SGR|>
        <SGR.TextInput aria-label="segmented-input-select-dropdown-1" />
        <SGR.Select aria-label="segmented-input-select-dropdown-2" as |SEL|>
          <SEL.Options>
            <option>Select</option>
            <option>Another option</option>
            <option>Yet another one</option>
          </SEL.Options>
        </SGR.Select>
        <SGR.Dropdown as |D|>
          <D.ToggleButton @color="secondary" @text="Dropdown" />
          <D.Header @hasDivider={{true}}>
            <HdsFormTextInputBase @type="search" placeholder="Narrow results" />
          </D.Header>
          {{#each DROPDOWN_OPTIONS as |option|}}
            <D.Checkbox
              name="checkbox-item-dropdown"
              @count={{option.count}}
              checked={{option.checked}}
            >{{option.name}}</D.Checkbox>
          {{/each}}
          <D.Footer @hasDivider={{true}}>
            <HdsButtonSet>
              <HdsButton @text="Apply" @isFullWidth={{true}} @size="small" />
              <HdsButton
                @text="Cancel"
                @color="secondary"
                @isFullWidth={{true}}
                @size="small"
              />
            </HdsButtonSet>
          </D.Footer>
        </SGR.Dropdown>
      </HdsSegmentedGroup>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Generic</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Trailing">
      <HdsSegmentedGroup as |SGR|>
        <SGR.TextInput aria-label="segmented-text-input-generic-trailing" />
        <SGR.Generic>
          <ShwPlaceholder
            @text="generic content"
            @width="160"
            @height="36"
            @background="#e1f5fe"
          />
        </SGR.Generic>
      </HdsSegmentedGroup>
    </SG.Item>
    <SG.Item @label="Leading">
      <HdsSegmentedGroup as |SGR|>
        <SGR.Generic>
          <ShwPlaceholder
            @text="generic content"
            @width="250"
            @height="36"
            @background="#e1f5fe"
          />
        </SGR.Generic>
        <SGR.Button @color="secondary" @text="Button" />
      </HdsSegmentedGroup>
    </SG.Item>
    <SG.Item @label="Trailing & leading">
      <HdsSegmentedGroup as |SGR|>
        <SGR.Generic>
          <ShwPlaceholder
            @text="generic content"
            @width="125"
            @height="36"
            @background="#e1f5fe"
          />
        </SGR.Generic>
        <SGR.Button @color="secondary" @text="Button" />
        <SGR.Generic>
          <ShwPlaceholder
            @text="generic content"
            @width="125"
            @height="36"
            @background="#e1f5fe"
          />
        </SGR.Generic>
      </HdsSegmentedGroup>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Within a form field</ShwTextH3>

  <HdsFormField @layout="vertical" @isRequired={{true}} as |F|>
    <F.Label>This is the label</F.Label>
    <F.HelperText>This is the helper text</F.HelperText>
    <F.Control>
      <HdsSegmentedGroup as |SGR|>
        <SGR.TextInput id={{F.id}} aria-describedby={{F.ariaDescribedBy}} />
        <SGR.Button @color="secondary" @text="Button" />
      </HdsSegmentedGroup>
    </F.Control>
    <F.Error>This is the error</F.Error>
  </HdsFormField>

  <ShwDivider />
</template>;

export default SubSectionContent;
