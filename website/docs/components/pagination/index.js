/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

const getCursorParts = (cursor, records) => {
  const token = atob(cursor);
  const tokenParts = [...token.split('__')];
  const direction = tokenParts[0];
  const cursorID = parseInt(tokenParts[1]);
  const cursorIndex = records.findIndex(
    (element) => element.id === parseInt(cursorID)
  );
  return { direction, cursorID, cursorIndex };
};

const getNewPrevNextCursors = (cursor, pageSize, records) => {
  const { direction, cursorIndex } = getCursorParts(cursor, records);

  let newPrevCursor;
  let newNextCursor;

  const prevCursorIndex =
    direction === 'prev' ? cursorIndex - pageSize : cursorIndex;
  if (prevCursorIndex > 0) {
    const newPrevRecordId = records[prevCursorIndex].id;
    newPrevCursor = btoa(`prev__${newPrevRecordId}`);
  } else {
    newPrevCursor = null;
  }

  const nextCursorIndex =
    direction === 'next' ? cursorIndex + pageSize : cursorIndex;
  if (nextCursorIndex < records.length) {
    const newNextRecordId = records[nextCursorIndex].id;
    newNextCursor = btoa(`next__${newNextRecordId}`);
  } else {
    newNextCursor = null;
  }

  return {
    newPrevCursor,
    newNextCursor,
  };
};

export default class Index extends Component {
  @service router;

  @tracked demoPageSizes = [5, 10, 30];

  // ----------------------------
  // since this is techically a component and not a controller
  // we can't directly access the query parameters values (and then track them)
  // using the `queryParams` declaration, so we need to access them directly
  // via the router, and provide them as getter to the code snippets so they're
  // kept in sync with the URL whenever the user interacts with the demo component

  get demoCurrentPage() {
    return parseInt(
      this.router?.currentRoute?.queryParams?.demoCurrentPage ?? 1
    );
  }

  get demoCurrentPageSize() {
    return parseInt(
      this.router?.currentRoute?.queryParams?.demoCurrentPageSize ?? 5
    );
  }

  get demoExtraParam() {
    return this.router?.currentRoute?.queryParams?.demoExtraParam ?? '';
  }

  get demoCurrentCursor() {
    return (
      this.router?.currentRoute?.queryParams?.demoCurrentCursor ??
      btoa(`next__1`)
    );
  }

  // ----------------------------
  // At the moment we can't fetch data and pass it down here via the model
  // because this is a component, not a controller, so we don't have access
  // to the `show` model. We will figure out better approaches in the future.

  get model() {
    let records = [
      {
        id: 1,
        name: 'Burnaby Kuscha',
        email: '1_bkuscha0@tiny.cc',
        role: 'Owner',
      },
      {
        id: 2,
        name: 'Barton Penley',
        email: '2_bpenley1@miibeian.gov.cn',
        role: 'Admin',
      },
      {
        id: 3,
        name: 'Norina Emanulsson',
        email: '3_nemanulsson2@walmart.com',
        role: 'Contributor',
      },
      {
        id: 4,
        name: 'Orbadiah Smales',
        email: '4_osmales3@amazon.co.jp',
        role: 'Contributor',
      },
      {
        id: 5,
        name: 'Dido Titchener',
        email: '5_dtitchener4@blogs.com',
        role: 'Contributor',
      },
      {
        id: 6,
        name: 'Trish Horsburgh',
        email: '6_thorsburgh5@samsung.com',
        role: 'Contributor',
      },
      {
        id: 7,
        name: 'Orion Laverack',
        email: '7_olaverack6@techcrunch.com',
        role: 'Contributor',
      },
      {
        id: 8,
        name: 'Delly Moulsdale',
        email: '8_dmoulsdale7@sciencedirect.com',
        role: 'Contributor',
      },
      {
        id: 9,
        name: 'Gil Carlyle',
        email: '9_gcarlyle8@canalblog.com',
        role: 'Contributor',
      },
      {
        id: 10,
        name: 'Marinna Corbin',
        email: '10_mcorbin9@google.ca',
        role: 'Contributor',
      },
      {
        id: 11,
        name: 'Yardley Entwhistle',
        email: '11_yentwhistlea@tumblr.com',
        role: 'Contributor',
      },
      {
        id: 12,
        name: 'Brinn Clack',
        email: '12_bclackb@blogger.com',
        role: 'Contributor',
      },
      {
        id: 13,
        name: 'Charleen Millen',
        email: '13_cmillenc@mtv.com',
        role: 'Contributor',
      },
      {
        id: 14,
        name: 'Kalie Piers',
        email: '14_kpiersd@businessweek.com',
        role: 'Contributor',
      },
      {
        id: 15,
        name: 'Laure Boxer',
        email: '15_lboxere@elegantthemes.com',
        role: 'Contributor',
      },
      {
        id: 16,
        name: 'Libby Bonallack',
        email: '16_lbonallackf@disqus.com',
        role: 'Contributor',
      },
      {
        id: 17,
        name: 'Zebedee Gofton',
        email: '17_zgoftong@bbc.co.uk',
        role: 'Contributor',
      },
      {
        id: 18,
        name: 'Sari Eckford',
        email: '18_seckfordh@cloudflare.com',
        role: 'Contributor',
      },
      {
        id: 19,
        name: 'Carlos Byrth',
        email: '19_cbyrthi@prlog.org',
        role: 'Contributor',
      },
      {
        id: 20,
        name: 'Avery Allmark',
        email: '20_aallmarkj@webnode.com',
        role: 'Contributor',
      },
      {
        id: 21,
        name: 'Ninnette McSpirron',
        email: '21_nmcspirronk@amazon.com',
        role: 'Contributor',
      },
      {
        id: 22,
        name: 'Sharlene Ewestace',
        email: '22_sewestacel@twitpic.com',
        role: 'Contributor',
      },
      {
        id: 23,
        name: 'Jessamine Kembry',
        email: '23_jkembrym@hatena.ne.jp',
        role: 'Contributor',
      },
      {
        id: 24,
        name: 'Homerus Dixcee',
        email: '24_hdixceen@deviantart.com',
        role: 'Contributor',
      },
      {
        id: 25,
        name: 'Clevie Clear',
        email: '25_cclearo@tmall.com',
        role: 'Contributor',
      },
      {
        id: 26,
        name: 'Mohammed Hubatsch',
        email: '26_mhubatschp@salon.com',
        role: 'Contributor',
      },
      {
        id: 27,
        name: 'Gigi Hovard',
        email: '27_ghovardq@cbslocal.com',
        role: 'Contributor',
      },
      {
        id: 28,
        name: 'Dorey Tinker',
        email: '28_dtinkerr@google.co.uk',
        role: 'Contributor',
      },
      {
        id: 29,
        name: 'Arel Mullarkey',
        email: '29_amullarkeys@blogs.com',
        role: 'Contributor',
      },
      {
        id: 30,
        name: 'Veronike Ventura',
        email: '30_vventurat@google.fr',
        role: 'Contributor',
      },
      {
        id: 31,
        name: 'Gerti Dranfield',
        email: '31_gdranfieldu@vistaprint.com',
        role: 'Contributor',
      },
      {
        id: 32,
        name: 'Brigida Hembrow',
        email: '32_bhembrowv@webeden.co.uk',
        role: 'Contributor',
      },
      {
        id: 33,
        name: 'Aluin Dowding',
        email: '33_adowdingw@wisc.edu',
        role: 'Contributor',
      },
      {
        id: 34,
        name: 'Alli Pleasaunce',
        email: '34_apleasauncex@berkeley.edu',
        role: 'Contributor',
      },
      {
        id: 35,
        name: 'Cosimo Parcell',
        email: '35_cparcelly@jalbum.net',
        role: 'Contributor',
      },
      {
        id: 36,
        name: 'Kerri Lequeux',
        email: '36_klequeuxz@bing.com',
        role: 'Contributor',
      },
      {
        id: 37,
        name: 'Emilio Fidgin',
        email: '37_efidgin10@hud.gov',
        role: 'Contributor',
      },
      {
        id: 38,
        name: 'Ara Oxtiby',
        email: '38_aoxtiby11@apache.org',
        role: 'Contributor',
      },
      {
        id: 39,
        name: 'Harv Rapier',
        email: '39_hrapier12@amazon.co.jp',
        role: 'Contributor',
      },
    ];
    return { records };
  }

  // =============================
  // ROUTING DEMOS
  // =============================

  get demoRouteName() {
    // eg. 'components.pagination';
    return this.router.currentRouteName;
  }

  get demoTotalItems() {
    return this.model.records.length;
  }

  get demoQueryFunctionNumbered() {
    return (page, pageSize) => {
      return {
        // important: in order for this to work, the query param name needs to be added to the list of query params in the controller:
        // see: https://github.com/hashicorp/design-system/blob/main/website/app/controllers/show.js#L42-L53
        demoCurrentPage: page,
        demoCurrentPageSize: pageSize,
        // see: https://github.com/DockYard/ember-router-scroll#preservescrollposition-with-queryparams
        preserveScrollPosition: true,
      };
    };
  }

  @action
  async handlePageSizeChangeNumbered(pageSize) {
    const routeQueryParams = this?.router?.currentRoute?.queryParams ?? {};
    let queryParams = Object.assign({}, routeQueryParams);
    // the sensible thing to do here is to reset the pagination to the first element (any alternative would result in an unpredictable UX)
    queryParams.demoCurrentPage = 1;
    queryParams.demoCurrentPageSize = pageSize;
    // see: https://github.com/DockYard/ember-router-scroll#preservescrollposition-with-queryparams
    queryParams.preserveScrollPosition = true;
    // navigate to the new URL (notice: the anchor/fragment `#...` is not preserved unfortunately)
    await this.router.transitionTo({ queryParams });
  }

  get demoNewPrevNextCursors() {
    let { newPrevCursor, newNextCursor } = getNewPrevNextCursors(
      this.demoCurrentCursor,
      this.demoCurrentPageSize,
      this.model.records
    );
    return {
      newPrevCursor,
      newNextCursor,
    };
  }

  get demoQueryFunctionCompact() {
    let { newPrevCursor, newNextCursor } = this.demoNewPrevNextCursors;
    return (page) => {
      return {
        // important: in order for this to work, the query param name needs to be added to the list of query params in the controller:
        // see: https://github.com/hashicorp/design-system/blob/main/website/app/controllers/show.js#L42-L53
        demoCurrentCursor: page === 'prev' ? newPrevCursor : newNextCursor,
        demoExtraParam: 'hello',
        // see: https://github.com/DockYard/ember-router-scroll#preservescrollposition-with-queryparams
        preserveScrollPosition: true,
      };
    };
  }

  get demoIsDisabledPrev() {
    let { newPrevCursor } = this.demoNewPrevNextCursors;
    return newPrevCursor === null;
  }

  get demoIsDisabledNext() {
    let { newNextCursor } = this.demoNewPrevNextCursors;
    return newNextCursor === null;
  }

  get demoPaginatedDataNumbered() {
    const start = (this.demoCurrentPage - 1) * this.demoCurrentPageSize;
    const end = this.demoCurrentPage * this.demoCurrentPageSize;
    return this.model.records.slice(start, end);
  }

  get demoPaginatedDataCompact() {
    const { direction, cursorIndex } = getCursorParts(
      this.demoCurrentCursor,
      this.model.records
    );

    let start;
    let end;
    let pageSize = this.demoPageSizes[0];
    if (direction === 'prev') {
      end = cursorIndex;
      start = cursorIndex - pageSize;
    } else {
      start = cursorIndex;
      end = cursorIndex + pageSize;
    }

    // return data
    return this.model.records.slice(start, end);
  }

  // =============================
  // GENERIC HANDLERS
  // =============================

  @action
  handlePageChange(page, pageSize) {
    console.log(
      pageSize !== undefined
        ? `Page changed to "${page}" with page size equal to "${pageSize}"!`
        : `Page changed to "${page}"!`
    );
  }

  @action
  handlePageSizeChange(size) {
    console.log(`Page size changed to "${size}"!`);
  }
}
