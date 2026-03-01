import type {
  HdsCompositeItem,
  HdsCompositeNavigationConfig,
  HdsCompositeNavigationSnapshot,
  HdsCompositeOrientations,
} from './types';

function matchesAxis(
  value: boolean | HdsCompositeOrientations,
  axis: HdsCompositeOrientations
): boolean {
  // `true` matches all axes, a string value matches only that axis
  return value === true || value === axis;
}

function findEnabledItem(
  items: HdsCompositeItem[],
  startIndex: number,
  direction: 1 | -1,
  loop: boolean
): HdsCompositeItem | undefined {
  const length = items.length;

  if (length === 0) {
    return undefined;
  }

  let index = startIndex + direction;

  if (loop === true) {
    for (let step = 0; step < length; step++) {
      const item = items[((index % length) + length) % length]!;

      if (item.disabled === false) {
        return item;
      }

      index += direction;
    }
  } else {
    while (index >= 0 && index < length) {
      const item = items[index]!;

      if (item.disabled === false) {
        return item;
      }

      index += direction;
    }
  }

  return undefined;
}

export function findFirstEnabled(
  items: HdsCompositeItem[]
): HdsCompositeItem | undefined {
  return items.find((item) => item.disabled === false);
}

function findLastEnabled(
  items: HdsCompositeItem[]
): HdsCompositeItem | undefined {
  for (let index = items.length - 1; index >= 0; index--) {
    if (items[index]!.disabled === false) {
      return items[index];
    }
  }

  return undefined;
}

function getItemsInGroup(
  items: HdsCompositeItem[],
  groupId: string
): HdsCompositeItem[] {
  return items.filter((item) => item.groupId === groupId);
}

function resolveColumnTarget(
  targetItems: HdsCompositeItem[],
  columnIndex: number
): HdsCompositeItem | undefined {
  if (columnIndex < 0 || columnIndex >= targetItems.length) {
    return findLastEnabled(targetItems);
  }

  const target = targetItems[columnIndex]!;

  if (target.disabled === false) {
    return target;
  }

  return (
    findEnabledItem(targetItems, columnIndex, 1, false) ??
    findEnabledItem(targetItems, columnIndex, -1, false)
  );
}

export function handleKey(
  event: KeyboardEvent,
  snapshot: HdsCompositeNavigationSnapshot,
  config: HdsCompositeNavigationConfig
): HdsCompositeItem | undefined {
  const { key, ctrlKey } = event;
  const hasGroups = snapshot.groups.length > 0;

  if (hasGroups === true && config.orientation === undefined) {
    return handle2DKey(key, ctrlKey, snapshot, config);
  }

  return handle1DKey(key, snapshot, config);
}

function handle1DKey(
  key: string,
  snapshot: HdsCompositeNavigationSnapshot,
  config: HdsCompositeNavigationConfig
): HdsCompositeItem | undefined {
  const { orientation } = config;

  switch (key) {
    case 'ArrowRight':
      if (orientation === 'vertical') {
        return undefined;
      }

      return navigateLinear(snapshot, config, 'horizontal', 1);

    case 'ArrowLeft':
      if (orientation === 'vertical') {
        return undefined;
      }

      return navigateLinear(snapshot, config, 'horizontal', -1);

    case 'ArrowDown':
      if (orientation === 'horizontal') {
        return undefined;
      }

      return navigateLinear(snapshot, config, 'vertical', 1);

    case 'ArrowUp':
      if (orientation === 'horizontal') {
        return undefined;
      }

      return navigateLinear(snapshot, config, 'vertical', -1);

    case 'Home':
      return findFirstEnabled(snapshot.items);

    case 'End':
      return findLastEnabled(snapshot.items);

    default:
      return undefined;
  }
}

function handle2DKey(
  key: string,
  ctrlKey: boolean,
  snapshot: HdsCompositeNavigationSnapshot,
  config: HdsCompositeNavigationConfig
): HdsCompositeItem | undefined {
  switch (key) {
    case 'ArrowRight':
      return navigateInRow(snapshot, config, 1);

    case 'ArrowLeft':
      return navigateInRow(snapshot, config, -1);

    case 'ArrowDown':
      return navigateColumn(snapshot, config, 1);

    case 'ArrowUp':
      return navigateColumn(snapshot, config, -1);

    case 'Home':
      if (ctrlKey === true) {
        return findFirstEnabled(snapshot.items);
      }

      return navigateRowEnd(snapshot, -1);

    case 'End':
      if (ctrlKey === true) {
        return findLastEnabled(snapshot.items);
      }

      return navigateRowEnd(snapshot, 1);

    case 'PageDown':
      return navigateColumnEnd(snapshot, config, 1);

    case 'PageUp':
      return navigateColumnEnd(snapshot, config, -1);

    default:
      return undefined;
  }
}

function navigateLinear(
  snapshot: HdsCompositeNavigationSnapshot,
  config: HdsCompositeNavigationConfig,
  axis: HdsCompositeOrientations,
  direction: 1 | -1
): HdsCompositeItem | undefined {
  const { items, currentIndex } = snapshot;

  if (currentIndex === -1) {
    return direction === 1 ? findFirstEnabled(items) : findLastEnabled(items);
  }

  return findEnabledItem(
    items,
    currentIndex,
    direction,
    matchesAxis(config.loop, axis)
  );
}

function navigateInRow(
  snapshot: HdsCompositeNavigationSnapshot,
  config: HdsCompositeNavigationConfig,
  direction: 1 | -1
): HdsCompositeItem | undefined {
  const { currentItem, items, groups } = snapshot;

  if (currentItem === undefined || currentItem.groupId === undefined) {
    return undefined;
  }

  const rowItems = getItemsInGroup(items, currentItem.groupId);
  const rowIndex = rowItems.findIndex((item) => item.id === currentItem.id);
  const shouldLoop = matchesAxis(config.loop, 'horizontal');
  const found = findEnabledItem(rowItems, rowIndex, direction, shouldLoop);

  if (found !== undefined) {
    return found;
  }

  if (matchesAxis(config.wrap, 'horizontal') === false) {
    return undefined;
  }

  const groupIndex = groups.findIndex(
    (group) => group.id === currentItem.groupId
  );
  const adjacentGroupIndex = groupIndex + direction;

  if (adjacentGroupIndex < 0 || adjacentGroupIndex >= groups.length) {
    return undefined;
  }

  const adjacentItems = getItemsInGroup(items, groups[adjacentGroupIndex]!.id);

  return direction === 1
    ? findFirstEnabled(adjacentItems)
    : findLastEnabled(adjacentItems);
}

function navigateColumn(
  snapshot: HdsCompositeNavigationSnapshot,
  config: HdsCompositeNavigationConfig,
  direction: 1 | -1
): HdsCompositeItem | undefined {
  const { currentItem, items, groups } = snapshot;

  if (currentItem === undefined || currentItem.groupId === undefined) {
    return undefined;
  }

  const columnIndex = getItemsInGroup(items, currentItem.groupId).findIndex(
    (item) => item.id === currentItem.id
  );

  const currentGroupIndex = groups.findIndex(
    (group) => group.id === currentItem.groupId
  );

  let targetGroupIndex = currentGroupIndex + direction;

  if (matchesAxis(config.loop, 'vertical') === true) {
    const length = groups.length;
    targetGroupIndex = ((targetGroupIndex % length) + length) % length;

    if (targetGroupIndex === currentGroupIndex) {
      return undefined;
    }
  } else if (targetGroupIndex < 0 || targetGroupIndex >= groups.length) {
    if (matchesAxis(config.wrap, 'vertical') === false) {
      return undefined;
    }

    const wrapGroupIndex = direction === 1 ? 0 : groups.length - 1;
    const nextColumnIndex = columnIndex + direction;
    const wrapItems = getItemsInGroup(items, groups[wrapGroupIndex]!.id);

    if (nextColumnIndex < 0 || nextColumnIndex >= wrapItems.length) {
      return undefined;
    }

    return resolveColumnTarget(wrapItems, nextColumnIndex);
  }

  const targetItems = getItemsInGroup(items, groups[targetGroupIndex]!.id);

  return resolveColumnTarget(targetItems, columnIndex);
}

function navigateColumnEnd(
  snapshot: HdsCompositeNavigationSnapshot,
  config: HdsCompositeNavigationConfig,
  direction: 1 | -1
): HdsCompositeItem | undefined {
  const { currentItem, items, groups } = snapshot;

  if (currentItem === undefined || currentItem.groupId === undefined) {
    return undefined;
  }

  const columnIndex = getItemsInGroup(items, currentItem.groupId).findIndex(
    (item) => item.id === currentItem.id
  );

  const targetGroupIndex = direction === 1 ? groups.length - 1 : 0;

  const targetItems = getItemsInGroup(items, groups[targetGroupIndex]!.id);

  return resolveColumnTarget(targetItems, columnIndex);
}

function navigateRowEnd(
  snapshot: HdsCompositeNavigationSnapshot,
  direction: 1 | -1
): HdsCompositeItem | undefined {
  const { currentItem, items } = snapshot;

  if (currentItem === undefined || currentItem.groupId === undefined) {
    return undefined;
  }

  const rowItems = getItemsInGroup(items, currentItem.groupId);

  return direction === 1
    ? findLastEnabled(rowItems)
    : findFirstEnabled(rowItems);
}
