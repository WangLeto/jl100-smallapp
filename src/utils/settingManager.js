import { settingKeys as keys } from '../api/configure';

const get = async function(key) {
  let str = await wx.getStorageSync(keys.mainKey);
  if (!str) {
    return defaultSetting(key);
  }
  let value = (JSON.parse(str))[key];
  if (!value) {
    return defaultSetting(key);
  }
  return value;
}

const set = async function(key, value) {
  let str = await wx.getStorageSync(keys.mainKey);
  let records = {};
  if (!!str) {
    records = JSON.parse(str);
  }
  records[key] = value;
  await wx.setStorageSync(keys.mainKey, JSON.stringify(records));
}

const defaultSetting = function(key) {
  switch (key) {
  case keys.manualSync:
    return false;
  case keys.color1:
    return '#f95368';
  case keys.color2:
    return '#48ff60';
  }
}

module.exports = {
  keys,
  get,
  set
};
