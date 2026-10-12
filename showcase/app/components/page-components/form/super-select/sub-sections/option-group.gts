/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import style from 'ember-style-modifier';
import { hash } from '@ember/helper';

import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsFormSuperSelectOptionGroup } from '@hashicorp/design-system-components/components';

const VARIANTS = ['single', 'multiple'];

const SubSectionOptionGroup: TemplateOnlyComponent = <template>
  <ShwTextH3>FormSuperSelectOptionGroup</ShwTextH3>

  {{#each VARIANTS as |variant|}}
    <ShwFlex as |SG|>
      <SG.Item @label="{{capitalize variant}} / Flat">
        <div class="hds-form-super-select hds-form-super-select-{{variant}}">
          <div class="ember-basic-dropdown">
            <div
              class="ember-basic-dropdown-content"
              {{style position="static"}}
            >
              <ul
                class="ember-power-select-options"
                role="listbox"
                aria-label="Label"
                {{style max-height="none"}}
              >
                <HdsFormSuperSelectOptionGroup
                  @group={{hash
                    groupName="Title for first group (with no content)"
                  }}
                />
                <HdsFormSuperSelectOptionGroup
                  @group={{hash
                    groupName="Title for second group (with generic content)"
                  }}
                >
                  <ShwPlaceholder
                    @text="Second group - Generic content"
                    @height="40px"
                  />
                </HdsFormSuperSelectOptionGroup>
                <HdsFormSuperSelectOptionGroup
                  @group={{hash
                    groupName="Title for third group (with options)"
                  }}
                >
                  {{! template-lint-disable require-context-role }}
                  <li
                    class="ember-power-select-option"
                    role="option"
                    mock-state-value="hover"
                  >
                    <div class="hds-form-super-select__option-text">Option 1</div>
                  </li>
                  <li class="ember-power-select-option" role="option">
                    <div class="hds-form-super-select__option-text">Option 2</div>
                  </li>
                </HdsFormSuperSelectOptionGroup>
              </ul>
            </div>
          </div>
        </div>
      </SG.Item>
      <SG.Item @label="{{capitalize variant}} / Nested">
        <div class="hds-form-super-select hds-form-super-select-{{variant}}">
          <div class="ember-basic-dropdown">
            <div
              class="ember-basic-dropdown-content"
              {{style position="static"}}
            >
              <ul
                class="ember-power-select-options"
                role="listbox"
                aria-label="Label"
                {{style max-height="none"}}
              >
                <HdsFormSuperSelectOptionGroup
                  @group={{hash groupName="Title for first level"}}
                >
                  {{! template-lint-disable require-context-role }}
                  <li
                    class="ember-power-select-option"
                    role="option"
                    mock-state-value="hover"
                  >
                    <div class="hds-form-super-select__option-text">Level 1 -
                      Option 1A</div>
                  </li>
                  <HdsFormSuperSelectOptionGroup
                    @group={{hash groupName="Title for second level"}}
                  >
                    {{! template-lint-disable require-context-role }}
                    <li
                      class="ember-power-select-option"
                      role="option"
                      mock-state-value="hover"
                    >
                      <div class="hds-form-super-select__option-text">Level 2 -
                        Option 2A</div>
                    </li>
                    <li class="ember-power-select-option" role="option">
                      <div class="hds-form-super-select__option-text">Level 2 -
                        Option 2B</div>
                    </li>
                    <HdsFormSuperSelectOptionGroup
                      @group={{hash groupName="Title for third level"}}
                    >
                      {{! template-lint-disable require-context-role }}
                      <li
                        class="ember-power-select-option"
                        role="option"
                        mock-state-value="hover"
                      >
                        <div class="hds-form-super-select__option-text">Level 3
                          - Option 3A</div>
                      </li>
                      <li class="ember-power-select-option" role="option">
                        <div class="hds-form-super-select__option-text">Level 3
                          - Option 3B</div>
                      </li>
                    </HdsFormSuperSelectOptionGroup>
                  </HdsFormSuperSelectOptionGroup>
                  <HdsFormSuperSelectOptionGroup
                    @group={{hash
                      groupName="Title for second level (with generic content)"
                    }}
                  >
                    <ShwPlaceholder
                      @text="Second group - Generic content"
                      @height="40px"
                    />
                  </HdsFormSuperSelectOptionGroup>
                  <li class="ember-power-select-option" role="option">
                    <div class="hds-form-super-select__option-text">Level 1 -
                      Option 1B</div>
                  </li>
                </HdsFormSuperSelectOptionGroup>
              </ul>
            </div>
          </div>
        </div>
      </SG.Item>
    </ShwFlex>
  {{/each}}

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionOptionGroup;
