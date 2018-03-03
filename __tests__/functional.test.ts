import {
  required,
  minLength,
  maxLength,
  optional,
  getSchema,
  integer,
  items,
  xor,
} from '../src';

it('string type', () => {
  class MyType {
    @required()
    @minLength(2)
    @maxLength(10)
    foo: string;

    @optional() bar: string;
  }
  expect(getSchema(MyType).describe()).toMatchSnapshot();
});

it('number type', () => {
  class MyType {
    @required()
    @integer()
    foo: number;
  }
  expect(getSchema(MyType).describe()).toMatchSnapshot();
});

it('array type', () => {
  class MyType {
    @items(Number)
    @required()
    foo: number[];
  }
  expect(getSchema(MyType).describe()).toMatchSnapshot();
});

type numberOrString = number | string;

it('array type (union type)', () => {
  class MyType {
    @items(Number, String)
    @required()
    foo: numberOrString[];
  }
  expect(getSchema(MyType).describe()).toMatchSnapshot();
});

it('array type (custom type)', () => {
  class Item {
    @required() id: string;
    @required() name: string;
  }
  class MyType {
    @items(Item)
    @required()
    foo: Item[];
  }
  expect(getSchema(MyType).describe()).toMatchSnapshot();
});

it('object type', () => {
  @xor('foo', 'bar')
  class MyType {
    @optional() foo?: string;

    @optional() bar?: string;
    @required() baz: string;
  }
  expect(getSchema(MyType).describe()).toMatchSnapshot();
});

it('object type (inner) ', () => {
  class Options {
    @optional() foo?: string;
    @required() bar: string;
  }

  class MyType {
    @optional() options?: Options;
  }
  expect(getSchema(MyType).describe()).toMatchSnapshot();
});

it('object type (inner with override) ', () => {
  class Options {
    @optional() foo?: string;
    @required() bar: string;
  }

  class MyType {
    @xor('foo', 'bar')
    @optional()
    options?: Options;
  }
  expect(getSchema(MyType).describe()).toMatchSnapshot();
});
