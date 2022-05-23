import express from "express";
import connectDB from "./config/db.js";
import fileRoutes from "./routes/fileRoutes.js";
import dotenv from "dotenv";
import colors from "colors";
import multer from "multer";
import cors from "cors";
import File from "./models/fileModel.js";
import asyncHandler from "express-async-handler";

const app = express();

dotenv.config();

app.use(express.json());

app.use(cors());

connectDB();
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      file.mimetype === "application/pdf"
        ? "./client/public/files"
        : "./client/public/images"
    );
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: fileStorage });

app.get("/", (req, res) => {
  res.send("API is running");
});

app.post(
  "/upload",
  upload.array("files", 2),
  asyncHandler(async (req, res) => {
    const description = req.body.desc;
    const year = req.body.year;

    const pdfLink = "." + req.files[0].path.slice(13);

    const imgLink = "." + req.files[1].path.slice(13);

    res.send("uploaded");
    const item = await File.create({
      pdfLink,
      imgLink,
      description,
      year,
    });
  })
);

app.use("/api/files", fileRoutes);

const PORT = process.env.PORT;
app.listen(
  PORT,
  console.log(
    `Serving on PORT ${PORT} in ${process.env.NODE_ENV} mode`.green.bold
      .underline
  )
);
