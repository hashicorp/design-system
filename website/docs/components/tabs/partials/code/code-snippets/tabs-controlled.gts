import Component from '@glimmer/component';
import { service } from '@ember/service';

import type RouterService from '@ember/routing/router-service';

import { HdsTabs } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  @service declare readonly router: RouterService;

  private toPositiveInt(value: unknown, fallback: number): number {
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
  }

  get demoSelectedTab() {
    return this.toPositiveInt(
      this.router?.currentRoute?.queryParams?.['demoSelectedTab'],
      0,
    );
  }

  demoUpdateSelectedTabQueryParam = async (_event: Event, index: number) => {
    const routeQueryParams = this?.router?.currentRoute?.queryParams ?? {};
    const queryParams = Object.assign({}, routeQueryParams);
    if (index !== undefined) {
      // important: For this to work, the query param name must be added to the query param list in the controller:
      // see: https://github.com/hashicorp/design-system/blob/main/website/app/controllers/show.js#L42-L53
      queryParams['demoSelectedTab'] = index;
      // see: https://github.com/DockYard/ember-router-scroll#preservescrollposition-with-queryparams
      queryParams['preserveScrollPosition'] = true;

      // navigate to the new URL (notice: the anchor/fragment `#...` is not preserved unfortunately)
      await this.router.transitionTo({ queryParams });
    }
  };

  <template>
    <HdsTabs
      @selectedTabIndex={{this.demoSelectedTab}}
      @onClickTab={{this.demoUpdateSelectedTabQueryParam}}
      as |T|
    >
      <T.Tab>One</T.Tab>
      <T.Tab>Two</T.Tab>
      <T.Tab>Three</T.Tab>

      <T.Panel>Content 1</T.Panel>
      <T.Panel>Content 2</T.Panel>
      <T.Panel>Content 3</T.Panel>
    </HdsTabs>
  </template>
}
