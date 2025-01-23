const qrCode = require("qrcode");
const path = require("path");

const generateQRCode = async (address) => {
  const qrPath = `./qr-codes/${address}.png`;
  const qrLink = `https://itc.trademarketcap.ai/${address}`;
  await qrCode.toFile(qrPath, qrLink);
  return `/qr-codes/${path.basename(qrPath)}`;
};

module.exports = { generateQRCode };
