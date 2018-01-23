import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent {

  @Input() size = 1;
  @Input() field: {
    value?: string;
    editable?: string;
  };

  constructor() { }

}
