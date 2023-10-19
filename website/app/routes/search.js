import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

import ENV from 'website/config/environment';

function encode(str) {
  var replace = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00',
  };
  return encodeURIComponent(str).replace(
    /[!'\(\)~]|%20|%00/g,
    function (match) {
      return replace[match];
    }
  );
}

export default class SearchRoute extends Route {
  queryParams = {
    fullTextSearch: {
      refreshModel: true,
    },
  };

  @service router;

  async model(params) {
    if (params.fullTextSearch) {
      // for some reasons using `new URLSearchParams({…})` throws a 500 error!
      const queryParams = {
        cx: '8758940bd156047cf',
        q: params.fullTextSearch,
        key: ENV.APP.GOOGLE_SEARCH_KEY,
        prettyPrint: true,
      };
      const queryParamsString = Object.keys(queryParams)
        .map((key) => encode(key) + '=' + encode(queryParams[key]))
        .join('&');

      try {
        // TODO:
        // - handle failure of request (timeout, 404, no authorization, etc)
        // - decide if use the google API library (eg. gapi.client.load(), see "Javascript" example here: https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list?apix=true)
        const googleSearchRequest = await fetch(
          `https://customsearch.googleapis.com/customsearch/v1?${queryParamsString}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // mode: 'cors', // no-cors, *cors, same-origin
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
          }
        );
        const googleSearchResponse = await googleSearchRequest.json();

        // TODO!
        // the response already contains the prev/next parameters
        // we have to decide if use them for pagination of the results
        // or instead show only the fist batch of N results (where N could be 100)
        if (googleSearchResponse.items) {
          return {
            query: params.fullTextSearch,
            results: googleSearchResponse.items,
          };
        } else {
          return {
            query: params.fullTextSearch,
            results: null,
          };
        }
      } catch (err) {
        console.error('Error', err);
        return {
          query: params.fullTextSearch,
          results: null,
          error: err,
        };
      }
    } else {
      return {};
    }
  }
}
