/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import Modifier, { modifier } from 'ember-modifier';
import { hash } from '@ember/helper';
import { registerDestructor } from '@ember/destroyable';

import { guidFor } from '@ember/object/internals';

import { handleKey, findFirstEnabled } from './navigation.ts';

import type Owner from '@ember/owner';
import type { ArgsFor, PositionalArgs } from 'ember-modifier';
import type { ModifierLike } from '@glint/template';
import type {
  HdsCompositeOrientations,
  HdsCompositeNavigationConfig,
  HdsCompositeNavigationSnapshot,
  HdsCompositeItem,
  HdsCompositeGroup,
} from './types.ts';

function getElementId(element: HTMLElement, prefix: string): string {
  if (element.id !== '') {
    return element.id;
  }

  return `${prefix}-${guidFor(element)}`;
}

function sortByDOMPosition<T extends { element: HTMLElement }>(
  items: T[]
): T[] {
  const indexedItems = items.map((item, index) => ({ item, index }));

  return indexedItems
    .slice()
    .sort((leftEntry, rightEntry) => {
      const { item: left, index: leftIndex } = leftEntry;
      const { item: right, index: rightIndex } = rightEntry;

      if (!left.element.isConnected && right.element.isConnected) {
        return 1;
      }

      if (left.element.isConnected && !right.element.isConnected) {
        return -1;
      }

      const position = left.element.compareDocumentPosition(right.element);

      if ((position & Node.DOCUMENT_POSITION_FOLLOWING) !== 0) {
        return -1;
      }

      if ((position & Node.DOCUMENT_POSITION_PRECEDING) !== 0) {
        return 1;
      }

      // keep sort stable when DOM position cannot be resolved
      return leftIndex - rightIndex;
    })
    .map((entry) => entry.item);
}

function findGroupId(
  element: HTMLElement,
  groups: { id: string; element: HTMLElement }[]
): string | undefined {
  for (const group of groups) {
    if (group.element.contains(element)) {
      return group.id;
    }
  }

  return undefined;
}

interface HdsCompositeCompositeModifierSignature {
  Element: HTMLElement;
}

interface HdsCompositeItemModifierSignature {
  Element: HTMLElement;
  Args: {
    Named: {
      disabled?: boolean;
    };
  };
}

interface HdsCompositeGroupModifierSignature {
  Element: HTMLElement;
}

interface HdsCompositeItemRegistry {
  registerItem: (item: HdsCompositeItem) => void;
  updateItem: (id: string, disabled: boolean) => void;
  unregisterItem: (id: string) => void;
  focusItem: (id: string) => void;
}

function createItemModifier(
  registry: HdsCompositeItemRegistry
): ModifierLike<HdsCompositeItemModifierSignature> {
  return class HdsCompositeItemModifier extends Modifier<HdsCompositeItemModifierSignature> {
    private _element: HTMLElement | null = null;
    private _id: string | null = null;

    constructor(
      owner: Owner,
      args: ArgsFor<HdsCompositeItemModifierSignature>
    ) {
      super(owner, args);

      registerDestructor(this, () => {
        this._teardown();
      });
    }

    modify(
      element: HTMLElement,
      _positional: PositionalArgs<HdsCompositeItemModifierSignature>,
      named: HdsCompositeItemModifierSignature['Args']['Named']
    ): void {
      const disabled = named.disabled ?? false;

      // arguments re-evaluate whenever the surrounding data changes (e.g. a sorted row list),
      // so the item is updated in place rather than re-registered, which would lose the current item
      if (this._id !== null) {
        registry.updateItem(this._id, disabled);

        return;
      }

      const id = getElementId(element, 'composite-item');

      element.id = id;
      element.addEventListener('focus', this._onFocus);

      this._element = element;
      this._id = id;

      registry.registerItem({ id, element, disabled });
    }

    private _onFocus = (): void => {
      if (this._id !== null) {
        registry.focusItem(this._id);
      }
    };

    private _teardown(): void {
      if (this._element === null || this._id === null) {
        return;
      }

      this._element.removeEventListener('focus', this._onFocus);
      registry.unregisterItem(this._id);

      this._element = null;
      this._id = null;
    }
  };
}

export interface HdsCompositeSignature {
  Args: {
    orientation?: HdsCompositeOrientations;
    loop?: boolean | HdsCompositeOrientations;
    wrap?: boolean | HdsCompositeOrientations;
    defaultCurrentId?: string | null;
  };
  Blocks: {
    default: [
      {
        composite: ModifierLike<HdsCompositeCompositeModifierSignature>;
        item: ModifierLike<HdsCompositeItemModifierSignature>;
        group: ModifierLike<HdsCompositeGroupModifierSignature>;
      },
    ];
  };
}

export default class Composite extends Component<HdsCompositeSignature> {
  // not tracked because registration happens inside modifier installation
  private _items: HdsCompositeItem[] = [];
  private _groups: HdsCompositeGroup[] = [];

  // undefined = uninitialized (auto-select first enabled on registration)
  // null = explicitly no active item (container gets tabindex="0")
  // string = active item id
  private _currentId: string | null | undefined = undefined;

  private _compositeElement: HTMLElement | null = null;
  private _preserveTabIndex = false;

  // where the current item last was, so a removed current item can hand over to its neighbor
  private _lastCurrentIndex = 0;
  private _hasFocusWithin = false;

  constructor(owner: Owner, args: HdsCompositeSignature['Args']) {
    super(owner, args);

    if (args.defaultCurrentId !== undefined) {
      this._currentId = args.defaultCurrentId;
    }
  }

  private get _resolvedCurrentId(): string | null | undefined {
    // explicitly null (no active item)
    if (this._currentId === null) {
      return null;
    }

    const requestedItem = this._items.find(
      (item) => item.id === this._currentId
    );

    if (requestedItem !== undefined && requestedItem.disabled === false) {
      return this._currentId;
    }

    return this._firstEnabledItem !== undefined
      ? this._firstEnabledItem.id
      : undefined;
  }

  private get _currentItem(): HdsCompositeItem | undefined {
    const activeId = this._resolvedCurrentId;

    if (activeId === null || activeId === undefined) {
      return undefined;
    }

    return this._items.find((item) => item.id === activeId);
  }

  private get _firstEnabledItem(): HdsCompositeItem | undefined {
    return findFirstEnabled(this._items);
  }

  private get _currentIndex(): number {
    const activeId = this._resolvedCurrentId;

    if (activeId === null || activeId === undefined) {
      return -1;
    }

    return this._items.findIndex((item) => item.id === activeId);
  }

  private get _config(): HdsCompositeNavigationConfig {
    return {
      orientation: this.args.orientation,
      loop: this.args.loop ?? false,
      wrap: this.args.wrap ?? false,
    };
  }

  private get _navigationSnapshot(): HdsCompositeNavigationSnapshot {
    return {
      items: this._items,
      groups: this._groups,
      currentItem: this._currentItem,
      currentIndex: this._currentIndex,
    };
  }

  private _resortRegisteredElements(): void {
    this._groups = sortByDOMPosition(this._groups);
    this._items = sortByDOMPosition(this._items);
    this._reassociateGroups();
    this._rememberCurrentIndex();
  }

  private _registerItem(newItem: HdsCompositeItem): void {
    newItem.groupId = findGroupId(newItem.element, this._groups);

    this._items = sortByDOMPosition([
      ...this._items.filter((item) => item.id !== newItem.id),
      newItem,
    ]);

    this._syncAllElements();
  }

  private _updateItem(id: string, disabled: boolean): void {
    const existingItem = this._items.find((item) => item.id === id);

    if (existingItem === undefined || existingItem.disabled === disabled) {
      return;
    }

    this._items = this._items.map((item) =>
      item.id === id ? { ...item, disabled } : item
    );

    this._syncAllElements();
  }

  private _unregisterItem(id: string): void {
    const wasCurrent = this._resolvedCurrentId === id;
    const removedItem = this._items.find((item) => item.id === id);

    this._items = this._items.filter((item) => item.id !== id);

    if (!wasCurrent || removedItem === undefined) {
      this._syncAllElements();

      return;
    }

    const fallbackItem = this._findFallbackItem();

    // undefined = "auto", so items rendered later can still become active
    this._currentId = fallbackItem?.id;
    this._syncAllElements();

    if (
      fallbackItem !== undefined &&
      this._shouldRestoreFocus(removedItem.element)
    ) {
      fallbackItem.element.focus();
    }
  }

  // the enabled item closest to where the removed current item was
  private _findFallbackItem(): HdsCompositeItem | undefined {
    const candidates = sortByDOMPosition(this._items).filter(
      (item) => item.disabled === false && item.element.isConnected
    );

    if (candidates.length === 0) {
      return undefined;
    }

    const index = Math.min(this._lastCurrentIndex, candidates.length - 1);

    return candidates[index];
  }

  // only take focus back when it was inside the composite and got lost with the removed item
  private _shouldRestoreFocus(removedElement: HTMLElement): boolean {
    if (!this._hasFocusWithin) {
      return false;
    }

    const activeElement = document.activeElement;

    return (
      activeElement === null ||
      activeElement === document.body ||
      removedElement.contains(activeElement)
    );
  }

  private _rememberCurrentIndex(): void {
    const currentItem = this._currentItem;

    if (currentItem === undefined || !currentItem.element.isConnected) {
      return;
    }

    const index = this._items
      .filter((item) => item.disabled === false && item.element.isConnected)
      .indexOf(currentItem);

    if (index !== -1) {
      this._lastCurrentIndex = index;
    }
  }

  private _registerGroup(newGroup: HdsCompositeGroup): void {
    this._groups = sortByDOMPosition([
      ...this._groups.filter((group) => group.id !== newGroup.id),
      newGroup,
    ]);

    this._reassociateGroups();
  }

  private _unregisterGroup(id: string): void {
    this._groups = this._groups.filter((group) => group.id !== id);
    this._reassociateGroups();

    const currentExists = this._items.some(
      (item) => item.id === this._resolvedCurrentId
    );

    if (!currentExists && this._firstEnabledItem) {
      // reset to "auto" so group reordering/mount order can settle first
      this._currentId = undefined;
      this._syncAllElements();
    }
  }

  private _reassociateGroups(): void {
    for (const item of this._items) {
      item.groupId = findGroupId(item.element, this._groups);
    }
  }

  private _moveTo(id: string): void {
    if (this._currentId === id) {
      return;
    }

    const previousItem = this._currentItem;

    this._currentId = id;

    const nextItem = this._currentItem;

    if (previousItem !== undefined) {
      this._syncItemElement(previousItem);
    }

    if (nextItem !== undefined) {
      this._syncItemElement(nextItem);
    }

    this._syncCompositeElement();
    this._rememberCurrentIndex();
  }

  private _syncAllElements(): void {
    for (const item of this._items) {
      this._syncItemElement(item);
    }

    this._syncCompositeElement();
  }

  private _syncItemElement(item: HdsCompositeItem): void {
    const element = item.element;
    const isCurrent = item.id === this._resolvedCurrentId;

    if (item.disabled === true) {
      element.setAttribute('aria-disabled', 'true');
      element.setAttribute('disabled', '');
      element.setAttribute('tabindex', '-1');
    } else {
      element.removeAttribute('aria-disabled');
      element.removeAttribute('disabled');
      element.setAttribute('tabindex', isCurrent === true ? '0' : '-1');
    }

    if (isCurrent === true) {
      element.setAttribute('data-active-item', '');
    } else {
      element.removeAttribute('data-active-item');
    }

    element.setAttribute('tabindex', isCurrent === true ? '0' : '-1');
  }

  private _syncCompositeElement(): void {
    const element = this._compositeElement;

    if (element === null || this._preserveTabIndex === true) {
      return;
    }

    const activeId = this._resolvedCurrentId;

    if (activeId === null || activeId === undefined) {
      element.setAttribute('tabindex', '0');
    } else {
      element.removeAttribute('tabindex');
    }
  }

  compositeModifier = modifier<HdsCompositeCompositeModifierSignature>(
    (element: HTMLElement) => {
      this._compositeElement = element;
      this._preserveTabIndex = element.hasAttribute('tabindex');

      this._syncCompositeElement();

      const onKeyDown = (event: KeyboardEvent): void => {
        const managedKeys = [
          'ArrowUp',
          'ArrowDown',
          'ArrowLeft',
          'ArrowRight',
          'Home',
          'End',
          'PageUp',
          'PageDown',
        ];

        if (managedKeys.includes(event.key)) {
          event.preventDefault();
        }

        this._resortRegisteredElements();

        const target = handleKey(event, this._navigationSnapshot, this._config);

        if (target === undefined) {
          return;
        }

        this._moveTo(target.id);

        target.element.focus();
      };

      element.addEventListener('keydown', onKeyDown);

      const onFocusIn = (): void => {
        this._hasFocusWithin = true;
      };

      const onFocusOut = (event: FocusEvent): void => {
        const target = event.target;

        // some browsers fire focusout when a focused element is removed from the DOM, which
        // isn't focus leaving the composite, so the check waits until the removal is done
        queueMicrotask(() => {
          if (target instanceof Node && !target.isConnected) {
            return;
          }

          this._hasFocusWithin = element.contains(document.activeElement);
        });
      };

      element.addEventListener('focusin', onFocusIn);
      element.addEventListener('focusout', onFocusOut);

      return () => {
        element.removeEventListener('keydown', onKeyDown);
        element.removeEventListener('focusin', onFocusIn);
        element.removeEventListener('focusout', onFocusOut);

        if (this._compositeElement === element) {
          this._compositeElement = null;
          this._hasFocusWithin = false;
        }
      };
    }
  );

  itemModifier = createItemModifier({
    registerItem: (item) => {
      this._registerItem(item);
    },
    updateItem: (id, disabled) => {
      this._updateItem(id, disabled);
    },
    unregisterItem: (id) => {
      this._unregisterItem(id);
    },
    focusItem: (id) => {
      const item = this._items.find((registered) => registered.id === id);

      if (item === undefined || item.disabled === true) {
        return;
      }

      this._moveTo(id);
    },
  });

  groupModifier = modifier<HdsCompositeGroupModifierSignature>(
    (element: HTMLElement) => {
      const id = getElementId(element, 'composite-group');

      element.id = id;

      this._registerGroup({ id, element });

      return () => {
        this._unregisterGroup(id);
      };
    }
  );

  <template>
    {{yield
      (hash
        composite=this.compositeModifier
        item=this.itemModifier
        group=this.groupModifier
      )
    }}
  </template>
}
