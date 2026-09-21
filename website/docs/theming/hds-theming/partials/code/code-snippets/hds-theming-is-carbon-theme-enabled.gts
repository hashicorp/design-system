import Component from '@glimmer/component';
import { service } from '@ember/service';
import type HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';

export default class LocalComponent extends Component {
  @service declare readonly hdsTheming: HdsThemingService;

  <template>
    {{#if this.hdsTheming.isCarbonThemeEnabled}}
      <p>The carbonized HDS visual language is active.</p>
    {{else}}
      <p>The classic HDS visual language is active.</p>
    {{/if}}
  </template>
}
