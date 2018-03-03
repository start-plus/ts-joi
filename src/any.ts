import { ValidationOptions, SchemaLike, ValidationErrorFunction } from 'joi';
import { option } from './core';

/**
 * Whitelists a value
 */
export const allow = (...values: any[]) => option('allow', values);

/**
 * Adds the provided values into the allowed whitelist and marks them as the only valid values allowed.
 */
export const valid = (...values: any[]) => option('valid', values);
export const only = (...values: any[]) => option('only', values);
export const equal = (...values: any[]) => option('equal', values);

/**
 * Blacklists a value
 */
export const invalid = (...values: any[]) => option('invalid', values);
export const disallow = (...values: any[]) => option('disallow', values);
export const not = (...values: any[]) => option('not', values);

/**
 * Marks a key as required which will not allow undefined as value. All keys are optional by default.
 */
export const required = () => option('required');

/**
 * Marks a key as optional which will allow undefined as values. Used to annotate the schema for readability as all keys are optional by default.
 */
export const optional = () => option('optional');

/**
 * Marks a key as forbidden which will not allow any value except undefined. Used to explicitly forbid keys.
 */
export const forbidden = () => option('forbidden');

/**
 * Marks a key to be removed from a resulting object or array after validation. Used to sanitize output.
 */
export const strip = () => option('strip');

/**
 * Annotates the key
 */
export const description = (desc: string) => option('description', [desc]);

/**
 * Annotates the key
 */
export const notes = (value: string | string[]) => option('notes', [value]);

/**
 * Annotates the key
 */
export const tags = (value: string | string[]) => option('tags', [value]);

/**
 * Attaches metadata to the key.
 */
export const meta = (value: object) => option('meta', [value]);

/**
 * Annotates the key with an example value, must be valid.
 */
export const example = (value: object) => option('example', [value]);

/**
 * Annotates the key with an unit name.
 */
export const unit = (name: string) => option('unit', [name]);

/**
 * Overrides the global validate() options for the current key and any sub-key.
 */
export const options = (value: ValidationOptions) => option('value', [options]);

/**
 * Sets the options.convert options to false which prevent type casting for the current key and any child keys.
 */
export const strict = (isStrict?: boolean) => option('strict', [isStrict]);

/**
 * Sets a default value if the original value is undefined.
 * @param value - the value.
 *   value supports references.
 *   value may also be a function which returns the default value.
 *   If value is specified as a function that accepts a single parameter, that parameter will be a context
 *    object that can be used to derive the resulting value. This clones the object however, which incurs some
 *    overhead so if you don't need access to the context define your method so that it does not accept any
 *    parameters.
 *   Without any value, default has no effect, except for object that will then create nested defaults
 *    (applying inner defaults of that object).
 *
 * Note that if value is an object, any changes to the object after default() is called will change the
 *  reference and any future assignment.
 *
 * Additionally, when specifying a method you must either have a description property on your method or the
 *  second parameter is required.
 */

export const defaultTo = (value: any, desc?: string) =>
  option('strict', [value, desc]);

/**
 * Overrides the key name in error messages.
 */
export const label = (name: string) => option('label', [name]);

/**
 * Outputs the original untouched value instead of the casted value.
 */
export const raw = (isRaw?: boolean) => option('raw', [isRaw]);

/**
 * Considers anything that matches the schema to be empty (undefined).
 * @param schema - any object or joi schema to match. An undefined schema unsets that rule.
 */
export const empty = (schema?: SchemaLike) => option('empty', [schema]);

/**
 * Overrides the default joi error with a custom error if the rule fails where:
 * @param err - can be:
 *   an instance of `Error` - the override error.
 *   a `function(errors)`, taking an array of errors as argument, where it must either:
 *    return a `string` - substitutes the error message with this text
 *    return a single ` object` or an `Array` of it, where:
 *     `type` - optional parameter providing the type of the error (eg. `number.min`).
 *     `message` - optional parameter if `template` is provided, containing the text of the error.
 *     `template` - optional parameter if `message` is provided, containing a template string, using the same format as usual joi language errors.
 *     `context` - optional parameter, to provide context to your error if you are using the `template`.
 *    return an `Error` - same as when you directly provide an `Error`, but you can customize the error message based on the errors.
 *
 * Note that if you provide an `Error`, it will be returned as-is, unmodified and undecorated with any of the
 * normal joi error properties. If validation fails and another error is found before the error
 * override, that error will be returned and the override will be ignored (unless the `abortEarly`
 * option has been set to `false`).
 */
export const error = (err: Error | ValidationErrorFunction) =>
  option('error', [err]);
