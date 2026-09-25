import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class LocalComponent extends Component {
  @service hdsTheming;
}
