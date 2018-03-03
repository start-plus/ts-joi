import { option, getSchemaForType } from './core';
import { SchemaMap, SchemaLike, RenameOptions } from 'joi';

/**
 * Sets the allowed object keys.
 */
export const keys = (schema?: SchemaMap) => option('keys', [schema]);

/**
 * Specify validation rules for unknown keys matching a pattern.
 */
export const pattern = (regex: RegExp, schema: SchemaLike) =>
  option('pattern', [regex, schema]);

/**
 * Defines an all-or-nothing relationship between keys where if one of the peers is present, all of them are required as well.
 * @param peers - the key names of which if one present, all are required. peers can be a single string value,
 * an array of string values, or each peer provided as an argument.
 */
export const and = (...peers: string[]) => option('and', peers);

/**
 * Defines a relationship between keys where not all peers can be present at the same time.
 * @param peers - the key names of which if one present, the others may not all be present.
 * peers can be a single string value, an array of string values, or each peer provided as an argument.
 */
export const nand = (...peers: string[]) => option('nand', peers);

/**
 * Defines a relationship between keys where one of the peers is required (and more than one is allowed).
 */
export const or = (...peers: string[]) => option('or', peers);

/**
 * Defines an exclusive relationship between a set of keys. one of them is required but not at the same time where:
 */
export const xor = (...peers: string[]) => option('xor', peers);

/**
 * Requires the presence of other keys whenever the specified key is present.
 */
export const withKeys = (key: string, peers: string | string[]) =>
  option('with', [key, peers]);

/**
 * Forbids the presence of other keys whenever the specified is present.
 */
export const without = (key: string, peers: string | string[]) =>
  option('without', [key, peers]);

/**
 * Renames a key to another name (deletes the renamed key).
 */
export const rename = (from: string, to: string, options?: RenameOptions) =>
  option('rename', [from, to, options]);

/**
 * Verifies an assertion where.
 */
export const assert = (ref: string, schema: SchemaLike, message?: string) =>
  option('assert', [ref, schema, message]);

/**
 * Overrides the handling of unknown keys for the scope of the current object only (does not apply to children).
 */
export const unknown = (allow?: boolean) => option('unknown', [allow]);

/**
 * Sets the specified children to required.
 *
 * @param children - can be a single string value, an array of string values, or each child provided as an argument.
 *
 *   var schema = Joi.object().keys({ a: { b: Joi.number() }, c: { d: Joi.string() } });
 *   var requiredSchema = schema.requiredKeys('', 'a.b', 'c', 'c.d');
 *
 * Note that in this example '' means the current object, a is not required but b is, as well as c and d.
 */
export const requiredKeys = (...children: string[]) =>
  option('requiredKeys', [children]);

/**
 * Sets the specified children to optional.
 *
 * @param children - can be a single string value, an array of string values, or each child provided as an argument.
 *
 * The behavior is exactly the same as requiredKeys.
 */
export const optionalKeys = (...children: string[]) =>
  option('optionalKeys', [children]);

/**
 * Sets the specified children to forbidden.
 *
 * @param children - can be a single string value, an array of string values, or each child provided as an argument.
 *
 *   const schema = Joi.object().keys({ a: { b: Joi.number().required() }, c: { d: Joi.string().required() } });
 *   const optionalSchema = schema.forbiddenKeys('a.b', 'c.d');
 *
 * The behavior is exactly the same as requiredKeys.
 */
export const forbiddenKeys = (...children: string[]) =>
  option('forbiddenKeys', [children]);
