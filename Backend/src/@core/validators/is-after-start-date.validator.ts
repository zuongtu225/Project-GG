import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import * as moment from 'moment';

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
