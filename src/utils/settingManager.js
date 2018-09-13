import { settingKeys as keys } from '../api/configure';

let callback = null;
const get = async function(key, _callback) {
  if (_callback) {
    callback = _callback;
  }
  let str = await wx.getStorageSync(keys.mainKey);
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
    return '#8dd3bb';
  case keys.color2:
    return '#8e6391';
  case keys.timesArray:
    return ['0 😘', '1 😑', '2 ☹️', '3 😣', '4 😵', '>=5 😱'];
  }
};

module.exports = {
  keys,
  get,
  set
};
