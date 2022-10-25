import Component from '@ember/component';

export default Component.extend({
  get yourOnDismissFunction() {
    return () => {
      console.log('Clicked the "dismiss" button in the "tag"!');
    };
  },
});
