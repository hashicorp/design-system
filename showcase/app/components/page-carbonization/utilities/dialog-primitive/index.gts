import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsButton,
  HdsButtonSet,
  HdsDialogPrimitiveBody,
  HdsDialogPrimitiveDescription,
  HdsDialogPrimitiveFooter,
  HdsDialogPrimitiveHeader,
  HdsDialogPrimitiveWrapper,
  HdsDialogPrimitiveOverlay,
} from '@hashicorp/design-system-components/components';

const DialogPrimitiveCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "DialogPrimitive - Carbonization"}}

  <ShwTextH1>DialogPrimitive - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>DialogPrimitiveWrapper</ShwTextH2>

    <ShwCarbonizationComparisonGrid
      @label="Header + Description + Body + Footer"
    >
      <:theming>
        <div class="shw-utility-dialog-primitive-base-container">
          <HdsDialogPrimitiveWrapper open>
            <:header>
              <HdsDialogPrimitiveHeader
                @icon="info"
                @tagline="Tagline"
              >Title</HdsDialogPrimitiveHeader>
              <HdsDialogPrimitiveDescription
              >Description</HdsDialogPrimitiveDescription>
            </:header>
            <:body>
              <HdsDialogPrimitiveBody>
                <p class="hds-typography-body-300 hds-foreground-primary">Lorem
                  ipsum dolor sit amet consectetur adipisicing elit.</p>
              </HdsDialogPrimitiveBody>
            </:body>
            <:footer>
              <HdsDialogPrimitiveFooter>
                <HdsButtonSet>
                  <HdsButton type="submit" @text="Primary" />
                  <HdsButton
                    type="button"
                    @text="Secondary"
                    @color="secondary"
                  />
                </HdsButtonSet>
              </HdsDialogPrimitiveFooter>
            </:footer>
          </HdsDialogPrimitiveWrapper>
        </div>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>DialogPrimitiveHeader</ShwTextH2>

    <ShwCarbonizationComparisonGrid @label="title only">
      <:theming>
        <div class="hds-dialog-primitive__wrapper-header">
          <HdsDialogPrimitiveHeader>
            Title
          </HdsDialogPrimitiveHeader>
        </div>
      </:theming>
      <:reference>
        <div class="shw-utility-dialog-primitive-mock-cds-modal-parent-grid">
          <cds-modal-header close-button="">
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-label>Tagline</cds-modal-label>
            <cds-modal-heading>Title</cds-modal-heading>
          </cds-modal-header>
        </div>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="with tagline">
      <:theming>
        <div class="hds-dialog-primitive__wrapper-header">
          <HdsDialogPrimitiveHeader @tagline="Tagline">
            Title
          </HdsDialogPrimitiveHeader>
        </div>
      </:theming>
      <:reference>
        <div class="shw-utility-dialog-primitive-mock-cds-modal-parent-grid">
          <cds-modal-header close-button="">
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-label>Tagline</cds-modal-label>
            <cds-modal-heading>Title</cds-modal-heading>
          </cds-modal-header>
        </div>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="with icon">
      <:theming>
        <div class="hds-dialog-primitive__wrapper-header">
          <HdsDialogPrimitiveHeader @icon="info">
            Title
          </HdsDialogPrimitiveHeader>
        </div>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="with tagline and icon">
      <:theming>
        <div class="hds-dialog-primitive__wrapper-header">
          <HdsDialogPrimitiveHeader @icon="info" @tagline="Tagline">
            Title
          </HdsDialogPrimitiveHeader>
        </div>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>DialogPrimitiveDescription</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <div class="hds-dialog-primitive__wrapper-header">
          <HdsDialogPrimitiveDescription>
            Lorem ipsum dolor
          </HdsDialogPrimitiveDescription>
        </div>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>DialogPrimitiveBody</ShwTextH2>

    <ShwCarbonizationComparisonGrid @label="With basic style">
      <:theming>
        <div class="hds-dialog-primitive__wrapper-body">
          <HdsDialogPrimitiveBody>
            <p class="hds-typography-body-300 hds-foreground-primary">Lorem
              ipsum dolor sit amet consectetur adipisicing elit.</p>
          </HdsDialogPrimitiveBody>
        </div>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>DialogPrimitiveFooter</ShwTextH2>

    <ShwCarbonizationComparisonGrid @label="One action">
      <:theming>
        <div class="hds-dialog-primitive__wrapper-footer">
          <HdsDialogPrimitiveFooter>
            <HdsButton type="submit" @text="Primary" />
          </HdsDialogPrimitiveFooter>
        </div>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="Two actions">
      <:theming>
        <div class="hds-dialog-primitive__wrapper-footer">
          <HdsDialogPrimitiveFooter>
            <HdsButtonSet>
              <HdsButton type="submit" @text="Primary" />
              <HdsButton type="button" @text="Secondary" @color="secondary" />
            </HdsButtonSet>
          </HdsDialogPrimitiveFooter>
        </div>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="Three actions">
      <:theming>
        <div class="hds-dialog-primitive__wrapper-footer">
          <HdsDialogPrimitiveFooter>
            <HdsButtonSet>
              <HdsButton type="submit" @text="Primary" />
              <HdsButton type="button" @text="Secondary" @color="secondary" />
              <HdsButton
                type="button"
                @text="Tertiary"
                @color="tertiary"
                @icon="arrow-right"
                @iconPosition="trailing"
              />
            </HdsButtonSet>
          </HdsDialogPrimitiveFooter>
        </div>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>DialogPrimitiveOverlay</ShwTextH2>

    <ShwCarbonizationComparisonGrid @label="Overlay element">
      <:theming>
        <div class="shw-utility-dialog-primitive-overlay-container">
          <HdsDialogPrimitiveOverlay />
        </div>
      </:theming>
    </ShwCarbonizationComparisonGrid>

  </section>
</template>;

export default DialogPrimitiveCarbonizationIndex;
