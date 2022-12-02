import Component from '@glimmer/component';

export default class Index extends Component {
  get STATES() {
    // these are used only for presentation purpose in the showcase
    return ['default', 'hover', 'focus', 'disabled'];
  }

  get RADIOCARDS() {
    return [
      {
        value: '1',
        label: 'Radio card label 1',
        badge: 'Badge',
        checked: true,
        description: 'Radio card description 1',
        generic: 'Radio card custom content 1',
      },
      {
        value: '2',
        label: 'Radio card label 2',
        badge: 'Badge',
        description: 'Radio card description 2',
        generic: 'Radio card custom content 2',
      },
      {
        value: '3',
        label: 'Radio card label 3',
        badge: 'Badge',
        description: 'Radio card description 3',
        generic: 'Radio card custom content 3',
      },
    ];
  }

  // TODO this is used by us; but there should be also one with `yourOnChangeFunction` for the "how to use" section
  @action
  onChange(event) {
    const control = event.target;
    const group = control.closest('.hds-form-group__control-fields-wrapper');
    group.querySelectorAll('.hds-form-radio-card').forEach((radioCard) => {
      radioCard.classList.remove('hds-form-radio-card--checked');
    });
    control
      .closest('.hds-form-radio-card')
      .classList.add('hds-form-radio-card--checked');
  }
}
