import configure from './configure';

let dbKeys = configure.dbKeys;

const saveAccount = async function(account) {
  await wx.setStorageSync(dbKeys.jgyAccount, account);
};

const savePassword = async function(password) {
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

const saveRecord = async function(record) {
  if (typeof record !== 'string') {
    record = JSON.stringify(record);
  }
  await wx.setStorageSync(dbKeys.record, record);
};

const getRecordParsed = async function() {
  let str = await wx.getStorageSync(dbKeys.record);
  if (!str) {
    await saveRecord([]);
    return [];
  }
  return JSON.parse(str);
};

module.exports = {
  saveAccount,
  savePassword,
  getAccount,
  getPassword,
  accountExists,
  saveRecord,
  getRecordParsed
};
