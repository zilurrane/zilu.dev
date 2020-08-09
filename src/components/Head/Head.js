import React from "react";
import "./Head.css";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-scroll";

const Head = props => {
  return (
    <Row className="head-container">
      <Col className="head d-flex justify-content-between align-items-center">
        <p className="profil-link col-sm-6 col-8  text-bold">Zilu Rane</p>
        <div className="nav-link d-flex col-sm-6 col-4">
          <Link to="projects" className="head-link">
            Projects
          </Link>
          <Link to="about" className="head-link">
            About Me
          </Link>
          <Link to="contact" className="head-link">
            Contact
          </Link>
          <span className="dark-light" onClick={props.toggleTheme}>
            {props.icon}
          </span>
        </div>
      </Col>
    </Row>
  );
};
export default Head;
