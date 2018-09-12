import wepy from 'wepy';
import base64 from 'base64-utf8';
import configure from './configure';
import saveLocal from './saveLocal';
import zip from 'lz-string';

const apiRoot = configure.apiRoot;
const fileName = configure.fileName;

const getAuthInfo = async (account, password) => {
  if (!account) {
    account = await saveLocal.getAccount();
    password = await saveLocal.getPassword();
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

// 上传下载前，均对字符串进行压缩处理
const getStrAsync = async (authInfo = null) => {
  let r = await request({
    authInfo: authInfo
  });
  if (r.statusCode === 404) {
    return '';
  }
  console.log(r.data);
  let str = zip.decompress(r.data);
  console.log(str);
  return str;
};

const putStrAsync = async (str, autoInfo = null) => {
  // 测试：
  // str = str.replace('15', '16');
  console.log(str);
  str = zip.compress(str);
  console.log(str);
  return await request({
    method: 'PUT',
    data: str,
    authInfo: autoInfo
  });
};

const putStr = (str) => {
  str = zip.compress(str);
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
