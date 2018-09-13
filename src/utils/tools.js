import _ from 'lodash';
import Rainbow from 'rainbowvis.js';

const sleep = async function(seconds) {
  await setTimeout(() => {
  }, 1000 * seconds);
};

const getRainbowColor = function(color1, color2, colorsNum, index) {
  const rainbow = new Rainbow();
  rainbow.setSpectrum(color1, color2);
  return rainbow.colorAt(index / colorsNum * 100);
};

const mountLodash = () => {
  let des = {
    sleep: sleep,
    getRainbowColor: getRainbowColor
  };
  Object.assign(_, des);
};

module.exports = {
  mountLodash
};
