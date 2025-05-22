import Route from '@ember/routing/route';

export default class ComponentsFormRoute extends Route {
  model() {
    const RADIOCARDS = [
      {
        value: '1',
        label: 'Radio card label 1',
        badge: 'Badge',
        checked: true,
        description: 'Radio card description 1',
        generic: 'Radio card custom content 1',
      },
      {
        value: '2',
        label: 'Radio card label 2',
        badge: 'Badge',
        description: 'Radio card description 2',
        generic: 'Radio card custom content 2',
      },
      {
        value: '3',
        label: 'Radio card label 3',
        badge: 'Badge',
        description: 'Radio card description 3',
        generic: 'Radio card custom content 3',
      },
    ];
    return { RADIOCARDS };
  }
}
