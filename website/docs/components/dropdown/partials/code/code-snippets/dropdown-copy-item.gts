import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsDropdown } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsDropdown as |D|>
    <D.ToggleButton @text="Create run task" @color="secondary" />
    <D.Title @text="Integrate with Terraform Cloud" />
    <D.Description
      @text="Create a new run task in Terraform using the URL and key below."
    />
    <D.CopyItem
      @text="https://api.cloud.hashicorp.com"
      @copyItemTitle="Endpoint URL"
    />
    <D.CopyItem
      @text="91ee1e8ef65b337f0e70d793f456c71d91ee1e8ef65b337f0e70d793f456c71d"
      @copyItemTitle="HMAC Key"
    />
    <D.CopyItem
      @isTruncated={{false}}
      @text="91ee1e8ef65b337f0e70d793f456c71d91ee1e8ef65b337f0e70d793f456c71d"
      @copyItemTitle="HMAC Key (without truncation)"
    />
  </HdsDropdown>
</template>;

export default LocalComponent;
