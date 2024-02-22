/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { next } from '@ember/runloop';
import { assert } from '@ember/debug';

export default class HdsMenuPrimitiveComponent extends Component {
  @tracked isOpen = this.args.isOpen;
  @tracked toggleElement;
  @tracked contentElement;

  get renderInElement() {
    let { renderInElement } = this.args;
    if (renderInElement) {
      let targetElement;
      if (typeof renderInElement === 'string') {
        const selectedElement = document.querySelector(renderInElement);
        if (selectedElement) {
          targetElement = selectedElement;
        } else {
          console.error(
            '@renderInElement for Hds::MenuPrimitive does not point to an existing DOM node, check your selector string',
            targetElement
          );
        }
      } else if (
        renderInElement instanceof Node &&
        renderInElement.nodeType === Node.ELEMENT_NODE
      ) {
        targetElement = renderInElement;
      } else {
        if (renderInElement instanceof NodeList) {
          assert(
            '@renderInElement for Hds::MenuPrimitive must be a string or a DOM node - provided: a list of DOM nodes'
          );
        } else {
          assert(
            `@renderInElement for Hds::MenuPrimitive must be a string or a DOM node - provided: ${typeof target}`
          );
        }
      }
      return targetElement;
    }
    return undefined;
  }

  @action
  didInsert(element) {
    this.element = element;
  }

  @action
  didInsertToggle(element) {
    this.toggleElement = element;
    console.log('MenuPrimitive didInsertToggle invoked', element, element.id);
  }

  @action
  didInsertParentContent(element) {
    this.contentElement = element;
    console.log('MenuPrimitive didInsertParentContent', element);
    // TODO! understand if this check is really needed
    if (this.toggleElement) {
      this.initPopover();
    } else {
      next(() => {
        this.initPopover();
      });
    }
  }

  @action
  initPopover() {
    this.toggleElement.popoverTargetAction = 'toggle';
    this.toggleElement.popoverTargetElement = this.contentElement;

    this.contentElement.popover = 'auto';
    if (this.isOpen) {
      this.contentElement.showPopover();
    }

    // TODO!! add removal of event listener (you will need to pass down {{will-destroy this.willDestroy}})
    this.contentElement.addEventListener('toggle', (event) => {
      if (event.newState === 'open') {
        console.log('Popover has been shown');
        this.isOpen = true;
      } else {
        console.log('Popover has been hidden');
        this.isOpen = false;
        // we explicitly apply a focus state to the toggle element to overcome a bug in WebKit (see https://github.com/hashicorp/design-system/commit/40cd7f6b3cb15c45f9a1235fafd0fb3ed58e6e62)
        this.toggleElement.focus();
        // TODO! do we need this? where is it used??
        // we call the "onClose" callback if it exists (and is a function)
        let { onClose } = this.args;
        if (typeof onClose === 'function') {
          onClose();
        }
      }
    });
  }

  // TODO! discuss what we want to do with this (probably still keep it)
  @action
  onFocusOut(event) {
    // due to inconsistent implementation of relatedTarget across browsers we use the activeElement as a fallback
    // if the related target is not part of the disclosed content we close the disclosed container
    if (!this.element.contains(event.relatedTarget || document.activeElement)) {
      this.contentElement.hidePopover();
    }
  }

  // TODO do we need this?
  @action
  close() {
    this.contentElement.hidePopover();
  }
}
