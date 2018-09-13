import configure from './configure';

let dbKeys = configure.dbKeys;

const saveAccountPassword = async function(account, password) {
  await wx.setStorageSync(dbKeys.jgyAccount, account);
  await wx.setStorageSync(dbKeys.jgyPassword, password);
};

const getAccount = async function() {
  return (await wx.getStorageSync(dbKeys.jgyAccount));
};

const getPassword = async function() {
  return (await wx.getStorageSync(dbKeys.jgyPassword));
};

const accountExists = async function() {
  let account = await getAccount();
  let password = await getPassword();
  return account && password;
};

const saveRecord = async function(records) {
  if (typeof records !== 'string') {
    records = JSON.stringify(records);
  }
  await wx.setStorageSync(dbKeys.records, records);
};

const getRecordParsed = async function() {
  let str = await wx.getStorageSync(dbKeys.records);
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
