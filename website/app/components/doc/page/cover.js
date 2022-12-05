import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class DocPageCoverComponent extends Component {
  @service('dynamic-sections') dynamicSections;
}
