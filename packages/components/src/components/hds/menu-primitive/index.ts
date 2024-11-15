/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { deprecate } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';

export interface MenuPrimitiveSignature {
  Args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClose?: (...args: any[]) => void;
  };
  Blocks: {
    toggle?: [
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClickToggle: (event: MouseEvent, ...args: any[]) => void;
        isOpen?: boolean;
      },
    ];
    content?: [
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        close: (...args: any[]) => void;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class MenuPrimitive extends Component<MenuPrimitiveSignature> {
  @tracked private _isOpen: boolean | undefined; // notice: if in the future we need to add a "@isOpen" prop to control the status from outside (eg to have the MenuPrimitive opened on render) just add  "this.args.isOpen" here to initalize the variable
  @tracked private _toggleRef: HTMLElement | undefined;
  @tracked private _element!: HTMLElement;

  constructor(owner: unknown, args: MenuPrimitiveSignature['Args']) {
    super(owner, args);

    deprecate(
      'The `Hds::MenuPrimitive` component is now deprecated and will be removed in the next major version of `@hashicorp/design-system-components`.',
      false,
      {
        id: 'hds.components.menu-primitive',
        until: '5.0.0',
        url: 'https://helios.hashicorp.design/components/menu-primitive?tab=version%20history#460',
        for: '@hashicorp/design-system-components',
        since: {
          enabled: '4.10.0',
        },
      }
    );
  }

  @action
  didInsert(element: HTMLElement): void {
    this._element = element;
  }

  @action
  onClickToggle(event: MouseEvent): void {
    // we store a reference to the DOM node that has the "onClickToggle" event associated with it
    if (!this._toggleRef) {
      this._toggleRef = event.currentTarget as HTMLElement;
    }
    this._isOpen = !this._isOpen;
    // we explicitly apply a focus state to the toggle element to overcome a bug in WebKit (see https://github.com/hashicorp/design-system/commit/40cd7f6b3cb15c45f9a1235fafd0fb3ed58e6e62)
    this._toggleRef?.focus();
  }

  @action
  onFocusOut(event: FocusEvent): void {
    // due to inconsistent implementation of relatedTarget across browsers we use the activeElement as a fallback
    // if the related target is not part of the disclosed content we close the disclosed container
    if (
      !this.element.contains(
        (event.relatedTarget as Node) || (document.activeElement as Node)
      )
    ) {
      this.close();
    }
  }

  @action
  onKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.close();
      this._toggleRef?.focus();
    }
  }

  @action
  close(): void {
    // we schedule this afterRender to avoid an error in tests caused by updating `isOpen` multiple times in the same computation
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      this._isOpen = false;
      // we call the "onClose" callback if it exists (and is a function)
      if (this.args.onClose && typeof this.args.onClose === 'function') {
        this.args.onClose();
      }
    });
  }
}
