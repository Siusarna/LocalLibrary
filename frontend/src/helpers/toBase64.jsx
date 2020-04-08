
const toBase64 = (blob, callback) => {
  const reader = new FileReader();
  reader.onloadend = function () {
    const base64data = reader.result;
    callback(base64data);
  }
  reader.readAsDataURL(blob);
}

export default toBase64;
