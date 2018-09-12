const toastErr = function(title) {
  wx.showToast({
    title: title,
    image: '../assets/fail.png'
  });
};

const toastSuccess = function(title) {
  wx.showToast({
    title: title,
    image: '../assets/success.png'
  });
};

const toastText = function(str) {
  wx.showToast({
    title: str,
    icon: 'none'
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
  loading,
  hideLoading
};
