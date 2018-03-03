import 'reflect-metadata';
import * as Joi from 'joi';

const fieldSchemaMetaKey = Symbol('field');
const schemaKeysMetaKey = Symbol('schema-keys');
const schemaMetaKey = Symbol('schema');

export const getSchemaForType = (type: any) => {
  if (type === String) {
    return Joi.string();
  }
  if (type === Number) {
    return Joi.number();
  }
  if (type === Array) {
    return Joi.array();
  }
  const customSchema = Reflect.getMetadata(schemaMetaKey, type);
  if (customSchema) {
    return customSchema;
  }
  throw new Error('Not supported type: ' + type);
};

export const option = (name: string, params?: any[]) => (
  target: any,
  propertyKey: string,
) => {
  const classType = target.constructor;
  const getFieldSchema = () => {
    const existing = Reflect.getMetadata(
      fieldSchemaMetaKey,
      classType,
      propertyKey,
    );
    if (existing) {
      return existing;
    }

    const paramType = Reflect.getMetadata('design:type', target, propertyKey);
    return getSchemaForType(paramType);
  };

  const fieldSchema = getFieldSchema();
  if (!fieldSchema[name]) {
    throw new Error('Invalid option: ' + name);
  }
  const keys = Reflect.getMetadata(schemaKeysMetaKey, classType) || {};
  const newSchema = fieldSchema[name](...(params || []));
  const newKeys = {
    ...keys,
    [propertyKey]: newSchema,
  };

  Reflect.defineMetadata(schemaKeysMetaKey, newKeys, classType);
  Reflect.defineMetadata(fieldSchemaMetaKey, newSchema, classType, propertyKey);
  Reflect.defineMetadata(schemaMetaKey, Joi.object().keys(newKeys), classType);
};

export function getSchema(target: any): Joi.ObjectSchema {
  const ret = Reflect.getMetadata(schemaMetaKey, target);
  if (!ret) {
    throw new Error('No metadata defined for ' + (ret.name || ret));
  }
  return ret;
}
