import Route from '@ember/routing/route';

export const STYLES = {
  'heading-0': ['bold'],
  'heading-1': ['bold'],
  'heading-2': ['bold'],
  'heading-3': ['semibold'],
  'heading-4': ['medium'],
  'display-large': ['medium', 'semibold'],
  'display-small': ['medium', 'semibold'],
  'body-large': ['regular', 'medium', 'semibold'],
  'body-base': ['regular', 'medium', 'semibold'],
  'body-small': ['regular', 'medium', 'semibold'],
};

export default class FoundationsElevationRoute extends Route {
  model() {
    return { STYLES };
  }
}
