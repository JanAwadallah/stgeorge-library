import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { IoIosAlbums } from "react-icons/io";
import { IoIosDocument } from "react-icons/io";
import { IoMdAddCircle } from "react-icons/io";
import { IoMdRemoveCircle } from "react-icons/io";
import { IoIosHome } from "react-icons/io";
import { Link, useParams } from "react-router-dom";

import "../Sample.css";

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "standard_fonts/",
};

export default function Sample() {
  const [fitchedFile, setFitchedFile] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [scale, setScale] = useState(1);
  const [width, setWidth] = useState(window.innerWidth);
  const [single, setSingle] = useState(false);

  const { file } = useParams();

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
  }, [window.innerWidth]);

  const next = () => {
    if (pageNum < numPages) {
      setPageNum(pageNum + 1);
    } else {
      return;
    }
  };
  const prev = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    } else {
      return;
    }
  };

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  return (
    <div className="Example">
      <header
        style={{
          position: "sticky",
          top: "0",
          zIndex: "10",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "50px",
        }}
      >
        <div>
          {" "}
          <Link to="/" style={{ color: "white" }}>
            <IoIosHome
              style={{
                caretColor: "transparent",
                cursor: "pointer",
                fontSize: "1.5rem",
              }}
            />
          </Link>
        </div>

        <h1 style={{ fontSize: "1.2em" }}>
          {fitchedFile && fitchedFile.description}
        </h1>
        <div
          style={{
            display: "flex",

            width: "20%",
            caretColor: "transparent",
            cursor: "pointer",
          }}
          onClick={() => setSingle(!single)}
        >
          {single ? (
            width < 500 ? (
              <p>
                <IoIosAlbums />
              </p>
            ) : (
              <p style={{ fontSize: "1rem" }}>
                <IoIosAlbums /> Multi-Page
              </p>
            )
          ) : width < 500 ? (
            <p>
              <IoIosDocument />
            </p>
          ) : (
            <p style={{ fontSize: "1rem" }}>
              <IoIosDocument /> Single-Page
            </p>
          )}
        </div>
        <div style={{ fontSize: "0.75rem" }}>
          <button
            onClick={() => setFullscreen(!fullscreen)}
            className="btn btn-lg btn-light "
          >
            Full screen
          </button>
        </div>
      </header>

      <div className={fullscreen ? "fullscreen" : "Example__container"}>
        <div
          style={{ position: "relative" }}
          className="Example__container__document"
        >
          {single ? (
            <>
              {fullscreen && (
                <div className="close">
                  <button
                    onClick={() => setFullscreen(!fullscreen)}
                    className="btn btn-lg btn-close"
                  />
                </div>
              )}
              <Document
                file="../files/holyweek.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
                options={options}
              >
                <Page
                  scale={scale}
                  width={width < 500 || fullscreen ? width : width * 0.6}
                  pageNumber={pageNum}
                />
                <div
                  style={{ display: "flex" }}
                  className="w-100 justify-content-around"
                >
                  <button onClick={prev} className="btn btn-success">
                    Prev
                  </button>
                  <button onClick={next} className="btn btn-success">
                    Next
                  </button>
                </div>
              </Document>
            </>
          ) : (
            <>
              {fullscreen && (
                <div className="close">
                  <button
                    onClick={() => setFullscreen(!fullscreen)}
                    className="btn btn-lg btn-close"
                  />
                </div>
              )}

              <Document
                file="./files/holyweek.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
                options={options}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page
                    scale={scale}
                    width={width < 500 || fullscreen ? width : width * 0.6}
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                  />
                ))}
              </Document>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
