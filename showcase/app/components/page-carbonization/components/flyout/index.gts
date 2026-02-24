import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
// import { capitalize } from '@ember/string';
// import { get } from '@ember/object';
// import { eq } from 'ember-truth-helpers';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsFlyout,
  HdsButton,
  HdsButtonSet,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const FlyoutCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Flyout - Carbonization"}}

  <ShwTextH1>Flyout - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>Content</ShwTextH2>

    <ShwTextH3>Header</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="Title with icon">
      <:theming>
        <HdsFlyout open id="flyout-example-icon" as |F|>
          <F.Header @icon="info">
            Title
          </F.Header>
          <F.Body>
            <p class="hds-typography-body-300 hds-foreground-primary">
              Flyout content
            </p>
          </F.Body>
        </HdsFlyout>
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Title with tagline">
      <:theming>
        <HdsFlyout open id="flyout-example-tagline" as |F|>
          <F.Header @tagline="Tagline">
            Title
          </F.Header>
          <F.Body>
            <p class="hds-typography-body-300 hds-foreground-primary">
              Flyout content
            </p>
          </F.Body>
        </HdsFlyout>
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Title with tagline and icon">
      <:theming>
        <HdsFlyout open id="flyout-example-tagline-icon" as |F|>
          <F.Header @tagline="Tagline" @icon="info">
            Title
          </F.Header>
          <F.Body>
            <p class="hds-typography-body-300 hds-foreground-primary">
              Flyout content
            </p>
          </F.Body>
        </HdsFlyout>
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Title with description">
      <:theming>
        <HdsFlyout open id="flyout-example-description" as |F|>
          <F.Header>
            Title
          </F.Header>
          <F.Description>
            Lorem ipsum dolor
          </F.Description>
          <F.Body>
            <p class="hds-typography-body-300 hds-foreground-primary">
              Flyout content
            </p>
          </F.Body>
        </HdsFlyout>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3 @tag="h2">Body</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="With basic style">
      <:theming>
        <HdsFlyout open id="flyout-example-basic-style" as |F|>
          <F.Header @tagline="Tagline" @icon="info">
            Title
          </F.Header>
          <F.Description>
            Description
          </F.Description>
          <F.Body tabindex="0">
            <p class="hds-typography-body-300 hds-foreground-primary">Lorem
              ipsum dolor sit amet consectetur adipisicing elit.</p>
          </F.Body>
        </HdsFlyout>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3 @tag="h2">Footer</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="One action">
      <:theming>
        <HdsFlyout open id="flyout-example-one-action" as |F|>
          <F.Header>
            Title
          </F.Header>
          <F.Body>
            <p class="hds-typography-body-300 hds-foreground-primary">
              Flyout content
            </p>
          </F.Body>
          <F.Footer>
            <HdsButton type="submit" @text="Primary" />
          </F.Footer>
        </HdsFlyout>
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Two actions">
      <:theming>
        <HdsFlyout open id="flyout-example-two-actions" as |F|>
          <F.Header>
            Title
          </F.Header>
          <F.Body>
            <p class="hds-typography-body-300 hds-foreground-primary">
              Flyout content
            </p>
          </F.Body>
          <F.Footer>
            <HdsButtonSet>
              <HdsButton type="submit" @text="Primary" />
              <HdsButton type="button" @text="Secondary" @color="secondary" />
            </HdsButtonSet>
          </F.Footer>
        </HdsFlyout>
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Three actions">
      <:theming>
        <HdsFlyout open id="flyout-example-three-action" as |F|>
          <F.Header>
            Title
          </F.Header>
          <F.Body>
            <p class="hds-typography-body-300 hds-foreground-primary">
              Flyout content
            </p>
          </F.Body>
          <F.Footer>
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
          </F.Footer>
        </HdsFlyout>
      </:theming>
    </ShwCarbonizationComparisonGrid>

  </section>
</template>;

export default FlyoutCarbonizationIndex;
