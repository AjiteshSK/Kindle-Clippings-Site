const express = require("express");
const multer = require("multer");
const upload = require({ dest: "uploads/" });

const app = express();

app.post("/", upload.single("clipping"), (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file upload detected" });
  }

  console.log("FILE", req.file);
  return res.status(200).json({ message: "File recieved" });
});

app.listen(3000, () => {
  console.log(`Server listening at port 3000 ...`);
});
