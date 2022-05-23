import File from "../models/fileModel.js";
import asyncHandler from "express-async-handler";

const getFiles = asyncHandler(async (req, res) => {
  const files = await File.find({});

  res.json(files);
});

const getFileById = asyncHandler(async (req, res) => {
  const file = await File.findById(req.params.id);
  if (file) {
    res.json(file);
  } else {
    res.status(404);
    throw new Error("No such file fond");
  }
});

export { getFiles, getFileById };
