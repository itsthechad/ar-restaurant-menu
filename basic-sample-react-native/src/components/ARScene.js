import React from 'react';
import { View } from 'react-native';

import { images, models } from 'static-assets';

import {
  ViroARSceneNavigator,
  ViroARScene,
  ViroAmbientLight,
  ViroText,
  ViroImage,
  ViroNode,
  ViroSpotLight,
  Viro3DObject
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
    return (
      <ViroARScene>

        <ViroAmbientLight color={"#aaaaaa"} influenceBitMask={1} />
        <ViroText text={this.props.fields.text.value} scale={[.5, .5, .5]} position={[0, 0, -1]} width={2} transformBehaviors={["billboardY"]} />
        <ViroImage source={images['/assets/img/banner.jpg']} width={1} height={.2} position={[-2, .5, -1]} />

        <ViroNode position={[.5, -.5, -.5]} dragType="FixedToWorld" onDrag={() => { }} >
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
            source={models['/data/media/model/emoji_smile/emoji_smile.vrx']}
            position={[0, .15, 0]}
            scale={[.3, .3, .3]}
            type="VRX"
            lightReceivingBitMask={5}
            shadowCastingBitMask={4}
            resources={[
              models['/data/media/model/emoji_smile/emoji_smile_diffuse.png'],
              models['/data/media/model/emoji_smile/emoji_smile_normal.png'],
              models['/data/media/model/emoji_smile/emoji_smile_specular.png']
            ]} />
        </ViroNode>

      </ViroARScene>
    );
  }
}

export default ARScene;
