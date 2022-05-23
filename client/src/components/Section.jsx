import { Grid } from "@mui/material";
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";

const Section = ({ files, years, sectionTitle }) => {
  const [filter, setFilter] = useState("");
  const [show, setShow] = useState(false);
  return (
    <div style={{ marginBottom: "15px" }}>
      <h3
        style={{
          textShadow: "0px 0px 10px #fff, 14px 13px 0px rgba(0,0,0,0.15)",
          fontFamily: "monospace",
          fontWeight: "bolder",
        }}
      >
        {sectionTitle}
      </h3>
      <div>
        <div style={{ position: "relative" }}>
          {!show && years ? (
            years.map((year) => (
              <button
                key={year}
                onClick={() => {
                  setShow(!show);
                  setFilter(year);
                }}
                className="btn btn-outline-light"
                id="hide"
              >
                {year}
              </button>
            ))
          ) : (
            <div>
              <div className="hide">
                {show && (
                  <button
                    onClick={() => setShow(!show)}
                    className="btn btn-lg btn-close"
                  />
                )}
              </div>
              <div>
                <Grid
                  justifyContent="space-between"
                  alignItems="center"
                  container
                  rowSpacing={2}
                  columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }}
                  paddingLeft={0}
                  style={{
                    marginBottom: "30px",
                  }}
                >
                  {files.map(
                    (file) =>
                      file.year === filter && (
                        <Grid item xs={6} sm={6} md={4} lg={3} key={file._id}>
                          <Link to={`/${file._id}`} key={file._id}>
                            <Card file={file} />
                          </Link>
                        </Grid>
                      )
                  )}
                </Grid>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Section;
