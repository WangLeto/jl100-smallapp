import Rainbow from 'rainbowvis.js';
import settingManager from './settingManager';

const sleep = async function(seconds) {
  await setTimeout(() => {
  }, 1000 * seconds);
};

const colorMaker = {
  color1: '',
  color2: '',
  colorsNum: 0,
  rainbow: new Rainbow(),
  init: async function() {
    let color1 = await settingManager.get(settingManager.keys.color1, (key, value) => {
      let color1, color2;
      if (key === settingManager.keys.color1) {
        color1 = value;
        console.log('found color1 changes')
      } else if (key === settingManager.keys.color2) {
        color2 = value;
        console.log('found color2 changes')
      }
      if (color1 || color2) {
        this.rainbow.setSpectrum(color1, color2);
      }
    });
    let color2 = await settingManager.get(settingManager.keys.color2);
    this.rainbow.setSpectrum(color1, color2);
    this.colorsNum = (await settingManager.get(settingManager.keys.timesArray)).length;
  },
  getColor: function(index) {
    return '#' + this.rainbow.colorAt(index / (this.colorsNum - 1) * 100);
  }
};

export {
  sleep,
  colorMaker
};
