// const qrCode = require("qrcode");
// const path = require("path");

// const generateQRCode = async (address) => {
//   // Save QR code in the 'public/qr-codes' directory
//   const qrPath = path.join(__dirname, "../public/qr-codes", `${address}.png`);
//   const qrLink = `https://itc.trademarketcap.ai/${address}`; // URL encoded in the QR code
//   await qrCode.toFile(qrPath, qrLink); // Save QR code image at the desired path

//   // Return the relative URL to access the QR code from the public folder
//   return `/qr-codes/${address}.png`; // URL to access the file
// };

// module.exports = { generateQRCode };

// qrCodeService.js
const qrCode = require("qrcode");
const { v2: cloudinary } = require("cloudinary");

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dygw3ixdr",
  api_key: "758867266833758",
  api_secret: "pF2xiYaxdd1Ta6jGyZabi1x_bNs",
});

const generateQRCode = async (address) => {
  try {
    // Generate QR code as buffer
    const qrBuffer = await qrCode.toBuffer(
      `https://itc.trademarketcap.ai/${address}`
    );

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(
      `data:image/png;base64,${qrBuffer.toString("base64")}`,
      {
        public_id: `qr-codes/${address}`,
        overwrite: true,
        resource_type: "image",
        format: "png",
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      }
    );

    return uploadResult.secure_url;
  } catch (error) {
    console.error("Error generating/uploading QR code:", error);
    throw error;
  }
};

module.exports = { generateQRCode };
