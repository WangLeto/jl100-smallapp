import saveLocal from '../api/saveLocal';
import _ from 'lodash';
import dav from '../api/davApi';
import zip from 'lz-string';

// 数据格式：{timestamp: 155xxx, items: [{d: '18-09-02', t: 0, w: 'bala'}, {}]}

const addRecord = async function(year, month, day, times, text = '') {
  let records = await saveLocal.getRecordParsed();
  records = initRecordsInCase(records);
  let date = year % 100 + '-' + (month > 9 ? month : '0' + month) + '-' + (day > 9 ? day : '0' + day);
  // console.log(date);
  _.remove(records.items, { 'd': date });
  records.items.push({
    d: date,
    t: times,
    w: text
  });
  records.timestamp = _.now();
  saveLocal.saveRecord(records);
  return records;
};

const getRecords = async function() {
  let str = await dav.getStrAsync();
  console.log(str);
  // 文件被删，等待重建
  if (!str) {
    return;
  }
  console.log(str);
  let records = JSON.parse(str);
  let localRecords = await saveLocal.getRecordParsed();
  if (records.timestamp > localRecords.timestamp) {
    showModal();
  }
};

const showModal = function() {
  wx.showModal({
    title: '云端备份较新',
    content: '发现云端备份为更新数据，选择保留本地数据，或以云端为准',
    cancelText: '保留本地',
    confirmText: '采用云端',
    success: function(res) {
      if (res.confirm) {
        wx.showModal({
          title: '是否确认？',
          content: '即将使用云端覆盖本地数据',
          success: function(res) {
            if (res.confirm) {

            } else {
              showModal();
            }
          }
        })
      } else {
        wx.showModal({
          title: '是否确认？',
          content: '即将使用本地数据覆盖云端',
          success: function(res) {
            if (res.confirm) {

            } else {
              showModal();
            }
          }
        })
      }
    }
  });
}

// 重构云端文件
const rebuildCloudBackup = async function() {
  let records = await saveLocal.getRecordParsed();
  records = initRecordsInCase(records);
  records.timestamp = _.now();
  await Promise.all([
    saveLocal.saveRecord(records),
    dav.putStrAsync(JSON.stringify(records))
  ]);
}

const initRecordsInCase = (records) => {
  if (!records || !records.timestamp) {
    records = {
      timestamp: 0,
      items: []
    };
  }
  return records;
};

module.exports = {
  addRecord,
  getRecords,
  rebuildCloudBackup
};
