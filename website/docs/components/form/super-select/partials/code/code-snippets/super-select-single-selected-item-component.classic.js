import Component from '@glimmer/component';

export default class LocalComponent extends Component {
  OPTIONS = [
    {
      size: 'Extra Small',
      description: '2 vCPU | 1 GiB RAM',
      price: '$0.02',
    },
    { size: 'Small', description: '2 vCPU | 2 GiB RAM', price: '$0.04' },
    { size: 'Medium', description: '4 vCPU | 4 GiB RAM', price: '$0.08' },
    { size: 'Large', description: '8 vCPU | 8 GiB RAM', price: '$0.16' },
    {
      size: 'Extra Large',
      description: '16 vCPU | 16 GiB RAM',
      price: '$0.32',
    },
  ];

  SELECTED_OPTIONS = this.OPTIONS[1];
}
