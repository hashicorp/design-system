export interface HdsDisclosurePrimitiveSignature {
  Args: {
    isOpen?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClose?: (...args: any[]) => void;
  };
  Blocks: {
    toggle: [
      {
        isOpen: boolean;
        onClickToggle: () => void;
      }
    ];
    content: [
      {
        close: () => void;
      }
    ];
  };
  Element: HTMLDivElement;
}
