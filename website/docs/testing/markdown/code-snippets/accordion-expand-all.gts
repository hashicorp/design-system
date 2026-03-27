import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import { eq } from 'ember-truth-helpers';

import {
  HdsAccordion,
  HdsButton,
  HdsTextDisplay,
} from '@hashicorp/design-system-components/components';
import type { HdsAccordionSignature } from '@hashicorp/design-system-components/components/hds/accordion/index';

export default class LocalComponent extends Component {
  @tracked accordionState: HdsAccordionSignature['Args']['forceState'] =
    'close';

  toggleAccordionState = () => {
    this.accordionState = this.accordionState === 'open' ? 'close' : 'open';
  };

  <template>
    <div class="doc-accordion-flex-layout">
      <HdsTextDisplay @size="300">Examination period</HdsTextDisplay>
      <HdsButton
        @text={{if (eq this.accordionState "open") "Collapse all" "Expand all"}}
        @icon={{if
          (eq this.accordionState "open")
          "unfold-close"
          "unfold-open"
        }}
        @color="tertiary"
        @size="small"
        {{on "click" this.toggleAccordionState}}
      />
    </div>
    <HdsAccordion @forceState={{this.accordionState}} as |A|>
      <A.Item>
        <:toggle>Exam experience</:toggle>
        <:content>
          All certification exams are taken online with a live proctor,
          accommodating all locations and time zones. Online proctoring provides
          the same benefits of a physical test center while being more
          accessible to exam-takers.
        </:content>
      </A.Item>
      <A.Item>
        <:toggle>Requirements for attending an exam</:toggle>
        <:content>
          Before you register for an exam, review the Exam-taker Handbook to
          learn the requirements and policies for taking exams.
        </:content>
      </A.Item>
      <A.Item>
        <:toggle>Your badge and certificate</:toggle>
        <:content>
          HashiCorp has partnered with Credly to offer you a digital badge and
          downloadable certificate upon passing a certification exam.
        </:content>
      </A.Item>
    </HdsAccordion>
  </template>
}
