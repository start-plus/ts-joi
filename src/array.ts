import { option, getSchemaForType } from './core';

/**
 * Allow this array to be sparse.
 * enabled can be used with a falsy value to go back to the default behavior.
 */
export const sparse = (enabled?: any) => option('sparse', [enabled]);

/**
 * Allow single values to be checked against rules as if it were provided as an array.
 * enabled can be used with a falsy value to go back to the default behavior.
 */
export const single = (enabled?: any) => option('sparse', [single]);

/**
 * List the types allowed for the array values.
 * type can be an array of values, or multiple values can be passed as individual arguments.
 * If a given type is .required() then there must be a matching item in the array.
 * If a type is .forbidden() then it cannot appear in the array.
 * Required items can be added multiple times to signify that multiple items must be found.
 * Errors will contain the number of items that didn't match.
 * Any unmatched item having a label will be mentioned explicitly.
 *
 * @param type - a joi schema object to validate each array item against.
 */
export const items = (...types: any[]) =>
  option('items', types.map(getSchemaForType));

/**
 * Lists the types in sequence order for the array values where:
 * @param type - a joi schema object to validate against each array item in sequence order. type can be an array of values, or multiple values can be passed as individual arguments.
 * If a given type is .required() then there must be a matching item with the same index position in the array. Errors will contain the number of items that didn't match. Any unmatched item having a label will be mentioned explicitly.
 */
export const ordered = (...types: any[]) => option('ordered', types);

type Comparator<T> = (a: T, b: T) => boolean;

/**
 * Lists the types in sequence order for the array values where:
 * @param type - a joi schema object to validate against each array item in sequence order. type can be an array of values, or multiple values can be passed as individual arguments.
 * If a given type is .required() then there must be a matching item with the same index position in the array. Errors will contain the number of items that didn't match. Any unmatched item having a label will be mentioned explicitly.
 */
export const unique = <T>(comparator?: string | Comparator<T>) =>
  option('unique', [comparator]);
