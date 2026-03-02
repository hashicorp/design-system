import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsDialogPrimitiveWrapper,
  HdsDialogPrimitiveHeader,
  HdsDialogPrimitiveBody,
  HdsDialogPrimitiveFooter,
  HdsButtonSet,
  HdsButton,
  HdsTextDisplay,
} from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder/index.gts';

const LocalComponent: TemplateOnlyComponent = <template>
  <div class="doc-dialog-primitive-grid-layout">
    <div class="doc-dialog-primitive-flex-layout">
      <HdsTextDisplay @tag="h1" @size="500">
        Page title
      </HdsTextDisplay>
      <DocPlaceholder
        @text="Main content"
        @height="100%"
        @width="100%"
        @background="#eee"
      />
    </div>
    <HdsDialogPrimitiveWrapper class="doc-dialog-primitive-with-border">
      <:header>
        <HdsDialogPrimitiveHeader
          @icon="info"
          @tagline="Tagline"
          @titleTag="h2"
        >
          Split Window
        </HdsDialogPrimitiveHeader>
      </:header>
      <:body>
        <HdsDialogPrimitiveBody>
          <DocPlaceholder
            @text="Split Window content"
            @height="10rem"
            @width="100%"
            @background="#eee"
          />
        </HdsDialogPrimitiveBody>
      </:body>
      <:footer>
        <HdsDialogPrimitiveFooter>
          <HdsButtonSet>
            <HdsButton type="submit" @text="Primary" />
            <HdsButton type="button" @text="Secondary" @color="secondary" />
          </HdsButtonSet>
        </HdsDialogPrimitiveFooter>
      </:footer>
    </HdsDialogPrimitiveWrapper>
  </div>
</template>;

export default LocalComponent;
