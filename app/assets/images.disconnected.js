/* eslint-disable global-require */

const images = {
  '/assets/img/banner.jpg': require('./img/banner.jpg'),
  '/data/media/img/sc_logo.png': require('../data/media/img/sc_logo.png'),
};

const modelPath = '../data/media/model/';
const model = {
  soccerBall: {
    source: require(`${modelPath}object_soccerball/object_soccer_ball.vrx`),
    resources: [
      require(`${modelPath}object_soccerball/object_soccer_ball_diffuse.png`),
      require(`${modelPath}object_soccerball/object_soccer_ball_normal.png`),
      require(`${modelPath}object_soccerball/object_soccer_ball_specular.png`),
    ],
    type: 'VRX',
    position: [0, 0, -1],
    scale: [.5, .5, .5]
  },
  emojiSmile: {
    source: require(`${modelPath}emoji_smile/emoji_smile.vrx`),
    resources: [
      require(`${modelPath}emoji_smile/emoji_smile_diffuse.png`),
      require(`${modelPath}emoji_smile/emoji_smile_normal.png`),
      require(`${modelPath}emoji_smile/emoji_smile_specular.png`),
    ],
    type: 'VRX',
    position: [0, 0, -1],
    scale: [.3, .3, .3]
  },
  emojiAngry: {
    source: require(`${modelPath}emoji_angry/emoji_angry.vrx`),
    resources: [
      require(`${modelPath}emoji_angry/emoji_angry_diffuse.png`),
      require(`${modelPath}emoji_angry/emoji_angry_normal.png`),
      require(`${modelPath}emoji_angry/emoji_angry_specular.png`),
    ],
    type: 'VRX',
    position: [0, 0, -1],
    scale: [.3, .3, .3]
  },
  cake: {
    source: require(`${modelPath}cake/cake.vrx`),
    resources: [
      require(`${modelPath}cake/NRS_Cake_OBJ.mtl`),
      require(`${modelPath}cake/NRS_001_MAP.jpg`),
      require(`${modelPath}cake/NRS_001_Bottom.jpg`),
    ],
    type: 'VRX',
    position: [0, 0, -1],
    scale: [.2, .2, .2]
  },
  margarita: {
    source: require(`${modelPath}margarita/margarita.vrx`),
    resources: [
      require(`${modelPath}margarita/MixDrink2.mtl`),
      require(`${modelPath}margarita/_2.png`),
      require(`${modelPath}margarita/_3.png`),
      require(`${modelPath}margarita/_6.png`),
      require(`${modelPath}margarita/Color_F13.jpg`)
    ],
    type: 'VRX',
    position: [0, 0, -1],
    scale: [.01, .01, .01]
  },
  mixdrink: {
    source: require(`${modelPath}mixdrink/mixdrink.vrx`),
    resources: [
      require(`${modelPath}mixdrink/MixDrink1.mtl`),
      require(`${modelPath}mixdrink/_1.png`),
      require(`${modelPath}mixdrink/_4.png`),
      require(`${modelPath}mixdrink/_7.jpg`)
    ],
    type: 'VRX',
    position: [0, 0, -1],
    scale: [.01, .01, .01]
  },
  applestrudel: {
    source: require(`${modelPath}applestrudel/applestrudel.vrx`),
    resources: [
      require(`${modelPath}applestrudel/AppleStrudel.mtl`),
      require(`${modelPath}applestrudel/AppleStrudel.jpg`),
      require(`${modelPath}applestrudel/applestrudel_nmap.jpg`)
    ],
    type: 'VRX',
    position: [0, 0, -1],
    scale: [.02, .02, .02]
  }
};

export { images, model };
