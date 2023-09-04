const CopyToClipboard = (text, target) => {
  let textToCopy = '';

  if (text && typeof text === 'string') {
    textToCopy = text;
  } else if (target) {
    if (target !== undefined) {
      if (target && typeof target === 'object' && target.nodeType === 1) {
        if (target.hasAttribute('disabled')) {
          throw new Error(
            'Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute'
          );
        }
      } else {
        throw new Error('Invalid "target" value, use a valid Element');
      }
    }

    if (
      // TODO! improve handling of target elements here!
      // target instanceof HTMLInputElement && !['text', 'search', 'url', 'tel', 'password'].includes(target?.type)
      target.nodeName === 'INPUT' ||
      target.nodeName === 'SELECT' ||
      target.nodeName === 'TEXTAREA'
    ) {
      textToCopy = target.value;
    } else {
      // TODO! add handling of `innerText` for other elements
      if (target.hasAttribute('contenteditable')) {
        target.focus();
      }

      var selection = window.getSelection();
      var range = document.createRange();

      range.selectNodeContents(target);
      selection.removeAllRanges();
      selection.addRange(range);

      textToCopy = selection.toString();
    }
  } else {
    // TODO! console an error message here
  }

  // finally copy the text

  navigator.clipboard.writeText(textToCopy).then(
    () => {
      /* clipboard successfully set */
      console.log('success', textToCopy);
    },
    (error) => {
      /* clipboard write failed */
      console.log('error', textToCopy, error);
    }
  );

  // TODO! add handling of success/error
  return true;
};

export default CopyToClipboard;
