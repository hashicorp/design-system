import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';

import { HdsBreadcrumb, HdsBreadcrumbItem, HdsBreadcrumbTruncation } from '@hashicorp/design-system-components/components';

const SubSectionVariants: TemplateOnlyComponent = <template>
  <ShwTextH2>Variants</ShwTextH2>

  <ShwFlex @label="Text only" as |SF|>
    <SF.Item>
      <HdsBreadcrumb aria-label="text-only breadcrumb example">
        <HdsBreadcrumbItem @text="Level one" />
        <HdsBreadcrumbItem @text="Level two" />
        <HdsBreadcrumbItem @text="Level three" />
        <HdsBreadcrumbItem @text="Level four" />
        <HdsBreadcrumbItem @text="Level five" />
        <HdsBreadcrumbItem @text="Current" @current={{true}} />
      </HdsBreadcrumb>
    </SF.Item>
  </ShwFlex>

  <ShwFlex @label="With icons" as |SF|>
    <SF.Item>
      <HdsBreadcrumb aria-label="breadcrumb with icons example">
        <HdsBreadcrumbItem @text="Level one" @icon="org" />
        <HdsBreadcrumbItem @text="Level two" @icon="folder" />
        <HdsBreadcrumbItem @text="Level three" />
        <HdsBreadcrumbItem @text="Level four" />
        <HdsBreadcrumbItem @text="Level five" />
        <HdsBreadcrumbItem @text="Current" @current={{true}} />
      </HdsBreadcrumb>
    </SF.Item>
  </ShwFlex>

  <ShwFlex @label="With truncation" as |SF|>
    <SF.Item>
      <HdsBreadcrumb aria-label="breadcrumb with truncation example">
        <HdsBreadcrumbItem @text="Level one" />
        <HdsBreadcrumbItem @text="Level two" />
        <HdsBreadcrumbTruncation>
          <HdsBreadcrumbItem @text="Sub-level one" />
          <HdsBreadcrumbItem @text="Sub-level two with a very long string that we may want to trim somehow" />
          <HdsBreadcrumbItem @text="Sub-level with icon" @icon="org" />
          <HdsBreadcrumbItem @text="Another sub-level with icon" @icon="folder" />
        </HdsBreadcrumbTruncation>
        <HdsBreadcrumbItem @text="Level four" />
        <HdsBreadcrumbItem @text="Level five" />
        <HdsBreadcrumbItem @text="Current" @current={{true}} />
      </HdsBreadcrumb>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionVariants;

