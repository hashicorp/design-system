import Controller from '@ember/controller';

import { ELEVATIONS, SURFACES } from '../../routes/foundations/elevation';

export default class ElevationController extends Controller {
  get cssVariables() {
    const cssVariables = { elevations: [], surfaces: [] };
    ELEVATIONS.forEach((elevation) => {
      cssVariables.elevations.push(`--hds-elevation-${elevation}-box-shadow`);
    });
    SURFACES.forEach((surface) => {
      cssVariables.surfaces.push(`--hds-surface-${surface}-box-shadow`);
    });
    return cssVariables;
  }
  get cssHelpers() {
    const cssHelpers = { elevations: [], surfaces: [] };
    ELEVATIONS.forEach((elevation) => {
      cssHelpers.elevations.push(`.hds-elevation-${elevation}`);
    });
    SURFACES.forEach((surface) => {
      cssHelpers.surfaces.push(`.hds-surface-${surface}`);
    });
    return cssHelpers;
  }
}
