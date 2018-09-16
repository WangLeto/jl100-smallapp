import Rainbow from 'rainbowvis.js';
import settingManager from './settingManager';

const sleep = async function(seconds) {
  await setTimeout(() => {
  }, 1000 * seconds);
};

const colorMaker = {
  colorsNum: 0,
  rainbow: new Rainbow(),
  init: async function() {
    let color1 = await settingManager.get(settingManager.keys.color1, (key, value) => {
      let color1 = this.color1(), color2 = this.color2();
      let flag = false;
      if (key === settingManager.keys.color1) {
        color1 = value;
        flag = true;
      } else if (key === settingManager.keys.color2) {
        color2 = value;
        flag = true;
      }
      if (flag) {
        this.rainbow.setSpectrum(color1, color2);
      }
    });
    let color2 = await settingManager.get(settingManager.keys.color2);
    this.rainbow.setSpectrum(color1, color2);
    this.colorsNum = (await settingManager.get(settingManager.keys.timesArray)).length;
  },
  getColor: function(index, binaryShow) {
    index = parseInt(index);
    if (binaryShow) {
      return '#' + (index === 0 ? this.color1() : this.color2());
    }
    return '#' + this.rainbow.colorAt(index / (this.colorsNum - 1) * 100);
  },
  color1: function() {
    return '#' + this.rainbow.colorAt(0);
  },
  color2: function() {
    return '#' + this.rainbow.colorAt(100);
  }
};

const colorTool = {
  rgbToHex(r, g, b) {
    function componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? '0' + hex : hex;
    }

    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
  },

  hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let rgb = {};
    rgb.r = parseInt(result[1], 16);
    rgb.g = parseInt(result[2], 16);
    rgb.b = parseInt(result[3], 16);
    return rgb;
  },

  tooBright(r, g, b) {
    if (typeof r === 'object') {
      g = r.g;
      b = r.b;
      r = r.r;
    }
    let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (luma > 230) {
      return true;
    }
    return false;
  }
};

export {
  sleep,
  colorTool,
  colorMaker
};
