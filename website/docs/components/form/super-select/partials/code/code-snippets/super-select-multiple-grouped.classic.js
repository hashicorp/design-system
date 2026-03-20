import Component from '@glimmer/component';

export default class LocalComponent extends Component {
  OPTIONS = [
    { groupName: 'Most common', options: ['Kubernetes', 'AWS'] },
    { groupName: 'Others', options: ['CloudWise', 'SWA', 'Other'] },
  ];

  SELECTED_OPTIONS = [
    this.OPTIONS[0].options[0],
    this.OPTIONS[1].options[0],
  ];
}
