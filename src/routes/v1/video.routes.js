import { Router } from "express";
import {
    deleteVideo,
    processAndUploadHLS,
} from "../../controllers/video.controller.js";
import upload from "../../middlewares/multer.middleware.js";
import { cloudinary } from "../../config/cloudinary.config.js";
import constants from "../../constants.js";

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
// videoRoutes.get("/", async (req, res) => {
//   try {
//     const folders = await cloudinary.api.sub_folders("hls_videos");
//     const videos = [];

//     for (const folder of folders.folders) {
//       const resources = await cloudinary.api.resources({
//         type: "upload",
//         prefix: folder.path,
//         resource_type: "raw",
//       });

//       videos.push({
//         folder: folder.name,
//         url: resources.resources.map((r) => r.secure_url),
//       });
//     }

//     res.json({ success: true, videos });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

videoRoutes.get("/", async (req, res) => {
  try {
    const baseCloudinaryUrl = `https://res.cloudinary.com/${constants.CLOUDINARY_CLOUD_NAME}/raw/upload`;
    const baseFolder = 'hls_videos';

    const folders = await cloudinary.api.sub_folders(baseFolder);
    const videos = [];

    for (const folder of folders.folders) {
      const videoId = folder.name;
      const videoPathCloud = `${baseFolder}/${videoId}`;

      const masterUrl = `${baseCloudinaryUrl}/${videoPathCloud}/master.m3u8`;
      const variantUrls = {
        "360p": `${baseCloudinaryUrl}/${videoPathCloud}/stream_0/index.m3u8`,
        "480p": `${baseCloudinaryUrl}/${videoPathCloud}/stream_1/index.m3u8`,
        "720p": `${baseCloudinaryUrl}/${videoPathCloud}/stream_2/index.m3u8`,
      };

      videos.push({
        videoId,
        masterUrl,
        variantUrls,
      });
    }

    res.json({ success: true, videos });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

videoRoutes.route("/delete/:videoId").get(deleteVideo);

export default videoRoutes;