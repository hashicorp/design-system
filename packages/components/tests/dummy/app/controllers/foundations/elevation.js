import Controller from '@ember/controller';

import { ELEVATIONS, SURFACES } from '../../routes/foundations/elevation';

export default class ElevationController extends Controller {
  get cssVariables() {
    const cssVariables = [];
    ELEVATIONS.forEach((elevation) => {
      cssVariables.push(`--hds-elevation-${elevation}-box-shadow`);
    });
    cssVariables.push('');
    SURFACES.forEach((surface) => {
      cssVariables.push(`--hds-surface-${surface}-box-shadow`);
    });
    return `${cssVariables.join('\n')}`;
  }
  get cssHelpers() {
    const cssHelpers = [];
    ELEVATIONS.forEach((elevation) => {
      cssHelpers.push(`.hds-elevation-${elevation}`);
    });
    cssHelpers.push('');
    SURFACES.forEach((surface) => {
      cssHelpers.push(`.hds-surface-${surface}`);
    });
    return `${cssHelpers.join('\n')}`;
  }
}
