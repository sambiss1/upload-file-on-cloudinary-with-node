require("dotenv").config();
const express = require("express");
const cloudinary = require("./cloudinary");
const uploader = require("./multer");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Post single
app.post("/upload/one", uploader.single("image"), async (req, res) => {
  const upload = await cloudinary.v2.uploader.upload(req.file.path);
  return res.json({
    success: 1,
    caption: "image caption",
    file: {
      url: upload.secure_url,
    },
  });
});

// Post multiples
app.post("/upload", uploader.array("file"), async (req, res) => {
  //   const upload = async (path) =>
  //     await cloudinary.v2.uploader.upload(path, "Files");
  const urls = [];
  const files = req.files;

  let multiplePicturePromise = files.map((file) =>
    cloudinary.v2.uploader.upload(file.path),
  );

  let imageResponses = await Promise.all(multiplePicturePromise);

  return res.json({
    success: true,
    files: imageResponses.map((image) => image.url),
  });
});

app.listen(8000, () => {
  console.log("Server is listening on port " + 8000);
});
