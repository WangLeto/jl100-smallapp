let _lastTime = null;

const throttle = function(fn, gapTime = 1500) {
  let _now = +new Date();
  if (_now - _lastTime > gapTime || !_lastTime) {
    fn.apply(arguments);
    _lastTime = _now;
  }
};

export {
  throttle
};
