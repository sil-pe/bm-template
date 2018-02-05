import {isNil, isNaN} from 'lodash';

/**
 * Converts a `number` to a string representing the according pixel value for CSS (e.g. `'25px'`)
 * or `undefined` if `value` is `undefined`, `null` or `NaN`.
 *
 * `undefined` as a value of a property of an object, assigned to `style` attribute of an HTML tag
 * results in not setting the CSS value.
 *
 * When a second argument is provided and `value` is defined, it is added to `value`.
 * Currently the second argument is not checked for `NaN` or other special values.
 */
export const pixelValue = (value: number | undefined | null, addition = 0): string | undefined =>
  isNil(value) || isNaN(value) ? undefined : `${value + addition}px`;

export const valueFromPixel = (value: string | undefined | null): number =>
  isNil(value) || isNaN(parseFloat(value)) ? 0 : parseFloat(value);
