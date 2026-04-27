/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import Modifier from 'ember-modifier';
import { element } from 'ember-element-helper';
import { registerDestructor } from '@ember/destroyable';
import type Owner from '@ember/owner';
import type { ArgsFor } from 'ember-modifier';

type Constructor<T> = new () => T;

type ElementProps<I extends HTMLElement> = Partial<Omit<I, keyof HTMLElement>>;

type ComponentArgs<I extends HTMLElement> = ElementProps<I>;

type WebComponentSignature<I extends HTMLElement> = {
  Args: ComponentArgs<I>;
  Blocks: {
    default: [];
  };
  Element: I;
};

type GlimmerComponentClass<Signature> = abstract new (
  ...args: unknown[]
) => Component<Signature>;

type WebComponentClassStatics<I extends HTMLElement> = {
  tagName: string;
  elementClass: Constructor<I>;
};

type SyncWebComponentModifierSignature = {
  Element: Element;
  Args: {
    Positional: [
      props: Record<string, unknown>,
      elementClass: Constructor<HTMLElement>,
    ];
  };
};

interface CreateComponentOptions<I extends HTMLElement> {
  tagName: string;
  elementClass: Constructor<I>;
  displayName?: string;
}

class SyncWebComponentModifier extends Modifier<SyncWebComponentModifierSignature> {
  private _element: HTMLElement | null = null;
  private _previousProperties = new Map<string, unknown>();

  constructor(owner: Owner, args: ArgsFor<SyncWebComponentModifierSignature>) {
    super(owner, args);

    registerDestructor(this, () => {
      this._teardown();
    });
  }

  modify(
    element: SyncWebComponentModifierSignature['Element'],
    [
      props,
      elementClass,
    ]: SyncWebComponentModifierSignature['Args']['Positional']
  ): void {
    if (!(element instanceof HTMLElement)) {
      return;
    }

    if (this._element !== null && this._element !== element) {
      this._teardown();
    }

    this._element = element;

    const nextProperties = new Map<string, unknown>();

    for (const [name, value] of Object.entries(props)) {
      if (!(name in elementClass.prototype)) {
        continue;
      }

      this._setProperty(element, name, value);
      nextProperties.set(name, value);
      this._previousProperties.delete(name);
    }

    for (const [name] of this._previousProperties) {
      this._setProperty(element, name, undefined);
    }

    this._previousProperties = nextProperties;
  }

  private _setProperty(node: HTMLElement, name: string, value: unknown): void {
    (node as unknown as Record<string, unknown>)[name] = value;

    if (
      (value === undefined || value === null) &&
      name in HTMLElement.prototype
    ) {
      node.removeAttribute(name);
    }
  }

  private _teardown(): void {
    if (this._element === null) {
      return;
    }

    this._previousProperties.clear();
    this._element = null;
  }
}

abstract class BaseWebComponentComponent<
  I extends HTMLElement,
> extends Component<WebComponentSignature<I>> {
  static tagName: string;
  static elementClass: Constructor<HTMLElement>;

  syncWebComponent = SyncWebComponentModifier;

  private get _componentClass(): WebComponentClassStatics<I> {
    return this.constructor as unknown as WebComponentClassStatics<I>;
  }

  get componentTagName(): string {
    return this._componentClass.tagName;
  }

  get componentElementClass(): Constructor<I> {
    return this._componentClass.elementClass;
  }

  get componentArgs(): Record<string, unknown> {
    return this.args as unknown as Record<string, unknown>;
  }

  <template>
    {{#let (element this.componentTagName) as |Tag|}}
      <Tag
        ...attributes
        {{this.syncWebComponent this.componentArgs this.componentElementClass}}
      >
        {{yield}}
      </Tag>
    {{/let}}
  </template>
}

export const createComponent = <I extends HTMLElement>({
  tagName,
  elementClass,
  displayName,
}: CreateComponentOptions<I>): GlimmerComponentClass<
  WebComponentSignature<I>
> => {
  class WebComponentComponent extends BaseWebComponentComponent<I> {
    static tagName = tagName;
    static elementClass = elementClass as Constructor<HTMLElement>;
  }

  Object.defineProperty(WebComponentComponent, 'name', {
    value: displayName ?? elementClass.name,
  });

  return WebComponentComponent as unknown as GlimmerComponentClass<
    WebComponentSignature<I>
  >;
};

export type {
  ComponentArgs,
  CreateComponentOptions,
  ElementProps,
  WebComponentSignature,
};
