import { Router } from "express";
import {
    deleteVideo,
    processAndUploadHLS,
} from "../../controllers/video.controller.js";
import upload from "../../middlewares/multer.middleware.js";
import { cloudinary } from "../../config/cloudinary.config.js";

const videoRoutes = Router();

videoRoutes.post("/hls-upload", (req, res, next) => {
    upload.single("video")(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        processAndUploadHLS(req, res, next);
    });
});

// Get all videos
videoRoutes.get("/", async (req, res) => {
  try {
    const folders = await cloudinary.api.sub_folders("hls_videos");
    const videos = [];

    for (const folder of folders.folders) {
      const resources = await cloudinary.api.resources({
        type: "upload",
        prefix: folder.path,
        resource_type: "raw",
      });

      videos.push({
        folder: folder.name,
        url: resources.resources.map((r) => r.secure_url),
      });
    }

    res.json({ success: true, videos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

videoRoutes.route("/delete/:videoId").get(deleteVideo);

export default videoRoutes;