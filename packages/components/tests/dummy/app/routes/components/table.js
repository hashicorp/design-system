import Route from '@ember/routing/route';

const STATES = ['active', 'default', 'hover', 'focus'];

export default class ComponentsTableRoute extends Route {
  async model() {
    let responseMusic = await fetch('/api/folk.json');
    let { data: music } = await responseMusic.json();

    return {
      music: music.map((record) => ({ id: record.id, ...record.attributes })),
      STATES,
    };
  }
}
