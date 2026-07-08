function isMobile() {
  const ua = navigator.userAgent.toLowerCase();

  const mobilePatterns = [
    "android",
    "iphone",
    "ipod",
    "ipad",
    "blackberry",
    "bb",
    "windows phone",
    "iemobile",
    "opera mini",
    "opera mobi",
    "mobile safari",
    "fennec",
    "kindle",
    "symbian",
    "maemo",
    "meego",
    "palm",
    "webos",
    "series60",
    "s60",
    "psp",
  ];

  let isMobile = mobilePatterns.some((pattern) => ua.includes(pattern));

  if (isMobile) {
    return true;
  } else {
    return false
  }
}
