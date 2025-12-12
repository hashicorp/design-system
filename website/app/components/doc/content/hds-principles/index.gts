/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export default class DocContentHdsPrinciples extends Component {
  principles = [
    {
      number: '01',
      title: 'Rooted in reality',
      description:
        'We ground our work and our decisions in reality through data and observations.',
      image: '/assets/illustrations/principles/rooted-in-reality.jpg',
    },
    {
      number: '02',
      title: 'Guidance over control',
      description:
        'We provide balance between configurability and composability while driving consistency.',
      image: '/assets/illustrations/principles/guidance-over-control.jpg',
    },
    {
      number: '03',
      title: 'Quality by default',
      description:
        'We recognize that we are providing a service and commit to a baseline of quality to provide value and leverage for our consumers. We iterate on features, not quality.',
      image: '/assets/illustrations/principles/quality-by-default.jpg',
    },
    {
      number: '04',
      title: 'Design in context',
      description:
        'We meet consumers where they are and consider both the current and future context in which they use the system.',
      image: '/assets/illustrations/principles/design-in-context.jpg',
    },
    {
      number: '05',
      title: 'Consider everyone',
      description:
        'We take an inclusive approach to our work from the start, considering the context and range of abilities for all customers.',
      image: '/assets/illustrations/principles/consider-everyone.jpg',
    },
    {
      number: '06',
      title: 'Invite feedback',
      description:
        'We take time to have the right conversations with the appropriate stakeholders, to validate and create trust in the outcome.',
      image: '/assets/illustrations/principles/invite-feedback.jpg',
    },
  ];

  <template>
    <ul class="doc-content-principles" role="list">
      {{#each this.principles as |principle|}}
        <li>
          <img
            class="doc-content-principles__image"
            src="{{principle.image}}"
            alt=""
            role="presentation"
          />
          <p class="doc-content-principles__number">{{principle.number}}</p>
          <p class="doc-content-principles__title"><strong
            >{{principle.title}}</strong></p>
          <p
            class="doc-content-principles__description"
          >{{principle.description}}</p>
        </li>
      {{/each}}
    </ul>
  </template>
}
