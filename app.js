const express = require("express");
const multer = require("multer");
const fs = require("fs");

const { extractData } = require("./helpers/helpers");
const upload = multer({ dest: "uploads/" });

const app = express();

app.use((req, res, next) => {
  console.log("REQUEST", req);
  next();
});

app.post("/", upload.single("clipping"), (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file upload detected" });
  }
  console.log("REQ FILE", req.file);
  fs.readFile(
    `./uploads/${req.file.filename}`,
    { encoding: "utf-8" },
    (err, data) => {
      if (err) {
        console.log("Error in reading file", err);
        return res.status(400).json({ message: "Error in reading file" });
      }

      const fileContents = data.split("==========");
      const extractedData = extractData(fileContents);
      return res.status(200).json(extractedData);
    }
  );
});

app.listen(3000, () => {
  console.log(`Server listening at port 3000 ...`);
});
