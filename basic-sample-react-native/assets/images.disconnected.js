/* eslint-disable global-require */

const images = {
  '/assets/img/banner.jpg': require('./img/banner.jpg'),
  '/data/media/img/sc_logo.png': require('../data/media/img/sc_logo.png'),
};

const models = {
  // Soccer ball
  '/data/media/model/object_soccerball/object_soccer_ball_diffuse.png': require('../data/media/model/object_soccerball/object_soccer_ball_diffuse.png'),
  '/data/media/model/object_soccerball/object_soccer_ball_normal.png': require('../data/media/model/object_soccerball/object_soccer_ball_normal.png'),
  '/data/media/model/object_soccerball/object_soccer_ball_specular.png': require('../data/media/model/object_soccerball/object_soccer_ball_specular.png'),
  '/data/media/model/object_soccerball/object_soccer_ball.vrx': require('../data/media/model/object_soccerball/object_soccer_ball.vrx'),
  // Emoji smile
  '/data/media/model/emoji_smile/emoji_smile_diffuse.png': require('../data/media/model/emoji_smile/emoji_smile_diffuse.png'),
  '/data/media/model/emoji_smile/emoji_smile_normal.png': require('../data/media/model/emoji_smile/emoji_smile_normal.png'),
  '/data/media/model/emoji_smile/emoji_smile_specular.png': require('../data/media/model/emoji_smile/emoji_smile_specular.png'),
  '/data/media/model/emoji_smile/emoji_smile.vrx': require('../data/media/model/emoji_smile/emoji_smile.vrx'),
};

export { images, models };
