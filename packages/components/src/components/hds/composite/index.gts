import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import { hash } from '@ember/helper';

import { guidFor } from '@ember/object/internals';

import { handleKey, findFirstEnabled } from './navigation.ts';

import type Owner from '@ember/owner';
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
  return items.slice().sort((left, right) => {
    const position = left.element.compareDocumentPosition(right.element);

    if ((position & Node.DOCUMENT_POSITION_FOLLOWING) !== 0) {
      return -1;
    }

    if ((position & Node.DOCUMENT_POSITION_PRECEDING) !== 0) {
      return 1;
    }

    return 0;
  });
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

  constructor(owner: Owner, args: HdsCompositeSignature['Args']) {
    super(owner, args);

    if (args.defaultCurrentId !== undefined) {
      this._currentId = args.defaultCurrentId;
    }
  }

  private get _currentItem(): HdsCompositeItem | undefined {
    if (this._currentId === null || this._currentId === undefined) {
      return undefined;
    }

    return this._items.find((item) => item.id === this._currentId);
  }

  private get _firstEnabledItem(): HdsCompositeItem | undefined {
    return findFirstEnabled(this._items);
  }

  private get _currentIndex(): number {
    if (this._currentId === null || this._currentId === undefined) {
      return -1;
    }

    return this._items.findIndex((item) => item.id === this._currentId);
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

  private _registerItem(newItem: HdsCompositeItem): void {
    newItem.groupId = findGroupId(newItem.element, this._groups);

    this._items = sortByDOMPosition([
      ...this._items.filter((item) => item.id !== newItem.id),
      newItem,
    ]);

    if (this._currentId === undefined) {
      if (this._firstEnabledItem !== undefined) {
        this._currentId = this._firstEnabledItem.id;
      }
    }

    this._syncAllElements();
  }

  private _unregisterItem(id: string): void {
    const wasCurrent = this._currentId === id;
    this._items = this._items.filter((item) => item.id !== id);

    if (wasCurrent) {
      this._currentId =
        this._firstEnabledItem !== undefined ? this._firstEnabledItem.id : null;
      this._syncAllElements();

      const newActive = this._items.find((item) => item.id === this._currentId);

      if (newActive && newActive.element) {
        newActive.element.focus();
      }

      return;
    }

    this._syncAllElements();
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
      (item) => item.id === this._currentId
    );

    if (!currentExists && this._firstEnabledItem) {
      this._currentId = this._firstEnabledItem.id;
      this._syncAllElements();

      const newActive = this._items.find((item) => item.id === this._currentId);

      if (newActive && newActive.element) {
        newActive.element.focus();
      }
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
  }

  private _syncAllElements(): void {
    for (const item of this._items) {
      this._syncItemElement(item);
    }

    this._syncCompositeElement();
  }

  private _syncItemElement(item: HdsCompositeItem): void {
    const element = item.element;
    const isCurrent = item.id === this._currentId;

    if (item.disabled === true) {
      element.setAttribute('aria-disabled', 'true');
    } else {
      element.removeAttribute('aria-disabled');
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

    if (element === null) {
      return;
    }

    if (this._currentId === null || this._currentId === undefined) {
      element.setAttribute('tabindex', '0');
    } else {
      element.removeAttribute('tabindex');
    }
  }

  compositeModifier = modifier<HdsCompositeCompositeModifierSignature>(
    (element: HTMLElement) => {
      this._compositeElement = element;
      this._syncCompositeElement();

      const onKeyDown = (event: KeyboardEvent): void => {
        const target = handleKey(event, this._navigationSnapshot, this._config);

        if (target === undefined) {
          return;
        }

        event.preventDefault();

        this._moveTo(target.id);

        target.element.focus();
      };

      element.addEventListener('keydown', onKeyDown);

      return () => {
        element.removeEventListener('keydown', onKeyDown);

        if (this._compositeElement === element) {
          this._compositeElement = null;
        }
      };
    }
  );

  itemModifier = modifier<HdsCompositeItemModifierSignature>(
    (element: HTMLElement, _positional: unknown[], named) => {
      const disabled = named.disabled ?? false;
      const id = getElementId(element, 'composite-item');

      element.id = id;

      this._registerItem({ id, element, disabled });

      const onFocus = (): void => {
        const item = this._items.find((registered) => registered.id === id);

        if (item === undefined || item.disabled === true) {
          return;
        }

        this._moveTo(id);
      };

      element.addEventListener('focus', onFocus);

      return () => {
        element.removeEventListener('focus', onFocus);

        this._unregisterItem(id);
      };
    }
  );

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
