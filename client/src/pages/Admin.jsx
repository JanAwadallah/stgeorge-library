import React, { useState } from "react";
import { Form } from "react-bootstrap";
import FormData from "form-data";
import axios from "axios";
import _ from "lodash";

const Admin = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(files);
    let formData = new FormData();
    // _.forEach(files, (file) => {
    //   formData.append("files", file);
    // });
    formData.append("files", pdfFile);
    formData.append("files", imgFile);

    formData.append("desc", description);
    formData.append("year", year);
    try {
      // fetch("http://localhost:5000/upload", {
      //   method: "POST",
      //   body: formData,
      // });
      const res = await axios.post("https://stgeorgelibrary.herokuapp.com/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        setDescription("");
        setPdfFile(null);
        setImgFile(null);
        setYear("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container mt-5">
      <Form>
        <div style={{ marginBottom: "20px" }}>
          <Form.Label className=" text-white-50 fw-bolder fs-4 ">
            Description
          </Form.Label>
          <input
            required
            className=" form-control w-75 input "
            type="text"
            placeholder="File description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Form.Label className=" text-white-50 fw-bolder fs-4 ">
            Year
          </Form.Label>
          <input
            required
            className=" form-control w-75 input"
            type="text"
            placeholder="Year"
            onChange={(e) => setYear(e.target.value)}
            value={year}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Form.Label className=" text-white-50 fw-bolder fs-4 ">
            Pdf file
          </Form.Label>
          <input
            name="pdfFile"
            type="file"
            className=" form-control w-75 "
            // onChange={(e) => setFiles([...files, e.target.files[0]])}
            onChange={(e) => setPdfFile(e.target.files[0])}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Form.Label className=" text-white-50 fw-bolder fs-4 ">
            Image file
          </Form.Label>
          <input
            name="imgFile"
            type="file"
            className=" form-control w-75 "
            // onChange={(e) => setFiles([...files, e.target.files[0]])}
            onChange={(e) => setImgFile(e.target.files[0])}
          />
        </div>
        <button onClick={handleSubmit} type="submit" className="btn btn-dark">
          Upload
        </button>
      </Form>
    </div>
  );
};

export default Admin;
