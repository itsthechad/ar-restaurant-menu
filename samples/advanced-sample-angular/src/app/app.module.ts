import { BrowserModule, BrowserTransferStateModule  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { AppComponent } from './app.component';
import { JssService } from './jss.service';
import { LayoutService } from './layoutService/layout.service';
import { ConnectedLayoutService } from './layoutService/connected-layout.service';
import { DisconnectedLayoutService } from './layoutService/disconnected-layout.service';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { JssRouteComponent } from './components/jss-route/jss-route.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { AppMaterialModule } from './app-material.module';
import { PageWithHeaderComponent } from './components/page-with-header/page-with-header.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { DownloadCalloutComponent } from './components/download-callout/download-callout.component';
import { ModalContentComponent } from './components/modal-content/modal-content.component';
import { HeadingComponent } from './components/heading/heading.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { MainNavItemComponent } from './components/main-nav/main-nav-item.component';
import { JssRouteBuilderService } from './jss-route-builder.service';
import { CarouselComponent } from './components/carousel/carousel.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'horizontal',
  slidesPerView: 'auto',
  keyboard: true,
  pagination: true,
  navigation: true,
  centeredSlides: true,
  autoplay: {
    delay: 5000,
  },
  speed: 750,
};

@NgModule({
  declarations: [
    AppComponent,
    JssRouteComponent,
    NotFoundComponent,
    ServerErrorComponent,
    PageWithHeaderComponent,
    JumbotronComponent,
    DownloadCalloutComponent,
    ModalContentComponent,
    HeadingComponent,
    MainNavComponent,
    MainNavItemComponent,
    CarouselComponent,
  ],
  imports: [
    // withServerTransition is needed to enable universal rendering
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    BrowserTransferStateModule,
    HttpClientModule,
    JssModule.withComponents([
      { name: 'Home', type: PageWithHeaderComponent }, // TODO: rename containers when code first is implemented?
      { name: 'About', type: PageWithHeaderComponent },
      { name: 'Services', type: PageWithHeaderComponent },
      { name: 'Portfolio', type: PageWithHeaderComponent },
      { name: 'Jumbotron', type: JumbotronComponent },
      { name: 'DownloadCallout', type: DownloadCalloutComponent },
      { name: 'Carousel', type: CarouselComponent },
    ]),
    AppRoutingModule,
    AppMaterialModule,
    SwiperModule,
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    JssService,
    {
      provide: LayoutService,
      useFactory: (httpClient: HttpClient) => {
        if (environment.scConnected) {
          return new ConnectedLayoutService();
        } else {
          return new DisconnectedLayoutService(httpClient);
        }
      },
      deps: [HttpClient]
    },
    JssRouteBuilderService
  ],
  entryComponents: [
    ModalContentComponent,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
