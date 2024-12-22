const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios"); // Import axios to make HTTP requests

const app = express();
const PORT = 3000;

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files to "uploads" folder
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Route to handle file uploads
app.post("/upload", upload.single("video"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  // File uploaded successfully, now make a request to the prediction server
  try {
    // Send a POST request to http://localhost:5000/predict
    const response = await axios.post("http://localhost:5000/predict", {
      filename: req.file.filename, // You can send any required data
    });

    // Assuming the response is a JSON array like [{filename: "video1.mp4", label: "0"}, ...]
    const predictionData = response.data;

    // Delete the video file from the server after prediction request
    fs.unlink(path.join(uploadDir, req.file.filename), (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log(`File ${req.file.filename} deleted successfully.`);
      }
    });

    // Send the result back to the client
    res.status(200).json({
      message: `Video uploaded successfully! Saved as ${req.file.filename}`,
      predictions: predictionData,
    });
  } catch (error) {
    console.error("Error during prediction request:", error);
    res.status(500).json({ message: "Failed to get predictions." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
