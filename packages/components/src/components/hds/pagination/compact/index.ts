/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';

// for context about the decision to use these values, see:
// https://hashicorp.slack.com/archives/C03A0N1QK8S/p1673546329082759
export const DEFAULT_PAGE_SIZES = [10, 30, 50];

export default class HdsPaginationCompactIndexComponent extends Component {
  // This private variable is used to differentiate between
  // "uncontrolled" component (where the state is handled internally) and
  // "controlled" component (where the state is handled externally, by the consumer's code).
  // In the first case, the variable stores the internal state of the component at any moment,
  // and its value is updated internally according to the user's interaction with the component.
  // In the second case, the variable stores *only* the initial state of the component (coming from the arguments)
  // at rendering time, but from that moment on it's not updated anymore, no matter what interaction the user
  // has with the component (the state is controlled externally, eg. via query parameters)
  @tracked _currentPageSize = this.args.currentPageSize ?? this.pageSizes[0];
  @tracked isControlled;

  showLabels = this.args.showLabels ?? true; // if the labels for the "prev/next" controls are visible
  showSizeSelector = this.args.showSizeSelector ?? false; // if the "size selector" block is visible

  constructor() {
    super(...arguments);

    let { queryFunction } = this.args;

    // This component works in two different ways, depending if we need to support
    // routing through links (`LinkTo`) for the "navigation controls", or not.
    // If there's no routing then the component behaves as "uncontrolled"
    // (the state updates are handled by its internal logic).
    // If instead the component needs to update the routing (and we infer this via the "query" arguments)
    // then the component behaves as "controlled", where the state is
    // initialized and updated using the arguments passed to it.

    if (queryFunction === undefined) {
      this.isControlled = false;
    } else {
      assert(
        '@queryFunction for "Hds::Pagination::Numbered" must be a function',
        typeof queryFunction === 'function'
      );
      this.isControlled = true;
    }
  }

  /**
   * @param ariaLabel
   * @type {string}
   * @default 'Pagination'
   */
  get ariaLabel() {
    return this.args.ariaLabel ?? 'Pagination';
  }

  // This very specific `get/set` pattern is used to handle the two different use cases of the component
  // being "controlled" (when it has routing, meaning it needs to support pagination controls as links/`LinkTo`)
  // vs being "uncontrolled" (see comments above for details).
  //
  // If it has routing (and so it's "controlled"), than the value ("state") of the `currentPageSize` variable
  // is *always* determined by the controller via arguments (most of the times, connected to query parameters in the URL).
  // For this reason the "get" method always returns the value from the `args`,
  // while the "set" method never updates the private internal state (_variable).
  //
  // If instead it doesn't have routing (and so it's "uncontrolled") than the value ("state") of the `currentPageSize` variables
  // is *always* determined by the component's internal logic (and updated according to the user interaction with it).
  // For this reason the "get" and "set" methods always read from or write to the private internal state (_variable).

  get currentPageSize() {
    if (this.isControlled) {
      return this.args.currentPageSize;
    } else {
      return this._currentPageSize;
    }
  }

  set currentPageSize(value) {
    if (this.isControlled) {
      // noop
    } else {
      this._currentPageSize = value;
    }
  }

  /**
   * @param pageSizes
   * @type {array of numbers}
   * @description Set the page sizes users can select from.
   * @default [10, 30, 50]
   */
  get pageSizes() {
    let { pageSizes = DEFAULT_PAGE_SIZES } = this.args;

    assert(
      `pageSizes argument must be an array. Received: ${pageSizes}`,
      Array.isArray(pageSizes) === true
    );

    return pageSizes;
  }

  buildQueryParamsObject(page, pageSize) {
    if (this.isControlled) {
      return this.args.queryFunction(page, pageSize);
    } else {
      return {};
    }
  }

  get routing() {
    let routing = {
      route: this.args.route ?? undefined,
      model: this.args.model ?? undefined,
      models: this.args.models ?? undefined,
      replace: this.args.replace ?? undefined,
    };

    // the "query" is dynamic and needs to be calculated
    if (this.isControlled) {
      routing.queryPrev = this.buildQueryParamsObject(
        'prev',
        this.currentPageSize
      );
      routing.queryNext = this.buildQueryParamsObject(
        'next',
        this.currentPageSize
      );
    } else {
      routing.queryPrev = undefined;
      routing.queryNext = undefined;
    }

    return routing;
  }

  @action
  onPageChange(newPage) {
    this.currentPage = newPage;

    let { onPageChange } = this.args;

    if (typeof onPageChange === 'function') {
      onPageChange(newPage);
    }
  }

  @action
  onPageSizeChange(newPageSize) {
    let { onPageSizeChange } = this.args;

    // invoke the callback function
    if (typeof onPageSizeChange === 'function') {
      onPageSizeChange(newPageSize);
    }
  }
}
