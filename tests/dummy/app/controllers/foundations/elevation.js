import Controller from '@ember/controller';

import { ELEVATIONS, SURFACES } from '../../routes/foundations/elevation';

export default class ElevationController extends Controller {
  get csshelpers() {
    const helpers = [];
    ELEVATIONS.forEach((elevation) => {
      helpers.push(`.hds-elevation-${elevation}`);
    });
    helpers.push('');
    SURFACES.forEach((surface) => {
      helpers.push(`.hds-surface-${surface}`);
    });
    return `${helpers.join('\n')}`;
  }
}
