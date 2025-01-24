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
