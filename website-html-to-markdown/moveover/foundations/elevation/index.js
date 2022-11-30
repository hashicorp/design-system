import Component from '@glimmer/component';

const ELEVATIONS = ['inset', 'low', 'mid', 'high', 'higher', 'overlay'];
const SURFACES = ['inset', 'base', 'low', 'mid', 'high', 'higher', 'overlay'];

export default class Index extends Component {
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
