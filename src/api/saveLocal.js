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
  await wx.setStorageSync(dbKeys.record, record);
};

const getRecord = async function() {
  return (await wx.getStorageSync(dbKeys.record));
};

module.exports = {
  saveAccount,
  savePassword,
  getAccount,
  getPassword,
  accountExists,
  saveRecord,
  getRecord
};
