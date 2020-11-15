import React from "react";
import MainBanner from "../components/Web/MainBanner";
import HomeCourses from "../components/Web/HomeCourses";
import { Row, Col } from "antd";
import "./Home.scss";

import HowMYCoursesWork from "../components/Web/HowMYCoursesWork/HowMYCoursesWork";
export default function Home() {
  return (
    <>
      <MainBanner />
      <Row>
        <Col lg={24} className="espacio"></Col>
      </Row>
      <HomeCourses />
      <HowMYCoursesWork />
    </>
  );
}
