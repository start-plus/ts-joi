import 'reflect-metadata';
import * as Joi from 'joi';

const fieldSchemaKey = Symbol('field');
const schemaKey = Symbol('schema');

const getBaseSchemaForType = (type: any) => {
  if (type === String) {
    return Joi.string();
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
      fieldSchemaKey,
      classType,
      propertyKey,
    );
    if (existing) {
      return existing;
    }

    const paramType = Reflect.getMetadata('design:type', target, propertyKey);
    return getBaseSchemaForType(paramType);
  };

  const schema = getFieldSchema();
  if (!schema[name]) {
    throw new Error('Invalid option: ' + name);
  }
  const keys = Reflect.getMetadata(schemaKey, classType) || {};
  const newKeys = { ...keys, [propertyKey]: schema(name, ...params) };

  Reflect.defineMetadata(schemaKey, newKeys, classType);
};
