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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClickToggle: (...args: any[]) => void;
      }
    ];
    content: [
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        close: (...args: any[]) => void;
      }
    ];
  };
  Element: HTMLDivElement;
}
