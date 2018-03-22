import Vue from 'vue';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-vue';
import componentFactory from '../app/componentFactory';
import App from '../app/App.vue';

export function createApp(initialState = { sitecore: { route: {} } }) {
  const app = new Vue({
    render(createElement) {
      return (
        <SitecoreContext componentFactory={componentFactory}>
          <App route={initialState.sitecore.route} />
        </SitecoreContext>
      );
    },
  });
  return app;
}
