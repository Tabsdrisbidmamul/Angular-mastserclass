import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    const limit = args[0] ? args[0] : 10;

    return (value as string).length > limit
      ? `${(value as string).substring(0, limit)} ...`
      : value;
  }
}
