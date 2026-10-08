const { Readable } = require("stream");
const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: 0,
        message: "No image uploaded",
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "blogs",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary error:", error);

          return res.status(500).json({
            success: 0,
            message: "Image upload failed",
          });
        }

        return res.status(200).json({
          success: 1,
          message: "Image uploaded successfully",
          data: {
            url: result.secure_url,
            publicId: result.public_id,
          },
        });
      },
    );

    Readable.from(req.file.buffer).pipe(uploadStream);
  } catch (error) {
    console.error("Upload error:", error);

    return res.status(500).json({
      success: 0,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  uploadImage,
};