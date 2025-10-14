import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { capitalize } from '@ember/string';
import { concat } from '@ember/helper';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsSegmentedGroup,
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

const SegmentedGroupCarbonization: TemplateOnlyComponent = <template>
  {{pageTitle "SegmentedGroup - Carbonization"}}

  <ShwTextH1>SegmentedGroup - Carbonization</ShwTextH1>

  <section>

    <ShwTextH2>Content</ShwTextH2>

    <ShwCarbonizationComparisonGrid
      @label="Button trailing"
      @hideThemeLabels={{true}}
    >
      <:theming>
        <HdsSegmentedGroup as |SGR|>
          <SGR.TextInput aria-label="segmented-text-input-button-trailing" />
          <SGR.Button @color="secondary" @text="Button" />
        </HdsSegmentedGroup>
      </:theming>
      <:reference>
        <div class="shw-component-segmented-group-carbonization-mock-flex">
          <cds-text-input type="text" size="md" value=""></cds-text-input>
          <cds-button size="md" kind="secondary">Button</cds-button>
        </div>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid
      @label="Button leading"
      @hideThemeLabels={{true}}
    >
      <:theming>
        <HdsSegmentedGroup as |SGR|>
          <SGR.Button @color="secondary" @text="Button" />
          <SGR.TextInput aria-label="segmented-text-input-button-leading" />
        </HdsSegmentedGroup>
      </:theming>
      <:reference>
        <div class="shw-component-segmented-group-carbonization-mock-flex">
          <cds-button size="md" kind="secondary">Button</cds-button>
          <cds-text-input type="text" size="md" value=""></cds-text-input>
        </div>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid
      @label="Dropdown trailing"
      @hideThemeLabels={{true}}
    >
      <:theming>
        <HdsSegmentedGroup as |SGR|>
          <SGR.TextInput aria-label="segmented-text-input-dropdown-trailing" />
          <SGR.Dropdown as |D|>
            <D.ToggleButton @color="secondary" @text="Dropdown" />
            <D.Interactive @href="#">Dropdown Item</D.Interactive>
          </SGR.Dropdown>
        </HdsSegmentedGroup>
      </:theming>
      <:reference>
        TODO
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid
      @label="Dropdown leading"
      @hideThemeLabels={{true}}
    >
      <:theming>
        <HdsSegmentedGroup as |SGR|>
          <SGR.Dropdown as |D|>
            <D.ToggleButton @color="secondary" @text="Dropdown" />
            <D.Interactive @href="#">Dropdown Item</D.Interactive>
          </SGR.Dropdown>
          <SGR.TextInput aria-label="segmented-text-input-dropdown-leading" />
        </HdsSegmentedGroup>
      </:theming>
      <:reference>
        TODO
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    {{#each TEXT_INPUT_TYPES as |type|}}
      <ShwCarbonizationComparisonGrid
        @label={{capitalize type}}
        @hideThemeLabels={{true}}
      >
        <:theming>
          <HdsSegmentedGroup as |SGR|>
            <SGR.TextInput
              @type={{type}}
              aria-label={{concat "segmented-" type "-input"}}
            />
            <SGR.Button @color="secondary" @text="Button" />
          </HdsSegmentedGroup>
        </:theming>
        <:reference>
          <div class="shw-component-segmented-group-carbonization-mock-flex">
            <cds-text-input type={{type}} size="md" value=""></cds-text-input>
            <cds-button size="md" kind="secondary">Button</cds-button>
          </div>
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwCarbonizationComparisonGrid @label="Select" @hideThemeLabels={{true}}>
      <:theming>
        <HdsSegmentedGroup as |SGR|>
          <SGR.Select aria-label="segmented-select" as |SEL|>
            <SEL.Options>
              <option>Select</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </SEL.Options>
          </SGR.Select>
          <SGR.Button @color="secondary" @text="Button" />
        </HdsSegmentedGroup>
      </:theming>
      <:reference>
        TODO
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Within a form field</ShwTextH3>

    <ShwCarbonizationComparisonGrid @hideThemeLabels={{true}}>
      <:theming>
        <HdsFormField @layout="vertical" @isRequired={{true}} as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Control>
            <HdsSegmentedGroup as |SGR|>
              <SGR.TextInput
                id={{F.id}}
                aria-describedby={{F.ariaDescribedBy}}
              />
              <SGR.Button @color="secondary" @text="Button" />
            </HdsSegmentedGroup>
          </F.Control>
          <F.Error>This is the error</F.Error>
        </HdsFormField>
      </:theming>
      <:reference>
        TODO
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>States</ShwTextH2>

    <ShwTextH3>Trailing</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="Button focused">
      <:theming>
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
      </:theming>
      <:reference>
        TODO
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Dropdown focused">
      <:theming>
        <HdsSegmentedGroup as |SGR|>
          <SGR.Select
            aria-label="segmented-select-trailing-dropdown-focused"
            as |SEL|
          >
            <SEL.Options>
              <option>Select</option>
              <option>Option 1</option>
              <option>Option 2</option>
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
      </:theming>
      <:reference>
        TODO
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Button disabled">
      <:theming>
        <HdsSegmentedGroup as |SGR|>
          <SGR.TextInput
            aria-label="segmented-text-input-trailing-button-disabled"
          />
          <SGR.Button @color="secondary" @text="Button" disabled />
        </HdsSegmentedGroup>
      </:theming>
      <:reference>
        TODO
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Dropdown disabled">
      <:theming>
        <HdsSegmentedGroup as |SGR|>
          <SGR.Select
            aria-label="segmented-text-input-trailing-dropdown-disabled"
            as |SEL|
          >
            <SEL.Options>
              <option>Select</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </SEL.Options>
          </SGR.Select>
          <SGR.Dropdown as |D|>
            <D.ToggleButton @color="secondary" @text="Dropdown" disabled />
            <D.Interactive @href="#">Dropdown Item</D.Interactive>
          </SGR.Dropdown>
        </HdsSegmentedGroup>
      </:theming>
      <:reference>
        TODO
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Input focused">
      <:theming>
        <HdsSegmentedGroup as |SGR|>
          <SGR.Button @color="secondary" @text="Button" />
          <SGR.TextInput
            aria-label="segmented-trailing-text-input-focused"
            mock-state-value="focus"
          />
        </HdsSegmentedGroup>
      </:theming>
      <:reference>
        TODO
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Select focused">
      <:theming>
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
              <option>Option 1</option>
              <option>Option 2</option>
            </SEL.Options>
          </SGR.Select>
        </HdsSegmentedGroup>
      </:theming>
      <:reference>
        TODO
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Input disabled">
      <:theming>
        <HdsSegmentedGroup as |SGR|>
          <SGR.Button @color="secondary" @text="Button" />
          <SGR.TextInput
            aria-label="segmented-trailing-text-input-disabled"
            disabled
          />
        </HdsSegmentedGroup>
      </:theming>
      <:reference>
        TODO
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Select disabled">
      <:theming>
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
              <option>Option 1</option>
              <option>Option 2</option>
            </SEL.Options>
          </SGR.Select>
        </HdsSegmentedGroup>
      </:theming>
      <:reference>
        TODO
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Leading</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="Button focused">
      <:theming>
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
      </:theming>
      <:reference>
        TODO
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Dropdown focused">
      <:theming>
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
              <option>Option 1</option>
              <option>Option 2</option>
            </SEL.Options>
          </SGR.Select>
        </HdsSegmentedGroup>
      </:theming>
      <:reference>
        TODO
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Button disabled">
      <:theming>
        <HdsSegmentedGroup as |SGR|>
          <SGR.Button @color="secondary" @text="Button" disabled />
          <SGR.TextInput
            aria-label="segmented-text-input-leading-button-disabled"
          />
        </HdsSegmentedGroup>
      </:theming>
      <:reference>
        TODO
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Dropdown disabled">
      <:theming>
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
              <option>Option 1</option>
              <option>Option 2</option>
            </SEL.Options>
          </SGR.Select>
        </HdsSegmentedGroup>
      </:theming>
      <:reference>
        TODO
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Input focused">
      <:theming>
        <HdsSegmentedGroup as |SGR|>
          <SGR.TextInput
            aria-label="segmented-leading-text-input-focused"
            mock-state-value="focus"
          />
          <SGR.Button @color="secondary" @text="Button" />
        </HdsSegmentedGroup>
      </:theming>
      <:reference>
        TODO
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Select focused">
      <:theming>
        <HdsSegmentedGroup as |SGR|>
          <SGR.Select
            aria-label="segmented-leading-select-focused"
            mock-state-value="focus"
            as |SEL|
          >
            <SEL.Options>
              <option>Select</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </SEL.Options>
          </SGR.Select>
          <SGR.Dropdown as |D|>
            <D.ToggleButton @color="secondary" @text="Dropdown" />
            <D.Interactive @href="#">Dropdown Item</D.Interactive>
          </SGR.Dropdown>
        </HdsSegmentedGroup>
      </:theming>
      <:reference>
        TODO
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Input disabled">
      <:theming>
        <HdsSegmentedGroup as |SGR|>
          <SGR.TextInput
            aria-label="segmented-leading-text-input-disabled"
            disabled
          />
          <SGR.Button @color="secondary" @text="Button" />
        </HdsSegmentedGroup>
      </:theming>
      <:reference>
        TODO
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Select disabled">
      <:theming>
        <HdsSegmentedGroup as |SGR|>
          <SGR.Select
            aria-label="segmented-leading-select-disabled"
            disabled
            as |SEL|
          >
            <SEL.Options>
              <option>Select</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </SEL.Options>
          </SGR.Select>
          <SGR.Dropdown as |D|>
            <D.ToggleButton @color="secondary" @text="Dropdown" />
            <D.Interactive @href="#">Dropdown Item</D.Interactive>
          </SGR.Dropdown>
        </HdsSegmentedGroup>
      </:theming>
      <:reference>
        TODO
      </:reference>
    </ShwCarbonizationComparisonGrid>

  </section>
</template>;

export default SegmentedGroupCarbonization;
