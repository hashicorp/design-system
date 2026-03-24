import Component from '@glimmer/component';

import { HdsTabs } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  logClickedTab = (event: Event, index: number) => {
    const tabId = (event.target as HTMLElement).id;
    console.log(`Tab with ID "${tabId}" and index "${index}" clicked!`);
  };

  <template>
    <HdsTabs @onClickTab={{this.logClickedTab}} as |T|>
      <T.Tab>One</T.Tab>
      <T.Tab>Two</T.Tab>
      <T.Tab>Three</T.Tab>

      <T.Panel>Content one</T.Panel>
      <T.Panel>Content two</T.Panel>
      <T.Panel>Content three</T.Panel>
    </HdsTabs>
  </template>
}
