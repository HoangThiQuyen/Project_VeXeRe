const cloudinary = require("cloudinary");

const dotenv = require("dotenv"); // dùng kéo file .env

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          url: result.url,
          id: result.public_id,
          width: result.width,
          height: result.height,
        });
      },

      {
        resource_type: "auto",
        folder: folder,
        use_filename: true,
      }
    );
  });
};
