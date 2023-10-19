import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SearchRoute extends Route {
  queryParams = {
    fullTextSearch: {
      refreshModel: true,
    },
  };

  @service router;

  model(params) {
    if (params.fullTextSearch) {
      return {
        query: params.fullTextSearch,
        results: [
          {
            title: 'Lorem',
            description: 'Lorem <b>ipsum dolor</b> sit amet',
            snippet:
              'Morbi a <b>libero</b> luctus, aliquet nisi ut, lacinia orci. Vestibulum at commodo erat, vitae bibendum...',
            link: '#',
            thumbnailSrc: 'assets/illustrations/components/accordion.jpg',
          },
          {
            title: 'Ipsum',
            description: 'Lorem ipsum dolor sit amet',
            link: '#',
            thumbnailSrc: 'assets/illustrations/components/button.jpg',
          },
          {
            title: 'Dolor',
            snippet:
              'In posuere leo eu <b>lectus aliquam</b>, blandit aliquet ligula eleifend. Sed vel elit eu risus...',
            link: '#',
            thumbnailSrc: 'assets/illustrations/components/dropdown.jpg',
          },
        ],
      };
    } else {
      return {};
    }
  }
}
