import Component from '@glimmer/component';

import { HdsCodeEditor } from '@hashicorp/design-system-components/components';
// ✅ Import from HDS, not from '@codemirror/view'
import { keymap } from '@hashicorp/design-system-components/codemirror';

// 1. Define your extension
const myKeymap = keymap.of([
  {
    key: 'Ctrl-Shift-h',
    run: () => {
      console.log('Hello World');
      return true;
    },
  },
]);

export default class LocalComponent extends Component {
  // 2. Create an array of extensions
  myExtensions = [myKeymap];

  <template>
    <HdsCodeEditor
      @customExtensions={{this.myExtensions}}
      @ariaLabel="Custom extension example"
    />
  </template>
}
