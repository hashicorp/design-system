/* eslint-disable ember/no-classic-components, ember/no-classic-classes, ember/require-computed-property-dependencies, prettier/prettier */
import Component from '@ember/component';
import layout from '../../templates/components/table-of-contents';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default Component.extend({
  layout,
  tagName: '',

  leftPadStyle: computed(function() {
    return htmlSafe(`padding-left:${this.level}em;`);
  }),

  sortedTocs: computed('tocs', function() {
    return this.tocs.sort((a, b) => {
      // index a the top always
      if(a.title === 'index' && b.title !== 'index') {
        return -1;
      }

      if(b.title === 'index' && a.title !== 'index') {
        return 1;
      }

      return a.title.localeCompare(b.title);
    });
  })
});
