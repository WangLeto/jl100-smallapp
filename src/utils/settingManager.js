import { settingKeys as keys, colors, defaultTimesArray } from '../api/configure';

let callback = null;
const get = function(key, _callback) {
  if (_callback) {
    callback = _callback;
  }
  let str = wx.getStorageSync(keys.mainKey);
  if (!str) {
    return defaultSetting(key);
  }
  let value = (JSON.parse(str))[key];
  if (!value) {
    return defaultSetting(key);
  }
  return value;
};

const set = async function(key, value) {
  // 监听者，预计用于tools里color的内存数据维护
  callback(key, value);
  let str = await wx.getStorageSync(keys.mainKey);
  let records = {};
  if (!!str) {
    records = JSON.parse(str);
  }
  records[key] = value;
  await wx.setStorageSync(keys.mainKey, JSON.stringify(records));
};

const defaultSetting = function(key) {
  switch (key) {
  case keys.manualSync:
    return false;
  case keys.color1:
    return colors.defaultZero;
  case keys.color2:
    return colors.defaultHigh;
  case keys.timesArray:
    return defaultTimesArray;
  }
};

module.exports = {
  keys,
  get,
  set
};
