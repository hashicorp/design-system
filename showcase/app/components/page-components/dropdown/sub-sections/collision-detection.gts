/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array, concat } from '@ember/helper';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwGrid from 'showcase/components/shw/grid';
import ShwAutoscrollable from 'showcase/components/shw/autoscrollable';
import ModalWithTrigger from 'showcase/components/page-components/modal/code-fragments/with-trigger';

import CodeFragmentWithSimpleActions from 'showcase/components/page-components/dropdown/code-fragments/with-simple-actions';

const SubSectionCollisionDetection: TemplateOnlyComponent = <template>
  <ShwTextH2>Collision detection</ShwTextH2>

  <ShwTextBody>Scroll within the boxes to see the collision detection in action</ShwTextBody>

  <ShwGrid @columns={{3}} @gap="2rem" as |SF|>
    {{#let (array false true) as |detections|}}
      {{#each detections as |detection|}}
        <SF.Item
          @forceMinWidth={{true}}
          @label={{concat "enableCollisionDetection=" detection}}
        >
          <ShwAutoscrollable @verticalShift={{30}}>
            <div class="shw-component-dropdown-collision-detection-wrapper">
              <CodeFragmentWithSimpleActions
                @isOpen={{true}}
                @enableCollisionDetection={{detection}}
              />
            </div>
          </ShwAutoscrollable>
        </SF.Item>
      {{/each}}
    {{/let}}
    <SF.Item />
  </ShwGrid>

  <ShwTextBody>Dropdown w/ enableCollisionDetection=true within a Modal</ShwTextBody>

  <ModalWithTrigger @triggerText="Open modal" id="nested-modal">
    <:modal as |M|>
      <M.Header>
        Modal title
      </M.Header>
      <M.Body>
        <p class="hds-typography-body-300 hds-foreground-primary">
          Modal content
        </p>
        <br />
        <CodeFragmentWithSimpleActions @enableCollisionDetection={{true}} />
      </M.Body>
    </:modal>
  </ModalWithTrigger>

  <ShwDivider />
</template>;

export default SubSectionCollisionDetection;
