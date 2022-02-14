import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: true,
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filter: string, propName: string): any {
    if (value.length === 0 || !value || !filter) return value;

    return value.filter((val: { [x: string]: string }) =>
      val[propName].startsWith(filter)
    );
  }
}
