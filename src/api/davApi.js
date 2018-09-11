import wepy from 'wepy';
import base64 from 'base64-utf8';
import configure from './configure';
import localSave from './localSave';

const apiRoot = configure.apiRoot;
const fileName = configure.fileName;

const getAuthInfo = async () => {
  let info = 'Basic ';
  let account = localSave.getAccount();
  let password = localSave.getPassword();
  if (!account || !password) {
    return null;
  }
  return info + base64.encode(account + ':' + password);
};

const request = async (params = {}, fail_fun = null, success_fun = null) => {
  let authInfo = await await getAuthInfo();
  if (!authInfo) {
    fail_fun();
    return;
  }
  let requestContent = {
    url: apiRoot + fileName,
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

const getAsync = async () => {
  return (await request()).data;
};
const putAsync = async (str) => {
  return await request({
    method: 'PUT',
    data: str
  });
};
const put = (str) => {
  request({
    method: 'PUT',
    data: str
  });
};

module.exports = {
  getAsync,
  put,
  putAsync
};
