/**
 * Minimal application template for bundle benchmarking
 */
import Component from '@glimmer/component';
import { pageTitle } from 'ember-page-title';
import { inject as service } from '@ember/service';
import type RouterService from '@ember/routing/router-service';

export default class Application extends Component {
  @service declare readonly router: RouterService;

  get isFrameless() {
    return this.router?.currentURL?.includes('frameless') ?? false;
  }

  <template>
    {{pageTitle "Showcase - Benchmark"}}

    {{#if this.isFrameless}}
      {{outlet}}
    {{else}}
      <main class="shw-main">
        {{outlet}}
      </main>
    {{/if}}
  </template>
}
