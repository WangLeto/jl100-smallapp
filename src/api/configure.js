const apiRoot = 'https://dav.jianguoyun.com/dav/';
const fileName = '我的坚果云/JL日历数据-请勿删除.txt';
const testFileName = '我的坚果云/__JL日历临时文件-可删除';
const dbKeys = {
  jgyAccount: 'jgyAccount',
  jgyPassword: 'jgyPassword',
  records: 'records'
};
const colors = {
  currentChosen: {
    color: 'white',
    back: '#263238'
  },
  today: {
    color: 'white',
    back: '#ccc'
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
  timesArray: 'timesArray'
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
