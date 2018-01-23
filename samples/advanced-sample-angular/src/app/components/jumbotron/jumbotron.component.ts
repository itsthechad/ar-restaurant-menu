import { Component, Inject } from '@angular/core';
import { RENDERING_PROPERTIES } from '@sitecore-jss/sitecore-jss-angular';
import { JssService } from '../../jss.service';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css']
})
export class JumbotronComponent {
  routeFields: {
    titleText: any,
    body: any
  };

  constructor(
    @Inject(RENDERING_PROPERTIES) public rendering: any,
    private jssService: JssService
  ) {
    // utilize JssService to retrieve current layout service state
    this.jssService.state.subscribe(jssState => {
      if (jssState.sitecore) {
        this.routeFields = jssState.sitecore.route.fields;
      }
    });
  }

}
