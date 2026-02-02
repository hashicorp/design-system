import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsApplicationState,
  HdsTextDisplay,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <div class="doc-application-state-demo-heading">
    <HdsTextDisplay @tag="h1" @size="500">Templates</HdsTextDisplay>
  </div>
  <HdsApplicationState as |A|>
    <A.Header @title="No templates have been created yet" @titleTag="h2" />
    <A.Body
      @text="Make a template to easily provision infrastructure for any Waypoint application. You’ll need a Terraform co-node module and instructions for your application developers."
    />
    <A.Footer as |F|>
      <F.Button @icon="plus" @text="Create a template" />
      <F.Button @icon="upload" @text="Import" @color="secondary" />
      <F.LinkStandalone
        @icon="docs-link"
        @text="Learn more"
        @href="/components/application-state"
        @iconPosition="trailing"
      />
    </A.Footer>
  </HdsApplicationState>
</template>;

export default LocalComponent;
