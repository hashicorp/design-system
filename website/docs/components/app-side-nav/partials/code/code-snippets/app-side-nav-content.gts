import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsAppSideNav,
  HdsAppSideNavList,
} from '@hashicorp/design-system-components/components';
import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsAppSideNav>
    <HdsAppSideNavList as |SNL|>
      <SNL.BackLink @text="A “back” link" @href="#" />
      <SNL.Title>A section title</SNL.Title>
      <SNL.Link @text="A link with just text" @href="#" />
      <SNL.Link @text="A link with an icon" @icon="network" @href="#" />
      <SNL.Link @text="With a “count”" @icon="users" @count="12" @href="#" />
      <SNL.Link
        @text="With a “badge” "
        @icon="credit-card"
        @badge="Beta"
        @href="#"
      />
      <SNL.Link
        @text="With “sub items” indicator"
        @icon="settings"
        @hasSubItems={{true}}
      />
      <SNL.Link
        @href="#"
        @isHrefExternal={{true}}
        @icon="guide"
        @text="As an “external” link"
      />
      <SNL.Link @icon="hexagon" @href="#">
        <DocPlaceholder
          @height="20px"
          @text="With generic yielded content"
          @background="#e4e4e4"
        />
      </SNL.Link>
      <SNL.Item>
        <DocPlaceholder
          @height="20px"
          @text="Generic yielded content"
          @background="#e4e4e4"
        />
      </SNL.Item>
    </HdsAppSideNavList>
  </HdsAppSideNav>
</template>;

export default LocalComponent;
