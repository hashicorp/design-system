import Component from '@glimmer/component';

export default class LocalComponent extends Component {
  SUPER_SELECT_OPTIONS = [
    'Boundary',
    'Consul',
    'Packer',
    'Terraform',
    'Vault',
    'Waypoint',
  ];

  SELECTED_SERVICE = null;
}
