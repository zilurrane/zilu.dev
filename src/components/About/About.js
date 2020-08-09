import React from "react";
import "./About.css";
import { Hero } from "../../subComponents";
import { Container, Row, Col } from "react-bootstrap";

const About = () => {
  const skills = [
    "JavaScript",
    "React",
    "React Native",
    "Angular",
    "NodeJS",
    ".Net",
    "Express",
    "MongoDB",
    "Redux",
    "GraphQL",
    "WebDriverIO",
    "AWS",
    "PCF",
  ];

  const listSkills = skills.map((element, index) => <li key={index}> {element} </li>);

  return (
    <Container id="about" className="about pt-2" style={{ minHeight: "600px" }}>
      <Hero title="About me" />
      <Row className="d-flex align-items-center flex-column-reverse flex-md-row">
        <Col className=" col-lg-8 col-md-7 text-justify text-bold ">
          I am a self-taught Full Stack Engineer, specially good in JavaScript.
          Here are few technologies I've been working with recently:
          <ul className="skills mt-3">{listSkills}</ul>
        </Col>
        <div className="profil mb-5 mt-4 ml-md-5 shadow"></div>
      </Row>
    </Container>
  );
};

export default About;
