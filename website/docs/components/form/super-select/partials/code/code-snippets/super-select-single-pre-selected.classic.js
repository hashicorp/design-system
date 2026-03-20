import Component from '@glimmer/component';

export default class LocalComponent extends Component {
  OPTIONS = [
    'Oregon (us-west-2)',
    'N. Virginia (us-east-1)',
    'Ireland (eu-west-1)',
    'London (eu-west-2)',
    'Frankfurt (eu-central-1)',
  ];

  SELECTED_OPTION = this.OPTIONS[1];
}
