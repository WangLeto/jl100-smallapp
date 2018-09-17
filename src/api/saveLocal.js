import configure from './configure';

let dbKeys = configure.dbKeys;

const saveAccountPassword = function(account, password) {
  wx.setStorageSync(dbKeys.jgyAccount, account);
  wx.setStorageSync(dbKeys.jgyPassword, password);
};

const getAccount = function() {
  return wx.getStorageSync(dbKeys.jgyAccount);
};

const getPassword = function() {
  return wx.getStorageSync(dbKeys.jgyPassword);
};

const accountExists = function() {
  let account = getAccount();
  let password = getPassword();
  return account && password;
};

const saveRecord = function(records) {
  if (typeof records !== 'string') {
    records = JSON.stringify(records);
  }
  wx.setStorageSync(dbKeys.records, records);
};

const getRecordParsed = function() {
  let str = wx.getStorageSync(dbKeys.records);
  if (!str) {
    return null;
  }
  return JSON.parse(str);
};

module.exports = {
  saveAccountPassword,
  getAccount,
  getPassword,
  accountExists,
  saveRecord,
  getRecordParsed
};
