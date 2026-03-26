import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

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
  @action
  filterDismissFunction() {
    //
  }

  // Show browser alert with the Clear all filters button is clicked
  @action
  clearAllFilters() {
    alert('You cleared all of the filters!');
  }

  @action
  activateFlyout() {
    this.filterFlyoutActive = true;
  }

  @action
  deactivateFlyout() {
    this.filterFlyoutActive = false;
  }

  @action
  toggleState() {
    this.state = this.state === 'open' ? 'close' : 'open';
  }
}
