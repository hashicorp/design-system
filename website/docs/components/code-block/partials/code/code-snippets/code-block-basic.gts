import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsCodeBlock } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsCodeBlock
    @ariaLabel="basic usage"
    @value="aws ec2 --region us-west-1 accept-vpc-peering-connection"
  />
</template>;

export default LocalComponent;
