import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class DocColorSwatchComponent extends Component {
  colors = [
    {
      type: 'blue',
      name: 'palette-blue-100',
      'css-variable': '--token-color-palette-blue-100',
      'css-helper': 'hds-palette-blue-100',
      'css-hex': '#cce3fe',
    },
    {
      type: 'blue',
      name: 'palette-blue-200',
      'css-variable': '--token-color-palette-blue-200',
      'css-helper': 'hds-palette-blue-200',
      'css-hex': '#1060ff',
    },
  ];

  @action
  copyToClipboard() {
    let consoleLog = 'Clicked!';
    console.log(consoleLog);
  }
}
