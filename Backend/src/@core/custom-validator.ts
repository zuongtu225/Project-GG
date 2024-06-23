import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import * as moment from 'moment';

export function IsLowerThanNow(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(date: Date) {
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
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(date: Date) {
          if (!moment(date, 'DD/MM/YYYY', true).isValid()) {
            return false;
          }
          return true;
        },
      },
    });
  };
}

export function IsAfterDate(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(date: Date | string) {
          if (typeof date === 'string') {
            date = moment(date, 'YYYY/MM/DD').toDate();
          }
          const today = new Date();
          const formatToday = moment(today).format('YYYY-MM-DD');
          if (moment(date).isAfter(formatToday, 'day')) {
            return false;
          }

          return true;
        },
      },
    });
  };
}

export function IsAfterStartDate(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(date: Date | string, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          let relatedValue = (args.object as object)[relatedPropertyName];
          if (typeof date === 'string') {
            date = moment(date, 'YYYY/MM/DD').toDate();
          }
          if (typeof relatedValue === 'string') {
            relatedValue = moment(relatedValue, 'YYYY/MM/DD').toDate();
            if (!moment(relatedValue).isValid()) {
              return false;
            }
          }
          const formatRelatedValue = moment(relatedValue).format('YYYY-MM-DD');
          if (moment(date).isBefore(formatRelatedValue, 'day')) {
            return false;
          }
          return true;
        },
      },
    });
  };
}

export function IsSessionDay(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(session: number) {
          if (session !== 1 && session !== 2) {
            return false;
          }
          return true;
        },
      },
    });
  };
}

export function IsValidFormatDateYyyyMmDd(
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(date: Date) {
          if (!moment(date, 'YYYY/MM/DD', true).isValid()) {
            return false;
          }
          return true;
        },
      },
    });
  };
}
