/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';

import {
  HdsButton,
  HdsButtonSet,
  HdsDialogPrimitiveBody,
  HdsDialogPrimitiveDescription,
  HdsDialogPrimitiveFooter,
  HdsDialogPrimitiveHeader,
  HdsDialogPrimitiveWrapper,
} from '@hashicorp/design-system-components/components';

const SubSectionWrapper: TemplateOnlyComponent = <template>
  <section data-test-percy>
    <ShwTextH2>DialogPrimitiveWrapper</ShwTextH2>

    <ShwTextH3>With generic content</ShwTextH3>

    <ShwFlex {{style gap="2rem"}} as |SF|>
      <SF.Item @label="Header + Body + Footer">
        <div class="shw-utility-dialog-primitive-base-container">
          <HdsDialogPrimitiveWrapper open>
            <:header>
              <ShwPlaceholder @text="header" @height="60px" />
            </:header>
            <:body>
              <ShwPlaceholder
                @text="body"
                @height="300px"
                @background="#fafafa"
                tabindex="0"
              />
            </:body>
            <:footer>
              <ShwPlaceholder @text="footer" @height="60px" />
            </:footer>
          </HdsDialogPrimitiveWrapper>
        </div>
      </SF.Item>
      <SF.Item @label="Header + Body (scrollable) + Footer">
        <div class="shw-utility-dialog-primitive-base-container">
          <HdsDialogPrimitiveWrapper open>
            <:header>
              <ShwPlaceholder @height="60px" @text="header" />
            </:header>
            <:body>
              <ShwPlaceholder
                @height="500px"
                @text="body"
                @background="#fafafa"
                tabindex="0"
              />
            </:body>
            <:footer>
              <ShwPlaceholder @height="60px" @text="footer" />
            </:footer>
          </HdsDialogPrimitiveWrapper>
        </div>
      </SF.Item>
    </ShwFlex>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Without header or footer</ShwTextH3>

    <ShwFlex {{style gap="2rem"}} as |SF|>
      <SF.Item @label="Header + Body (no Footer)">
        <div class="shw-utility-dialog-primitive-base-container">
          <HdsDialogPrimitiveWrapper open>
            <:header>
              <ShwPlaceholder @text="header" @height="60px" />
            </:header>
            <:body>
              <ShwPlaceholder
                @text="body"
                @height="300px"
                @background="#fafafa"
                tabindex="0"
              />
            </:body>
          </HdsDialogPrimitiveWrapper>
        </div>
      </SF.Item>
      <SF.Item @label="Body + Footer (no Header)">
        <div class="shw-utility-dialog-primitive-base-container">
          <HdsDialogPrimitiveWrapper open>
            <:body>
              <ShwPlaceholder
                @height="300px"
                @text="body"
                @background="#fafafa"
                tabindex="0"
              />
            </:body>
            <:footer>
              <ShwPlaceholder @height="60px" @text="footer" />
            </:footer>
          </HdsDialogPrimitiveWrapper>
        </div>
      </SF.Item>
    </ShwFlex>

    <ShwDivider @level={{2}} />

    <ShwTextH3>With primitives</ShwTextH3>

    <ShwFlex {{style gap="2rem"}} as |SF|>
      <SF.Item @label="Header + Description + Body + Footer">
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
                  ipsum dolor sit amet consectetur adipisicing elit. Libero
                  culpa expedita assumenda at nisi minus unde fuga iure suscipit
                  aut qui, odit natus eum voluptates ut molestiae! Perferendis,
                  impedit qui? Lorem ipsum dolor sit amet?</p>
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
      </SF.Item>
      <SF.Item @label="Header + Description + Body (scrollable) + Footer">
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
                <p
                  class="hds-typography-body-300 hds-foreground-primary"
                  tabindex="0"
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. Sed ut perspiciatis unde omnis
                  iste natus error sit voluptatem accusantium doloremque
                  laudantium, totam rem aperiam, eaque ipsa quae ab illo
                  inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                  aspernatur aut odit aut fugit, sed quia consequuntur magni
                  dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
                  quisquam est, qui dolorem ipsum quia dolor sit amet,
                  consectetur, adipisci velit, sed quia non numquam eius modi
                  tempora incidunt ut labore et dolore magnam aliquam quaerat
                  voluptatem. Ut enim ad minima veniam, quis nostrum
                  exercitationem ullam corporis suscipit laboriosam, nisi ut
                  aliquid ex ea commodi consequatur? Quis autem vel eum iure
                  reprehenderit qui in ea voluptate velit esse quam nihil
                  molestiae consequatur, vel illum qui dolorem eum fugiat quo
                  voluptas nulla pariatur? At vero eos et accusamus et iusto
                  odio dignissimos ducimus qui blanditiis praesentium voluptatum
                  deleniti atque corrupti quos dolores et quas molestias
                  excepturi sint occaecati cupiditate non provident, similique
                  sunt in culpa qui officia deserunt mollitia animi, id est
                  laborum et dolorum fuga. Et harum quidem rerum facilis est et
                  expedita distinctio. Nam libero tempore, cum soluta nobis est
                  eligendi optio cumque nihil impedit quo minus id quod maxime
                  placeat facere possimus, omnis voluptas assumenda est, omnis
                  dolor repellendus. Temporibus autem quibusdam et aut officiis
                  debitis aut rerum necessitatibus saepe eveniet ut et
                  voluptates repudiandae sint et molestiae non recusandae.
                  Itaque earum rerum hic tenetur a sapiente delectus, ut aut
                  reiciendis voluptatibus maiores alias consequatur aut
                  perferendis doloribus asperiores repellat.</p>
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
      </SF.Item>
    </ShwFlex>

    <ShwDivider />
  </section>
</template>;

export default SubSectionWrapper;
