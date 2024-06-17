/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';
import type { HdsAccordionItemSignature } from './item/index.ts';
import type { HdsAccordionForceStates } from './types.ts';

interface HdsAccordionSignature {
  Args: {
    forceState?: HdsAccordionForceStates;
  };
  Blocks: {
    default: [
      {
        Item?: ComponentLike<HdsAccordionItemSignature>;
      }
    ];
  };
  Element: HTMLDivElement;
}

const HdsAccordionComponent = TemplateOnlyComponent<HdsAccordionSignature>();

export default HdsAccordionComponent;
