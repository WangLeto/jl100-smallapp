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

modules.exports = {
  saveAccount,
  savePassword,
  getAccount,
  getPassword,
}
