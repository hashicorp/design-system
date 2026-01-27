import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsCodeBlock } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsCodeBlock
    @language="bash"
    @value="aws ec2 --region us-west-1 accept-vpc-peering-connection"
    as |CB|
  >
    <CB.Title>
      CodeBlock title
    </CB.Title>
    <CB.Description>
      CodeBlock description
    </CB.Description>
  </HdsCodeBlock>
</template>;

export default LocalComponent;
