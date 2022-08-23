import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../services/translate-service.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  constructor(private translate: TranslateService) {

  }

  transform(value: any, args: any[]): any {
    if (args && args.length == 1)
      return this.translate.data[args[0]];
    else
      return value;
  }

}
