import type { TemplateOnlyComponent } from '@ember/component/template-only';

import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwGrid from 'showcase/components/shw/grid';

import {
  HdsBadge,
  HdsCardContainer,
  HdsIconTile,
  HdsLayoutFlex,
  HdsLayoutGrid,
  HdsLinkStandalone,
  HdsTextBody,
  HdsTextDisplay,
} from '@hashicorp/design-system-components/components';
import { HdsCardLevelValues } from '@hashicorp/design-system-components/components/hds/card/types';

const SubSectionExamples: TemplateOnlyComponent = <template>
  <ShwTextH2>Examples</ShwTextH2>

  <ShwGrid @columns={{1}} @gap="2rem" as |SG|>
    <SG.Item @label="3 column layout Card layout using columnWidth=33.33%">
      <HdsLayoutGrid @columnWidth="33.33%" @gap="32">
        <HdsCardContainer
          @level={{HdsCardLevelValues.Mid}}
          @hasBorder={{true}}
          {{style padding="24px"}}
        >
          <HdsLayoutGrid @columnWidth="100%" @gap="16">
            <HdsLayoutFlex @align="center" @gap="8">
              <HdsIconTile @icon="cloud" @size="small" />
              <HdsTextDisplay @tag="h2" @size="300">
                Active resources
              </HdsTextDisplay>
            </HdsLayoutFlex>
            <HdsLayoutGrid @columnWidth="100%" @gap="8" as |LG|>
              <LG.Item>
                <HdsBadge
                  @text="5 active resources"
                  @color="success"
                  @icon="check-circle"
                  @size="medium"
                />
              </LG.Item>

              <HdsTextBody @tag="p">
                There are 5 active resources inside this project.
              </HdsTextBody>
            </HdsLayoutGrid>

            <HdsLinkStandalone
              @icon="arrow-right"
              @iconPosition="trailing"
              @text="View active resources"
              @href="#"
            />
          </HdsLayoutGrid>
        </HdsCardContainer>

        <HdsCardContainer
          @level={{HdsCardLevelValues.Mid}}
          @hasBorder={{true}}
          {{style padding="24px"}}
        >
          <HdsTextDisplay @tag="h2" @size="300">Card #2</HdsTextDisplay>
        </HdsCardContainer>

        <HdsCardContainer
          @level={{HdsCardLevelValues.Mid}}
          @hasBorder={{true}}
          {{style padding="24px"}}
        >
          <HdsTextDisplay @tag="h2" @size="300">Card #3</HdsTextDisplay>
        </HdsCardContainer>
      </HdsLayoutGrid>
    </SG.Item>

    <SG.Item @label="More complex layout using colspan">
      <HdsLayoutGrid @columnMinWidth="33.33%" @gap="24" as |LG|>
        <LG.Item @colspan={{2}}>
          <HdsCardContainer
            @level={{HdsCardLevelValues.Mid}}
            @hasBorder={{true}}
            {{style padding="24px"}}
            {{style
              background="radial-gradient(151.34% 168.34% at 0 0,#f6f9ff 0,#ebf2ff 100%)"
            }}
          >
            <HdsLayoutGrid @columnMinWidth="100%" @gap="16">
              <div>
                <HdsBadge
                  @text="In Preview"
                  @type="outlined"
                  @color="highlight"
                />
                <HdsTextDisplay @tag="h2" @size="300" @weight="bold">Better
                  together</HdsTextDisplay>
              </div>
              <HdsTextBody @tag="p" @weight="semibold">
                HCP Terraform now works together with HCP Vault Secrets.
              </HdsTextBody>
              <HdsTextBody @tag="p">
                The combined solution enables your team to provision
                infrastructure with a scalable and least-privilege security
                approach for your secrets.
              </HdsTextBody>
            </HdsLayoutGrid>
          </HdsCardContainer>
        </LG.Item>

        <HdsCardContainer
          @level={{HdsCardLevelValues.Mid}}
          @hasBorder={{true}}
          {{style padding="24px"}}
        >
          <HdsTextDisplay @tag="h2" @size="300">content</HdsTextDisplay>
        </HdsCardContainer>

        <HdsCardContainer
          @level={{HdsCardLevelValues.Mid}}
          @hasBorder={{true}}
          {{style padding="24px"}}
        >
          <HdsTextDisplay @tag="h2" @size="300">content</HdsTextDisplay>
        </HdsCardContainer>

        <LG.Item @colspan={{2}}>
          <HdsCardContainer
            @level={{HdsCardLevelValues.Mid}}
            @hasBorder={{true}}
            {{style padding="24px"}}
          >
            <HdsLayoutGrid @columnMinWidth="100%" @gap="16">
              <HdsTextDisplay @tag="h2" @size="300">HCP Terraform Provider
                Resources</HdsTextDisplay>
              <HdsLayoutGrid
                @columnMinWidth="50%"
                @gap="24"
                @tag="ul"
                class="shw-layouts-grid-plain-list"
              >
                <HdsLayoutGrid @columnMinWidth="100%" @gap="8" @tag="li">
                  <HdsTextBody @tag="p" @weight="semibold">Deploy HCP Vault</HdsTextBody>
                  <HdsTextBody @tag="p">
                    Integrate HCP Vault into your environment faster.
                  </HdsTextBody>
                </HdsLayoutGrid>
                <HdsLayoutGrid @columnMinWidth="100%" @gap="8" @tag="li">
                  <HdsTextBody @tag="p" @weight="semibold">Deploy HCP Consul</HdsTextBody>
                  <HdsTextBody @tag="p">
                    Manage your provisions and snapshot.
                  </HdsTextBody>
                </HdsLayoutGrid>
              </HdsLayoutGrid>
            </HdsLayoutGrid>
          </HdsCardContainer>
        </LG.Item>
      </HdsLayoutGrid>
    </SG.Item>
  </ShwGrid>
</template>;

export default SubSectionExamples;
