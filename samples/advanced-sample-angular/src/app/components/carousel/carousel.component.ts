import { Component, Inject, ViewEncapsulation} from '@angular/core';
import { RENDERING_PROPERTIES } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent {

  index = 0;

  constructor(
    @Inject(RENDERING_PROPERTIES) public rendering: any,
  ) { }

}
