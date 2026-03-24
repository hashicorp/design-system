import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { eq } from 'ember-truth-helpers';

import {
  HdsSegmentedGroup,
  HdsButton,
  HdsFlyout,
  HdsTextDisplay,
  HdsAccordion,
  HdsFormCheckboxGroup,
  HdsButtonSet,
  HdsTag,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

import USERS_WITH_ORG_DATA from 'website/mocks/user-with-org-data';

export default class Index extends Component {
  @tracked filterFlyoutActive = false;
  @tracked state = 'close';

  @tracked demoUsers = USERS_WITH_ORG_DATA;

  @tracked demoFilters = [
    {
      id: 'role',
      name: 'Role',
      filterType: 'checkbox',
      options: [
        {
          id: 'owner',
          name: 'Owner',
        },
        {
          id: 'admin',
          name: 'Admin',
        },
        {
          id: 'viewer',
          name: 'Viewer',
        },
      ],
    },
    {
      id: 'organizations',
      name: 'Organizations',
      filterType: 'checkbox',
      options: [
        {
          id: '1-5',
          name: '1-5',
        },
        {
          id: '6-10',
          name: '6-10',
        },
        {
          id: '11-15',
          name: '11-15',
        },
        {
          id: '16-20',
          name: '16-20',
        },
      ],
    },
    {
      id: 'projects',
      name: 'Projects',
      filterType: 'checkbox',
      options: [
        {
          id: '1-5',
          name: '1-5',
        },
        {
          id: '6-10',
          name: '6-10',
        },
        {
          id: '11-15',
          name: '11-15',
        },
        {
          id: '16-20',
          name: '16-20',
        },
      ],
    },
    {
      id: 'auth',
      name: 'Auth',
      filterType: 'checkbox',
      options: [
        {
          id: 'email',
          name: 'Email',
        },
        {
          id: 'google',
          name: 'Google',
        },
        {
          id: 'github',
          name: 'Github',
        },
        {
          id: 'saml',
          name: 'SAML',
        },
      ],
    },
  ];

  @tracked demoAppliedFilters = [
    'umbrella',
    'jazz',
    'quilt',
    'zephyr',
    'cactus',
    'nebula',
    'gizmo',
    'waltz',
    'kiwi',
    'vortex',
    'plethora',
    'paradox',
    'euphoria',
    'labyrinth',
    'kaleidoscope',
    'flux',
    'enigma',
    'zenith',
    'quasar',
    'ephemeral',
    'serendipity',
    'quintessence',
    'whisper',
    'juxtapose',
    'vivid',
  ];

  @tracked demoOverflowFilters = [
    {
      id: 1,
      name: 'fruits',
      label: 'Fruits',
      values: [
        {
          id: 'apple',
          name: 'Apple',
        },
        {
          id: 'banana',
          name: 'Banana',
        },
        {
          id: 'cherry',
          name: 'Cherry',
        },
        {
          id: 'date',
          name: 'Date',
        },
        {
          id: 'elderberry',
          name: 'Elderberry',
        },
        {
          id: 'fig',
          name: 'Fig',
        },
        {
          id: 'grape',
          name: 'Grape',
        },
        {
          id: 'honeydew',
          name: 'Honeydew',
        },
        {
          id: 'kiwi',
          name: 'Kiwi',
        },
      ],
    },
    {
      id: 2,
      name: 'vegetables',
      label: 'Vegetables',
      values: [
        {
          id: 'artichoke',
          name: 'Artichoke',
        },
        {
          id: 'beet',
          name: 'Beet',
        },
        {
          id: 'carrot',
          name: 'Carrot',
        },
        {
          id: 'daikon',
          name: 'Daikon',
        },
        {
          id: 'eggplant',
          name: 'Eggplant',
        },
        {
          id: 'fennel',
          name: 'Fennel',
        },
        {
          id: 'garlic',
          name: 'Garlic',
        },
        {
          id: 'horseradish',
          name: 'Horseradish',
        },
        {
          id: 'iceberg',
          name: 'Iceberg',
        },
      ],
    },
    {
      id: 3,
      name: 'grains',
      label: 'Grains',
      values: [
        {
          id: 'amaranth',
          name: 'Amaranth',
        },
        {
          id: 'barley',
          name: 'Barley',
        },
        {
          id: 'corn',
          name: 'Corn',
        },
        {
          id: 'durum',
          name: 'Durum',
        },
        {
          id: 'einkorn',
          name: 'Einkorn',
        },
        {
          id: 'farro',
          name: 'Farro',
        },
        {
          id: 'grits',
          name: 'Grits',
        },
        {
          id: 'hemp',
          name: 'Hemp',
        },
        {
          id: 'indica',
          name: 'Indica',
        },
      ],
    },
    {
      id: 4,
      name: 'dairy',
      label: 'Dairy',
      values: [
        {
          id: 'butter',
          name: 'Butter',
        },
        {
          id: 'cheese',
          name: 'Cheese',
        },
        {
          id: 'cream',
          name: 'Cream',
        },
        {
          id: 'dulce',
          name: 'Dulce',
        },
        {
          id: 'eggnog',
          name: 'Eggnog',
        },
        {
          id: 'feta',
          name: 'Feta',
        },
        {
          id: 'ghee',
          name: 'Ghee',
        },
        {
          id: 'havarti',
          name: 'Havarti',
        },
        {
          id: 'ice cream',
          name: 'Ice Cream',
        },
      ],
    },
  ];

  // Get the model using the mock API
  get model() {
    return {
      demoFilters: this.demoFilters,
      demoUsers: this.demoUsers,
      demoAppliedFilters: this.demoAppliedFilters,
      demoOverflowFilters: this.demoOverflowFilters,
    };
  }

  // Empty function to pass to the Tag component
  filterDismissFunction = () => {
    //
  };

  // Show browser alert with the Clear all filters button is clicked
  clearAllFilters = () => {
    alert('You cleared all of the filters!');
  };

  activateFlyout = () => {
    this.filterFlyoutActive = true;
  };

  deactivateFlyout = () => {
    this.filterFlyoutActive = false;
  };

  toggleState = () => {
    this.state = this.state === 'open' ? 'close' : 'open';
  };

  <template>
    <div class="doc-filter-patterns-wrapper">
      <div class="doc-filter-patterns-filter-bar">
        <HdsSegmentedGroup as |SG|>
          {{#each this.model.demoFilters as |filter|}}
            <SG.Dropdown @listPosition="bottom-left" as |D|>
              <D.ToggleButton @color="secondary" @text={{filter.name}} />
              {{#each filter.options as |option|}}
                <D.Checkbox>{{option.name}}</D.Checkbox>
              {{/each}}
            </SG.Dropdown>
          {{/each}}
        </HdsSegmentedGroup>
        <HdsButton
          @text="More filters"
          @icon="filter"
          @iconPosition="leading"
          @color="secondary"
          {{on "click" this.activateFlyout}}
        />
      </div>

      {{#if this.filterFlyoutActive}}
        <HdsFlyout id="filter-flyout" @onClose={{this.deactivateFlyout}} as |F|>
          <F.Header @icon="filter">More filters</F.Header>
          <F.Body>
            <div class="doc-filter-patterns-flyout-label">
              <HdsTextDisplay @size="300" @color="strong">Diet</HdsTextDisplay>
              <HdsButton
                @text={{if (eq this.state "open") "Collapse all" "Expand all"}}
                @icon={{if (eq this.state "open") "unfold-close" "unfold-open"}}
                @iconPosition="leading"
                @size="small"
                @color="tertiary"
                {{on "click" this.toggleState}}
              />
            </div>
            <HdsAccordion
              @forceState={{this.state}}
              @type="flush"
              @size="small"
              as |A|
            >
              {{#each this.model.demoOverflowFilters as |overflowFilter|}}
                <A.Item>
                  <:toggle>{{overflowFilter.label}}</:toggle>
                  <:content>
                    <HdsFormCheckboxGroup @name={{overflowFilter.label}} as |G|>
                      {{#each overflowFilter.values as |value|}}
                        <G.CheckboxField as |F|>
                          <F.Label>{{value.name}}</F.Label>
                        </G.CheckboxField>
                      {{/each}}
                    </HdsFormCheckboxGroup>
                  </:content>
                </A.Item>
              {{/each}}
            </HdsAccordion>
          </F.Body>
          <F.Footer>
            <HdsButtonSet>
              <HdsButton
                @color="primary"
                @text="Apply filters"
                {{on "click" this.deactivateFlyout}}
              />
              <HdsButton
                @text="Cancel"
                @color="secondary"
                {{on "click" this.deactivateFlyout}}
              />
            </HdsButtonSet>
          </F.Footer>
        </HdsFlyout>
      {{/if}}

      <HdsAccordion @size="small" @type="card" as |A|>
        <A.Item @containsInteractive={{true}}>
          <:toggle>
            <div class="doc-filter-patterns-accordion-toggle">
              <HdsTextBody
                @color="strong"
                @size="200"
                @weight="semibold"
              >Applied filters (25)</HdsTextBody>
              <HdsButton
                @size="small"
                @color="tertiary"
                @icon="x"
                @iconPosition="leading"
                @text="Clear all filters"
                {{on "click" this.clearAllFilters}}
              />
            </div>
          </:toggle>
          <:content>
            <div class="doc-filter-patterns-applied-filters">
              {{#each this.model.demoAppliedFilters as |appliedFilter|}}
                <HdsTag
                  @text={{appliedFilter}}
                  @onDismiss={{this.filterDismissFunction}}
                />
              {{/each}}
            </div>
          </:content>
        </A.Item>
      </HdsAccordion>
    </div>
  </template>
}
