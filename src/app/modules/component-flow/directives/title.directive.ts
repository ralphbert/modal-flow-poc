import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appFlowTitle]',
})
export class TitleDirective {
  constructor(public templateRef: TemplateRef<any>) {
  }
}
