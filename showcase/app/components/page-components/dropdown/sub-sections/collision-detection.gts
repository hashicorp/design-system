/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array, concat } from '@ember/helper';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwGrid from 'showcase/components/shw/grid';
import ShwAutoscrollable from 'showcase/components/shw/autoscrollable';

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

  <ShwDivider />
</template>;

export default SubSectionCollisionDetection;
