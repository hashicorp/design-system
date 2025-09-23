import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwGrid from 'showcase/components/shw/grid';
import ShwDivider from 'showcase/components/shw/divider';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import CodeFragmentWithAreaBlocks from '../code-fragments/with-area-blocks';

const SubSectionContainers: TemplateOnlyComponent = <template>
  <ShwTextH2>Containers</ShwTextH2>

  <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
    <SG.Item @label="With header/sidebar/main/footer">
      <CodeFragmentWithAreaBlocks />
    </SG.Item>
    <SG.Item @label="Without header">
      <CodeFragmentWithAreaBlocks @hasHeader={{false}} />
    </SG.Item>
    <SG.Item @label="Without sidebar">
      <CodeFragmentWithAreaBlocks @hasSidebar={{false}} />
    </SG.Item>
    <SG.Item @label="Without footer">
      <CodeFragmentWithAreaBlocks @hasFooter={{false}} />
    </SG.Item>
    <SG.Item @label="With modal container (empty)">
      <CodeFragmentWithAreaBlocks @hasModal={{true}} />
    </SG.Item>
    <SG.Item @label="With modal container (with content)">
      <CodeFragmentWithAreaBlocks @hasModal={{true}}>
        <:modal>
          <div class="shw-layout-app-frame-fake-overlay" />
          <div class="shw-layout-app-frame-fake-modal">
            <ShwPlaceholder
              @width="100%"
              @height="100%"
              @text="modal"
              @background="#ffffffb5"
            />
          </div>
        </:modal>
      </CodeFragmentWithAreaBlocks>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionContainers;
