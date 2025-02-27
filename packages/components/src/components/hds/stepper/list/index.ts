/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';
import type { ComponentLike } from '@glint/template';
import type { HdsStepperListStepSignature } from './step';

import { HdsStepperTitleTagValues } from '../types.ts';
import type { HdsStepperTitleTags, HdsStepperListStepIds } from '../types.ts';

export interface HdsStepperListSignature {
  Args: {
    titleTag?: HdsStepperTitleTags;
  };
  Blocks: {
    default: [
      {
        Step?: ComponentLike<HdsStepperListStepSignature>;
      },
    ];
  };
  Element: HTMLElement;
}

export default class HdsStepperList extends Component<HdsStepperListSignature> {
  @tracked private _stepIds: HdsStepperListStepIds = [];
  @tracked private _stepNodes: HTMLElement[] = [];

  /**
   * Get the DOM tag that should be used for the title
   * @param titleTag
   * @type {HdsStepperTitleTags}
   * @default 'div'
   */
  get titleTag(): HdsStepperTitleTags {
    return this.args.titleTag ?? HdsStepperTitleTagValues.Div;
  }

  @action
  didInsertStep(element: HTMLElement): void {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      this._stepIds = [...this._stepIds, element.id];
      this._stepNodes = [...this._stepNodes, element];
    });
  }

  @action
  willDestroyStep(element: HTMLElement): void {
    this._stepNodes = this._stepNodes.filter(
      (node): boolean => node.id !== element.id
    );
    this._stepIds = this._stepIds.filter(
      (stepId): boolean => stepId !== element.id
    );
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-stepper-list'];

    return classes.join(' ');
  }
}
