import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import style from 'ember-style-modifier';
import { tracked } from '@glimmer/tracking';

import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwGrid from 'showcase/components/shw/grid';
import ShwDivider from 'showcase/components/shw/divider';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsAppFrame } from '@hashicorp/design-system-components/components';

export default class SubSectionSubSection3dVisualization extends Component {
  @tracked show3DVisualization: boolean = false;

  toggle3DVisualization = () => {
    this.show3DVisualization = !this.show3DVisualization;
  };

  <template>
    <ShwTextH3>3d Visualization</ShwTextH3>

    <button
      type="button"
      {{on "click" this.toggle3DVisualization}}
      {{style margin-bottom="20px"}}
    >
      {{if this.show3DVisualization "Hide" "Show"}}
    </button>

    <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
      <SG.Item>
        <div
          class="shw-layout-app-frame-wrapper shw-layout-app-frame-wrapper--with-3d
            {{if this.show3DVisualization 'shw-is-3d' 'shw-is-flat'}}"
        >
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
              <ShwPlaceholder
                @height="100%"
                @text="main"
                @background="#d2f4ff"
              />
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
  </template>
}
