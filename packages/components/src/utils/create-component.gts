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

export type EventName<T extends Event = Event> = string & {
  __eventType: T;
};

type EventNames = Record<string, EventName | string>;

type ElementProps<I extends HTMLElement> = Partial<Omit<I, keyof HTMLElement>>;

type EventCallbacks<E extends EventNames> = {
  [K in keyof E]?: E[K] extends EventName
    ? (event: E[K]['__eventType']) => void
    : (event: Event) => void;
};

type ComponentArgs<
  I extends HTMLElement,
  E extends EventNames,
> = ElementProps<I> & EventCallbacks<E>;

type WebComponentSignature<I extends HTMLElement, E extends EventNames> = {
  Args: ComponentArgs<I, E>;
  Blocks: {
    default: [];
  };
  Element: I;
};

type GlimmerComponentClass<Signature> = abstract new (
  ...args: unknown[]
) => Component<Signature>;

type WebComponentClassStatics<I extends HTMLElement, E extends EventNames> = {
  tagName: string;
  elementClass: Constructor<I>;
  events: E;
};

type SyncWebComponentModifierSignature = {
  Element: Element;
  Args: {
    Positional: [
      props: Record<string, unknown>,
      elementClass: Constructor<HTMLElement>,
      events: EventNames | undefined,
    ];
  };
};

interface CreateComponentOptions<
  I extends HTMLElement,
  E extends EventNames = Record<never, never>,
> {
  tagName: string;
  elementClass: Constructor<I>;
  events?: E;
  displayName?: string;
}

class SyncWebComponentModifier extends Modifier<SyncWebComponentModifierSignature> {
  private _element: HTMLElement | null = null;
  private _previousProperties = new Map<string, unknown>();
  private _listenedEvents = new Map<string, EventListenerObject>();

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
      events,
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
      if (!(name in elementClass.prototype) && events?.[name] === undefined) {
        continue;
      }

      this._setProperty(
        element,
        name,
        value,
        this._previousProperties.get(name),
        events
      );
      nextProperties.set(name, value);
      this._previousProperties.delete(name);
    }

    for (const [name, previousValue] of this._previousProperties) {
      this._setProperty(element, name, undefined, previousValue, events);
    }

    this._previousProperties = nextProperties;
  }

  private _setProperty(
    node: HTMLElement,
    name: string,
    value: unknown,
    oldValue: unknown,
    events: EventNames | undefined
  ): void {
    const eventName = events?.[name];

    if (eventName !== undefined) {
      if (value !== oldValue) {
        this._addOrUpdateEventListener(
          node,
          eventName,
          value as ((event: Event) => void) | undefined
        );
      }
      return;
    }

    (node as unknown as Record<string, unknown>)[name] = value;

    if (
      (value === undefined || value === null) &&
      name in HTMLElement.prototype
    ) {
      node.removeAttribute(name);
    }
  }

  private _addOrUpdateEventListener(
    node: HTMLElement,
    event: string,
    listener: ((event: Event) => void) | undefined
  ): void {
    let handler = this._listenedEvents.get(event);

    if (listener !== undefined) {
      if (handler === undefined) {
        handler = { handleEvent: listener };
        this._listenedEvents.set(event, handler);
        node.addEventListener(event, handler);
      } else {
        handler.handleEvent = listener;
      }
      return;
    }

    if (handler !== undefined) {
      this._listenedEvents.delete(event);
      node.removeEventListener(event, handler);
    }
  }

  private _teardown(): void {
    if (this._element === null) {
      return;
    }

    for (const [eventName, handler] of this._listenedEvents) {
      this._element.removeEventListener(eventName, handler);
    }

    this._listenedEvents.clear();
    this._previousProperties.clear();
    this._element = null;
  }
}

abstract class BaseWebComponentComponent<
  I extends HTMLElement,
  E extends EventNames,
> extends Component<WebComponentSignature<I, E>> {
  static tagName: string;
  static elementClass: Constructor<HTMLElement>;
  static events: EventNames = {};

  syncWebComponent = SyncWebComponentModifier;

  private get _componentClass(): WebComponentClassStatics<I, E> {
    return this.constructor as unknown as WebComponentClassStatics<I, E>;
  }

  get componentTagName(): string {
    return this._componentClass.tagName;
  }

  get componentElementClass(): Constructor<I> {
    return this._componentClass.elementClass;
  }

  get componentEvents(): E {
    return this._componentClass.events;
  }

  get componentArgs(): Record<string, unknown> {
    return this.args as unknown as Record<string, unknown>;
  }

  <template>
    {{#let (element this.componentTagName) as |Tag|}}
      <Tag
        ...attributes
        {{this.syncWebComponent
          this.componentArgs
          this.componentElementClass
          this.componentEvents
        }}
      >
        {{yield}}
      </Tag>
    {{/let}}
  </template>
}

export const createComponent = <
  I extends HTMLElement,
  E extends EventNames = Record<never, never>,
>({
  tagName,
  elementClass,
  events,
  displayName,
}: CreateComponentOptions<I, E>): GlimmerComponentClass<
  WebComponentSignature<I, E>
> => {
  class WebComponentComponent extends BaseWebComponentComponent<I, E> {
    static tagName = tagName;
    static elementClass = elementClass as Constructor<HTMLElement>;
    static events = (events ?? {}) as EventNames;
  }

  Object.defineProperty(WebComponentComponent, 'name', {
    value: displayName ?? elementClass.name,
  });

  return WebComponentComponent as unknown as GlimmerComponentClass<
    WebComponentSignature<I, E>
  >;
};

export type {
  ComponentArgs,
  CreateComponentOptions,
  ElementProps,
  WebComponentSignature,
};
