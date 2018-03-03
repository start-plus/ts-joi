import * as Joi from 'joi';
import { required, minLength, maxLength } from '.';

class LoginValues {
  @required()
  @minLength(3)
  @maxLength(30)
  @alphanum(30)
  username: string;
}
