import {Directive, HostBinding, HostListener, OnInit} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {

  @HostBinding('class.open') isDropShown = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  // @HostListener('document:click', ['$event']) toggleDropdown(eventData: Event): void {
  @HostListener('click') toggleDropdown(eventData: Event): void {
    this.isDropShown = !this.isDropShown;
    // this.isDropShown ?
    //   this.renderer.addClass(this.elementRef.nativeElement, 'open') :
    //   this.renderer.removeClass(this.elementRef.nativeElement, 'open') ;
  }

}
