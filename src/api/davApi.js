import wepy from 'wepy';
import base64 from 'base64-utf8';
import configure from './configure';
import saveLocal from './saveLocal';

const apiRoot = configure.apiRoot;
const fileName = configure.fileName;

const getAuthInfo = (account, password) => {
  if (!account) {
    account = saveLocal.getAccount();
    password = saveLocal.getPassword();
  }
  // console.log('account:' + account, 'password:' + password);
  return 'Basic ' + base64.encode(account + ':' + password);
};

const request = async (params = {}, fail_fun = null, success_fun = null) => {
  let authInfo = params.authInfo;
  if (!authInfo) {
    authInfo = await getAuthInfo();
  }
  if (!authInfo) {
    fail_fun();
    return;
  }
  let requestContent = {
    url: params.url || apiRoot + fileName,
    method: params.method || 'GET',
    data: params.data || {},
    header: {
      Authorization: authInfo
    }
  };

  let result = await wepy.request(requestContent).catch(fail_fun ? fail_fun(params.data) : null);
  if (success_fun) {
    success_fun(result);
  }
  return result;
};

const getStrAsync = async (authInfo = null) => {
  let r = await request({
    authInfo: authInfo
  });
  if (r.statusCode === 404) {
    return '';
  }
  let str = r.data;
  return str;
};

const putStrAsync = async (obj, autoInfo = null) => {
  let str = JSON.stringify(obj);
  return await request({
    method: 'PUT',
    data: str,
    authInfo: autoInfo
  });
};

const putStr = (obj) => {
  let str = JSON.stringify(obj);
  request({
    method: 'PUT',
    data: str
  });
};

const testAccount = async (account, password) => {
  let statusCode = (await request({
    method: 'PUT',
    data: ' ',
    url: apiRoot + configure.testFileName,
    authInfo: await getAuthInfo(account, password)
  })).statusCode;
  console.log(statusCode);
  return statusCode === 204 || statusCode === 201;
};

const delTestFile = async () => {
  await request({
    method: 'DELETE',
    url: apiRoot + configure.testFileName
  });
};

module.exports = {
  getStrAsync,
  putStr,
  putStrAsync,
  testAccount,
  delTestFile
};
