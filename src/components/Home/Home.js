import React from "react";
import "./Home.css";
import { Container, Row, Col } from "react-bootstrap";
import { Lotties } from "../../subComponents";
import Splash from "../../assets/anim/splash.json";

import { useSpring, animated } from "react-spring";

const Home = () => {
  const slideDown = useSpring({
    config: { duration: 1000 },
    to: { opacity: 1, marginTop: 0 },
    from: { opacity: 0, marginTop: -50 },
  });

  return (
    <Container
      fluid={true}
      className="d-flex align-items-end justify-content-center "
      style={{ minHeight: "80vh" }}
    >
      <Row className="home-container d-flex flex-column flex-lg-row w-100">
        <Col className="home-animation col-4 d-flex justify-content-center align-items-center splash-container">
          <Lotties
            animationData={Splash}
            lh="20rem"
            lw="50rem"
            mh="18rem"
            mw="50rem"
          />
        </Col>
        <Col className="col-12 w-100 col-lg-8 pb-sm-5">
          <animated.div style={slideDown}>
            <p style={slideDown} className="hi text-bold">
              Hi, I am Zilu
            </p>
            <h1 style={slideDown} delay="500" className="name">
              FullStack Engineer.
            </h1>
            <p className="subtitle">Passionate about Javascript and Open Source.</p>
            <p className=" pl-0 title-description col-lg-8 mt-md-4">
              I build web and mobile apps that provide intuitive workflows.
              Love to shower technologies for best possible use cases.
            </p>
            <p>
              <q>
                <i>A little bit of kindness goes a long way</i>
              </q>
            </p>
          </animated.div>
        </Col>
      </Row>
    </Container>
  );
};
export default Home;
