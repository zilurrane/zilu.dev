import React from "react";
import "./Footer.css";
import { Row, Col } from "react-bootstrap";
import Github from "../../assets/icons/github-brands.svg";
import Linkedin from "../../assets/icons/linkedin-brands.svg";

const Footer = () => {
  return (
    <Row className="footer d-flex flex-column pt-3">
      <Col className="d-flex align-items-center justify-content-center">
        <a
          href="https://github.com/zilurrane"
          rel="noopener noreferrer"
          target="_blank"
          className="fl d-flex justify-content-start f15"
        >
          <Github className="ics" />
        </a>
        <a
          href="https://www.linkedin.com/in/zilurane/"
          rel="noopener noreferrer"
          target="_blank"
          className="fl d-flex justify-content-end f15"
        >
          <Linkedin className="ics" />
        </a>
      </Col>
    </Row>
  );
};

export default Footer;
