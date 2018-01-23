import { Component, Inject } from '@angular/core';
import { RENDERING_PROPERTIES } from '@sitecore-jss/sitecore-jss-angular';
import { JssService } from '../../jss.service';

@Component({
  selector: 'app-page-with-header',
  templateUrl: './page-with-header.component.html',
  styleUrls: ['./page-with-header.component.css']
})
export class PageWithHeaderComponent {

  public domId = 'page';

  constructor(
    @Inject(RENDERING_PROPERTIES) public rendering: any,
    private jssService: JssService
  ) {
    this.jssService.state.subscribe(jssState => {
      if (jssState.sitecore && jssState.sitecore.route) {
        this.domId = `page-${jssState.sitecore.route.name}`;
      }
    });
  }

}
