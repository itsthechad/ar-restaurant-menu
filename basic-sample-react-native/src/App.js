import React from 'react';
import { Text, View } from 'react-native';
import { Placeholder, SitecoreContext } from '@sitecore-jss/sitecore-jss-react-native';
// eslint-disable-next-line
import { getRouteData } from 'data-service';
import componentFactory from './componentFactory';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      route: null,
      error: null,
    };
    this.loadData = this.loadData.bind(this);
  }

  loadData() {
    getRouteData('/')
      .then((data) => {
        this.setState({ route: data, loading: false });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ error: err, loading: false });
      });
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    if (this.state.loading) {
      return (
        <View>
          <Text>loading...</Text>
        </View>
      );
    }
    if (this.state.error) {
      return (
        <View>
          <Text>{this.state.error}</Text>
        </View>
      );
    }

    return (
      <SitecoreContext componentFactory={componentFactory}>
        <View style={{ flex: 1 }}>
          <Placeholder name="primary" rendering={this.state.route} />
          <Placeholder name="secondary" rendering={this.state.route} />
        </View>
      </SitecoreContext>
    );
  }
}

export default App;
