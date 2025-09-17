import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';

import { HdsBreadcrumb, HdsBreadcrumbItem, HdsBreadcrumbTruncation } from '@hashicorp/design-system-components/components';

const SubSectionStates: TemplateOnlyComponent = <template>
  <ShwTextH2>States</ShwTextH2>

  <ShwFlex @label="Default" as |SF|>
    <SF.Item>
      <HdsBreadcrumb>
        <HdsBreadcrumbItem @text="Level one" @icon="org" />
        <HdsBreadcrumbItem @text="Level two" @icon="folder" />
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

  <ShwFlex @label="Hover" as |SF|>
    <SF.Item>
      <HdsBreadcrumb aria-label="breadcrumb in hover state example">
        <HdsBreadcrumbItem @text="Level one" @icon="org" mock-state-value="hover" mock-state-selector="a" />
        <HdsBreadcrumbItem @text="Level two" @icon="folder" mock-state-value="hover" mock-state-selector="a" />
        <HdsBreadcrumbTruncation mock-state-value="hover" mock-state-selector="button">
          <HdsBreadcrumbItem @text="Sub-level one" />
          <HdsBreadcrumbItem @text="Sub-level two with a very long string that we may want to trim somehow" />
          <HdsBreadcrumbItem @text="Sub-level with icon" @icon="org" />
          <HdsBreadcrumbItem @text="Another sub-level with icon" @icon="folder" />
        </HdsBreadcrumbTruncation>
        <HdsBreadcrumbItem @text="Level four" mock-state-value="hover" mock-state-selector="a" />
        <HdsBreadcrumbItem @text="Level five" mock-state-value="hover" mock-state-selector="a" />
        <HdsBreadcrumbItem @text="Current" @current={{true}} mock-state-value="hover" mock-state-selector="a" />
      </HdsBreadcrumb>
    </SF.Item>
  </ShwFlex>

  <ShwFlex @label="Active" as |SF|>
    <SF.Item>
      <HdsBreadcrumb aria-label="breadcrumb in active state example">
        <HdsBreadcrumbItem @text="Level one" @icon="org" mock-state-value="active" mock-state-selector="a" />
        <HdsBreadcrumbItem @text="Level two" @icon="folder" mock-state-value="active" mock-state-selector="a" />
        <HdsBreadcrumbTruncation mock-state-value="active" mock-state-selector="button">
          <HdsBreadcrumbItem @text="Sub-level one" />
          <HdsBreadcrumbItem @text="Sub-level two with a very long string that we may want to trim somehow" />
          <HdsBreadcrumbItem @text="Sub-level with icon" @icon="org" />
          <HdsBreadcrumbItem @text="Another sub-level with icon" @icon="folder" />
        </HdsBreadcrumbTruncation>
        <HdsBreadcrumbItem @text="Level four" mock-state-value="active" mock-state-selector="a" />
        <HdsBreadcrumbItem @text="Level five" mock-state-value="active" mock-state-selector="a" />
        <HdsBreadcrumbItem @text="Current" @current={{true}} mock-state-value="active" mock-state-selector="a" />
      </HdsBreadcrumb>
    </SF.Item>
  </ShwFlex>

  <ShwFlex @label="Focus" as |SF|>
    <SF.Item>
      <HdsBreadcrumb aria-label="breadcrumb in focus state example">
        <HdsBreadcrumbItem @text="Level one" @icon="org" mock-state-value="focus" mock-state-selector="a" />
        <HdsBreadcrumbItem @text="Level two" @icon="folder" mock-state-value="focus" mock-state-selector="a" />
        <HdsBreadcrumbTruncation mock-state-value="focus" mock-state-selector="button">
          <HdsBreadcrumbItem @text="Sub-level one" />
          <HdsBreadcrumbItem @text="Sub-level two with a very long string that we may want to trim somehow" />
          <HdsBreadcrumbItem @text="Sub-level with icon" @icon="org" />
          <HdsBreadcrumbItem @text="Another sub-level with icon" @icon="folder" />
        </HdsBreadcrumbTruncation>
        <HdsBreadcrumbItem @text="Level four" mock-state-value="focus" mock-state-selector="a" />
        <HdsBreadcrumbItem @text="Level five" mock-state-value="focus" mock-state-selector="a" />
        <HdsBreadcrumbItem @text="Current" @current={{true}} mock-state-value="focus" mock-state-selector="a" />
      </HdsBreadcrumb>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionStates;
