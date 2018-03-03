import {
  Reference,
  Base64Options,
  EmailOptions,
  IpOptions,
  UriOptions,
  GuidOptions,
} from 'joi';
import { option } from './core';

/**
 * Allows the value to match any whitelist of blacklist item in a case insensitive comparison.
 */
export const insensitive = () => option('insensitive');

/**
 * Specifies the minimum number string characters.
 * @param limit - the minimum number of string characters required. It can also be a reference to another field.
 * @param encoding - if specified, the string length is calculated in bytes using the provided encoding.
 */
export const minLength = (limit: number | Reference, encoding?: string) =>
  option('min', [limit, encoding]);

/**
 * Specifies the maximum number of string characters.
 * @param limit - the maximum number of string characters allowed. It can also be a reference to another field.
 * @param encoding - if specified, the string length is calculated in bytes using the provided encoding.
 */
export const maxLength = (limit: number | Reference, encoding?: string) =>
  option('max', [limit, encoding]);

/**
 * Specifies whether the string.max() limit should be used as a truncation.
 * @param enabled - optional parameter defaulting to true which allows you to reset the behavior of truncate by providing a falsy value.
 */
export const truncate = (enabled?: boolean) => option('truncate', [enabled]);

/**
 * Requires the string value to be in a unicode normalized form. If the validation convert option is on (enabled by default), the string will be normalized.
 * @param form - The unicode normalization form to use. Valid values: NFC [default], NFD, NFKC, NFKD
 */
export const normalize = (form?: 'NFC' | 'NFD' | 'NFKC' | 'NFKD') =>
  option('normalize', [form]);

/**
 * Requires the string value to be a valid base64 string; does not check the decoded value.
 * @param options - optional settings: The unicode normalization options to use. Valid values: NFC [default], NFD, NFKC, NFKD
 */
export const base64 = (options?: Base64Options) => option('base64', [options]);

/**
 * Requires the number to be a credit card number (Using Lunh Algorithm).
 */
export const creditCard = () => option('creditCard');

/**
 * Specifies the exact string length required
 * @param limit - the required string length. It can also be a reference to another field.
 * @param encoding - if specified, the string length is calculated in bytes using the provided encoding.
 */
export const length = (limit: number | Reference, encoding?: string) =>
  option('length', [limit, encoding]);

/**
 * Defines a regular expression rule.
 * @param pattern - a regular expression object the string value must match against.
 * @param name - optional name for patterns (useful with multiple patterns). Defaults to 'required'.
 */
export const regex = (pattern: RegExp, name?: string) =>
  option('regex', [pattern, name]);

/**
 * Replace characters matching the given pattern with the specified replacement string where:
 * @param pattern - a regular expression object to match against, or a string of which all occurrences will be replaced.
 * @param replacement - the string that will replace the pattern.
 */
export const replace = (pattern: RegExp | string, name?: string) =>
  option('replace', [pattern, name]);

/**
 * Requires the string value to only contain a-z, A-Z, and 0-9.
 */
export const alphanum = () => option('alphanum');

/**
 * Requires the string value to only contain a-z, A-Z, 0-9, and underscore _.
 */
export const token = () => option('token');

/**
 * Requires the string value to be a valid email address.
 */
export const email = (options?: EmailOptions) => option('email', [options]);

/**
 * Requires the string value to be a valid ip address.
 */
export const ip = (options?: IpOptions) => option('ip', [options]);

/**
 * Requires the string value to be a valid RFC 3986 URI.
 */
export const uri = (options?: UriOptions) => option('uri', [options]);

/**
 * Requires the string value to be a valid GUID.
 */
export const guid = (options?: GuidOptions) => option('guid', [options]);

/**
 * Alias for `guid` -- Requires the string value to be a valid GUID
 */
export const uuid = (options?: GuidOptions) => option('uuid', [options]);

/**
 * Requires the string value to be a valid hexadecimal string.
 */
export const hex = () => option('hex');

/**
 * Requires the string value to be a valid hostname as per RFC1123.
 */
export const hostname = () => option('hostname');

/**
 * Requires the string value to be in valid ISO 8601 date format.
 */
export const isoDate = () => option('isoDate');

/**
 * Requires the string value to be all lowercase. If the validation convert option is on (enabled by default), the string will be forced to lowercase.
 */
export const lowercase = () => option('lowercase');

/**
 * Requires the string value to be all uppercase. If the validation convert option is on (enabled by default), the string will be forced to uppercase.
 */
export const uppercase = () => option('uppercase');

/**
 * Requires the string value to contain no whitespace before or after. If the validation convert option is on (enabled by default), the string will be trimmed.
 */
export const trim = () => option('trim');
