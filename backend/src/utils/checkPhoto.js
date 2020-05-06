const jimp = require('jimp');

const checkHeightWidthSizeAndExtension = (img, byteLength) => (
  img.bitmap.height >= 512
  && img.bitmap.height <= 1024
  && img.bitmap.width >= 515
  && img.bitmap.height <= 1024
  && (byteLength / 1e6) <= 1
  && ['png', 'jpeg', 'jpg'].includes(img.getExtension()));

const checkPhoto = async (photo) => {
  const base64Data = Buffer.from(photo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  const img = await jimp.read(base64Data);
  return checkHeightWidthSizeAndExtension(img, base64Data.length);
};

module.exports = {
  checkPhoto,
};
