import mongoose from "mongoose";

const fileSchema = mongoose.Schema(
  {
    pdfLink: {
      type: String,
      required: true,
    },

    imgLink: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model("File", fileSchema);

export default File;
