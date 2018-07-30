import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

import { images, model } from 'static-assets';

import {
  ViroARSceneNavigator,
  ViroARScene,
  ViroAmbientLight,
  ViroNode,
  ViroSpotLight,
  Viro3DObject,
  ViroARTrackingTargets,
  ViroARImageMarker
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
      currentItemArray: []  // Will hold the current item index for each category
    }

    this.renderScene = this.renderScene.bind(this);
    this.renderGestureRecognizer = this.renderGestureRecognizer.bind(this);
    this.onSwipe = this.onSwipe.bind(this);
  }

  componentWillMount() {
    var { fields: { items } } = this.props;

    // Initialize each category's item index to zero
    this.setState({
      currentItemArray: items.map((item) => {
        return 0;
      })
    })
  }

  render() {
    var { fields: { items } } = this.props;
    const { modelIsHovered, currentCategory, currentItemArray } = this.state;

    var currentItem = currentItemArray[currentCategory];

    return (
      <View style={{ flex: 1 }}>

        <ViroARSceneNavigator
          initialScene={{
            scene: this.renderScene
          }}
          apiKey={VIRO_API_KEY} />

        { this.renderGestureRecognizer() }

        { modelIsHovered &&
          <Text style={styles.itemText} >
            {/* Debugging version */}
            { `${items[currentCategory].fields.category}(${currentCategory}) / ${items[currentCategory].fields.items[currentItem].displayName}(${currentItem})` }
            {/* Actual version */}
            {/* { `${items[currentCategory].fields.category} / ${items[currentCategory].fields.items[currentItem].displayName}` } */}
          </Text>
        }

        </View>
    );
  }

  renderScene() {
    var { fields: { items } } = this.props;
    var { currentCategory, currentItemArray } = this.state;

    var currentItem = currentItemArray[currentCategory];

    const modelName = items[currentCategory].fields.items[currentItem].name;
    const currentModel = model[modelName];

    return (
      <ViroARScene>
        <ViroAmbientLight color={"#aaaaaa"} influenceBitMask={1} />
        <ViroARImageMarker target={"logo"} onAnchorFound={this._onAnchorFound} pauseUpdates={this.state.pauseUpdates}>
          <ViroNode position={[0, 0, 0]} >
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
              onHover={(isHovering) => {
                this.setState({ modelIsHovered: isHovering });
              }}
              source={currentModel.source}
              resources={[...currentModel.resources]}
              position={currentModel.position}
              scale={currentModel.scale}
              type={currentModel.type}
              lightReceivingBitMask={5}
              shadowCastingBitMask={4}
              onDrag={this.onDrag} />
          </ViroNode>
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

  onSwipe(direction, state) {
    var { fields: { items } } = this.props;
    const { currentCategory, currentItemArray } = this.state;
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;

    var currentItem = currentItemArray[currentCategory];

    var newCategory;
    var newItem;
    var newItemArray = [...currentItemArray];

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
    physicalWidth: 0.076 // real world width in meters
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
