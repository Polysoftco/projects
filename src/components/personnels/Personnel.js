import React, { Component } from "react";

import { Tabs, Tab, Table, Button, Card, Form } from "react-bootstrap";

import { connect } from "react-redux";
import { TextField, Snackbar, IconButton } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./personnel.scss";
import { SelectVendeur } from "../../redux/actions/GetVendeur";
import { SelectCodVendeur } from "../../redux/actions/GetCodVD";
import Axios from "axios";

import { Bar, Line, Pie } from "react-chartjs-2";
import { FormGroup, Row, Col } from "reactstrap";

import VisibilityIcon from "@material-ui/icons/Visibility";

const DATE_OPTIONS = {
  month: "short",
  day: "numeric",
};

var curr = new Date();
var dat = curr.setDate(curr.getDate());
var date = curr.toISOString().substr(0, 10);

class Personnel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cat: "",
      show: false,
      snackbaropen: false,
      snackbarmsg: ",",
      usern: "",
      codvendeur: "",
      libvendeur: "",
      ModalShow: false,
      data: {},
      datadv: {},
      showing: false,
      databl: {},
      datafac: {},
      databe: {},
      dat: dat,
      dv: [],
      bc: [],
      ft: [],
      bl: [],
    };
  }

  componentDidMount() {
    this.props.SelectVendeur();
    this.props.SelectCodVendeur();

    fetch(`http://192.168.1.100:81/api/BCDVCLIs?dat=${date}&typppeeep=dv`)
      .then((response) => response.json())
      .then((data) => this.setState({ dv: data }));

    fetch(`http://192.168.1.100:81/api/BCDVCLIs?dat=${date}&typppeeep=bc`)
      .then((response) => response.json())
      .then((data) => this.setState({ bc: data }));

    fetch(`http://192.168.1.100:81/api/BLBRs?dat=${date}&typppeeep=bl`)
      .then((response) => response.json())
      .then((data) => this.setState({ bl: data }));

    fetch(`http://192.168.1.100:81/api/FACCLIs?dat=${date}&typppeeep=ft`)
      .then((response) => response.json())
      .then((data) => this.setState({ ft: data }));
  }

  vendeurHandler = (event) => {
    this.setState({ showing: true });

    //////////bl //////////////

    Axios.get(
      `http://192.168.1.100:81/api/BLBRs?typpppp=bl&vend=${this.state.libvendeur}`
    ).then((res) => {
      console.log(res);

      const ipl = res.data;

      let playername = [];

      let runscore = [];

      ipl.forEach((record) => {
        playername.push(
          new Date(record.datfac).toLocaleDateString("fr", DATE_OPTIONS)
        );

        runscore.push(record.sommemntbn);
      });

      this.setState({
        databl: {
          labels: playername,

          datasets: [
            {
              label: "Montant BL effectué / jour",

              data: runscore,

              backgroundColor: [
                "#6610f2",

                "#6610f2",

                "#6610f2",

                "#6610f2",

                "#6610f2",

                "#6610f2",

                "#6610f2",
              ],
            },
          ],
        },
      });
    });

    //////////facture //////////////

    Axios.get(
      `http://192.168.1.100:81/api/FACCLIs?typpppp=FT&vend=${this.state.libvendeur}`
    ).then((res) => {
      console.log(res);

      const ipl = res.data;

      let playername = [];

      let runscore = [];

      ipl.forEach((record) => {
        playername.push(
          new Date(record.datfac).toLocaleDateString("fr", DATE_OPTIONS)
        );

        runscore.push(record.sommemntbn);
      });

      this.setState({
        datafac: {
          labels: playername,

          datasets: [
            {
              label: "Montant Facture effectué / jour",

              data: runscore,

              backgroundColor: [
                "#28a745",

                "#28a745",

                "#28a745",

                "#28a745",

                "#28a745",

                "#28a745",

                "#28a745",
              ],
            },
          ],
        },
      });
    });

    //////////BE //////////////

    Axios.get(
      `http://192.168.1.100:81/api/BEREs?typpppp=BE&vend=${this.state.libvendeur}`
    ).then((res) => {
      console.log(res);

      const ipl = res.data;

      let playername = [];

      let runscore = [];

      ipl.forEach((record) => {
        playername.push(
          new Date(record.datfac).toLocaleDateString("fr", DATE_OPTIONS)
        );

        runscore.push(record.sommemntbn);
      });

      this.setState({
        databe: {
          labels: playername,

          datasets: [
            {
              label: "Montant BE effectué / jour",

              data: runscore,

              backgroundColor: [
                "blue",

                "blue",

                "blue",

                "blue",

                "blue",

                "blue",

                "blue",
              ],
            },
          ],
        },
      });
    });
  };

  submitHandler = (event) => {
    event.preventDefault();

    fetch(
      `http://192.168.1.100:81/api/Nome?cat=VD&code=${event.target.code.value}&lib=${event.target.lib.value}&chdec=0`,
      {
        method: "POST",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          //   this.setState({ snackbaropen: true, snackbarmsg: result });
          //   window.location.reload();
          console.log(result);
        },
        (error) => {
          this.setState({ snackbaropen: true, snackbarmsg: "failed" });
        }
      );

    fetch(
      `http://192.168.1.100:81/api/Vendeur?code=${event.target.code.value}&nom=${event.target.lib.value}&mp=${event.target.pass.value}&grp=200`,
      {
        method: "POST",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ snackbaropen: true, snackbarmsg: result });
          window.location.reload();
          console.log(result);
        },
        (error) => {
          this.setState({ snackbaropen: true, snackbarmsg: "failed" });
        }
      );
  };

  snackbarClose = () => {
    this.setState({ snackbaropen: false });
  };

  libChange = (event) => {
    this.setState({ usern: event.target.value });
  };

  render() {
    let ModalClose = () => this.setState({ ModalShow: false });

    const { codvendeur, libvendeur } = this.state;

    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.snackbaropen}
          autoHideDuration={2000}
          onClose={this.snackbarClose}
          message={<span id="message-id"> {this.state.snackbarmsg} </span>}
          action={[
            <IconButton
              key="close"
              color="inherit"
              onClick={this.snackbarClose}
            >
              x
            </IconButton>,
          ]}
        ></Snackbar>
        <div className="page-icon">
          <u>
            {" "}
            <i class="fas fa-users" style={{ fontSize: "25px" }}>
              {" "}
              Vendeurs
            </i>
          </u>
        </div>
        <br />
        <div className="scrolll">
          <Row>
            <Col sm={5}>
              <Card style={{ height: "100%" }}>
                <Card.Body>
                  <div style={{ margin: "20px" }}>
                    <p className="p111">Ajouter un nouveau compte vendeur</p>
                    <Form onSubmit={this.submitHandler}>
                      <Row form style={{ marginBottom: "-25px" }}>
                        <Col sm={6}>
                          <Form.Group controlId="code">
                            {this.props.codvds.codvds.map((t) => (
                              <TextField
                                id="standard-basic"
                                label="Code"
                                margin="normal"
                                fullWidth
                                name="code"
                                type="text"
                                value={parseInt(t.Column1) + 1}
                                disabled
                              />
                            ))}
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row form style={{ marginBottom: "-25px" }}>
                        <Col sm={6}>
                          <Form.Group controlId="lib">
                            <TextField
                              id="standard-basic"
                              label="Libellé"
                              margin="normal"
                              fullWidth
                              name="lib"
                              type="text"
                              onChange={this.libChange}
                            />
                          </Form.Group>
                        </Col>

                        <Col sm={6}>
                          <Form.Group controlId="username">
                            <TextField
                              id="standard-basic"
                              label="Username"
                              margin="normal"
                              fullWidth
                              name="username"
                              type="text"
                              value={this.state.usern}
                              disabled
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row form>
                        <Col sm={12}>
                          <Form.Group controlId="pass">
                            <TextField
                              id="standard-basic"
                              label="Password"
                              margin="normal"
                              fullWidth
                              name="pass"
                              type="password"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <br />

                      <Row form>
                        <Col sm={2}></Col>
                        <Col sm={8}>
                          <Form.Group>
                            <Button
                              type="submit"
                              style={{
                                backgroundColor: "#17a2b8",
                                width: "100%",
                                borderColor: "#17a2b8",
                              }}
                            >
                              Enregistrer
                            </Button>
                          </Form.Group>
                        </Col>
                        <Col sm={2}></Col>
                      </Row>
                    </Form>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={7}>
              <Card style={{ height: "100%", marginTop: "0px" }}>
                <Card.Body>
                  <div style={{ margin: "20px" }}>
                    <Row>
                      <Col sm={4}>
                        <FormGroup style={{ marginTop: "-25px" }}>
                          <Autocomplete
                            id="include-input-in-list"
                            includeInputInList
                            className="ajouter-client-input"
                            options={this.props.vendeurs.vendeurs}
                            //  options={this.state.rechs}
                            onChange={this.vendeurHandler}
                            getOptionLabel={(option) => option.lib}
                            onChange={(event, getOptionLabel) => {
                              getOptionLabel
                                ? this.setState({
                                    libvendeur: getOptionLabel.lib,
                                    codvendeur: getOptionLabel.code,
                                    showing: false,
                                  })
                                : this.setState({
                                    libvendeur: "",
                                    codvendeur: "",
                                    showing: false,
                                  });
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Vendeur"
                                margin="normal"
                                fullWidth
                                name="vendeur"
                              />
                            )}
                          />
                        </FormGroup>
                      </Col>

                      <Col sm={6}>
                        <Button
                          variant="outline-info"
                          onClick={this.vendeurHandler}
                        >
                          {" "}
                          Afficher les statistiques <VisibilityIcon />{" "}
                        </Button>
                      </Col>
                    </Row>

                    {this.state.showing ? (
                      <div>
                        <Row>
                          <Col sm={6}>
                            <div>
                              <Bar
                                data={this.state.databl}
                                options={{ maintainAspectRatio: false }}
                                width={"300px"}
                                height={"150px"}
                              />
                            </div>
                          </Col>

                          <Col sm={6}>
                            <div>
                              <Bar
                                data={this.state.datafac}
                                options={{ maintainAspectRatio: false }}
                                width={"300px"}
                                height={"150px"}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={12}>
                            <div>
                              <Bar
                                data={this.state.databe}
                                options={{ maintainAspectRatio: false }}
                                width={"300px"}
                                height={"150px"}
                              />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br /> <br />
          <Row style={{ marginBottom: "10px" }}>
            <Col sm={12}>
              <h3 style={{ color: "rgb(2, 15, 100" }}>
                Total des ventes pour le {date}
              </h3>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col sm={8}>
                      <h3>
                        {" "}
                        <i
                          className="fas fa-tasks"
                          style={{ color: "darkslateblue" }}
                        >
                          {" "}
                          Devis
                        </i>
                      </h3>
                    </Col>

                    <Col sm={4}>
                      {this.state.dv.map((t) => (
                        <h3
                          style={{
                            color: "black",
                          }}
                        >
                          {t.num}
                        </h3>
                      ))}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={3}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col sm={8}>
                      <h3>
                        {" "}
                        <i
                          className="fas fa-clipboard-list"
                          style={{ color: "darkslateblue" }}
                        >
                          {" "}
                          BC
                        </i>
                      </h3>
                    </Col>

                    <Col sm={4}>
                      {this.state.bc.map((t) => (
                        <h3
                          style={{
                            color: "black",
                          }}
                        >
                          {t.num}
                        </h3>
                      ))}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={3}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col sm={8}>
                      <h3>
                        {" "}
                        <i
                          className="fas fa-list-alt"
                          style={{ color: "darkslateblue" }}
                        >
                          {" "}
                          BL
                        </i>
                      </h3>
                    </Col>

                    <Col sm={4}>
                      {this.state.bl.map((t) => (
                        <h3
                          style={{
                            color: "black",
                          }}
                        >
                          {t.num}
                        </h3>
                      ))}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={3}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col sm={8}>
                      <h3>
                        {" "}
                        <i
                          className="fas fa-file-invoice-dollar"
                          style={{ color: "darkslateblue" }}
                        >
                          {" "}
                          Facture
                        </i>
                      </h3>
                    </Col>

                    <Col sm={4}>
                      {this.state.ft.map((t) => (
                        <h3
                          style={{
                            color: "black",
                          }}
                        >
                          {t.num}
                        </h3>
                      ))}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectVendeur: () => dispatch(SelectVendeur()),
    SelectCodVendeur: () => dispatch(SelectCodVendeur()),
  };
}

function mapStateToProps(state) {
  return {
    vendeurs: state.vendeurs,
    codvds: state.codvds,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Personnel);
