import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Row, Col } from "antd";
import WebLogin from "../pages/Home";

import "./LayoutBasic.scss";
import MenuTop from "../components/Web/MenuTop/MenuTop";
import Footer from "../components/Web/Footer/Footer";
import useAuth from "../hooks/useAuth";

export default function LayoutBasic(props) {
  const { routes } = props;

  const { user, isLoading } = useAuth();

  if (!user && !isLoading) {
    return (
      <>
        <Row>
          <Col lg={4} />
          <Col lg={16}>
            <MenuTop user={user} />
          </Col>
          <Col lg={4} />
        </Row>
        <div className="a">
          {/* <Route path="/" component={WebLogin} />
          <Redirect to="/" /> */}
          <LoadRoutes routes={routes} />
          <Footer />
        </div>
      </>
    );
  }
  if (user && !isLoading) {
    return (
      <>
        <Row>
          <Col lg={4} />
          <Col lg={16}>
            <MenuTop user={user} />
          </Col>
          <Col lg={4} />
        </Row>
        <div className="a">
          <LoadRoutes routes={routes} />
          <Footer />
        </div>
      </>
    );
  }
  return null;

  //   <Layout>
  //     <h2>Menu Basic</h2>
  //     <Layout>
  //       <Content>
  //         <LoadRoutes routes={routes} />
  //       </Content>
  //       <Footer>Facci-Uleam 2020</Footer>
  //     </Layout>
  //   </Layout>
  // );
}

function LoadRoutes(props) {
  const { routes, user } = props;

  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
      ;
    </Switch>
  );
}
