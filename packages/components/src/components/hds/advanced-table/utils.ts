import type { HdsAdvancedTableModelItem } from './types';

export const getScrollIndicatorDimensions = (
  scrollWrapper: HTMLDivElement,
  theadElement: HTMLDivElement,
  hasStickyHeader: boolean,
  hasStickyFirstColumn: boolean
) => {
  const horizontalScrollBarHeight =
    scrollWrapper.offsetHeight - scrollWrapper.clientHeight;
  const verticalScrollBarWidth =
    scrollWrapper.offsetWidth - scrollWrapper.clientWidth;

  let leftOffset = 0;

  if (hasStickyFirstColumn) {
    const stickyColumnHeaders = theadElement.querySelectorAll(
      '.hds-advanced-table__th--is-sticky-column'
    );

    stickyColumnHeaders?.forEach((el) => {
      // querySelectorAll returns Elements, which don't have offsetWidth
      // need to use offsetWidth to account for the cell borders
      const elAsHTMLElement = el as HTMLElement;
      leftOffset += elAsHTMLElement.offsetWidth;
    });

    // offsets the left: -1px position if there are multiple sticky columns
    if (stickyColumnHeaders.length > 1) {
      leftOffset -= 1;
    }
  }

  return {
    bottom: `${horizontalScrollBarHeight}px`,
    height: `${scrollWrapper.clientHeight - horizontalScrollBarHeight}px`,
    left: `${leftOffset}px`,
    right: `${verticalScrollBarWidth}px`,
    top: hasStickyHeader ? `${theadElement.offsetHeight}px` : '0px',
    width: `${scrollWrapper.clientWidth - verticalScrollBarWidth}px`,
  };
};

export const getStickyColumnLeftOffset = (
  theadElement: HTMLDivElement,
  hasRowSelection: boolean
) => {
  // if there is no select checkbox column, the sticky column is all the way to the left
  if (!hasRowSelection) return '0px';

  const selectableCell = theadElement.querySelector(
    '.hds-advanced-table__th--is-selectable'
  ) as HTMLElement;

  // otherwise, the left offset is the width of the select checkbox column + 0.5px for the border
  return `${selectableCell?.offsetWidth + 0.5}px`;
};

// we use duck typing to check if the item is an Ember Data model
export const isEmberDataModel = (
  item: HdsAdvancedTableModelItem
): item is import('@ember-data/model').default => {
  return (
    'constructor' in item &&
    typeof item.constructor === 'function' &&
    'modelName' in item.constructor &&
    typeof item.constructor.modelName === 'string' &&
    'serialize' in item &&
    typeof item.serialize === 'function'
  );
};
