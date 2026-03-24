import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsTabs } from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsTabs as |T|>
    <T.Tab>🐤 Birds</T.Tab>
    <T.Tab>🐠 Fishes</T.Tab>
    <T.Tab>🐙 Cephalopods</T.Tab>
    <T.Panel as |P|>
      <HdsTabs @isParentVisible={{P.isVisible}} as |NT|>
        <NT.Tab>🦜 Parrots</NT.Tab>
        <NT.Tab>🦅 Eagles</NT.Tab>
        <NT.Tab>🦉 Owls</NT.Tab>
        <NT.Panel>
          <DocPlaceholder @text="🦜 Content for Parrots" @height="50" />
        </NT.Panel>
        <NT.Panel>
          <DocPlaceholder @text="🦅 Content for Eagles" @height="50" />
        </NT.Panel>
        <NT.Panel>
          <DocPlaceholder @text="🦉 Content for Owls" @height="50" />
        </NT.Panel>
      </HdsTabs>
    </T.Panel>
    <T.Panel as |P|>
      <HdsTabs @isParentVisible={{P.isVisible}} as |NT|>
        <NT.Tab>🐬 Dolphins</NT.Tab>
        <NT.Tab>🦈 Sharks</NT.Tab>
        <NT.Panel>
          <DocPlaceholder @text="🐬 Content for Dolphins" @height="50" />
        </NT.Panel>
        <NT.Panel>
          <DocPlaceholder @text="🦈 Content for Sharks" @height="50" />
        </NT.Panel>
      </HdsTabs>
    </T.Panel>
    <T.Panel>
      <DocPlaceholder @text="🐙 Content for Cephalopods" @height="50" />
    </T.Panel>
  </HdsTabs>
</template>;

export default LocalComponent;
