/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { registerDestructor } from '@ember/destroyable';
import type Owner from '@ember/owner';
import { modifier } from 'ember-modifier';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import focusTrap from 'ember-focus-trap/modifiers/focus-trap.js';

import { hdsBreakpoints } from '../../../utils/hds-breakpoints.ts';
import hdsT from '../../../helpers/hds-t.ts';
import HdsAppSideNavToggleButton from './toggle-button.gts';

export interface HdsAppSideNavSignature {
  Args: {
    isResponsive?: boolean;
    isCollapsible?: boolean;
    isMinimized?: boolean;
    breakpoint?: string;
    onToggleMinimizedStatus?: (arg: boolean) => void;
    onDesktopViewportChange?: (arg: boolean) => void;
  };
  Blocks: {
    default?: [];
  };
  Element: HTMLDivElement;
}

export default class HdsAppSideNav extends Component<HdsAppSideNavSignature> {
  @tracked private _isMinimized;
  @tracked private _isAnimating = false;
  @tracked private _isDesktop = true;

  private _body!: HTMLElement;
  private _bodyInitialOverflowValue = '';
  private _desktopMQ: MediaQueryList;
  private _navWrapperBody!: HTMLElement;

  // we use the `lg` breakpoint for `desktop` viewports, but consumers can override its value
  private _desktopMQVal = this.args.breakpoint ?? hdsBreakpoints['lg'].px;

  constructor(owner: Owner, args: HdsAppSideNavSignature['Args']) {
    super(owner, args);
    this._isMinimized = this.args.isMinimized ?? false; // sets the default state on 'desktop' viewports
    this._desktopMQ = window.matchMedia(`(min-width:${this._desktopMQVal})`);
    this.addEventListeners();
    registerDestructor(this, (): void => {
      this.removeEventListeners();
    });
  }

  private _setUpBodyElement = modifier((): void => {
    this._body = document.body;
    // Store the initial `overflow` value of `<body>` so we can reset to it
    this._bodyInitialOverflowValue =
      this._body.style.getPropertyValue('overflow');
  });

  private _setUpNavWrapperBody = modifier((element: HTMLElement) => {
    this._navWrapperBody = element;
  });

  addEventListeners(): void {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    document.addEventListener('keydown', this.escapePress, true);
    this._desktopMQ.addEventListener(
      'change',
      // eslint-disable-next-line @typescript-eslint/unbound-method
      this.updateDesktopVariable,
      true
    );
    // if not instantiated as minimized via arguments
    if (!this.args.isMinimized) {
      // set initial state based on viewport using a "synthetic" event
      const syntheticEvent = new MediaQueryListEvent('change', {
        matches: this._desktopMQ.matches,
        media: this._desktopMQ.media,
      });
      this.updateDesktopVariable(syntheticEvent);
    }
  }

  removeEventListeners(): void {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    document.removeEventListener('keydown', this.escapePress, true);
    this._desktopMQ.removeEventListener(
      'change',
      // eslint-disable-next-line @typescript-eslint/unbound-method
      this.updateDesktopVariable,
      true
    );
  }

  // controls if the component reacts to viewport changes
  get isResponsive(): boolean {
    return this.args.isResponsive ?? true;
  }

  // controls if users can collapse the appsidenav on 'desktop' viewports
  get isCollapsible(): boolean {
    return this.args.isCollapsible ?? false;
  }

  get isMobileCollapsible(): boolean {
    return this.isResponsive && !this._isDesktop;
  }

  // traps focus if isResponsive is enabled and it's in mobile view with side nav expanded (overlaying content)
  get shouldTrapFocus(): boolean {
    return this.isResponsive && !this._isDesktop && !this._isMinimized;
  }

  get showToggleButton(): boolean {
    return (this.isResponsive && !this._isDesktop) || this.isCollapsible;
  }

  get classNames(): string {
    const classes = [`hds-app-side-nav`];

    // add specific class names for the different possible states
    if (this.isResponsive) {
      classes.push('hds-app-side-nav--is-responsive');
    }
    if (!this._isDesktop && this.isResponsive) {
      classes.push('hds-app-side-nav--is-mobile');
    } else {
      classes.push('hds-app-side-nav--is-desktop');
    }
    if (this._isMinimized && this.isResponsive) {
      classes.push('hds-app-side-nav--is-minimized');
    } else {
      classes.push('hds-app-side-nav--is-not-minimized');
    }
    if (this._isAnimating) {
      classes.push('hds-app-side-nav--is-animating');
    }

    return classes.join(' ');
  }

  synchronizeInert(): void {
    if (this._isMinimized) {
      this._navWrapperBody?.setAttribute('inert', '');
    } else {
      this._navWrapperBody?.removeAttribute('inert');
    }
  }

  lockBodyScroll(): void {
    if (this._body) {
      // Prevent page from scrolling when the dialog is open
      this._body.style.setProperty('overflow', 'hidden');
    }
  }

  unlockBodyScroll(): void {
    // Reset page `overflow` property
    if (this._body) {
      this._body.style.removeProperty('overflow');
      if (this._bodyInitialOverflowValue === '') {
        if (this._body.style.length === 0) {
          this._body.removeAttribute('style');
        }
      } else {
        this._body.style.setProperty(
          'overflow',
          this._bodyInitialOverflowValue
        );
      }
    }
  }

  @action
  escapePress(event: KeyboardEvent): void {
    if (event.key === 'Escape' && !this._isMinimized && !this._isDesktop) {
      this._isMinimized = true;
      this.synchronizeInert();
      this.unlockBodyScroll();
    }
  }

  @action
  toggleMinimizedStatus(): void {
    this._isMinimized = !this._isMinimized;
    this.synchronizeInert();

    const { onToggleMinimizedStatus } = this.args;

    if (typeof onToggleMinimizedStatus === 'function') {
      onToggleMinimizedStatus(this._isMinimized);
    }

    if (!this._isDesktop) {
      if (this._isMinimized) {
        this.unlockBodyScroll();
      } else {
        this.lockBodyScroll();
      }
    }
  }

  @action
  setTransition(phase: string, event: TransitionEvent): void {
    // we only want to respond to `width` animation/transitions
    if (event.propertyName !== 'width') {
      return;
    }
    if (phase === 'start') {
      this._isAnimating = true;
    } else {
      this._isAnimating = false;
    }
  }

  @action
  updateDesktopVariable(event: MediaQueryListEvent): void {
    this._isDesktop = event.matches;

    // automatically minimize on narrow viewports (when not in desktop mode)
    this._isMinimized = !this._isDesktop;

    this.synchronizeInert();

    if (this._isDesktop) {
      // make sure scrolling is enabled if the user resizes the window from mobile to desktop
      this.unlockBodyScroll();
    }

    const { onDesktopViewportChange } = this.args;

    if (typeof onDesktopViewportChange === 'function') {
      onDesktopViewportChange(this._isDesktop);
    }
  }

  <template>
    {{! IMPORTANT: we need to add "squishies" here (~) because otherwise the whitespace added by Ember causes the empty element to still have visible padding - See https://handlebarsjs.com/guide/expressions.html#whitespace-control }}
    <div
      class={{this.classNames}}
      ...attributes
      role={{if this.isMobileCollapsible "dialog"}}
      aria-labelledby={{if this.isMobileCollapsible "hds-app-side-nav-header"}}
      aria-modal={{if this.isMobileCollapsible "true"}}
      {{on "transitionstart" (fn this.setTransition "start")}}
      {{on "transitionend" (fn this.setTransition "end")}}
      {{! @glint-expect-error - https://github.com/josemarluedke/ember-focus-trap/issues/86 }}
      {{focusTrap isActive=this.shouldTrapFocus}}
      {{this._setUpBodyElement}}
    >
      <h2 class="sr-only" id="hds-app-side-nav-header">
        {{hdsT
          "hds.components.app-side-nav.screen-reader-label"
          default="Application local navigation"
        }}
      </h2>

      <div class="hds-app-side-nav__wrapper">
        {{#if this.showToggleButton}}
          {{! template-lint-disable no-invalid-interactive}}
          <div class="hds-app-side-nav__overlay" {{on "click" this.toggleMinimizedStatus}} />
          {{! template-lint-enable no-invalid-interactive}}
          <HdsAppSideNavToggleButton
            aria-labelledby="hds-app-side-nav-header"
            aria-expanded={{if this._isMinimized "false" "true"}}
            @icon={{if this._isMinimized "chevrons-right" "chevrons-left"}}
            {{on "click" this.toggleMinimizedStatus}}
          />
        {{/if}}

        <div class="hds-app-side-nav__wrapper-body" {{this._setUpNavWrapperBody}}>
          {{~yield~}}
        </div>
      </div>
    </div>
  </template>
}
