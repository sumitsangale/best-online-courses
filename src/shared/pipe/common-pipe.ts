import { Pipe, PipeTransform } from '@angular/core';
import { CONFIG } from '../services/config';

@Pipe({ name: 'formatDateTime' })
export class FormatDateTimePipe implements PipeTransform {
  transform(value: number): string {
    let hours = Math.floor(value / 3600);
    let minutes = Math.floor((value % 3600) / 60);
    let seconds = Math.floor(value - hours * 3600 - minutes * 60);
    if (hours > 0) {
      return `${hours} : ${minutes} : ${seconds}`;
    } else if (minutes > 0) {
      return `0 : ${minutes} : ${seconds} `;
    } else {
      return `0 : 0 : ${seconds} `;
    }
  }
}

@Pipe({ name: 'pagination' })
export class PaginationPipe implements PipeTransform {
  transform(value: any, page: number): any {
    if (!value || !page) return;

    let start = page * CONFIG.PER_PAGE - CONFIG.PER_PAGE;
    let end = page * CONFIG.PER_PAGE;
    if (page) {
      return value.slice(start, end);
    }
  }
}
