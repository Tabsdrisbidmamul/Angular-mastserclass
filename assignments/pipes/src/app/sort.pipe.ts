import { Pipe, PipeTransform } from '@angular/core';
import { Server } from './server.interface';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(value: any, propType: string, orderType: string): any {
    function sorterAsc(
      a: { [x: string]: string },
      b: { [x: string]: string }
    ): number {
      if (a[propType] < b[propType]) {
        return -1;
      } else if (a[propType] > b[propType]) {
        return 1;
      } else {
        return 0;
      }
    }

    function sorterDesc(
      a: { [x: string]: string },
      b: { [x: string]: string }
    ): number {
      if (b[propType] < a[propType]) {
        return -1;
      } else if (b[propType] > a[propType]) {
        return 1;
      } else {
        return 0;
      }
    }

    if (!value || !orderType) return value;

    if (orderType === 'asc') {
      return value.sort(
        (a: { [x: string]: string }, b: { [x: string]: string }) =>
          sorterAsc(a, b)
      );
    } else {
      return value.sort(
        (a: { [x: string]: string }, b: { [x: string]: string }) =>
          sorterDesc(a, b)
      );
    }
  }
}
