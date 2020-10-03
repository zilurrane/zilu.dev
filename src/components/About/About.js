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

          <div>
            <p>Hello! I'm Zilu, a FullStack Engineer based in India ❤️</p>
            <p>I enjoy creating things that live on the internet, whether that be websites, mobile applications, or anything in between.
              My goal is to always build products that provide pixel-perfect, performant experiences.</p>
            <p>Shortly after graduating from <a href="https://mu.ac.in/">Mumbai University</a>,
              I joined the engineering team at <a href="https://www.lntinfotech.com/">LTI</a>, later I switched to <a href="https://www.e-zest.com/">e-Zest</a>.
              At both of the workplaces, I work on a wide variety of interesting and meaningful projects on a daily basis.</p>
            <p>Here are a few technologies I've been working with recently:</p>

          </div>
          <div className="technologies">
              <img src="https://img.shields.io/badge/-JavaScript-eed718?style=flat&logo=javascript&logoColor=ffffff" />
              <img src="https://img.shields.io/badge/-TypeScript-007ACC?style=flat&logo=typescript&logoColor=ffffff" />
              <img src="https://img.shields.io/badge/-React-000000?style=flat&logo=react&logoColor=FFFFFF" />
              <img src="https://img.shields.io/badge/-Angular-DD0031?style=flat&logo=angular&logoColor=FFFFFF" />
              <img src="https://img.shields.io/badge/-Node.js-3C873A?style=flat&logo=Node.js&logoColor=FFFFFF" />
              <img src="https://img.shields.io/badge/-GraphQL-e535ab?style=flat&logo=graphql&logoColor=FFFFFF" />
              <img src="https://img.shields.io/badge/-Express.js-787878?style=flat" />
              <img src="https://img.shields.io/badge/-ReactNative-000000?style=flat&logo=react&logoColor=1da1f2" />
              <img src="https://img.shields.io/badge/-C%23-000000?style=flat&logo=c-sharp&logoColor=239120" />
              <img src="https://img.shields.io/badge/-.Net-5C2D91?style=flat&logo=dot-net&logoColor=FFFFFF" />
              <img src="https://img.shields.io/badge/-MongoDB-4DB33D?style=flat&logo=mongodb&logoColor=FFFFFF" />
              <img src="https://img.shields.io/badge/-MySQL-F29111?style=flat&logo=mysql&logoColor=FFFFFF" />
              <img src="https://img.shields.io/badge/-Webpack-8DD6F9?style=flat&logo=Webpack&logoColor=gray" />
              <img src="https://img.shields.io/badge/-Progressive Web Apps-5A0FC8?style=flat" />
              <img src="https://img.shields.io/badge/-HTML5-E34F26?style=flat&logo=html5&logoColor=white" />
              <img src="https://img.shields.io/badge/-CSS3-1572B6?style=flat&logo=css3&logoColor=white" />
              <img src="https://img.shields.io/badge/AWS-232F3E?style=flat&logo=amazon-aws&logoColor=white" />
              <img src="https://img.shields.io/badge/-Microsoft Azure-0089D6?style=flat&logo=microsoft-azure&logoColor=white" />
              <img src="https://img.shields.io/badge/-Docker-black?style=flat&logo=docker&logoColor=white" />
              <img src="https://img.shields.io/badge/-Git-F1502F?style=flat&logo=git&logoColor=FFFFFF" />
              <img src="https://img.shields.io/badge/-Github-000000?style=flat&logo=github&logoColor=FFFFFF" />
              <img src="https://img.shields.io/badge/-VS%20Code-007ACC?style=flat&logo=visual%20studio%20code&logoColor=white" />
          </div>
        </Col>
        <div className="profil mb-5 mt-4 ml-md-5 shadow"></div>
      </Row>
    </Container>
  );
};

export default About;
