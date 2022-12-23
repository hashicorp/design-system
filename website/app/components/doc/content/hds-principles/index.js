import Component from '@glimmer/component';

export default class DocBadgeComponent extends Component {
  principles = [
    {
      title: 'Rooted in reality',
      description:
        'We ground our work and our decisions in reality through data and observations.',
      image: '/assets/illustrations/principles/rooted-in-reality.png',
    },
    {
      title: 'Guidance over control',
      description:
        'We provide balance between configurability and composability while driving consistency.',
      image: '/assets/illustrations/principles/guidance-over-control.png',
    },
    {
      title: 'Quality by default',
      description:
        'We recognize that we are providing a service and commit to a baseline of quality to provide value and leverage for our consumers. We iterate on features, not quality.',
      image: '/assets/illustrations/principles/quality-by-default.png',
    },
    {
      title: 'Design in context',
      description:
        'We meet consumers where they are and consider both the current and future context in which they use the system.',
      image: '/assets/illustrations/principles/design-in-context.png',
    },
    {
      title: 'Consider everyone',
      description:
        'We take an inclusive approach to our work from the start, considering the context and range of abilities for all customers.',
      image: '/assets/illustrations/principles/consider-everyone.png',
    },
    {
      title: 'Invite feedback',
      description:
        'We take time to have the right conversations with the appropriate stakeholders, to validate and create trust in the outcome.',
      image: '/assets/illustrations/principles/invite-feedback.png',
    },
  ];
}
