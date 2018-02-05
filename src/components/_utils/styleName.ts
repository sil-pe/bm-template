import {isEmpty} from 'lodash';

/*
 * styleName() is a function that returns a hyphenated precomposed css class name.
 *
 * Each parameter can be either a string or a tuple of a string and a boolean.
 * All strings are combined, but if it's a tuple, the string is added only if
 * the boolean is true.
 *
 * E.g., styleName('chunk1', ['chunk2', false], ['chunk3', true]) => 'chunk1-chunk3'
 *
 */
export const styleName = (...params: (string | [string, boolean | undefined])[]) => (
  params
    .filter(param => !(param instanceof Array) || param[1])
    .map(param => param instanceof Array ? param[0] : param)
    .filter(param => !isEmpty(param))
    .join('-')
);
