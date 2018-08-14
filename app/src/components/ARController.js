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

// Specify the target marker
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
    this.renderTextContainer = this.renderTextContainer.bind(this);
    this.renderGestureRecognizer = this.renderGestureRecognizer.bind(this);
    this.onAnchorFound = this.onAnchorFound.bind(this);
    this.onSwipe = this.onSwipe.bind(this);
  }

  componentWillMount() {
    const { fields: { items } } = this.props;

    // Initialize each category's item index to zero.
    // This means when we go to a category for the first time, we'll start at the first item in that category.
    this.setState({
      currentItemArray: items.map((item) => {
        return 0;
      })
    })
  }

  render() {
    const { modelIsHovered } = this.state;

    return (
      <View style={{ flex: 1 }}>

        {/* Our AR Scene */}
        <ViroARSceneNavigator
          initialScene={{ scene: this.renderScene }}
          apiKey={VIRO_API_KEY} />

        {/* Reticle */}
        { !modelIsHovered &&
          <View style={styles.reticle} />
        }

        {/* Instructions text and Desctiption text */}
        { this.renderTextContainer() }

        {/* Handle swipe input */}
        { this.renderGestureRecognizer() }

      </View>
    );
  }

  renderTextContainer() {
    const { fields: { items } } = this.props;
    const { anchorFound, modelIsHovered, currentCategory, currentItemArray } = this.state;

    const currentItem = currentItemArray[currentCategory];

    return (
      <View style={styles.textView}>
        {/* Instructions - "Find the target" */}
        { !anchorFound &&
          <Text style={styles.instructionsText} >
            Find your plate...
          </Text>
        }
        {/* Description text - shown only when user is hovered on 3d model */ }
        { modelIsHovered &&
            <React.Fragment>
              <Text style={styles.categoryText} >
                {items[currentCategory].fields.category}
              </Text>
              <Text style={styles.itemText} >
                {items[currentCategory].fields.items[currentItem].displayName}
              </Text>
            </React.Fragment>
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

        {/* Ambient light to give the 3d objects basic lighting */}
        <ViroAmbientLight color={"#aaaaaa"} />

        {/* The items inside the ViroARImageMarker won't appear until the specified marker is found */}
        <ViroARImageMarker
          target={"logo"}
          onAnchorFound={this.onAnchorFound} >
          
          {/* The primary light for the 3d objects - casts shadow */}
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

          {/* A Viro3DObject component wrapped with logic for animating on load */}
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

          {/* Surface to receive shadows */}
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
    const { modelIsHovered } = this.state;

    // Don't allow swiping unless user is hovered on model
    if (!modelIsHovered) {
      return;
    }

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
  reticle: {
    flex: 1,
    height: 2,
    width: 2,
    position: 'absolute',
    top: '50%',
    left: '50%',
    backgroundColor: 'white',
    borderRadius: 3
  },
  textView: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    backgroundColor: '#00000000'
  },
  instructionsText: {
    backgroundColor: '#00000000',
    position: 'relative',
    top: -30,
    fontSize: 25,
    fontWeight: 'bold',
    textShadowColor: 'rgba(256, 256, 256, 0.5)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5
  },
  categoryText: {
    position: 'absolute',
    top: 40,
    left: 40,
    fontSize: 35,
    fontWeight: 'bold',
    textShadowColor: 'rgba(256, 256, 256, 0.5)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5
  },
  itemText: {
    position: 'absolute',
    top: 70,
    left: 40,
    fontSize: 55,
    fontWeight: 'bold',
    textShadowColor: 'rgba(256, 256, 256, 0.5)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5
  }
});

export default ARController;
