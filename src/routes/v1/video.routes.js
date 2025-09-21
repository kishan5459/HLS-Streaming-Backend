import { Router } from "express";
import {
    deleteVideo,
    processAndUploadHLS,
} from "../../controllers/video.controller.js";
import upload from "../../middlewares/multer.middleware.js";
const videoRoutes = Router();

videoRoutes.post("/hls-upload", (req, res, next) => {
    upload.single("video")(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        processAndUploadHLS(req, res, next);
    });
});

videoRoutes.route("/delete/:videoId").get(deleteVideo);

export default videoRoutes;
