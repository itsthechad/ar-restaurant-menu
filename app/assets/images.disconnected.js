/* eslint-disable global-require */

const images = {
  '/assets/img/banner.jpg': require('./img/banner.jpg'),
  '/data/media/img/sc_logo.png': require('../data/media/img/sc_logo.png'),
};

const modelPath = '../data/media/model/';
const modelAssets = {
  soccerBall: {
    model: require(`${modelPath}object_soccerball/object_soccer_ball.vrx`),
    resources: [
      require(`${modelPath}object_soccerball/object_soccer_ball_diffuse.png`),
      require(`${modelPath}object_soccerball/object_soccer_ball_normal.png`),
      require(`${modelPath}object_soccerball/object_soccer_ball_specular.png`),
    ]
  },
  emojiSmile: {
    model: require(`${modelPath}emoji_smile/emoji_smile.vrx`),
    resources: [
      require(`${modelPath}emoji_smile/emoji_smile_diffuse.png`),
      require(`${modelPath}emoji_smile/emoji_smile_normal.png`),
      require(`${modelPath}emoji_smile/emoji_smile_specular.png`),
    ]
  }
};

export { images, modelAssets };
