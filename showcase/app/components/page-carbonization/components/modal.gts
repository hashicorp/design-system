import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { capitalize } from '@ember/string';
import { get } from '@ember/object';
import { eq } from 'ember-truth-helpers';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsModal,
  HdsButton,
  HdsButtonSet,
} from '@hashicorp/design-system-components/components';

import { COLORS } from '@hashicorp/design-system-components/components/hds/modal/index';
import { NAMES as ICON_NAMES } from '@hashicorp/design-system-components/components/hds/icon/index';

// Static color to icon mapping
const colorToIconMap: Record<
  (typeof COLORS)[number],
  (typeof ICON_NAMES)[number] | undefined
> = {
  neutral: undefined,
  warning: 'alert-triangle',
  critical: 'alert-diamond',
};

const ModalCarbonization: TemplateOnlyComponent = <template>
  {{pageTitle "Modal - Carbonization"}}

  <ShwTextH1>Modal - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>Color</ShwTextH2>

    {{#each COLORS as |color|}}
      <ShwCarbonizationComparisonGrid
        @label={{capitalize color}}
        @sideBySide={{true}}
      >
        <:theming>
          <HdsModal
            open
            @color={{color}}
            id="modal-example-{{color}}"
            @size="small"
            as |M|
          >
            <M.Header @icon={{get colorToIconMap color}} @tagline="Tagline">
              {{capitalize color}}
            </M.Header>
            <M.Body>
              <p class="hds-typography-body-300 hds-foreground-primary">Modal
                content</p>
            </M.Body>
            <M.Footer>
              <HdsButtonSet>
                <HdsButton
                  type="submit"
                  @text="Confirm"
                  @color={{if (eq color "critical") "critical"}}
                />
                <HdsButton type="button" @text="Cancel" @color="secondary" />
              </HdsButtonSet>
            </M.Footer>
          </HdsModal>
        </:theming>
        <:reference>
          <cds-modal
            open
            prevent-close
            size="xs"
            alert={{if (eq color "critical") true false}}
          >
            <cds-modal-header>
              <cds-modal-close-button></cds-modal-close-button>
              <cds-modal-label>Tagline</cds-modal-label>
              <cds-modal-heading>{{capitalize color}}</cds-modal-heading>
            </cds-modal-header>
            <cds-modal-body>
              <cds-modal-body-content>
                Modal content
              </cds-modal-body-content>
            </cds-modal-body>
            <cds-modal-footer>
              <cds-modal-footer-button
                kind="secondary"
              >Cancel</cds-modal-footer-button>
              <cds-modal-footer-button
                kind={{if (eq color "critical") "danger"}}
              >Confirm</cds-modal-footer-button>
            </cds-modal-footer>
          </cds-modal>
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwDivider />

    <ShwTextH2>Content</ShwTextH2>

    <ShwTextH3>Header</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="With icon" @sideBySide={{true}}>
      <:theming>
        <HdsModal open id="modal-example-icon" @size="small" as |M|>
          <M.Header @icon="info">
            Title
          </M.Header>
          <M.Body>
            <p class="hds-typography-body-300 hds-foreground-primary">
              Modal content
            </p>
          </M.Body>
          <M.Footer>
            <HdsButtonSet>
              <HdsButton type="submit" @text="Confirm" />
              <HdsButton type="button" @text="Cancel" @color="secondary" />
            </HdsButtonSet>
          </M.Footer>
        </HdsModal>
      </:theming>
      <:reference>
        <cds-modal open prevent-close size="xs">
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Title</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>
            <cds-modal-body-content>
              Modal content
            </cds-modal-body-content>
          </cds-modal-body>
          <cds-modal-footer>
            <cds-modal-footer-button
              kind="secondary"
            >Cancel</cds-modal-footer-button>
            <cds-modal-footer-button>Confirm</cds-modal-footer-button>
          </cds-modal-footer>
        </cds-modal>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="With tagline" @sideBySide={{true}}>
      <:theming>
        <HdsModal open id="modal-example-tagline" @size="small" as |M|>
          <M.Header @tagline="Tagline">
            Title
          </M.Header>
          <M.Body>
            <p class="hds-typography-body-300 hds-foreground-primary">
              Modal content
            </p>
          </M.Body>
          <M.Footer>
            <HdsButtonSet>
              <HdsButton type="submit" @text="Confirm" />
              <HdsButton type="button" @text="Cancel" @color="secondary" />
            </HdsButtonSet>
          </M.Footer>
        </HdsModal>
      </:theming>
      <:reference>
        <cds-modal open prevent-close size="xs">
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-label>Tagline</cds-modal-label>
            <cds-modal-heading>Title</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>
            <cds-modal-body-content>
              Modal content
            </cds-modal-body-content>
          </cds-modal-body>
          <cds-modal-footer>
            <cds-modal-footer-button
              kind="secondary"
            >Cancel</cds-modal-footer-button>
            <cds-modal-footer-button>Confirm</cds-modal-footer-button>
          </cds-modal-footer>
        </cds-modal>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid
      @label="With tagline and icon"
      @sideBySide={{true}}
    >
      <:theming>
        <HdsModal open id="modal-example-tagline-icon" @size="small" as |M|>
          <M.Header @tagline="Tagline" @icon="info">
            Title
          </M.Header>
          <M.Body>
            <p class="hds-typography-body-300 hds-foreground-primary">
              Modal content
            </p>
          </M.Body>
          <M.Footer>
            <HdsButtonSet>
              <HdsButton type="submit" @text="Confirm" />
              <HdsButton type="button" @text="Cancel" @color="secondary" />
            </HdsButtonSet>
          </M.Footer>
        </HdsModal>
      </:theming>
      <:reference>
        <cds-modal open prevent-close size="xs">
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-label>Tagline</cds-modal-label>
            <cds-modal-heading>Title</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>
            <cds-modal-body-content>
              Modal content
            </cds-modal-body-content>
          </cds-modal-body>
          <cds-modal-footer>
            <cds-modal-footer-button
              kind="secondary"
            >Cancel</cds-modal-footer-button>
            <cds-modal-footer-button>Confirm</cds-modal-footer-button>
          </cds-modal-footer>
        </cds-modal>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>Body</ShwTextH2>

    <ShwCarbonizationComparisonGrid
      @label="With basic style"
      @sideBySide={{true}}
    >
      <:theming>
        <HdsModal open id="modal-example-basic-content" @size="small" as |M|>
          <M.Header @tagline="Tagline" @icon="info">
            A very, very long title that spans multiple lines to test this
            element
          </M.Header>
          <M.Body>
            <p class="hds-typography-body-300 hds-foreground-primary">HashiCorp
              uses data collected by cookies and JavaScript libraries to improve
              your browsing experience, analyze site traffic, and increase the
              overall performance of our site. By using our website, you're
              agreeing to our Privacy Policy and Cookie Policy.</p>
            <br />
            <p class="hds-typography-body-300 hds-foreground-primary">The
              categories below outline which companies and tools we use for
              collecting data. To opt out of a category of data collection, set
              the toggle to "Off" and save your preferences.</p>
          </M.Body>
          <M.Footer>
            <HdsButtonSet>
              <HdsButton type="submit" @text="Confirm" />
              <HdsButton type="button" @text="Cancel" @color="secondary" />
            </HdsButtonSet>
          </M.Footer>
        </HdsModal>
      </:theming>
      <:reference>
        <cds-modal open prevent-close size="xs">
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-label>Tagline</cds-modal-label>
            <cds-modal-heading>A very, very long title that spans multiple lines
              to test this element</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>
            <cds-modal-body-content description>
              HashiCorp uses data collected by cookies and JavaScript libraries
              to improve your browsing experience, analyze site traffic, and
              increase the overall performance of our site. By using our
              website, you're agreeing to our Privacy Policy and Cookie Policy.
            </cds-modal-body-content>
            <cds-modal-body-content description>
              The categories below outline which companies and tools we use for
              collecting data. To opt out of a category of data collection, set
              the toggle to "Off" and save your preferences.
            </cds-modal-body-content>
          </cds-modal-body>
          <cds-modal-footer>
            <cds-modal-footer-button
              kind="secondary"
            >Cancel</cds-modal-footer-button>
            <cds-modal-footer-button>Confirm</cds-modal-footer-button>
          </cds-modal-footer>
        </cds-modal>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>Footer</ShwTextH2>

    <ShwCarbonizationComparisonGrid @label="One action" @sideBySide={{true}}>
      <:theming>
        <HdsModal open id="modal-example-one-action" @size="small" as |M|>
          <M.Header>
            Title
          </M.Header>
          <M.Body>
            <p class="hds-typography-body-300 hds-foreground-primary">
              Modal content
            </p>
          </M.Body>
          <M.Footer>
            <HdsButtonSet>
              <HdsButton type="submit" @text="Confirm" />
            </HdsButtonSet>
          </M.Footer>
        </HdsModal>
      </:theming>
      <:reference>
        <cds-modal open prevent-close size="xs">
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Title</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>
            <cds-modal-body-content description>
              Modal content
            </cds-modal-body-content>
          </cds-modal-body>
          <cds-modal-footer>
            <cds-modal-footer-button>Confirm</cds-modal-footer-button>
          </cds-modal-footer>
        </cds-modal>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="Two actions" @sideBySide={{true}}>
      <:theming>
        <HdsModal open id="modal-example-two-actions" @size="small" as |M|>
          <M.Header>
            Title
          </M.Header>
          <M.Body>
            <p class="hds-typography-body-300 hds-foreground-primary">
              Modal content
            </p>
          </M.Body>
          <M.Footer>
            <HdsButtonSet>
              <HdsButton type="submit" @text="Confirm" />
              <HdsButton type="button" @text="Cancel" @color="secondary" />
            </HdsButtonSet>
          </M.Footer>
        </HdsModal>
      </:theming>
      <:reference>
        <cds-modal open prevent-close size="xs">
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Title</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>
            <cds-modal-body-content description>
              Modal content
            </cds-modal-body-content>
          </cds-modal-body>
          <cds-modal-footer>
            <cds-modal-footer-button
              kind="secondary"
            >Cancel</cds-modal-footer-button>
            <cds-modal-footer-button>Confirm</cds-modal-footer-button>
          </cds-modal-footer>
        </cds-modal>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="Three actions" @sideBySide={{true}}>
      <:theming>
        <HdsModal open id="modal-example-three-actions" @size="small" as |M|>
          <M.Header>
            Title
          </M.Header>
          <M.Body>
            <p class="hds-typography-body-300 hds-foreground-primary">
              Modal content
            </p>
          </M.Body>
          <M.Footer>
            <HdsButtonSet>
              <HdsButton type="submit" @text="Confirm" />
              <HdsButton type="button" @text="Cancel" @color="secondary" />
              <HdsButton
                type="button"
                @text="Tertiary"
                @color="tertiary"
                @icon="plus"
              />
            </HdsButtonSet>
          </M.Footer>
        </HdsModal>
      </:theming>
      <:reference>
        <cds-modal open prevent-close size="xs">
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Title</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>
            <cds-modal-body-content description>
              Modal content
            </cds-modal-body-content>
          </cds-modal-body>
          <cds-modal-footer has-three-buttons="true">
            <cds-modal-footer-button
              kind="tertiary"
            >Tertiary</cds-modal-footer-button>
            <cds-modal-footer-button
              kind="secondary"
            >Cancel</cds-modal-footer-button>
            <cds-modal-footer-button>Confirm</cds-modal-footer-button>
          </cds-modal-footer>
        </cds-modal>
      </:reference>
    </ShwCarbonizationComparisonGrid>

  </section>
</template>;

export default ModalCarbonization;
