
---

# HTTP Live Streaming Backend

Check out the frontend here: [HLS Player Frontend](https://github.com/kishan5459/HLS-Streaming-Frontend)

---

## Overview

This backend service processes uploaded videos using FFmpeg and converts them into adaptive HTTP Live Streaming (HLS) format. It supports multi-resolution streaming (360p, 480p, 720p), uploads HLS segments and playlists to Cloudinary, and provides endpoints for video upload and deletion. Ideal for building scalable video streaming platforms.

---

## Features

* **Video Upload**: Accepts video files and processes them into HLS streams.
* **Adaptive Streaming**: Generates multiple resolutions (360p, 480p, 720p) for adaptive playback.
* **Cloudinary Integration**: Stores HLS segments and playlists in Cloudinary for global delivery.
* **RESTful API**: Simple endpoints for uploading, listing, and deleting videos.
* **Robust Logging**: Uses Winston and Morgan for detailed request and process logging.
* **Error Handling**: Centralized error middleware for consistent API responses.

---

## Tech Stack

* Node.js (v22)
* Express.js
* FFmpeg (via `fluent-ffmpeg` and `ffmpeg-static`)
* Cloudinary
* Multer (file uploads)
* Winston & Morgan (logging)
* dotenv (environment configuration)

---

## Getting Started

### Prerequisites

* Node.js v22+
* Cloudinary account (for video storage)

---

## API Endpoints

### 1. Upload Video for HLS Processing

* **Endpoint:** `POST /api/v1/videos/hls-upload`
* **Form Data:** `video` (file)
* **Response:**

  ```json
  {
    "success": true,
    "message": "HLS video will be processed and uploaded shortly",
    "data": {
      "masterUrl": "https://res.cloudinary.com/...",
      "variantUrls": {
        "360p": "...",
        "480p": "...",
        "720p": "..."
      },
      "videoId": "uuid",
      "videoPath": "cloudinary/path"
    }
  }
  ```
* **Notes:** The response is sent immediately; processing and uploading continue in the background.

### 2. List All Uploaded Videos

* **Endpoint:** `GET /api/v1/videos/`
* **Response:**

  ```json
  {
    "success": true,
    "videos": [
      {
        "folder": "video_folder_name",
        "url": [
          "https://res.cloudinary.com/.../video1.m3u8",
          "https://res.cloudinary.com/.../video2.m3u8"
        ]
      }
    ]
  }
  ```
* **Notes:** Retrieves all HLS video folders and their corresponding video URLs stored in Cloudinary.

### 3. Delete Video and All HLS Assets

* **Endpoint:** `GET /api/v1/videos/delete/:videoId`
* **Response:**

  ```json
  {
    "success": true,
    "message": "Video deleted successfully"
  }
  ```

---

## Project Structure

```
src/
  ├── app.js                # Express app setup
  ├── index.js              # Entry point
  ├── constants.js          # Environment/config constants
  ├── config/
  │   └── cloudinary.config.js
  ├── controllers/
  │   └── video.controller.js
  ├── middlewares/
  │   ├── error.middleware.js
  │   └── multer.middleware.js
  ├── routes/
  │   └── v1/
  │       └── video.routes.js
  └── utils/
      ├── ffmpeg.js
      ├── fileHandler.js
      ├── logger.js
      └── ...
public/
  └── temp/                 # Temporary storage for processing
```

---

## Environment Variables

See `.env.sample` for all required variables.

---

## Acknowledgements

* [FFmpeg](https://ffmpeg.org/)
* [Cloudinary](https://cloudinary.com/)
* [Express.js](https://expressjs.com/)

---

## 🎥 Demo Video

[Watch the demo](https://drive.google.com/file/d/1onBHhkpTbl9LzQCd3dgHPJzNOQNugrn4/view?usp=drive_link)

change quality to 720p and increase speed(if you need) for better experience while playing video

while recording dropdown menu is not recorded by recorder so there is image of that
[Video with dropdown image](https://drive.google.com/file/d/1UpkDMg66BGkWd7coOLmv1Y3rhQMAmd-5/view?usp=drive_link) 