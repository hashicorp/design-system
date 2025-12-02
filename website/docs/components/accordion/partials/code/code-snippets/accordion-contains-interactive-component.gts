import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsAccordion,
  HdsButton,
  HdsForm,
  HdsFormTextInputField,
} from '@hashicorp/design-system-components/components';
import type { HdsAccordionSignature } from '@hashicorp/design-system-components/components/hds/accordion/index';

interface AccordionContainsInteractiveSignature {
  Element: HdsAccordionSignature['Element'];
}

const AccordionContainsInteractive: TemplateOnlyComponent<AccordionContainsInteractiveSignature> =
  <template>
    <HdsAccordion ...attributes as |A|>
      <A.Item @containsInteractive={{true}} @isOpen={{true}}>
        <:toggle>
          <div class="hds-typography-body-300">
            Text inside a nested div with
            <a href="https://www.hashicorp.com/">a link</a>.
          </div>
        </:toggle>
        <:content>
          <HdsForm as |FORM|>
            <FORM.Section>
              <HdsFormTextInputField @type="email" as |F|>
                <F.Label>Email</F.Label>
              </HdsFormTextInputField>
            </FORM.Section>

            <FORM.Footer>
              <HdsButton @text="Submit" />
            </FORM.Footer>
          </HdsForm>
        </:content>
      </A.Item>
    </HdsAccordion>
  </template>;

export default AccordionContainsInteractive;
