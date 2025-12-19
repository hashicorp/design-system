import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsAccordion,
  HdsAlert,
  HdsButton,
  HdsLinkStandalone,
} from '@hashicorp/design-system-components/components';
import type { HdsAccordionSignature } from '@hashicorp/design-system-components/components/hds/accordion/index';

interface AccordionContainsInteractive2Signature {
  Element: HdsAccordionSignature['Element'];
}

const AccordionContainsInteractive2: TemplateOnlyComponent<AccordionContainsInteractive2Signature> =
  <template>
    <HdsAccordion ...attributes as |A|>
      <A.Item @containsInteractive={{true}}>
        <:toggle>
          <div class="doc-accordion-item-toggle-content-flex-layout">
            <HdsAlert @type="compact" @color="success" as |A|>
              <A.Title>Title</A.Title>
              <A.Description>Plan finished
                <small>22 days ago</small></A.Description>
            </HdsAlert>
            <HdsButton @text="Details" @color="secondary" @size="small" />
          </div>
        </:toggle>
        <:content>
          Additional content for item one
        </:content>
      </A.Item>
      <A.Item @containsInteractive={{true}}>
        <:toggle>
          <div class="doc-accordion-item-toggle-content-flex-layout">
            <span>Peering connection log results</span>
            <HdsLinkStandalone
              @icon="external-link"
              @iconPosition="trailing"
              @text="Details"
              @href="https://www.hashicorp.com/"
            />
          </div>
        </:toggle>
        <:content>
          Additional content for item two
        </:content>
      </A.Item>
    </HdsAccordion>
  </template>;

export default AccordionContainsInteractive2;
