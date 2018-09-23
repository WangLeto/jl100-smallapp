import saveLocal from '../api/saveLocal';
import _ from 'lodash';
import dav from '../api/davApi';
import tips from './tips';
import settingManager from '../utils/settingManager';
import { showModalPromised } from './tools';
import { forceGetUnlockInfoFrequency } from '../api/configure';
import wepy from 'wepy';

// 数据格式：{unlock: false, timestamp: 155xxx, items: [{d: '18-09-02', t: 0}, {}]}

const addRecord = function(year, month, day, times) {
  let records = saveLocal.getRecordParsed();
  records = initRecordsInCase(records);
  let date = year % 100 + '-' + (month > 9 ? month : '0' + month) + '-' + (day > 9 ? day : '0' + day);
  // console.log(date);
  _.remove(records.items, { 'd': date });
  records.items.push({
    d: date,
    t: times
  });
  records.timestamp = _.now();
  saveLocal.saveRecord(records);
  return records;
};

const clearUnlockInfo = async function(records) {
  records.unlock = false;
  await dav.putStrAsync(records);
};

// 用于获取解锁信息
const forceGetUnlock = async function(that) {
  let getUnlockInfoSince = settingManager.get(settingManager.keys.getUnlockInfoSince);
  let records = null;
  if (getUnlockInfoSince++ >= forceGetUnlockInfoFrequency) {
    records = await dav.getStrAsync();
    let needUnlock = records.unlock | false;
    if (needUnlock) {
      await doUnlock();
    }
    getUnlockInfoSince = 0;
  }
  settingManager.set(settingManager.keys.getUnlockInfoSince, getUnlockInfoSince);
  that.lockOn = false;
  return records;
};

const doUnlock = async function(records) {
  tips.toastSuccess('云端解锁成功！');
  await clearUnlockInfo(records);
  settingManager.set(settingManager.keys.lockOn, false);
  wepy.$instance.globalData.lockOn = false;
};

const getRecords = async function(that) {
  let cloudRecords = null;
  if (!saveLocal.accountExists()) {
    return saveLocal.getRecordParsed();
  } else if (!(await dav.validNetwork())) {
    tips.toastText('无网络，同步功能将无法正常使用！', 3500);
    return saveLocal.getRecordParsed();
  }

  let manualSync = settingManager.get(settingManager.keys.manualSync);
  if (manualSync) {
    cloudRecords = await forceGetUnlock(that);
    if (!cloudRecords) {
      return saveLocal.getRecordParsed();
    }
  }

  cloudRecords = !!cloudRecords ? cloudRecords : await dav.getStrAsync();
  console.log(cloudRecords.unlock);
  if (!cloudRecords) {
    return saveLocal.getRecordParsed();
  }

  if (cloudRecords.unlock) {
    doUnlock(cloudRecords);
    that.lockOn = false;
  }

  let localRecords = saveLocal.getRecordParsed();
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

const keepData = async function(records, keepCloud = true) {
  tips.loading('正在处理');
  if (!keepCloud) {
    records.timestamp = _.now();
    await dav.putStrAsync(records);
  }
  saveLocal.saveRecord(records);
  tips.hideLoading();
  return records;
};

// 重构云端文件
const rebuildCloudBackup = async function() {
  let records = saveLocal.getRecordParsed();
  records = initRecordsInCase(records);
  records.timestamp = _.now();
  await dav.putStrAsync(records);
  saveLocal.saveRecord(records);
};

const initRecordsInCase = (records) => {
  if (!records || !records.timestamp) {
    records = {
      unlock: false,
      timestamp: 0,
      items: []
    };
  }
  if (!records.unlock) {
    records = Object.assign({ unlock: false }, records);
  }
  return records;
};

module.exports = {
  addRecord,
  getRecords,
  rebuildCloudBackup
};
