import Component from '@glimmer/component';

export default class ColorSwatch extends Component {
  get colorValues() {
    return [
      {
        title: 'CSS Variable',
        value: '--token-color-palette-blue-200',
      },
      {
        title: 'CSS Helper',
        value: '.hds-palette-blue-200',
      },
      {
        title: 'HEX',
        value: '#1C345F',
      },
    ];
  }
}
