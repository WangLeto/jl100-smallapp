const toastErr = function(title, duration = 1500) {
  wx.showToast({
    title: title,
    image: '../assets/fail.png',
    duration: duration
  });
};

const toastSuccess = function(title, duration = 1500) {
  wx.showToast({
    title: title,
    image: '../assets/success.png',
    duration: duration
  });
};

const toastTip = function(title, duration = 1500) {
  wx.showToast({
    title: title,
    image: '../assets/tip.png',
    duration: duration
  });
};

const toastText = function(str, duration = 1500) {
  wx.showToast({
    title: str,
    icon: 'none',
    duration: duration
  });
};

const loading = function(title) {
  wx.showLoading({
    title: title,
    mask: true
  });
};

const hideLoading = function() {
  wx.hideLoading();
};

module.exports = {
  toastErr,
  toastSuccess,
  toastText,
  toastTip,
  loading,
  hideLoading
};
