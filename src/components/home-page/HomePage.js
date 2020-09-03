import React, { Component } from "react";
import "./HomePage.scss";
import { Row, Card, Col, Table } from "react-bootstrap";
import { Divider, Paper, Grid, makeStyles } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { SelectTopclient } from "../../redux/actions/Top5";
import { SelectClient } from "../../redux/actions/GetClients";
import FullWidthTabs from "./Tab";
import TabTop from "./TabTop";
import TabBLFT from "./TabBLFT";
import ChargeGraph from "./ChargeGraph";
import { SelectSumCharge } from "../../redux/actions/SumCharge";
import TabTwo from "./TabTwo";
import image from "../contact-page/contactsyros.png";
import image1 from "../../Login/contactsyros.png";

class HomePage extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const fct = localStorage.getItem("fct");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      show: false,
      loggedIn,
      tpk: token,
      user: username,
      activeTab: "2",
      token: token,
      username: username,
      fct: fct,
    };
  }
  componentDidMount() {
    this.props.SelectTopclient();
    this.props.SelectClient();
    this.props.SelectSumCharge();
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
  };

  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        {this.state.fct === "200" ? (
          // <h3> Bienvenu dans SYROS {this.state.username} </h3>
          <div className="contact-page" style={{ width: "100%" }}>
            <img
              src={image1}
              alt="Contact"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        ) : (
          <div className="scroll">
            {/* <h3>
          Bienvenu chez SYROS{" "}
          <span style={{ color: "rgb(220, 0, 78)" }}>{this.state.user}</span>{" "}
        </h3> */}

            <Row>
              <Col sm={4} style={{ marginBottom: "15px" }}>
                <Card className="card111">
                  <Card.Body>
                    <Row>
                      <Col sm={6}>
                        <p className="p1">Total Charge</p>
                      </Col>
                      <Col sm={6}>
                        {this.props.charges.charges.map((t) => (
                          <p className="p2">{Number(t.somme).toFixed(3)}</p>
                        ))}
                      </Col>
                    </Row>
                    <Divider
                      style={{
                        background: "#0f2535",
                        marginBottom: "5px",
                        marginTop: "-10px",
                      }}
                    ></Divider>
                    {/* <p className="p3">0</p>
                  <p className="p4">cette semaine</p> */}
                    <p className="p4">Total Charge des Fournisseurs par jour</p>
                    <ChargeGraph />
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={4} style={{ marginBottom: "15px" }}>
                <Card className="card111">
                  <Card.Body>
                    <TabTwo />
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={4} style={{ marginBottom: "15px" }}>
                <Card className="card111">
                  <Card.Body>
                    <TabBLFT />
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <br />
            <Row>
              <Col sm={5} style={{ marginBottom: "15px" }}>
                <Card className="card111">
                  <Card.Body>
                    <FullWidthTabs></FullWidthTabs>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={7} style={{ marginBottom: "15px" }}>
                <Card className="card111">
                  <Card.Body>
                    <TabTop />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectTopclient: () => dispatch(SelectTopclient()),
    SelectClient: () => dispatch(SelectClient()),
    SelectSumCharge: () => dispatch(SelectSumCharge()),
  };
}

function mapStateToProps(state) {
  return {
    tops: state.tops,
    clients: state.clients,
    charges: state.charges,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
