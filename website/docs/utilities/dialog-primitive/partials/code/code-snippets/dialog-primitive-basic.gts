import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsDialogPrimitiveWrapper,
  HdsDialogPrimitiveHeader,
  HdsDialogPrimitiveDescription,
  HdsDialogPrimitiveBody,
  HdsDialogPrimitiveFooter,
  HdsButtonSet,
  HdsButton,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsDialogPrimitiveWrapper>
    <:header>
      <HdsDialogPrimitiveHeader @icon="info" @tagline="Tagline">
        Title
      </HdsDialogPrimitiveHeader>
      <HdsDialogPrimitiveDescription>
        Description
      </HdsDialogPrimitiveDescription>
    </:header>
    <:body>
      <HdsDialogPrimitiveBody>
        <p class="hds-typography-body-300 hds-foreground-primary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero culpa
          expedita assumenda at nisi minus unde fuga iure suscipit aut qui, odit
          natus eum voluptates ut molestiae! Perferendis, impedit qui? Lorem
          ipsum dolor sit amet?
        </p>
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
</template>;

export default LocalComponent;
