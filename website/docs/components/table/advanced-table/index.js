/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Index extends Component {
  @tracked demoCurrentPage = 1;
  @tracked demoCurrentPageSize = 2;
  @tracked demoSourceData = [
    {
      id: '1',
      type: 'folk',
      artist: 'Nick Drake',
      album: 'Pink Moon',
      year: '1972',
      quote:
        "The song is very special. It's an old song by a guy named Nick Drake. It's called 'Pink Moon' and is actually a very good introduction to Nick Drake if you're not familiar with him. It's very transporting. And to us seemed very fitting for a beautiful drive in the country on a very special night.",
      'vinyl-cost': '29.27',
      icon: 'boundary-color',
      'badge-type': 'filled',
      'badge-color': 'neutral',
    },
    {
      id: '2',
      type: 'folk',
      artist: 'The Beatles',
      album: 'Abbey Road',
      year: '1969',
      quote:
        "it was the Beatles' last love letter to the world...lush, rich, smooth, epic, emotional and utterly gorgeous",
      'vinyl-cost': '25.99',
      icon: 'consul-color',
      'badge-type': 'outlined',
      'badge-color': 'neutral',
    },
    {
      id: '3',
      type: 'folk',
      artist: 'Melanie',
      album: 'Candles in the Rain',
      year: '1971',
      quote:
        'Candles in the Rain matched material and interpretation with greater skill than she had in the past, and it ranks with her finest work',
      'vinyl-cost': '46.49',
      icon: 'terraform-color',
      'badge-type': 'filled',
      'badge-color': 'highlight',
    },
    {
      id: '4',
      type: 'folk',
      artist: 'Bob Dylan',
      album: 'Bringing It All Back Home',
      year: '1965',
      quote:
        'By fusing the Chuck Berry beat of the Rolling Stones and the Beatles with the leftist, folk tradition of the folk revival, Dylan really had brought it back home, creating a new kind of rock & roll that made every type of artistic tradition available to rock.',
      'vinyl-cost': '29.00',
      icon: 'nomad-color',
      'badge-type': 'outlined',
      'badge-color': 'success',
    },
    {
      id: '5',
      type: 'folk',
      artist: 'James Taylor',
      album: 'Sweet Baby James',
      year: '1970',
      quote:
        '(It) struck a chord with music fans, especially because of its attractive mixture of folk, country, gospel, and blues elements, all of them carefully understated and distanced.',
      'vinyl-cost': '16.00',
      icon: 'waypoint-color',
      'badge-type': 'filled',
      'badge-color': 'warning',
    },
    {
      id: '6',
      type: 'folk',
      artist: 'Simon and Garfunkel',
      album: 'Bridge Over Troubled Waters',
      year: '1970',
      quote:
        'Perhaps the most delicately textured album to close out the 1960s from any major rock act.',
      'vinyl-cost': '20.49',
      icon: 'vagrant-color',
      'badge-type': 'outlined',
      'badge-color': 'critical',
    },
  ];
  @tracked demoSortBySelectedData = [...this.demoSourceData].map(
    (row, index) => ({
      ...row,
      isSelected: index % 2 === 0,
    })
  );
  @tracked demoSortBySelectedControlledSortBy = 'isSelected';
  @tracked demoSortBySelectedControlledSortOrder = 'asc';

  get model() {
    return { myDemoData: this.demoSourceData };
  }

  get myDataItems() {
    return [
      {
        product: 'Terraform',
        brandColor: 'purple',
        usesHelios: true,
      },
      {
        product: 'Nomad',
        brandColor: 'green',
        usesHelios: true,
      },
      {
        product: 'Vault',
        brandColor: 'yellow',
        usesHelios: true,
      },
    ];
  }

  get demoDataWithLargeNumberOfColumns() {
    return [
      {
        first_name: 'Judith',
        last_name: 'Maxene',
        age: '43',
        email: 'j.maxene@randatmail.com',
        phone: '697-0732-81',
        education: 'Upper secondary school',
        occupation: 'Astronomer',
        bio: 'Analyst. Gamer. Friendly explorer. Incurable TV lover. Social media scholar. Amateur web geek. Proud zombie guru.',
      },
      {
        first_name: 'Elmira',
        last_name: 'Aishah',
        age: '28',
        email: 'e.aishah@randatmail.com',
        phone: '155-6076-27',
        education: 'Master in Physics',
        occupation: 'Actress',
        bio: 'Total coffee guru. Food enthusiast. Social media expert. TV aficionada. Extreme music advocate. Zombie fan.',
      },
      {
        first_name: 'Chinwendu',
        last_name: 'Henderson',
        age: '62',
        email: 'c.henderson@randatmail.com',
        phone: '155-0155-09',
        education: 'Bachelor in Modern History',
        occupation: 'Historian',
        bio: 'Creator. Internet maven. Coffee practitioner. Troublemaker. Alcohol specialist.',
      },
    ];
  }

  get demoDataWithNestedRows() {
    return [
      {
        id: 1,
        name: 'Policy set 1',
        status: 'PASS',
        description: '',
        children: [
          {
            id: 11,
            name: 'test-advisory-pass.sentinel',
            status: 'PASS',
            description: 'Sample description for this thing.',
          },
          {
            id: 12,
            name: 'test-hard-mandatory-pass.sentinel',
            status: 'PASS',
            description: 'Sample description for this thing.',
          },
        ],
      },
      {
        id: 2,
        name: 'Policy set 2',
        status: 'FAIL',
        description: '',
        children: [
          {
            id: 21,
            name: 'test-advisory-pass.sentinel',
            status: 'PASS',
            description: 'Sample description for this thing.',
          },
          {
            id: 22,
            name: 'test-hard-mandatory-pass.sentinel',
            status: 'FAIL',
            description: 'Sample description for this thing.',
          },
        ],
      },
    ];
  }

  get demoDataWithLargeNumberOfRows() {
    return [
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
    ];
  }

  get demoPaginatedData() {
    const start = (this.demoCurrentPage - 1) * this.demoCurrentPageSize;
    const end = this.demoCurrentPage * this.demoCurrentPageSize;
    return this.demoSourceData.slice(start, end);
  }

  get demoTotalItems() {
    return this.demoSourceData.length;
  }

  get demoSortBySelectedControlledSortedData() {
    const clonedData = Array.from(this.demoSortBySelectedData);

    clonedData.sort((s1, s2) => {
      const v1 = s1[this.demoSortBySelectedControlledSortBy];
      const v2 = s2[this.demoSortBySelectedControlledSortBy];

      if (v1 < v2) {
        return this.demoSortBySelectedControlledSortOrder === 'asc' ? -1 : 1;
      }

      if (v1 > v2) {
        return this.demoSortBySelectedControlledSortOrder === 'asc' ? 1 : -1;
      }

      return 0;
    });

    return clonedData;
  }

  @action
  demoOnPageChange(page, pageSize) {
    this.demoCurrentPage = page;
    this.demoCurrentPageSize = pageSize;
  }

  @action
  demoOnPageSizeChange(pageSize) {
    // we agreed to reset the pagination to the first element (any alternative would result in an unpredictable UX)
    this.demoCurrentPage = 1;
    this.demoCurrentPageSize = pageSize;
  }

  @action
  demoOnSelectionChange() {
    console.log('demoOnSelectionChange called with arguments:', ...arguments);
  }

  @action
  demoOnSelectionChangeWithPagination({ selectableRowsStates }) {
    selectableRowsStates.forEach((row) => {
      const recordToUpdate = this.demoSourceData.find(
        (modelRow) => modelRow.id === row.selectionKey
      );
      if (recordToUpdate) {
        recordToUpdate.isSelected = row.isSelected;
      }
    });
  }

  @action
  demoOnSelectionChangeSortBySelected({ selectableRowsStates }) {
    selectableRowsStates.forEach((row) => {
      const recordToUpdate = this.demoSortBySelectedData.find(
        (modelRow) => modelRow.id === row.selectionKey
      );
      if (recordToUpdate) {
        recordToUpdate.isSelected = row.isSelected;
      }
    });
  }

  @action
  demoSortBySelectedControlledOnSelectionChange({
    selectionKey,
    selectionCheckboxElement,
  }) {
    if (selectionKey === 'all') {
      this.demoSortBySelectedData.forEach((modelRow) => {
        modelRow.isSelected = selectionCheckboxElement.checked;
      });
    } else {
      const recordToUpdate = this.demoSortBySelectedData.find(
        (modelRow) => modelRow.id === selectionKey
      );

      if (recordToUpdate) {
        recordToUpdate.isSelected = selectionCheckboxElement.checked;
      }
    }
  }

  @action
  demoSortBySelectedControlledOnSort(sortBy, sortOrder) {
    this.demoSortBySelectedControlledSortBy = sortBy;
    this.demoSortBySelectedControlledSortOrder = sortOrder;
  }
}
