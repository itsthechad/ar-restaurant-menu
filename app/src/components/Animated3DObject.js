import React from 'react';

import { Viro3DObject, ViroAnimations } from 'react-viro';

const ANIMATION = {
  SCALE_UP: 'scaleUp',
  SCALE_DOWN: 'scaleDown'
}

class Animated3DObject extends React.Component {
  constructor() {
    super();

    this.state = {
      animateObject: false,
      animName: ANIMATION.SCALE_UP
    }

    this.onObjectLoaded = this.onObjectLoaded.bind(this);
  }

  render() {
    const { source, resources, position, type, onHover, anchorFound } = this.props;
    const { animName, animateObject } = this.state;

    if (anchorFound) {
      return (
        <Viro3DObject
          ref={component => this.objectRef = component}
          scale={[0, 0, 0]}
          animation={{
            name: animName,
            run: animateObject
          }}
          source={source}
          resources={resources}
          position={position}
          type={type}
          onHover={onHover}
          onDrag={this.onDrag}
          onLoadEnd={this.onObjectLoaded} />
      );
    }
    
    return null;
  }

  onObjectLoaded() {
    const { scale } = this.props;
    // console.log("scale: ", scale);

    // Re-register the scaleUp animation so it scales properly for the current model
    ViroAnimations.registerAnimations({
      scaleUp: {
        properties: { scaleX: scale[0], scaleY: scale[1], scaleZ: scale[2] },
        duration: 500, easing: "bounce"
      }
    });

    setTimeout(() => {
      this.setState({
        animName: ANIMATION.SCALE_UP,
        animateObject: true
      });
    }, 50);
  }
} // Animated3DObject

// Default setting - will be overriden to set scale based on props
ViroAnimations.registerAnimations({
  scaleUp: {
    properties: { scaleX: 1, scaleY: 1, scaleZ: 1 },
    duration: 500, easing: "bounce"
  },
  scaleDown: {
    properties: { scaleX: 0, scaleY: 0, scaleZ: 0 },
    duration: 500, easing: "bounce"
  }
});

export default Animated3DObject;
