import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

import { modelAssets } from 'static-assets';

import {
  ViroARSceneNavigator,
  ViroARScene,
  ViroAmbientLight,
  ViroNode,
  ViroSpotLight,
  Viro3DObject
} from 'react-viro';

// See instructions in ./cofig.example.js for setting up Viro API key
import { config } from '../config';

const VIRO_API_KEY = config.viroAPIKey;

class ARController extends React.Component {
  constructor() {
    super();

    this.state = {
      currentCategory: 0,
      currentItem: 0
    }

    this.renderScene = this.renderScene.bind(this);
    this.renderGestureRecognizer = this.renderGestureRecognizer.bind(this);
    this.onSwipe = this.onSwipe.bind(this);
  }

  render() {
    var { params: { data } } = this.props;
    const { currentCategory, currentItem } = this.state;

    return (
      <View style={{ flex: 1 }}>

        <ViroARSceneNavigator
          initialScene={{
            scene: this.renderScene
          }}
          apiKey={VIRO_API_KEY} />

        { this.renderGestureRecognizer() }

        <Text style={styles.itemText} >
          { `${data[currentCategory].category} / ${data[currentCategory].items[currentItem].displayName}` }
        </Text>

        </View>
    );
  }

  renderScene() {
    var { params: { data } } = this.props;
    var { currentCategory, currentItem } = this.state;

    const modelName = data[currentCategory].items[currentItem].name;
    const modelSource = modelAssets[modelName].model;
    const modelResources = modelAssets[modelName].resources;

    return (
      <ViroARScene>
        <ViroAmbientLight color={"#aaaaaa"} influenceBitMask={1} />
        <ViroNode position={[0, 0, -1]} >
          <ViroSpotLight
            innerAngle={5}
            outerAngle={45}
            direction={[0, -1, -.2]}
            position={[0, 3, 0]}
            color="#ffffff"
            castsShadow={true}
            influenceBitMask={4}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={5}
            shadowOpacity={.7} />
          <Viro3DObject
            source={modelSource}
            resources={[...modelResources]}
            position={[ 0, 0, -1 ]}
            scale={[.3, .3, .3]}
            type="VRX"
            lightReceivingBitMask={5}
            shadowCastingBitMask={4}
            onDrag={this.onDrag} />
        </ViroNode>
      </ViroARScene>
    );
  }

  renderGestureRecognizer() {
    const swipeConfig = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    const style = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    };

    return (
      <GestureRecognizer
        onSwipe={this.onSwipe}
        config={swipeConfig}
        style={style} />
    );
  }

  onSwipe(direction, state) {
    var { params: { data } } = this.props;
    const { currentCategory, currentItem } = this.state;
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;

    var newCategory;
    var newItem;

    switch (direction) {
      case SWIPE_UP:
        newCategory = currentCategory - 1;
        if (newCategory < 0) {
          newCategory = data.length - 1;
        }
        this.setState({ currentCategory: newCategory });
        break;
      case SWIPE_DOWN:
        newCategory = currentCategory + 1;
        if (newCategory > data.length - 1) {
          newCategory = 0;
        }
        this.setState({ currentCategory: newCategory });
        break;
      case SWIPE_LEFT:
        newItem = currentItem - 1;
        if (newItem < 0) {
          newItem = data[currentCategory].items.length - 1;
        }
        this.setState({ currentItem: newItem });
        break;
      case SWIPE_RIGHT:
        newItem = currentItem + 1;
        if (newItem > data[currentCategory].items.length - 1) {
          newItem = 0;
        }
        this.setState({ currentItem: newItem });
        break;
    }
  }
} // ARController

const styles = StyleSheet.create({
  itemText: {
    position: 'absolute',
    top: 40,
    left: 40,
    fontSize: 40,
    fontWeight: 'bold'
  }
});

export default ARController;
