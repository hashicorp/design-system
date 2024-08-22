import type { HdsPaginationElliptizedPageArray } from './types';

const ELLIPSIS = '…';

interface ElliptizeProps {
  pages: number[];
  current: number;
  limit?: number;
}

export const elliptize = ({
  pages,
  current,
  limit = 7,
}: ElliptizeProps): HdsPaginationElliptizedPageArray => {
  const length = pages.length;

  let result = [];
  let start;
  let end;

  if (length <= limit) {
    return pages;
  }

  if (current <= length / 2) {
    start = Math.ceil(limit / 2);
    end = limit - start;
  } else {
    end = Math.ceil(limit / 2);
    start = limit - end;
  }

  const sliceStart: HdsPaginationElliptizedPageArray = pages.slice(0, start);
  const sliceEnd: HdsPaginationElliptizedPageArray = pages.slice(-end);

  if (sliceStart.includes(current) && sliceStart.includes(current + 1)) {
    // "current" (and its next sibling) is contained within the "sliceStart" block
    sliceEnd.splice(0, 1, ELLIPSIS);
    result = ([] as HdsPaginationElliptizedPageArray).concat(
      sliceStart,
      sliceEnd
    );
  } else if (sliceEnd.includes(current - 1) && sliceEnd.includes(current)) {
    // "current" (and its prev sibling) is contained within the "sliceEnd" block
    sliceStart.splice(-1, 1, ELLIPSIS);
    result = ([] as HdsPaginationElliptizedPageArray).concat(
      sliceStart,
      sliceEnd
    );
  } else {
    // this is a bit more tricky :)
    // we need to calculate how many items there are before/after the current item
    // since both the initial and ending blocks are always 2 items long (number + ellipsis)
    // and there is always the "current" item, we can just subtract 5 from the limit
    const delta = (limit - 5) / 2; // this is why the limit needs to be an odd number
    // we slice the array starting at the "current" index, minus the delta, minus one because it's an array (zero-based)
    const sliceCurr = pages.slice(current - delta - 1, current + delta);
    result = ([] as HdsPaginationElliptizedPageArray).concat(
      sliceStart.shift() as number,
      ELLIPSIS,
      sliceCurr,
      ELLIPSIS,
      sliceEnd.pop() as number
    );
  }

  return result;
};
