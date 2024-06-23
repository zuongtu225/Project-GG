import { registerDecorator, ValidationOptions } from 'class-validator';
import * as moment from 'moment';

export function IsLowerThanNow(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(date: string) {
          const today = new Date();
          if (moment(date, 'DD/MM/YYYY').isBefore(today, 'day')) {
            return false;
          }
          return true;
        },
      },
    });
  };
}

export function IsValidFormatDate(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(date: string) {
          if (!moment(date, 'DD/MM/YYYY', true).isValid()) {
            return false;
          }
          return true;
        },
      },
    });
  };
}

export function isValidDate(date: string): boolean {
  return moment(date, 'DD/MM/YYYY', true).isValid();
}
