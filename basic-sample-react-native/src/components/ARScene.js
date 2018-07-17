import React from 'react';
import { View } from 'react-native';

import { Placeholder } from '@sitecore-jss/sitecore-jss-react-native';

import { images, modelAssets } from 'static-assets';

import {
  ViroARSceneNavigator,
  ViroARScene,
  ViroAmbientLight,
  ViroText,
  ViroImage,
  ViroNode,
  ViroSpotLight
} from 'react-viro';

// See instructions in ./cofig.example.js for setting up Viro API key
import { config } from '../config';

const VIRO_API_KEY = config.viroAPIKey;

class ARScene extends React.Component {

  render() {
    // Display a very basic Viro AR scene
    return (
      <View style={{ flex: 1 }}>
        <ViroARSceneNavigator
          initialScene={{
            scene: this.renderScene.bind(this)
          }}
          apiKey={VIRO_API_KEY} />
      </View>
    );
  }

  renderScene() {
    var { fields, rendering } = this.props;

    return (
      <ViroARScene>

        <ViroAmbientLight color={"#aaaaaa"} influenceBitMask={1} />
        <ViroText text={fields.text.editable} scale={[.5, .5, .5]} position={[0, .1, -1]} width={2} transformBehaviors={["billboardY"]} />
        <ViroImage source={images['/assets/img/banner.jpg']} width={1} height={.4} position={[0, .6, -1]} />

        <ViroNode position={[0, 0, -1]} dragType="FixedToWorld" onDrag={() => { }} >
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

          <Placeholder name="models" rendering={rendering} />
        </ViroNode>

      </ViroARScene>
    );
  }
} // ARScene

export default ARScene;
