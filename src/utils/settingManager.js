import { settingKeys as keys, colors, defaultTimesArray } from '../api/configure';
import _ from 'lodash';

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
  // 这里不能用 !value 进行判断，因为有布尔变量！！！
  if (value === undefined || value === null) {
    return defaultSetting(key);
  }
  return value;
};

const set = function(key, value) {
  // 监听者，预计用于tools里color的内存数据维护
  callback(key, value);
  let str = wx.getStorageSync(keys.mainKey);
  let records = {};
  if (!!str) {
    records = JSON.parse(str);
  }
  records[key] = value;
  wx.setStorageSync(keys.mainKey, JSON.stringify(records));
};

const setMulti = function(pairs) {
  Object.keys(pairs).forEach(key => {
    callback(key, pairs[key]);
  });
  let str = wx.getStorageSync(keys.mainKey);
  let records = {};
  if (!!str) {
    records = JSON.parse(str);
  }
  records = Object.assign(records, pairs);
  wx.setStorageSync(keys.mainKey, JSON.stringify(records));
};

const defaultSetting = function(key) {
  switch (key) {
  case keys.manualSync:
    return false;
  case keys.color1:
    return _.cloneDeep(colors.defaultZero);
  case keys.color2:
    return _.cloneDeep(colors.defaultHigh);
  case keys.timesArray:
    return _.cloneDeep(defaultTimesArray);
  case keys.firstUse:
    return true;
  case keys.lockPassword:
    return '';
  case keys.lockOn:
    return false;
  case keys.getUnlockInfoSince:
    return 0;
  }
};

module.exports = {
  keys,
  get,
  set,
  setMulti
};
