import saveLocal from '../api/saveLocal';
import _ from 'lodash';
import dav from '../api/davApi';
import tips from './tips';
import settingManager from '../utils/settingManager';

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
  let manualSync = await settingManager.get(settingManager.keys.manualSync);
  if (manualSync) {
    return await saveLocal.getRecordParsed();
  }

  let str = await dav.getStrAsync();
  // 文件被删，等待重建
  if (!str) {
    return await saveLocal.getRecordParsed();
  };
  let cloudRecords = typeof str === 'string' ? JSON.parse(str) : str;
  let localRecords = await saveLocal.getRecordParsed();
  if (!localRecords) {
    await showModalPromised({
      title: '发现云端备份',
      content: '即将恢复备份到本地',
      showCancel: false
    });
    return await keepData(cloudRecords);
  } else if (cloudRecords.timestamp > localRecords.timestamp) {
    return await showModal(cloudRecords, localRecords);
  } else if (cloudRecords.timestamp < localRecords.timestamp) {
    return await keepData(localRecords, false);
  }
  return localRecords;
};

const showModal = async function(cloudRecords, localRecords) {
  let res = await showModalPromised({
    title: '云端备份较新',
    content: '发现云端备份为更新数据，选择保留本地数据，或以云端为准',
    cancelText: '保留本地',
    confirmText: '采用云端'
  });
  if (res.confirm) {
    let res2 = await showModalPromised({
      title: '是否确认？',
      content: '即将使用云端覆盖本地数据'
    });
    if (res2.confirm) {
      return await keepData(cloudRecords);
    } else {
      return await showModal(cloudRecords, localRecords);
    }
  } else {
    let res2 = await showModalPromised({
      title: '是否确认？',
      content: '即将使用本地数据覆盖云端'
    });
    if (res2.confirm) {
      return await keepData(localRecords, false);
    } else {
      return showModal(cloudRecords, localRecords);
    }
  }
};

const showModalPromised = function(obj) {
  return new Promise(function(resolve) {
    obj = Object.assign(obj, {
      success: function(res) {
        resolve(res);
      }
    });
    wx.showModal(obj);
  });
};

const keepData = async function(records, keepCloud = true) {
  tips.loading('正在处理');
  if (!keepCloud) {
    records.timestamp = _.now();
    await dav.putStrAsync(records);
  }
  await saveLocal.saveRecord(records);
  tips.hideLoading();
  return records;
};

// 重构云端文件
const rebuildCloudBackup = async function() {
  let records = await saveLocal.getRecordParsed();
  records = initRecordsInCase(records);
  records.timestamp = _.now();
  await Promise.all([
    saveLocal.saveRecord(records),
    dav.putStrAsync(records)
  ]);
};

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
