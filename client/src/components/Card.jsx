import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  border-radius: 10px;
  /* min-width: 200px; */
  height: 300px;
  /* min-height: 50vh; */
  min-width: ${window.innerWidth < 500 && "40vw"};
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
  transition: all ease 0.5s;
  justify-content: center;
  caret-color: transparent;
  cursor: pointer;
  overflow: hidden;
  box-shadow: rgba(250, 250, 250, 0.35) 0px 5px 15px;
`;
const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
const Title = styled.h4`
  font-size: 1.5rem;
  font-weight: 700;
  text-shadow: 5px 5px 5px black;
  text-align: center;
`;
const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const Card = ({ file }) => {
  return (
    <CardContainer>
      <div className="con"></div>
      <Image src={`.${file.imgLink}`} alt="Thumbnail" />
      <CardBody>
        <Title className="card-title">{file.description}</Title>
      </CardBody>
    </CardContainer>
  );
};

export default Card;
