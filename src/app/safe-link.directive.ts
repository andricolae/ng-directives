import { Directive, ElementRef, inject, input } from "@angular/core";

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onClick($event)'
  }
})
export class SafeLinkDirective {

  queryParam = input('myapp');
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    console.log('SAFE LINK DIRECTIVE IS ACTIVE');
  }

  onClick(event: MouseEvent) {
    const leave = window.confirm('Do you really want to leave the app?');

    if (leave) {
      const address = this.hostElementRef.nativeElement.href;
      this.hostElementRef.nativeElement.href = address + '?from=' + this.queryParam();
      return;
    }

    event.preventDefault();
  }
}
