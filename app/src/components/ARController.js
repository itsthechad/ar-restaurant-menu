import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated3DObject from './Animated3DObject';

import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

import { images, model } from 'static-assets';

import {
  ViroARSceneNavigator,
  ViroARScene,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroQuad
} from 'react-viro';

// See instructions in ./cofig.example.js for setting up Viro API key
import { config } from '../config';

const VIRO_API_KEY = config.viroAPIKey;
const markerSource = images['/data/media/img/ar-marker.png'];

class ARController extends React.Component {
  constructor() {
    super();

    this.state = {
      modelIsHovered: false,
      currentCategory: 0,
      currentItemArray: [],  // Will hold the current item index for each category
      anchorFound: false
    }

    this.renderScene = this.renderScene.bind(this);
    this.renderGestureRecognizer = this.renderGestureRecognizer.bind(this);
    this.onAnchorFound = this.onAnchorFound.bind(this);
    this.onSwipe = this.onSwipe.bind(this);
  }

  componentWillMount() {
    let { fields: { items } } = this.props;

    // Initialize each category's item index to zero
    this.setState({
      currentItemArray: items.map((item) => {
        return 0;
      })
    })
  }

  render() {
    let { fields: { items } } = this.props;
    const { modelIsHovered, currentCategory, currentItemArray } = this.state;

    let currentItem = currentItemArray[currentCategory];

    return (
      <View style={{ flex: 1 }}>

        <ViroARSceneNavigator
          initialScene={{
            scene: this.renderScene
          }}
          apiKey={VIRO_API_KEY} />

        { this.renderGestureRecognizer() }

        {/* Show text only when user is hovered on 3d model */}
        { modelIsHovered &&
          <Text style={styles.itemText} >
            {/* Debugging version with indices */}
            { `${items[currentCategory].fields.category}(${currentCategory}) / ${items[currentCategory].fields.items[currentItem].displayName}(${currentItem})` }
            {/* Actual version */}
            {/* { `${items[currentCategory].fields.category} / ${items[currentCategory].fields.items[currentItem].displayName}` } */}
          </Text>
        }

        </View>
    );
  }

  renderScene() {
    let { fields: { items } } = this.props;
    let { currentCategory, currentItemArray, anchorFound } = this.state;

    let currentItem = currentItemArray[currentCategory];

    const modelName = items[currentCategory].fields.items[currentItem].name;
    const currentModel = model[modelName];

    return (
      <ViroARScene>

        <ViroAmbientLight color={"#aaaaaa"} />

        <ViroARImageMarker target={"logo"}
          onAnchorFound={this.onAnchorFound} >
          
          <ViroSpotLight
            innerAngle={5}
            outerAngle={5}
            direction={[0, -1, 0]}
            position={[0, 3, 0]}
            color="#ffffff"
            castsShadow={true}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={3}
            shadowOpacity={.6} />

          <Animated3DObject
            key={modelName}
            anchorFound={anchorFound}
            source={currentModel.source}
            resources={currentModel.resources}
            position={currentModel.position}
            scale={currentModel.scale}
            type={currentModel.type}
            onHover={(isHovering) => {
              this.setState({ modelIsHovered: isHovering });
            }} />

          <ViroQuad
            rotation={[-90, 0, 0]}
            position={[0, -0.001, 0]}
            width={2.5} height={2.5}
            arShadowReceiver={true} />

        </ViroARImageMarker>

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

  onAnchorFound() {
    console.log('anchor found');
    this.setState({ anchorFound: true });
  }

  onSwipe(direction, state) {
    let { fields: { items } } = this.props;
    const { currentCategory, currentItemArray } = this.state;
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;

    let currentItem = currentItemArray[currentCategory];

    let newCategory;
    let newItem;
    let newItemArray = [...currentItemArray];

    switch (direction) {
      case SWIPE_DOWN:
        newCategory = currentCategory - 1;
        if (newCategory < 0) {
          newCategory = items.length - 1;
        }
        this.setState({ currentCategory: newCategory });
        break;
      case SWIPE_UP:
        newCategory = currentCategory + 1;
        if (newCategory > items.length - 1) {
          newCategory = 0;
        }
        this.setState({ currentCategory: newCategory });
        break;
      case SWIPE_RIGHT:
        newItem = currentItem - 1;
        if (newItem < 0) {
          newItem = items[currentCategory].fields.items.length - 1;
        }
        newItemArray[currentCategory] = newItem;
        this.setState({ currentItemArray: newItemArray });
        break;
      case SWIPE_LEFT:
        newItem = currentItem + 1;
        if (newItem > items[currentCategory].fields.items.length - 1) {
          newItem = 0;
        }
        newItemArray[currentCategory] = newItem;
        this.setState({ currentItemArray: newItemArray });
        break;
    }
  }
} // ARController

ViroARTrackingTargets.createTargets({
  logo: {
    source: markerSource,
    orientation: "Up",
    physicalWidth: 0.1875 // real world width in meters
  }
});

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
