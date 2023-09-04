import command from '../common/command';
import createFakeElement from '../common/create-fake-element';

function select(element) {
  var selectedText;

  if (element.nodeName === 'SELECT') {
    element.focus();

    selectedText = element.value;
  } else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
    var isReadOnly = element.hasAttribute('readonly');

    if (!isReadOnly) {
      element.setAttribute('readonly', '');
    }

    element.select();
    element.setSelectionRange(0, element.value.length);

    if (!isReadOnly) {
      element.removeAttribute('readonly');
    }

    selectedText = element.value;
  } else {
    if (element.hasAttribute('contenteditable')) {
      element.focus();
    }

    var selection = window.getSelection();
    var range = document.createRange();

    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);

    selectedText = selection.toString();
  }

  return selectedText;
}
/**
 * Create fake copy action wrapper using a fake element.
 * @param {String} target
 * @param {Object} options
 * @return {String}
 */
const fakeCopyAction = (value, options) => {
  debugger;
  const fakeElement = createFakeElement(value);
  options.container.appendChild(fakeElement);
  const selectedText = select(fakeElement);
  command('copy');
  fakeElement.remove();

  return selectedText;
};

/**
 * Copy action wrapper.
 * @param {String|HTMLElement} target
 * @param {Object} options
 * @return {String}
 */
const ClipboardActionCopy = (
  target,
  options = { container: document.body }
) => {
  let selectedText = '';
  if (typeof target === 'string') {
    selectedText = fakeCopyAction(target, options);
  } else if (
    target instanceof HTMLInputElement &&
    !['text', 'search', 'url', 'tel', 'password'].includes(target?.type)
  ) {
    // If input type doesn't support `setSelectionRange`. Simulate it. https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
    selectedText = fakeCopyAction(target.value, options);
  } else {
    selectedText = select(target);
    command('copy');
  }
  return selectedText;
};

export default ClipboardActionCopy;
