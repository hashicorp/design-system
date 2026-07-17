import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { capitalize } from '@ember/string';
import { concat } from '@ember/helper';
import { eq } from 'ember-truth-helpers';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
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

const STATES = ['focus', 'disabled'];

const SegmentedGroupCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "SegmentedGroup - Carbonization"}}

  <ShwTextH1>SegmentedGroup - Carbonization</ShwTextH1>

  <section>

    <ShwTextH2>Content</ShwTextH2>

    <ShwCarbonizationComparisonGrid
      @layout="side-by-side"
      @label="Button trailing"
    >
      <:theming>
        <HdsSegmentedGroup as |SGR|>
          <SGR.TextInput aria-label="segmented-text-input-button-trailing" />
          <SGR.Button @color="secondary-muted" @text="Button" />
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
      @layout="side-by-side"
      @label="Button leading"
    >
      <:theming>
        <HdsSegmentedGroup as |SGR|>
          <SGR.Button @color="secondary-muted" @text="Button" />
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
      @layout="side-by-side"
      @label="Dropdown trailing"
    >
      <:theming>
        <HdsSegmentedGroup as |SGR|>
          <SGR.TextInput aria-label="segmented-text-input-dropdown-trailing" />
          <SGR.Dropdown as |D|>
            <D.ToggleButton @color="secondary-muted" @text="Dropdown" />
            <D.Interactive @href="#">Dropdown Item</D.Interactive>
          </SGR.Dropdown>
        </HdsSegmentedGroup>
      </:theming>
      <:reference>
        <div class="shw-component-segmented-group-carbonization-mock-flex">
          <cds-text-input type="text" size="md" value=""></cds-text-input>
          <cds-menu-button label="Dropdown" size="md">
            <cds-menu size="md">
              <cds-menu-item
                label="Lorem, ipsum dolor sit amet
              consectetur."
              ></cds-menu-item>
              <cds-menu-item label="User"><svg
                  focusable="false"
                  preserveAspectRatio="xMidYMid meet"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  slot="render-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                ><path
                    d="M8,2c1.4,0,2.5,1.1,2.5,2.5S9.4,7,8,7S5.5,5.9,5.5,4.5S6.6,2,8,2 M8,1C6.1,1,4.5,2.6,4.5,4.5S6.1,8,8,8s3.5-1.6,3.5-3.5	S9.9,1,8,1z"
                  ></path><path
                    d="M13,15h-1v-2.5c0-1.4-1.1-2.5-2.5-2.5h-3C5.1,10,4,11.1,4,12.5V15H3v-2.5C3,10.6,4.6,9,6.5,9h3c1.9,0,3.5,1.6,3.5,3.5V15z"
                  ></path></svg></cds-menu-item>
              <cds-menu-item label="User group"><svg
                  focusable="false"
                  preserveAspectRatio="xMidYMid meet"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  slot="render-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                ><path
                    d="M31,30H29V27a3,3,0,0,0-3-3H22a3,3,0,0,0-3,3v3H17V27a5,5,0,0,1,5-5h4a5,5,0,0,1,5,5Z"
                  ></path><path
                    d="M24,12a3,3,0,1,1-3,3,3,3,0,0,1,3-3m0-2a5,5,0,1,0,5,5A5,5,0,0,0,24,10Z"
                  ></path><path
                    d="M15,22H13V19a3,3,0,0,0-3-3H6a3,3,0,0,0-3,3v3H1V19a5,5,0,0,1,5-5h4a5,5,0,0,1,5,5Z"
                  ></path><path
                    d="M8,4A3,3,0,1,1,5,7,3,3,0,0,1,8,4M8,2a5,5,0,1,0,5,5A5,5,0,0,0,8,2Z"
                  ></path></svg></cds-menu-item>
              <cds-menu-item-divider></cds-menu-item-divider>
              <cds-menu-item label="Delete" kind="danger">
                <svg
                  focusable="false"
                  preserveAspectRatio="xMidYMid meet"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  slot="render-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                ><path d="M12 12H14V24H12z" /><path d="M18 12H20V24H18z" /><path
                    d="M4,6V8H6V28a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V8h2V6ZM8,28V8H24V28Z"
                  /><path d="M12 2H20V4H12z" /></svg>
              </cds-menu-item>
            </cds-menu>
          </cds-menu-button>
        </div>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid
      @layout="side-by-side"
      @label="Dropdown leading"
    >
      <:theming>
        <HdsSegmentedGroup as |SGR|>
          <SGR.Dropdown as |D|>
            <D.ToggleButton @color="secondary-muted" @text="Dropdown" />
            <D.Interactive @href="#">Dropdown Item</D.Interactive>
          </SGR.Dropdown>
          <SGR.TextInput aria-label="segmented-text-input-dropdown-leading" />
        </HdsSegmentedGroup>
      </:theming>
      <:reference>
        <div class="shw-component-segmented-group-carbonization-mock-flex">
          <cds-menu-button label="Dropdown" size="md">
            <cds-menu size="md">
              <cds-menu-item
                label="Lorem, ipsum dolor sit amet
              consectetur."
              ></cds-menu-item>
              <cds-menu-item label="User"><svg
                  focusable="false"
                  preserveAspectRatio="xMidYMid meet"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  slot="render-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                ><path
                    d="M8,2c1.4,0,2.5,1.1,2.5,2.5S9.4,7,8,7S5.5,5.9,5.5,4.5S6.6,2,8,2 M8,1C6.1,1,4.5,2.6,4.5,4.5S6.1,8,8,8s3.5-1.6,3.5-3.5	S9.9,1,8,1z"
                  ></path><path
                    d="M13,15h-1v-2.5c0-1.4-1.1-2.5-2.5-2.5h-3C5.1,10,4,11.1,4,12.5V15H3v-2.5C3,10.6,4.6,9,6.5,9h3c1.9,0,3.5,1.6,3.5,3.5V15z"
                  ></path></svg></cds-menu-item>
              <cds-menu-item label="User group"><svg
                  focusable="false"
                  preserveAspectRatio="xMidYMid meet"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  slot="render-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                ><path
                    d="M31,30H29V27a3,3,0,0,0-3-3H22a3,3,0,0,0-3,3v3H17V27a5,5,0,0,1,5-5h4a5,5,0,0,1,5,5Z"
                  ></path><path
                    d="M24,12a3,3,0,1,1-3,3,3,3,0,0,1,3-3m0-2a5,5,0,1,0,5,5A5,5,0,0,0,24,10Z"
                  ></path><path
                    d="M15,22H13V19a3,3,0,0,0-3-3H6a3,3,0,0,0-3,3v3H1V19a5,5,0,0,1,5-5h4a5,5,0,0,1,5,5Z"
                  ></path><path
                    d="M8,4A3,3,0,1,1,5,7,3,3,0,0,1,8,4M8,2a5,5,0,1,0,5,5A5,5,0,0,0,8,2Z"
                  ></path></svg></cds-menu-item>
              <cds-menu-item-divider></cds-menu-item-divider>
              <cds-menu-item label="Delete" kind="danger">
                <svg
                  focusable="false"
                  preserveAspectRatio="xMidYMid meet"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  slot="render-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                ><path d="M12 12H14V24H12z" /><path d="M18 12H20V24H18z" /><path
                    d="M4,6V8H6V28a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V8h2V6ZM8,28V8H24V28Z"
                  /><path d="M12 2H20V4H12z" /></svg>
              </cds-menu-item>
            </cds-menu>
          </cds-menu-button>
          <cds-text-input type="text" size="md" value=""></cds-text-input>
        </div>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid
      @layout="side-by-side"
      @label="Icon Dropdown trailing"
    >
      <:theming>
        <HdsSegmentedGroup as |SGR|>
          <SGR.TextInput
            aria-label="segmented-text-input-icon-dropdown-trailing"
          />
          <SGR.Dropdown as |D|>
            <D.ToggleIcon @icon="user" @text="user menu" />
            <D.Title @text="Signed In" />
            <D.Description @text="email@domain.com" />
          </SGR.Dropdown>
        </HdsSegmentedGroup>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid
      @layout="side-by-side"
      @label="Icon Dropdown leading"
    >
      <:theming>
        <HdsSegmentedGroup as |SGR|>
          <SGR.Dropdown as |D|>
            <D.ToggleIcon @icon="user" @text="user menu" />
            <D.Title @text="Signed In" />
            <D.Description @text="email@domain.com" />
          </SGR.Dropdown>
          <SGR.TextInput
            aria-label="segmented-text-input-icon-dropdown-leading"
          />
        </HdsSegmentedGroup>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    {{#each TEXT_INPUT_TYPES as |type|}}
      <ShwCarbonizationComparisonGrid
        @layout="side-by-side"
        @label={{capitalize type}}
      >
        <:theming>
          <HdsSegmentedGroup as |SGR|>
            <SGR.TextInput
              @type={{type}}
              aria-label={{concat "segmented-" type "-input"}}
            />
            <SGR.Button @color="secondary-muted" @text="Button" />
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

    <ShwCarbonizationComparisonGrid @layout="side-by-side" @label="Select">
      <:theming>
        <HdsSegmentedGroup as |SGR|>
          <SGR.Select aria-label="segmented-select" as |SEL|>
            <SEL.Options>
              <option>Select</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </SEL.Options>
          </SGR.Select>
          <SGR.Button @color="secondary-muted" @text="Button" />
        </HdsSegmentedGroup>
      </:theming>
      <:reference>
        <div class="shw-component-segmented-group-carbonization-mock-flex">
          <cds-select value="lorem">
            <cds-select-item value="">Select an option</cds-select-item>
            <cds-select-item value="lorem">Lorem ipsum dolor</cds-select-item>
            <cds-select-item value="sine">Sine qua non est</cds-select-item>
          </cds-select>
          <cds-button size="md" kind="secondary">Button</cds-button>
        </div>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Multiple segments</ShwTextH3>

    <ShwCarbonizationComparisonGrid @layout="side-by-side">
      <:theming>
        <ShwFlex @direction="column" @gap="0.75rem" as |SF|>
          <SF.Item>
            <HdsSegmentedGroup as |SGR|>
              <SGR.TextInput aria-label="segmented-text-input-button" />
              <SGR.Button @color="secondary-muted" @text="Button" />
              <SGR.Button @color="secondary-muted" @text="Button" />
            </HdsSegmentedGroup>
          </SF.Item>
          <SF.Item>
            <HdsSegmentedGroup as |SGR|>
              <SGR.TextInput aria-label="segmented-text-input-button" />
              <SGR.Button @color="secondary-muted" @text="Button" />
              <SGR.Dropdown as |D|>
                <D.ToggleButton @color="secondary-muted" @text="Dropdown" />
                <D.Interactive @href="#">Dropdown Item</D.Interactive>
              </SGR.Dropdown>
            </HdsSegmentedGroup>
          </SF.Item>
          <SF.Item>
            <HdsSegmentedGroup as |SGR|>
              <SGR.TextInput aria-label="segmented-text-input-button" />
              <SGR.Dropdown as |D|>
                <D.ToggleButton @color="secondary-muted" @text="Dropdown" />
                <D.Interactive @href="#">Dropdown Item</D.Interactive>
              </SGR.Dropdown>
              <SGR.Button @color="secondary-muted" @text="Button" />
            </HdsSegmentedGroup>
          </SF.Item>
          <SF.Item>
            <HdsSegmentedGroup as |SGR|>
              <SGR.TextInput aria-label="segmented-text-input-button" />
              <SGR.TextInput aria-label="segmented-text-input-button" />
              <SGR.Button @color="secondary-muted" @text="Button" />
            </HdsSegmentedGroup>
          </SF.Item>
          <SF.Item>
            <HdsSegmentedGroup as |SGR|>
              <SGR.TextInput aria-label="segmented-text-input-button" />
              <SGR.Select aria-label="segmented-select" as |SEL|>
                <SEL.Options>
                  <option>Select</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </SEL.Options>
              </SGR.Select>
              <SGR.Button @color="secondary-muted" @text="Button" />
            </HdsSegmentedGroup>
          </SF.Item>
          <SF.Item>
            <HdsSegmentedGroup as |SGR|>
              <SGR.TextInput aria-label="segmented-text-input-button" />
              <SGR.Select aria-label="segmented-select" as |SEL|>
                <SEL.Options>
                  <option>Select</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </SEL.Options>
              </SGR.Select>
              <SGR.Dropdown as |D|>
                <D.ToggleButton @color="secondary-muted" @text="Dropdown" />
                <D.Interactive @href="#">Dropdown Item</D.Interactive>
              </SGR.Dropdown>
            </HdsSegmentedGroup>
          </SF.Item>
          <SF.Item>
            <HdsSegmentedGroup as |SGR|>
              <SGR.TextInput aria-label="segmented-text-input-button" />
              <SGR.Dropdown as |D|>
                <D.ToggleIcon @icon="user" @text="user menu" />
                <D.Title @text="Signed In" />
                <D.Description @text="email@domain.com" />
              </SGR.Dropdown>
              <SGR.Button @color="secondary-muted" @text="Button" />
            </HdsSegmentedGroup>
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Within a form field</ShwTextH3>

    <ShwCarbonizationComparisonGrid @layout="side-by-side">
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
              <SGR.Button @color="secondary-muted" @text="Button" />
            </HdsSegmentedGroup>
          </F.Control>
          <F.Error>This is the error</F.Error>
        </HdsFormField>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>States</ShwTextH2>

    <ShwTextH3>Button</ShwTextH3>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid
        @layout="side-by-side"
        @label={{capitalize state}}
      >
        <:theming>
          <ShwFlex @direction="column" @gap="0.75rem" as |SF|>
            <SF.Item>
              <HdsSegmentedGroup as |SGR|>
                <SGR.TextInput
                  aria-label={{concat "segmented-text-input-button-" state}}
                />
                <SGR.Button
                  @color="secondary-muted"
                  @text="Button"
                  mock-state-value={{state}}
                />
              </HdsSegmentedGroup>
            </SF.Item>
            <SF.Item>
              <HdsSegmentedGroup as |SGR|>
                <SGR.Button
                  @color="secondary-muted"
                  @text="Button"
                  mock-state-value={{state}}
                />
                <SGR.TextInput
                  aria-label={{concat "segmented-text-input-button-" state}}
                />
              </HdsSegmentedGroup>
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference>
          <pre>TODO: static image here</pre>
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwTextH3>Dropdown</ShwTextH3>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid
        @layout="side-by-side"
        @label={{capitalize state}}
      >
        <:theming>
          <ShwFlex @direction="column" @gap="0.75rem" as |SF|>
            <SF.Item>
              <HdsSegmentedGroup as |SGR|>
                <SGR.TextInput
                  aria-label={{concat "segmented-text-input-button-" state}}
                />
                <SGR.Dropdown as |D|>
                  <D.ToggleButton
                    @color="secondary-muted"
                    @text="Dropdown"
                    mock-state-value={{state}}
                  />
                  <D.Interactive @href="#">Dropdown Item</D.Interactive>
                </SGR.Dropdown>
              </HdsSegmentedGroup>
            </SF.Item>
            <SF.Item>
              <HdsSegmentedGroup as |SGR|>
                <SGR.Dropdown as |D|>
                  <D.ToggleButton
                    @color="secondary-muted"
                    @text="Dropdown"
                    mock-state-value={{state}}
                  />
                  <D.Interactive @href="#">Dropdown Item</D.Interactive>
                </SGR.Dropdown>
                <SGR.TextInput
                  aria-label={{concat "segmented-text-input-button-" state}}
                />
              </HdsSegmentedGroup>
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference>
          <pre>TODO: static image here</pre>
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwTextH3>Icon Dropdown</ShwTextH3>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid
        @layout="side-by-side"
        @label={{capitalize state}}
      >
        <:theming>
          <ShwFlex @direction="column" @gap="0.75rem" as |SF|>
            <SF.Item>
              <HdsSegmentedGroup as |SGR|>
                <SGR.TextInput
                  aria-label={{concat "segmented-text-input-button-" state}}
                />
                <SGR.Dropdown as |D|>
                  <D.ToggleIcon
                    @icon="user"
                    @text="user menu"
                    mock-state-value={{state}}
                  />
                  <D.Title @text="Signed In" />
                  <D.Description @text="email@domain.com" />
                </SGR.Dropdown>
              </HdsSegmentedGroup>
            </SF.Item>
            <SF.Item>
              <HdsSegmentedGroup as |SGR|>
                <SGR.Dropdown as |D|>
                  <D.ToggleIcon
                    @icon="user"
                    @text="user menu"
                    mock-state-value={{state}}
                  />
                  <D.Title @text="Signed In" />
                  <D.Description @text="email@domain.com" />
                </SGR.Dropdown>
                <SGR.TextInput
                  aria-label={{concat "segmented-text-input-button-" state}}
                />
              </HdsSegmentedGroup>
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference>
          <pre>TODO: static image here</pre>
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwDivider @level={{2}} />

    <ShwTextH3>Input</ShwTextH3>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid
        @layout="side-by-side"
        @label={{capitalize state}}
      >
        <:theming>
          <ShwFlex @direction="column" @gap="0.75rem" as |SF|>
            <SF.Item>
              <HdsSegmentedGroup as |SGR|>
                <SGR.TextInput
                  aria-label={{concat "segmented-text-input-button-" state}}
                  disabled={{eq state "disabled"}}
                  mock-state-value={{state}}
                />
                <SGR.Button @color="secondary-muted" @text="Button" />
              </HdsSegmentedGroup>
            </SF.Item>
            <SF.Item>
              <HdsSegmentedGroup as |SGR|>
                <SGR.Button @color="secondary-muted" @text="Button" />
                <SGR.TextInput
                  aria-label={{concat "segmented-text-input-button-" state}}
                  disabled={{eq state "disabled"}}
                  mock-state-value={{state}}
                />
              </HdsSegmentedGroup>
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference>
          <pre>TODO: static image here</pre>
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwTextH3>Select</ShwTextH3>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid
        @layout="side-by-side"
        @label={{capitalize state}}
      >
        <:theming>
          <ShwFlex @direction="column" @gap="0.75rem" as |SF|>
            <SF.Item>
              <HdsSegmentedGroup as |SGR|>
                <SGR.Select
                  aria-label="segmented-select"
                  mock-state-value={{state}}
                  disabled={{eq state "disabled"}}
                  as |SEL|
                >
                  <SEL.Options>
                    <option>Select</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </SEL.Options>
                </SGR.Select>
                <SGR.Button @color="secondary-muted" @text="Button" />
              </HdsSegmentedGroup>
            </SF.Item>
            <SF.Item>
              <HdsSegmentedGroup as |SGR|>
                <SGR.Button @color="secondary-muted" @text="Button" />
                <SGR.Select
                  aria-label="segmented-select"
                  mock-state-value={{state}}
                  disabled={{eq state "disabled"}}
                  as |SEL|
                >
                  <SEL.Options>
                    <option>Select</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </SEL.Options>
                </SGR.Select>
              </HdsSegmentedGroup>
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference>
          <pre>TODO: static image here</pre>
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}
  </section>
</template>;

export default SegmentedGroupCarbonizationIndex;
