/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Index extends Component {
  @tracked filterFlyoutActive = false;
  @tracked state = 'close';

  // Mock API
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
  @tracked demoUsers = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      number_of_organizations: 3,
      number_of_projects: 7,
      authentication_method: 'email',
      role: 'admin',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      number_of_organizations: 1,
      number_of_projects: 4,
      authentication_method: 'GitHub',
      role: 'owner',
    },
    {
      id: 3,
      name: 'Carol Williams',
      email: 'carol.williams@example.com',
      number_of_organizations: 2,
      number_of_projects: 5,
      authentication_method: 'SAML',
      role: 'viewer',
    },
    {
      id: 4,
      name: 'David Brown',
      email: 'david.brown@example.com',
      number_of_organizations: 4,
      number_of_projects: 12,
      authentication_method: 'email',
      role: 'admin',
    },
    {
      id: 5,
      name: 'Eva Martinez',
      email: 'eva.martinez@example.com',
      number_of_organizations: 2,
      number_of_projects: 3,
      authentication_method: 'GitHub',
      role: 'viewer',
    },
    {
      id: 6,
      name: 'Frank Lee',
      email: 'frank.lee@example.com',
      number_of_organizations: 1,
      number_of_projects: 6,
      authentication_method: 'SAML',
      role: 'owner',
    },
    {
      id: 7,
      name: 'Grace Taylor',
      email: 'grace.taylor@example.com',
      number_of_organizations: 3,
      number_of_projects: 9,
      authentication_method: 'email',
      role: 'admin',
    },
    {
      id: 8,
      name: 'Henry Wilson',
      email: 'henry.wilson@example.com',
      number_of_organizations: 2,
      number_of_projects: 5,
      authentication_method: 'GitHub',
      role: 'viewer',
    },
    {
      id: 9,
      name: 'Ivy Chen',
      email: 'ivy.chen@example.com',
      number_of_organizations: 1,
      number_of_projects: 2,
      authentication_method: 'SAML',
      role: 'viewer',
    },
    {
      id: 10,
      name: 'Jack Davis',
      email: 'jack.davis@example.com',
      number_of_organizations: 5,
      number_of_projects: 15,
      authentication_method: 'email',
      role: 'owner',
    },
    {
      id: 11,
      name: 'Karen Lopez',
      email: 'karen.lopez@example.com',
      number_of_organizations: 2,
      number_of_projects: 8,
      authentication_method: 'GitHub',
      role: 'admin',
    },
    {
      id: 12,
      name: "Liam O'Connor",
      email: 'liam.oconnor@example.com',
      number_of_organizations: 3,
      number_of_projects: 11,
      authentication_method: 'SAML',
      role: 'viewer',
    },
    {
      id: 13,
      name: 'Mia Patel',
      email: 'mia.patel@example.com',
      number_of_organizations: 1,
      number_of_projects: 3,
      authentication_method: 'email',
      role: 'admin',
    },
    {
      id: 14,
      name: 'Noah Kim',
      email: 'noah.kim@example.com',
      number_of_organizations: 4,
      number_of_projects: 14,
      authentication_method: 'GitHub',
      role: 'owner',
    },
    {
      id: 15,
      name: 'Olivia Garcia',
      email: 'olivia.garcia@example.com',
      number_of_organizations: 2,
      number_of_projects: 6,
      authentication_method: 'SAML',
      role: 'viewer',
    },
    {
      id: 16,
      name: 'Paul Nguyen',
      email: 'paul.nguyen@example.com',
      number_of_organizations: 3,
      number_of_projects: 9,
      authentication_method: 'email',
      role: 'admin',
    },
    {
      id: 17,
      name: 'Quinn Foster',
      email: 'quinn.foster@example.com',
      number_of_organizations: 1,
      number_of_projects: 2,
      authentication_method: 'GitHub',
      role: 'viewer',
    },
    {
      id: 18,
      name: 'Rachel Tanaka',
      email: 'rachel.tanaka@example.com',
      number_of_organizations: 2,
      number_of_projects: 7,
      authentication_method: 'SAML',
      role: 'owner',
    },
    {
      id: 19,
      name: 'Samuel Green',
      email: 'samuel.green@example.com',
      number_of_organizations: 5,
      number_of_projects: 18,
      authentication_method: 'email',
      role: 'admin',
    },
    {
      id: 20,
      name: 'Tara Murphy',
      email: 'tara.murphy@example.com',
      number_of_organizations: 3,
      number_of_projects: 10,
      authentication_method: 'GitHub',
      role: 'viewer',
    },
    {
      id: 21,
      name: 'Umar Ahmed',
      email: 'umar.ahmed@example.com',
      number_of_organizations: 2,
      number_of_projects: 5,
      authentication_method: 'SAML',
      role: 'admin',
    },
    {
      id: 22,
      name: 'Victoria Wong',
      email: 'victoria.wong@example.com',
      number_of_organizations: 4,
      number_of_projects: 13,
      authentication_method: 'email',
      role: 'owner',
    },
    {
      id: 23,
      name: 'William Turner',
      email: 'william.turner@example.com',
      number_of_organizations: 1,
      number_of_projects: 3,
      authentication_method: 'GitHub',
      role: 'viewer',
    },
    {
      id: 24,
      name: 'Xiao Li',
      email: 'xiao.li@example.com',
      number_of_organizations: 3,
      number_of_projects: 8,
      authentication_method: 'SAML',
      role: 'admin',
    },
    {
      id: 25,
      name: 'Yara Hassan',
      email: 'yara.hassan@example.com',
      number_of_organizations: 2,
      number_of_projects: 6,
      authentication_method: 'email',
      role: 'viewer',
    },
    {
      id: 26,
      name: 'Zack Morris',
      email: 'zack.morris@example.com',
      number_of_organizations: 5,
      number_of_projects: 17,
      authentication_method: 'GitHub',
      role: 'owner',
    },
    {
      id: 27,
      name: 'Anna Kovacs',
      email: 'anna.kovacs@example.com',
      number_of_organizations: 1,
      number_of_projects: 4,
      authentication_method: 'SAML',
      role: 'admin',
    },
    {
      id: 28,
      name: 'Ben Wright',
      email: 'ben.wright@example.com',
      number_of_organizations: 3,
      number_of_projects: 11,
      authentication_method: 'email',
      role: 'viewer',
    },
    {
      id: 29,
      name: 'Carla Sanchez',
      email: 'carla.sanchez@example.com',
      number_of_organizations: 2,
      number_of_projects: 7,
      authentication_method: 'GitHub',
      role: 'owner',
    },
    {
      id: 30,
      name: 'Derek Zhang',
      email: 'derek.zhang@example.com',
      number_of_organizations: 4,
      number_of_projects: 14,
      authentication_method: 'SAML',
      role: 'admin',
    },
    {
      id: 31,
      name: 'Emma Watson',
      email: 'emma.watson@example.com',
      number_of_organizations: 1,
      number_of_projects: 2,
      authentication_method: 'email',
      role: 'viewer',
    },
    {
      id: 32,
      name: 'Faisal Qureshi',
      email: 'faisal.qureshi@example.com',
      number_of_organizations: 3,
      number_of_projects: 9,
      authentication_method: 'GitHub',
      role: 'admin',
    },
    {
      id: 33,
      name: 'Gina Romano',
      email: 'gina.romano@example.com',
      number_of_organizations: 2,
      number_of_projects: 5,
      authentication_method: 'SAML',
      role: 'owner',
    },
    {
      id: 34,
      name: 'Hassan Ali',
      email: 'hassan.ali@example.com',
      number_of_organizations: 5,
      number_of_projects: 16,
      authentication_method: 'email',
      role: 'viewer',
    },
    {
      id: 35,
      name: 'Isabella Rossi',
      email: 'isabella.rossi@example.com',
      number_of_organizations: 1,
      number_of_projects: 3,
      authentication_method: 'GitHub',
      role: 'admin',
    },
    {
      id: 36,
      name: 'Jamal Wilson',
      email: 'jamal.wilson@example.com',
      number_of_organizations: 4,
      number_of_projects: 12,
      authentication_method: 'SAML',
      role: 'owner',
    },
    {
      id: 37,
      name: 'Katrina Yao',
      email: 'katrina.yao@example.com',
      number_of_organizations: 2,
      number_of_projects: 6,
      authentication_method: 'email',
      role: 'viewer',
    },
    {
      id: 38,
      name: 'Leo Nakamura',
      email: 'leo.nakamura@example.com',
      number_of_organizations: 3,
      number_of_projects: 10,
      authentication_method: 'GitHub',
      role: 'admin',
    },
    {
      id: 39,
      name: 'Maria Silva',
      email: 'maria.silva@example.com',
      number_of_organizations: 1,
      number_of_projects: 4,
      authentication_method: 'SAML',
      role: 'viewer',
    },
    {
      id: 40,
      name: 'Nate Robinson',
      email: 'nate.robinson@example.com',
      number_of_organizations: 5,
      number_of_projects: 15,
      authentication_method: 'email',
      role: 'owner',
    },
    {
      id: 41,
      name: 'Olga Petrov',
      email: 'olga.petrov@example.com',
      number_of_organizations: 2,
      number_of_projects: 7,
      authentication_method: 'GitHub',
      role: 'admin',
    },
    {
      id: 42,
      name: "Patrick O'Brien",
      email: 'patrick.obrien@example.com',
      number_of_organizations: 3,
      number_of_projects: 11,
      authentication_method: 'SAML',
      role: 'viewer',
    },
    {
      id: 43,
      name: 'Qing Zhao',
      email: 'qing.zhao@example.com',
      number_of_organizations: 1,
      number_of_projects: 2,
      authentication_method: 'email',
      role: 'admin',
    },
    {
      id: 44,
      name: 'Rosa Morales',
      email: 'rosa.morales@example.com',
      number_of_organizations: 4,
      number_of_projects: 13,
      authentication_method: 'GitHub',
      role: 'owner',
    },
    {
      id: 45,
      name: 'Sanjay Patel',
      email: 'sanjay.patel@example.com',
      number_of_organizations: 2,
      number_of_projects: 5,
      authentication_method: 'SAML',
      role: 'viewer',
    },
    {
      id: 46,
      name: 'Tina Chen',
      email: 'tina.chen@example.com',
      number_of_organizations: 3,
      number_of_projects: 9,
      authentication_method: 'email',
      role: 'admin',
    },
    {
      id: 47,
      name: 'Ulrich Weber',
      email: 'ulrich.weber@example.com',
      number_of_organizations: 1,
      number_of_projects: 3,
      authentication_method: 'GitHub',
      role: 'viewer',
    },
    {
      id: 48,
      name: 'Vanessa Torres',
      email: 'vanessa.torres@example.com',
      number_of_organizations: 5,
      number_of_projects: 17,
      authentication_method: 'SAML',
      role: 'owner',
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
  activateFlyout(flyout) {
    this[flyout] = true;
  }

  @action
  deactivateFlyout(flyout) {
    this[flyout] = false;
  }

  @action
  toggleState() {
    this.state = this.state === 'open' ? 'close' : 'open';
  }
}
