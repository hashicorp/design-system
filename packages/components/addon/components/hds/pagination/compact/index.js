/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { inject as service } from '@ember/service';

export default class HdsPaginationCompactIndexComponent extends Component {
  @service router;

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
      this.hasRouting = false;
    } else {
      assert(
        '@queryFunction for "Hds::Pagination::Numbered" must be a function',
        typeof queryFunction === 'function'
      );
      this.hasRouting = true;
    }
  }

  /**
   * @param showLabels
   * @type {boolean}
   * @default true
   * @description Show the labels for the "prev/next" controls
   */
  get showLabels() {
    let { showLabels = true } = this.args;

    return showLabels;
  }

  /**
   * @param ariaLabel
   * @type {string}
   * @default 'Pagination navigation'
   */
  get ariaLabel() {
    return this.args.ariaLabel ?? 'Pagination navigation';
  }

  get routeQueryParams() {
    return this.router.currentRoute?.queryParams || {};
  }

  buildQueryParamsObject(page) {
    if (this.hasRouting) {
      return this.args.queryFunction(page, this.currentPage);
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
    if (this.hasRouting) {
      routing.queryPrev = this.buildQueryParamsObject('prev');
      routing.queryNext = this.buildQueryParamsObject('next');
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
}
