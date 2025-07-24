import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';
import { assert } from '@ember/debug';
import { modifier } from 'ember-modifier';
import { HdsStepperTitleTagValues } from '../types.js';
import './step.js';
import './panel.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class={{this.classNames}} ...attributes {{style this.inlineStyles}} {{this._setUpStepperNav}}>\n  <ol class=\"hds-stepper-nav__list\" aria-label={{@ariaLabel}} role={{if this.isInteractive \"tablist\"}}>\n    {{#if @steps}}\n      {{#each @steps as |step|}}\n        <Hds::Stepper::Nav::Step\n          @currentStep={{this.currentStep}}\n          @isNavInteractive={{this.isInteractive}}\n          @titleTag={{this.titleTag}}\n          @didInsertNode={{this.didInsertStep}}\n          @willDestroyNode={{this.willDestroyStep}}\n          @stepIds={{this._stepIds}}\n          @panelIds={{this._panelIds}}\n          @onStepChange={{@onStepChange}}\n          @onKeyUp={{this.onKeyUp}}\n        >\n          <:title>{{step.title}}</:title>\n          <:description>{{step.description}}</:description>\n        </Hds::Stepper::Nav::Step>\n      {{/each}}\n    {{else}}\n      {{yield\n        (hash\n          Step=(component\n            \"hds/stepper/nav/step\"\n            currentStep=this.currentStep\n            isNavInteractive=this.isInteractive\n            titleTag=this.titleTag\n            stepIds=this._stepIds\n            panelIds=this._panelIds\n            didInsertNode=this.didInsertStep\n            willDestroyNode=this.willDestroyStep\n            onStepChange=@onStepChange\n            onKeyUp=this.onKeyUp\n          )\n        )\n      }}\n    {{/if}}\n  </ol>\n  {{#if (and @steps (has-block \"body\"))}}\n    {{#each @steps}}\n      <Hds::Stepper::Nav::Panel\n        @currentStep={{this.currentStep}}\n        @isNavInteractive={{this.isInteractive}}\n        @stepIds={{this._stepIds}}\n        @panelIds={{this._panelIds}}\n        @didInsertNode={{this.didInsertPanel}}\n        @willDestroyNode={{this.willDestroyPanel}}\n      >\n        {{yield to=\"body\"}}\n      </Hds::Stepper::Nav::Panel>\n    {{/each}}\n  {{else}}\n    {{yield\n      (hash\n        Panel=(component\n          \"hds/stepper/nav/panel\"\n          currentStep=this.currentStep\n          isNavInteractive=this.isInteractive\n          stepIds=this._stepIds\n          panelIds=this._panelIds\n          didInsertNode=this.didInsertPanel\n          willDestroyNode=this.willDestroyPanel\n        )\n      )\n    }}\n  {{/if}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const STEP_ELEMENT_SELECTOR = '.hds-stepper-nav__step-content';
const PANEL_ELEMENT_SELECTOR = '.hds-stepper-nav__panel';
class HdsStepperNav extends Component {
  static {
    g(this.prototype, "_stepIds", [tracked], function () {
      return [];
    });
  }
  #_stepIds = (i(this, "_stepIds"), void 0);
  static {
    g(this.prototype, "_stepNodes", [tracked], function () {
      return [];
    });
  }
  #_stepNodes = (i(this, "_stepNodes"), void 0);
  static {
    g(this.prototype, "_panelNodes", [tracked], function () {
      return [];
    });
  }
  #_panelNodes = (i(this, "_panelNodes"), void 0);
  static {
    g(this.prototype, "_panelIds", [tracked], function () {
      return [];
    });
  }
  #_panelIds = (i(this, "_panelIds"), void 0);
  _element;
  _setUpStepperNav = modifier(element => {
    if (this.isInteractive) {
      assert('If @isInteractive is true, the number of Steps must be equal to the number of Panels', this._stepNodes.length === this._panelNodes.length);
    }
    this._element = element;
    return () => {};
  });
  get currentStep() {
    const {
      currentStep
    } = this.args;
    if (currentStep) {
      if (currentStep < 0) {
        return 0;
      } else {
        return currentStep;
      }
    } else {
      return 0;
    }
  }
  get isInteractive() {
    return this.args.isInteractive != undefined ? this.args.isInteractive : true;
  }
  get titleTag() {
    return this.args.titleTag ?? HdsStepperTitleTagValues.Div;
  }
  get inlineStyles() {
    const inlineStyles = {};
    inlineStyles['--hds-stepper-nav-progress-bar-width'] = this.progressBarWidthStyle;
    return inlineStyles;
  }
  get progressBarWidthStyle() {
    let progressBarWidth = 0;
    let progressBarOffset = 0;
    if (this._stepIds.length != 0) {
      if (this.currentStep >= this._stepIds.length) {
        progressBarWidth = 100;
        progressBarOffset = 0;
      } else {
        const activeStepWidth = 1 / this._stepIds.length / 2;
        const width = this.currentStep / this._stepIds.length;
        progressBarWidth = (width + activeStepWidth) * 100;
        progressBarOffset = 16;
      }
    }
    return `calc(${progressBarWidth}% - ${progressBarOffset}px)`;
  }
  didInsertStep() {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', () => {
      this.updateSteps();
    });
  }
  static {
    n(this.prototype, "didInsertStep", [action]);
  }
  willDestroyStep(element) {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', () => {
      this._stepNodes = this._stepNodes.filter(node => node.id !== element.id);
      this._stepIds = this._stepIds.filter(stepId => stepId !== element.id);
    });
  }
  static {
    n(this.prototype, "willDestroyStep", [action]);
  }
  didInsertPanel() {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', () => {
      this.updatePanels();
    });
  }
  static {
    n(this.prototype, "didInsertPanel", [action]);
  }
  willDestroyPanel(element) {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', () => {
      this._panelNodes = this._panelNodes.filter(node => node.id !== element.id);
      this._panelIds = this._panelIds.filter(panelId => panelId !== element.id);
    });
  }
  static {
    n(this.prototype, "willDestroyPanel", [action]);
  }
  onKeyUp(currentStepIndex, event) {
    const leftArrow = 'ArrowLeft';
    const rightArrow = 'ArrowRight';
    if (event.key === rightArrow) {
      const nextStepIndex = this.findNextInteractiveStepIndex(currentStepIndex, 1);
      this.focusStep(nextStepIndex, event);
    } else if (event.key === leftArrow) {
      const prevStepIndex = this.findNextInteractiveStepIndex(currentStepIndex, this._stepIds.length - 1);
      this.focusStep(prevStepIndex, event);
    }
  }

  // Update the step arrays based on how they are ordered in the DOM
  static {
    n(this.prototype, "onKeyUp", [action]);
  }
  updateSteps() {
    const steps = this._element.querySelectorAll(STEP_ELEMENT_SELECTOR);
    let newStepIds = [];
    let newStepNodes = [];
    steps.forEach(step => {
      newStepIds = [...newStepIds, step.id];
      newStepNodes = [...newStepNodes, step];
    });
    this._stepIds = newStepIds;
    this._stepNodes = newStepNodes;
  }

  // Update the panel arrays based on how they are ordered in the DOM
  updatePanels() {
    const panels = this._element.querySelectorAll(PANEL_ELEMENT_SELECTOR);
    let newPanelIds = [];
    let newPanelNodes = [];
    panels.forEach(panel => {
      newPanelIds = [...newPanelIds, panel.id];
      newPanelNodes = [...newPanelNodes, panel];
    });
    this._panelIds = newPanelIds;
    this._panelNodes = newPanelNodes;
  }

  // Find the next interactive step to focus based on keyboard input
  findNextInteractiveStepIndex(currentStepIndex, increment) {
    let newStepIndex = (currentStepIndex + increment) % this._stepIds.length;
    while (newStepIndex > this.currentStep) {
      newStepIndex = (newStepIndex + increment) % this._stepIds.length;
    }
    return newStepIndex;
  }

  // Focus step for keyboard & mouse nav
  focusStep(stepIndex, event) {
    event.preventDefault();
    const step = this._stepNodes[stepIndex];
    step?.focus();
  }
  get classNames() {
    const classes = ['hds-stepper-nav'];
    if (this.isInteractive) {
      classes.push('hds-stepper-nav--interactive');
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsStepperNav);

export { HdsStepperNav as default };
//# sourceMappingURL=index.js.map
