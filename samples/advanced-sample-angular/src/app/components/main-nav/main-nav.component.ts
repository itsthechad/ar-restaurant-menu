import { Component, OnInit } from '@angular/core';
import { JssService, JssNavItem } from '../../jss.service';
import { JssRouteBuilderService, JssRoute } from '../../jss-route-builder.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  navItems: JssNavItem[];
  language: string;
  serverRoute: string;

  constructor(
    private jssService: JssService,
    private router: Router,
    private urlBuilder: JssRouteBuilderService,
  ) { }

  ngOnInit() {
    this.jssService.state.subscribe(jssState => {
      this.language = jssState.language;
      this.serverRoute = jssState.serverRoute;
      if (jssState.sitecore) {
        const navigation = jssState.sitecore.context.navigation;
        // skip root/home item in nav
        this.navItems = navigation && navigation[0] && navigation[0].children;
      }
    });
  }

  changeLanguage(language: string) {
    const jssRoute = new JssRoute();
    jssRoute.language = language;
    jssRoute.serverRoute = this.serverRoute;
    this.router.navigateByUrl(this.urlBuilder.buildRouteUrl(jssRoute));
  }

}
