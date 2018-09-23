const apiRoot = 'https://dav.jianguoyun.com/dav/';
const fileName = '我的坚果云/不良日历数据-请勿删除.txt';
const testFileName = '我的坚果云/__不良日历临时文件-可删除';
const dbKeys = {
  jgyAccount: 'jgyAccount',
  jgyPassword: 'jgyPassword',
  records: 'records'
};
const colors = {
  currentChosen: {
    back: '#fff40c'
  },
  today: {
    back: '#d3e2e7'
  },
  normalDay: {
    color: '#a18ada',
    back: 'transparent'
  },
  sunday: {
    color: '#f488cd',
    back: 'transparent'
  },
  defaultZero: '#F3F9BB',
  defaultHigh: '#8e6391'
};
const chosenDayToken = '__isCurrentChosenDayHighlight';
const settingKeys = {
  mainKey: 'settings',
  manualSync: 'manualSync',
  color1: 'color1',
  color2: 'color2',
  timesArray: 'timesArray',
  binaryShow: 'binaryShow',
  firstUse: 'firstUse',
  lockOn: 'lockOn',
  lockPassword: 'lockPassword',
  lockOccasionIndex: 'lockOccasionIndex',
  // 自从上次获取解锁信息后打开次数
  getUnlockInfoSince: 'getUnlockInfoSince'
};
const defaultTimesArray = [{ text: '0 😘', num: 0 }, { text: '1 😑', num: 1 }, { text: '2 ☹️', num: 2 },
  { text: '3 😣', num: 3 }, { text: '4 😵', num: 4 }, { text: '>=5 😱', num: 5 }];
const lockOccasions = [
  '启动时', '离开小程序界面时'
];
const forceGetUnlockInfoFrequency = 3;

module.exports = {
  apiRoot,
  fileName,
  dbKeys,
  testFileName,
  colors,
  chosenDayToken,
  settingKeys,
  defaultTimesArray,
  lockOccasions,
  forceGetUnlockInfoFrequency
};
