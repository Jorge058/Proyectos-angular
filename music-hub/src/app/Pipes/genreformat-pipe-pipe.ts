import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genreformatPipe',
})
export class GenreformatPipePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value
      .split('/')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' | ');
  }
}
