import templateOnlyComponent from '@ember/component/template-only';

interface HdsFormFileInputBaseSignature {
  Element: HTMLInputElement;
}

const HdsFormFileInputBaseComponent =
  templateOnlyComponent<HdsFormFileInputBaseSignature>();

export default HdsFormFileInputBaseComponent;
