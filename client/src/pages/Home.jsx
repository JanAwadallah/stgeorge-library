import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import axios from "axios";
import { Grid } from "@mui/material";
import Section from "../components/Section";
import "../";

const Home = () => {
  const file = {
    imgLink: "../",
  };
  const [files, setFiles] = useState([]);
  const [years, setYears] = useState([]);

  const [isAdmin, setIsAdmin] = useState(false);
  const getFiles = async () => {
    const fetchedFiles = await axios.get("/api/files");
    setFiles(fetchedFiles.data);
    const allYears = fetchedFiles.data.map((file) => {
      return file.year;
    });
    const uniqYears = [...new Set(allYears)];
    setYears(uniqYears);
  };

  useEffect(() => {
    getFiles();

    function handleResize() {
      console.log("reszied");
    }

    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="title">
        <h1>St. George Coptic Orthodox Church</h1>
        <h2>St.Albans - Vic</h2>
      </div>
      <Section files={files} years={years} sectionTitle="Monthly Magazine" />
    </div>
  );
};

export default Home;
