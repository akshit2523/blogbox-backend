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

const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.body;

    if (!publicId || typeof publicId !== "string") {
      return res.status(400).json({
        success: 0,
        message: "Image publicId is required",
      });
    }

    // Only allow deletion from your blog uploads folder
    if (!publicId.startsWith("blogs/")) {
      return res.status(400).json({
        success: 0,
        message: "Invalid image publicId",
      });
    }

    const result = await cloudinary.uploader.destroy(publicId, {
      invalidate: true,
    });

    if (result.result !== "ok" && result.result !== "not found") {
      return res.status(500).json({
        success: 0,
        message: "Cloudinary could not delete the image",
      });
    }

    return res.status(200).json({
      success: 1,
      message:
        result.result === "ok"
          ? "Image deleted successfully"
          : "Image was already deleted",
      data: result,
    });
  } catch (error) {
    console.error("Delete image error:", error);

    return res.status(500).json({
      success: 0,
      message: "Image deletion failed",
    });
  }
};

module.exports = {
  uploadImage,
  deleteImage,
};