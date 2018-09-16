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
  }
};
const chosenDayToken = '__isCurrentChosenDayHighlight';
const settingKeys = {
  mainKey: 'settings',
  manualSync: 'manualSync',
  color1: 'color1',
  color2: 'color2',
  timesArray: 'timesArray',
  binaryShow: 'binaryShow'
};

module.exports = {
  apiRoot,
  fileName,
  dbKeys,
  testFileName,
  colors,
  chosenDayToken,
  settingKeys
};
