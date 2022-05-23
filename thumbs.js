import gm from "gm";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use("/public", express.static(__dirname + "/public"));

files.map((file) => {
  // Create JPG from page 0 of the PDF
  gm(`.${file.name}`) // The name of your pdf
    .setFormat("jpg")
    .resize(400) // Resize to fixed 200px width, maintaining aspect ratio
    .quality(100) // Quality from 0 to 100
    .write(`./tmp/${file.img}.jpg`, function (error) {
      // Callback function executed when finished
      if (!error) {
        console.log("Finished saving JPG");
      } else {
        console.log("There was an error!", error);
      }
    });
});
