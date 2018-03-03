import {
  required,
  minLength,
  maxLength,
  alphanum,
  regex,
  optional,
  integer,
  min,
  max,
  email,
} from '.';
import { items } from './items';

class LoginValues {
  @required()
  @minLength(3)
  @maxLength(30)
  @alphanum()
  username: string;

  @regex(/^[a-zA-Z0-9]{3,30}$/)
  password?: string;

  @optional() access_token?: string;

  @integer()
  @min(1900)
  @max(2013)
  birthyear?: number;

  @optional()
  @email()
  email?: string;
}

class MyType {
  @items(Number)
  @required()
  foo: number[];
}

class MyType2 {
  @items(Number, String)
  @required()
  foo: Array<string | number>;
}

console.log(new LoginValues(), new MyType(), new MyType2());
