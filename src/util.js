// Utility functions

/**
 * Return whether an object is an array or not
 *
 * @export
 * @param {[]} array The object we being tested
 * @returns bool
 */
export function isArray(array) {
    return array.constructor === Array;
}