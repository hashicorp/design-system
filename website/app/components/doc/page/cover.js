import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class DocPageCoverComponent extends Component {
  @service('dynamic-sections') dynamicSections;

  get tabs() {
    console.log('this', this);
    console.log('this.dynamicSections', this.dynamicSections);
    console.log('this.dynamicSections.sections', this.dynamicSections.sections);
    return ['aaa', 'bbb'];
  }
}
