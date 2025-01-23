const qrCode = require("qrcode");
const path = require("path");

const generateQRCode = async (address) => {
  // Save QR code in the 'public/qr-codes' directory
  const qrPath = path.join(__dirname, "../public/qr-codes", `${address}.png`);
  const qrLink = `https://itc.trademarketcap.ai/${address}`; // URL encoded in the QR code
  await qrCode.toFile(qrPath, qrLink); // Save QR code image at the desired path

  // Return the relative URL to access the QR code from the public folder
  return `/qr-codes/${address}.png`; // URL to access the file
};

module.exports = { generateQRCode };
