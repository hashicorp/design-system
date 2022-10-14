import Component from '@ember/component';

export default Component.extend({
  get noop() {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  },

  get yourOnDismissFunction() {
    return () => {
      console.log('Clicked the "dismiss" button in the "toast"!');
    };
  },

  get yourOnClickFunction() {
    return () => {
      console.log('Clicked the button in the "tag"!');
    };
  },
});
