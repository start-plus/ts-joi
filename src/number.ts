import { Reference } from 'joi';
import { option } from './core';

/**
 * Specifies the minimum value.
 * It can also be a reference to another field.
 */
export const min = (limit: number | Reference) => option('min', [limit]);

/**
 * Specifies the maximum value.
 * It can also be a reference to another field.
 */
export const max = (limit: number | Reference) => option('max', [limit]);

/**
 * Specifies that the value must be greater than limit.
 * It can also be a reference to another field.
 */
export const greater = (limit: number | Reference) =>
  option('greater', [limit]);

/**
 * Specifies that the value must be less than limit.
 * It can also be a reference to another field.
 */
export const less = (limit: number | Reference) => option('less', [limit]);

/**
 * Requires the number to be an integer (no floating point).
 */
export const integer = () => option('integer');

/**
 * Specifies the maximum number of decimal places where:
 * @param limit - the maximum number of decimal places allowed.
 */
export const precision = (limit: number) => option('precision', [limit]);

/**
 * Specifies that the value must be a multiple of base.
 */
export const multiple = (base: number) => option('multiple', [base]);

/**
 * Requires the number to be positive.
 */
export const positive = () => option('positive');

/**
 * Requires the number to be negative.
 */
export const negative = () => option('negative');
