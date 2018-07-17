import React from 'react';

import { modelAssets } from 'static-assets';
import { Viro3DObject } from 'react-viro';

class ThreeDObject extends React.Component {

  render() {
    const { fields } = this.props;
    const modelSource = modelAssets[fields.name.value].model;
    const modelResources = modelAssets[fields.name.value].resources;

    return (
      <Viro3DObject
        source={modelSource}
        resources={[...modelResources]}
        position={[fields.positionX.value, fields.positionY.value, fields.positionZ.value]}
        scale={[.3, .3, .3]}
        type="VRX"
        lightReceivingBitMask={5}
        shadowCastingBitMask={4} />
    );
  }
} // ThreeDObject

export default ThreeDObject;
