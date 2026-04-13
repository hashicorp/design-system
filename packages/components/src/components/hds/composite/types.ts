enum HdsCompositeOrientationValues {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export type HdsCompositeOrientations = `${HdsCompositeOrientationValues}`;

export interface HdsCompositeNavigationConfig {
  orientation: HdsCompositeOrientations | undefined;
  loop: boolean | HdsCompositeOrientations;
  wrap: boolean | HdsCompositeOrientations;
}

export interface HdsCompositeItem {
  id: string;
  element: HTMLElement;
  groupId?: string;
  disabled: boolean;
}

export interface HdsCompositeGroup {
  id: string;
  element: HTMLElement;
}

export interface HdsCompositeNavigationSnapshot {
  items: HdsCompositeItem[];
  groups: HdsCompositeGroup[];
  currentItem: HdsCompositeItem | undefined;
  currentIndex: number;
}
