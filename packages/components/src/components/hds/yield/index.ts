import Component from '@glimmer/component';

export interface YieldComponentSignature {
  Blocks: {
    default: [];
  };
}

export default class HdsYieldComponent extends Component<YieldComponentSignature> {}
