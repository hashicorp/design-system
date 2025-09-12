/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

// HDS components
import {
  HdsLinkInline,
  HdsTextDisplay,
  HdsTextBody,
  HdsFormSuperSelectSingleBase,
  HdsDropdown,
  HdsStepperNav,
  HdsSeparator,
} from '@hashicorp/design-system-components/components';

// Showcase components
import CodeFragmentWithModal from 'showcase/components/page-components/copy/button/code-fragments/with-modal';

// helpers
import NOOP from 'showcase/utils/noop';

export interface MockAppMainGenericTextContentSignature {
  Element: HTMLDivElement;
}

const MockAppMainGenericTextContent: TemplateOnlyComponent<MockAppMainGenericTextContentSignature> =
  <template>
    <div class="mock-app-main-generic-text-content">
      <HdsTextDisplay @tag="h2" @size="400" @weight="medium">Modal tests</HdsTextDisplay>

      <HdsTextDisplay @tag="h3" @size="300" @weight="medium">Modal triggered by
        a button:</HdsTextDisplay>
      <CodeFragmentWithModal />

      <HdsTextDisplay @tag="h3" @size="300" @weight="medium">Modal within a
        SuperSelect:</HdsTextDisplay>
      <HdsFormSuperSelectSingleBase
        @onChange={{NOOP}}
        {{! @glint-ignore }}
        @afterOptionsContent={{component CodeFragmentWithModal}}
        @ariaLabel="Model in SuperSelect"
        as |SS|
      >
        <SS.Options>Options here</SS.Options>
      </HdsFormSuperSelectSingleBase>

      <HdsTextDisplay @tag="h3" @size="300" @weight="medium">Modal within a
        Dropdown</HdsTextDisplay>
      <HdsDropdown as |D|>
        <D.ToggleButton @text="Dropdown containing a Modal" />
        <D.Footer>
          <CodeFragmentWithModal />
        </D.Footer>
      </HdsDropdown>

      <HdsTextDisplay @tag="h3" @size="300" @weight="medium">Modal within
        Stepper content:</HdsTextDisplay>
      <HdsStepperNav @ariaLabel="Modals as content" as |S|>
        <S.Step>
          <:title>Step 1</:title>
        </S.Step>
        <S.Step>
          <:title>Step 2</:title>
        </S.Step>

        <S.Panel><CodeFragmentWithModal /></S.Panel>
        <S.Panel>Content</S.Panel>
      </HdsStepperNav>

      <HdsSeparator />

      <HdsTextBody @tag="p" @size="200">Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Excepturi
        <HdsLinkInline @href="#" @color="primary">aperiam a molestias quisquam</HdsLinkInline>
        sapiente alias corporis sit aliquid similique esse illum at itaque
        ducimus, eligendi eos. Iure dolor eos
        <HdsLinkInline @href="#" @color="secondary">cumque autem placeat</HdsLinkInline>
        pariatur voluptate deserunt quas, iste quo alias? Sequi, qui ipsa.
        Laborum, ipsa atque alias nostrum nihil repudiandae ratione inventore,
        qui impedit obcaecati facilis quaerat aliquam omnis consequuntur.</HdsTextBody>
      <HdsTextBody @tag="p" @size="200">Ab, deleniti vel. Optio consequuntur
        sint officiis distinctio dolorem nobis porro ipsum natus hic debitis
        nihil at nostrum, reiciendis exercitationem quod deserunt inventore,
        repellendus officia cum temporibus. Molestias voluptate magni earum unde
        officia illum doloribus facere natus molestiae quisquam nobis adipisci
        non distinctio quam asperiores saepe, ab veniam dolor animi sed
        accusamus nulla nam dolorem Quos reprehenderit molestiae veritatis
        fugiat eligendi temporibus fuga modi, id recusandae dolor mollitia
        accusantium soluta cumque corporis ipsa tempore amet dolorum.</HdsTextBody>
      <HdsTextBody @tag="p" @size="200">Velit nemo voluptatum, culpa libero
        assumenda ea quae dolorem molestias fugiat, maxime eveniet ipsum, et
        facere aut animi praesentium. Eum voluptatum eaque fugit aspernatur
        voluptas maxime, iste blanditiis doloribus amet repellendus aut
        cupiditate beatae aperiam molestiae hic saepe optio. Neque voluptates
        quidem, tempore harum aliquid esse perferendis officiis repudiandae
        dicta? Excepturi temporibus molestias sit consectetur consequatur
        exercitationem et necessitatibus cumque aliquam, quisquam dolores alias
        reiciendis.</HdsTextBody>
    </div>
  </template>;

export default MockAppMainGenericTextContent;
