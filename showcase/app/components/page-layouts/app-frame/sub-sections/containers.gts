import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwGrid from 'showcase/components/shw/grid';
import ShwDivider from 'showcase/components/shw/divider';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsAppFrame } from '@hashicorp/design-system-components/components';

const SubSectionContainers: TemplateOnlyComponent = <template>
  <ShwTextH2>Containers</ShwTextH2>

  <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
    <SG.Item @label="With header/sidebar/main/footer">
      <div class="shw-layout-app-frame-wrapper">
        <HdsAppFrame as |Frame|>
          <Frame.Header>
            <ShwPlaceholder
              @height="60px"
              @text="header"
              @background="#e5ffd2"
            />
          </Frame.Header>
          <Frame.Sidebar>
            <ShwPlaceholder
              @width="120px"
              @height="100%"
              @text="sidebar"
              @background="#e4c5f3"
            />
          </Frame.Sidebar>
          <Frame.Main>
            <ShwPlaceholder @height="100%" @text="main" @background="#d2f4ff" />
          </Frame.Main>
          <Frame.Footer>
            <ShwPlaceholder
              @height="60px"
              @text="footer"
              @background="#fff8d2"
            />
          </Frame.Footer>
        </HdsAppFrame>
      </div>
    </SG.Item>
    <SG.Item @label="Without header">
      <div class="shw-layout-app-frame-wrapper">
        <HdsAppFrame as |Frame|>
          <Frame.Sidebar>
            <ShwPlaceholder
              @width="120px"
              @height="100%"
              @text="sidebar"
              @background="#e4c5f3"
            />
          </Frame.Sidebar>
          <Frame.Main>
            <ShwPlaceholder @height="100%" @text="main" @background="#d2f4ff" />
          </Frame.Main>
          <Frame.Footer>
            <ShwPlaceholder
              @height="60px"
              @text="footer"
              @background="#fff8d2"
            />
          </Frame.Footer>
        </HdsAppFrame>
      </div>
    </SG.Item>
    <SG.Item @label="Without sidebar">
      <div class="shw-layout-app-frame-wrapper">
        <HdsAppFrame as |Frame|>
          <Frame.Header>
            <ShwPlaceholder
              @height="60px"
              @text="header"
              @background="#e5ffd2"
            />
          </Frame.Header>
          <Frame.Main>
            <ShwPlaceholder @height="100%" @text="main" @background="#d2f4ff" />
          </Frame.Main>
          <Frame.Footer>
            <ShwPlaceholder
              @height="60px"
              @text="footer"
              @background="#fff8d2"
            />
          </Frame.Footer>
        </HdsAppFrame>
      </div>
    </SG.Item>
    <SG.Item @label="Without footer">
      <div class="shw-layout-app-frame-wrapper">
        <HdsAppFrame as |Frame|>
          <Frame.Header>
            <ShwPlaceholder
              @height="60px"
              @text="header"
              @background="#e5ffd2"
            />
          </Frame.Header>
          <Frame.Sidebar>
            <ShwPlaceholder
              @width="120px"
              @height="100%"
              @text="sidebar"
              @background="#e4c5f3"
            />
          </Frame.Sidebar>
          <Frame.Main>
            <ShwPlaceholder @height="100%" @text="main" @background="#d2f4ff" />
          </Frame.Main>
        </HdsAppFrame>
      </div>
    </SG.Item>
    <SG.Item @label="With modal container (empty)">
      <div class="shw-layout-app-frame-wrapper">
        <HdsAppFrame as |Frame|>
          <Frame.Header>
            <ShwPlaceholder
              @height="60px"
              @text="header"
              @background="#e5ffd2"
            />
          </Frame.Header>
          <Frame.Sidebar>
            <ShwPlaceholder
              @width="120px"
              @height="100%"
              @text="sidebar"
              @background="#e4c5f3"
            />
          </Frame.Sidebar>
          <Frame.Main>
            <ShwPlaceholder @height="100%" @text="main" @background="#d2f4ff" />
          </Frame.Main>
          <Frame.Footer>
            <ShwPlaceholder
              @height="60px"
              @text="footer"
              @background="#fff8d2"
            />
          </Frame.Footer>
          <Frame.Modals />
        </HdsAppFrame>
      </div>
    </SG.Item>
    <SG.Item @label="With modal container (with content)">
      <div class="shw-layout-app-frame-wrapper">
        <HdsAppFrame as |Frame|>
          <Frame.Header>
            <ShwPlaceholder
              @height="60px"
              @text="header"
              @background="#e5ffd2"
            />
          </Frame.Header>
          <Frame.Sidebar>
            <ShwPlaceholder
              @width="120px"
              @height="100%"
              @text="sidebar"
              @background="#e4c5f3"
            />
          </Frame.Sidebar>
          <Frame.Main>
            <ShwPlaceholder @height="100%" @text="main" @background="#d2f4ff" />
          </Frame.Main>
          <Frame.Footer>
            <ShwPlaceholder
              @height="60px"
              @text="footer"
              @background="#fff8d2"
            />
          </Frame.Footer>
          <Frame.Modals>
            <div class="shw-layout-app-frame-fake-overlay" />
            <div class="shw-layout-app-frame-fake-modal">
              <ShwPlaceholder
                @width="100%"
                @height="100%"
                @text="modal"
                @background="#ffffffb5"
              />
            </div>
          </Frame.Modals>
        </HdsAppFrame>
      </div>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionContainers;
