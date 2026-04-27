import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appAppHighlight]',
  standalone:true
})
export class AppHighlight {
// highlighting nav bar on mouse hover
  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';
  @HostBinding('style.cursor') cursor: string = 'pointer';
  @HostBinding('style.transition') transition: string = '0.3s ease';


  @HostListener('mouseenter') onMouseEnter() {
    this.backgroundColor = '#007bff'; 
  }

  
  @HostListener('mouseleave') onMouseLeave() {
    this.backgroundColor = 'transparent';
  }
}

