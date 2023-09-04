/**
 * Executes a given operation type.
 * @param {String} type
 * @return {Boolean}
 */
export default function command(type) {
  try {
    // return document.execCommand(type);
    return `AAA ${type}`;
  } catch (err) {
    return false;
  }
}
