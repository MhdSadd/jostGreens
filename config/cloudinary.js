const cloudinary = require("cloudinary").v2;

// :::::::::::::::::::::::CLOUDINARY CONFIG :::::::::::::::::

const cloudinarySetup = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

// cloudinary upload method
const cloudinaryMediaUpload = async (file, folder) => {
  await cloudinarySetup();
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      {
        resource_type: "auto",
        folder: folder,
      },
      (err, result) => {
        if (err) throw err;
        resolve({
          url: result.secure_url,
          id: result.public_id,
        });
      }
    );
  });
};

module.exports = cloudinaryMediaUpload;
