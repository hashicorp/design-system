import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import {
  HdsLayoutGrid,
  HdsCardContainer,
  HdsBadge,
  HdsTextDisplay,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

import { hash } from '@ember/helper';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutGrid @columnWidth={{hash sm="100%" md="33.33%"}} @gap="24" as |LG|>
    <LG.Item @colspan={{hash sm=1 md=2}}>
      <HdsCardContainer
        @level="mid"
        @hasBorder={{true}}
        {{style padding="24px"}}
        {{style
          background="radial-gradient(151.34% 168.34% at 0 0,#f6f9ff 0,#ebf2ff 100%)"
        }}
      >
        <HdsLayoutGrid @columnWidth="100%" @gap="16" as |LG|>
          <LG.Item>
            <HdsBadge @text="In Preview" @type="outlined" @color="highlight" />
          </LG.Item>
          <HdsTextDisplay @tag="h2" @size="300" @weight="bold">Better together</HdsTextDisplay>

          <HdsTextBody @tag="p" @weight="semibold">
            HCP Terraform now works together with HCP Vault Secrets.
          </HdsTextBody>
          <HdsTextBody @tag="p">
            The combined solution enables your team to provision infrastructure
            with a scalable and least-privilege security approach for your
            secrets.
          </HdsTextBody>
        </HdsLayoutGrid>
      </HdsCardContainer>
    </LG.Item>

    <HdsCardContainer @level="mid" @hasBorder={{true}} {{style padding="24px"}}>
      <HdsTextDisplay @tag="h2" @size="300">content</HdsTextDisplay>
    </HdsCardContainer>

    <HdsCardContainer @level="mid" @hasBorder={{true}} {{style padding="24px"}}>
      <HdsTextDisplay @tag="h2" @size="300">content</HdsTextDisplay>
    </HdsCardContainer>

    <LG.Item @colspan={{hash sm=1 md=2}}>
      <HdsCardContainer
        @level="mid"
        @hasBorder={{true}}
        {{style padding="24px"}}
      >
        <HdsLayoutGrid @columnMinWidth="100%" @gap="16">
          <HdsTextDisplay @tag="h2" @size="300">HCP Terraform Provider Resources</HdsTextDisplay>
          <HdsLayoutGrid
            @columnMinWidth="50%"
            @gap="24"
            @tag="ul"
            class="doc-grid-plain-list"
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
</template>;

export default LocalComponent;
