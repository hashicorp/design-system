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

export default class AccordionExpandAll extends Component {
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
          accessible to exam-takers. The live proctor verifies your identity,
          walks you through rules and procedures, and watches you take the exam.
          Learn more ways to prepare for an online proctored exam in our
          Knowledgebase.
        </:content>
      </A.Item>
      <A.Item>
        <:toggle>Requirements for attending an exam</:toggle>
        <:content>
          Before you register for an exam, review the Exam-taker Handbook to
          learn the requirements and policies for taking exams. It is your
          responsibility to know and abide by our program rules to successfully
          enter your exam appointment, failure to do so may result in forfeiture
          of appointment fees.
        </:content>
      </A.Item>
      <A.Item>
        <:toggle>Your badge and certificate</:toggle>
        <:content>
          HashiCorp has partnered with Credly to offer you a digital badge and
          downloadable certificate upon passing a certification exam. There is
          no fee for this service and acceptance is up to you. Digital badges
          can be used in email signatures or digital resumes, and on social
          media sites such as LinkedIn, Facebook, and Twitter. Badges link back
          to a real-time verification feature that describes your
          qualifications.
        </:content>
      </A.Item>
      <A.Item>
        <:toggle>Renewing your certification</:toggle>
        <:content>
          All HashiCorp Certifications are valid for two years, and you will be
          eligible to renew your certification starting 18 months after you
          earned your certification. To recertify, you will need to pass an exam
          at the same level or higher for the certification you are looking to
          renew. There are several pathways to recertification available, and
          you can learn more on our Knowledge Base or by heading to each exam’s
          homepage.
        </:content>
      </A.Item>
      <A.Item>
        <:toggle>Finding certified practitioners</:toggle>
        <:content>
          HashiCorp publishes all earned badges to a publicly searchable
          directory on Credly. Here, you can filter and find people who hold
          HashiCorp Cloud Engineer certifications. Learn how to opt-out of this
          service in our Knowledgebase.
        </:content>
      </A.Item>
    </HdsAccordion>
  </template>
}
