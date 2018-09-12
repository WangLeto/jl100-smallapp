import _ from 'lodash';

const sleep = async function(seconds) {
  await setTimeout(() => {
  }, 1000 * seconds);
};

const mountLodash = () => {
  let des = {
    sleep: sleep
  };
  Object.assign(_, des);
};

module.exports = {
  mountLodash
};
