import QRCode from "qrcode";

export const generateQRCode = async (data) => {
  try {
    return await QRCode.toDataURL(data);
  } catch (error) {
    console.error("Error generating QR Code:", error);
    throw new Error("QR Code generation failed");
  }
};
