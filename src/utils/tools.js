import Rainbow from 'rainbowvis.js';
import settingManager from './settingManager';

const sleep = async function(seconds) {
  await setTimeout(() => {
  }, 1000 * seconds);
};

const getRainbowColor = function(color1, color2, colorsNum, index) {
  const rainbow = new Rainbow();
  rainbow.setSpectrum(color1, color2);
  return rainbow.colorAt(index / colorsNum * 100);
};

const colorMaker = {
  color1: '',
  color2: '',
  init: async function() {
    this.color1 = await settingManager.get(settingManager.keys.color1, (key, value) => {
      if (key === settingManager.keys.color1) {
        this.color1 = value;
        console.log('found color1 changes')
      } else if (key === settingManager.keys.color2) {
        this.color2 = value;
        console.log('found color2 changes')
      }
    });
    this.color2 = await settingManager.get(settingManager.keys.color2);
  },
  getColor: function(total, index) {
    return getRainbowColor(this.color1, this.color2, total, index);
  }
};

export {
  sleep,
  colorMaker
};
