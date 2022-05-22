import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') mouseover(e: Event) {
    this.isOpen = true;
  }

  // @HostListener('click') mouseclick(e: Event) {
  //   this.isOpen = !this.isOpen;
  // }

  @HostListener('document:click', ['$event']) mouseClickDocument(event: Event) {
    this.isOpen = this.elementRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }

  @HostListener('mouseleave') mouseleave(e: Event) {
    this.isOpen = false;
  }
}
