import {Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {

  @HostBinding('class.open') isDropShown = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
  }

  @HostListener('click') toggleDropdown(eventData: Event): void {
    this.isDropShown = !this.isDropShown;
    // this.isDropShown ?
    //   this.renderer.addClass(this.elementRef.nativeElement, 'open') :
    //   this.renderer.removeClass(this.elementRef.nativeElement, 'open') ;


  }

}
