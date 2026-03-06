import Component from '@glimmer/component';

export default class LocalComponent extends Component {
  get SAMPLE_ERROR_MESSAGES() {
    return ['First error message', 'Second error message'];
  }
}
