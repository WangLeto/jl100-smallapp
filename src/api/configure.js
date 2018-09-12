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
    back: '#58cc69'
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
const timesArray = ['0 😘', '1 😑', '2 ☹️', '3 😣', '4 😵', '>=5 😱'];
const settingKeys = {
  mainKey: 'settings',
  manualSync: 'manualSync'
};

module.exports = {
  apiRoot,
  fileName,
  dbKeys,
  testFileName,
  colors,
  timesArray,
  chosenDayToken,
  settingKeys
};
