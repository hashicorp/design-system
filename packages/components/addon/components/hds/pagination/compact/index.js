import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { inject as service } from '@ember/service';

export default class HdsPaginationCompactIndexComponent extends Component {
  @service router;

  constructor() {
    super(...arguments);

    let { queryPrev, queryNext, queryFunction } = this.args;

    // This component works in two different ways, depending if we need to support
    // routing through links (`LinkTo`) for the "navigation controls", or not.
    // If there's no routing then the component behaves as "uncontrolled"
    // (the state updates are handled by its internal logic).
    // If instead the component needs to update the routing (and we infer this via the "query" arguments)
    // then the component behaves as "controlled", where the state is
    // initialized and updated using the arguments passed to it.

    if (
      queryPrev === undefined &&
      queryNext === undefined &&
      queryFunction === undefined
    ) {
      this.hasRouting = false;
    } else {
      if (queryFunction) {
        assert(
          '@queryFunction for "Hds::Pagination::Numbered" must be a function',
          typeof queryFunction === 'function'
        );
      } else {
        assert(
          '@queryPrev and @queryNext for "Hds::Numbered" must be both or undefined or defined as objects/hashes (you can\'t have only one defined)',
          typeof queryPrev === 'object' && typeof queryNext === 'object'
        );
      }
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

  get routeQueryParams() {
    return this.router.currentRoute?.queryParams || {};
  }

  buildQueryParamsObject(page) {
    let { queryPrev, queryNext, queryFunction } = this.args;
    if (this.hasRouting) {
      if (queryFunction) {
        return this.args.queryFunction(page, this.currentPage);
      } else {
        let queryParams;
        if (page === 'prev') {
          queryParams = Object.assign({}, this.routeQueryParams, queryPrev);
        } else if (page === 'next') {
          queryParams = Object.assign({}, this.routeQueryParams, queryNext);
        }
        return queryParams;
      }
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
