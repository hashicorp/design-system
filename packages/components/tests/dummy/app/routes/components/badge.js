import Route from '@ember/routing/route';

export default class ComponentsBadgeRoute extends Route {
    model() {
        // TODO! likely these come from the component `_config.js` file
        const TYPES = ['flat','inverted','outlined'];
        const COLORS = ['neutral', 'highlight', 'success', 'warning', 'error'];
        const SIZES = ['small', 'medium', 'large'];
        return { TYPES, COLORS, SIZES };
    }
}