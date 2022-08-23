import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../services/translate-service.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  constructor(private translate: TranslateService) {

  }

  transform(value: any, key?: string): any {
    if (key && key != null)
      return this.translate.data[key];
    else
      return value;
  }

}
