import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "../styling/Styles.css";
import { Input, Label, FormGroup, Col, Row, Table } from "reactstrap";
import { Card, Accordion, Alert } from "react-bootstrap";
import { SelectClient } from "../../redux/actions/GetClients";
import { connect } from "react-redux";
import Center from "react-center";
import { GetNumFacDevis } from "../../redux/actions/GetNumfacDevis";
import { SelectArticle } from "../../redux/actions/GetArticles";
import AddClientPassagerModal from "./AddClientPassagerModal";

import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import LigModal from "./LigModal";
import { Divider, Chip, Snackbar, IconButton } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import "./Styling.css";
import "./ss.scss";
import { SelectUser } from "../../redux/actions/DevisClient";
import { SelectValTimbre } from "../../redux/actions/GetValTimbre";
const roundTo = require("round-to");

var curr = new Date();
curr.setDate(curr.getDate());
var date = curr.toISOString().substr(0, 10);

class FieldArraysFormClass extends Component {
  constructor(props) {
    super(props);
    const username = localStorage.getItem("username");

    this.state = {
      defaultdate: date,
      showTimbre: false,
      showForfitaire: 0,
      showButtonModalPassager: false,
      addModalShow1: false,
      ligModalShow: false,
      tab: [],
      totalqte: 0,
      sumremisearticle: 0,
      totalhtbrut: 0,
      totalputtcnet: 0,
      totaltva: 0,
      remiseg: 0,
      representant: "",
      raisonsocial: "",
      codeclient: "",
      categoriefiscale: "",
      totalhtnet: 0,
      remiseglobal: 0,
      netapayer: 0,
      btnEnable: false,
      btnEnabled: false,
      gilad: true,
      cemail: "",
      openActionModal: false,
      snackbaropen: false,
      snackbarmsg: ",",

      codart: "",
      quantite: 0,
      desart: "",
      priuni: "",
      remise: 0,
      tautva: 0,
      fodart: false,

      numfacc: 0,
      nu: 0,
      artligs: [],
      rechs: [],
      username: username,
      valtimbre: 0,
      netnetapayer: 0,
      propsvaltimbre: 0,

      clicked: false,
    };
  }

  componentDidMount() {
    this.props.SelectClient();
    this.props.GetNumFacDevis();
    this.props.SelectValTimbre();

    this.setState({
      propsvaltimbre: this.props.valtimbres.valtimbres.map((t) =>
        parseFloat(t.valtimbre)
      ),
    });
  }

  submitHandler = (
    tab,
    totalqte,
    sumremisearticle,
    totalhtbrut,
    totaltva,
    totalhtnet,
    remiseglobal,
    netapayer,
    btnEnabled,
    netnetapayer
  ) => {
    this.setState({
      tab: tab,
      totalqte: totalqte,
      sumremisearticle: sumremisearticle,
      totalhtbrut: totalhtbrut,
      totaltva: totaltva,
      totalhtnet: totalhtnet,
      remiseglobal: remiseglobal,
      netapayer: netapayer,
      btnEnabled: btnEnabled,
      netnetapayer: netnetapayer,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ openActionModal: true });
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  snackbarClose = () => {
    this.setState({ snackbaropen: false });
  };

  remiseglobalChange = (event) => {
    this.setState({ remiseg: event.target.value });
  };

  clientHandlerChange = (event) => {
    fetch(`http://192.168.1.100:81/api/CLIENTs?codclii=${event.target.value}`)
      .then((response) => response.json())
      .then((data) => this.setState({ rechs: data, clicked: true }));
  };

  raisocHandler = (event) => {
    this.setState({ raisonsocial: event.target.value });
  };

  enregistrer = (event) => {
    event.preventDefault();

    /////////////// post ligarticle ////////////////////////////////
    this.state.tab.map((k, index) => {
      for (var i = 0; i < this.state.tab.length; i++) {
        fetch(
          `http://192.168.1.100:81/api/LigBCDV/{ID}?numfac=${event.target.numfac.value}&typfac=DV&numlig=${index}&codart=${k.codearticle}&quantite=${k.qte}&fodart=0&desart=${k.des}&datfac=${event.target.datfac.value}&priuni=${k.puht}&remise=${k.remisea}&unite${k.unite}&codtva=3&tautva=${k.tva}`,
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
              console.log(result);
            },
            (error) => {
              this.setState({ snackbaropen: true, snackbarmsg: "failed" });
            }
          );
      }
    });

    //////////// post BCDV /////////////////////////////
    fetch(
      `http://192.168.1.100:81/api/BCDVCLIs?numfac=${event.target.numfac.value}&typfac=DV&taurem=${event.target.remise.value}&codcli=${event.target.codcli.value}&raisoc=${event.target.raissoc.value}&catfisc=${event.target.categoriefiscale.value}&datfac=${event.target.datfac.value}&timbre=${this.state.showTimbre}&ForfaitCli=${this.state.showForfitaire}&vendeur=${this.state.username}&valtimbre=${this.state.valtimbre}`,
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
          this.props.hide();
          this.props.SelectUser();
          fetch(
            `http://192.168.1.100:81/api/LigBCDV?FAC=${this.props.numfac.numfac.map(
              (nu) => parseInt(nu.valeur)
            )}&typfacc=DV`,
            {
              method: "POST",
              header: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
          this.setState({ snackbaropen: true, snackbarmsg: result });
          this.props.GetNumFacDevis();

          console.log(result);
          window.location.reload();
        },
        (error) => {
          this.setState({ snackbaropen: true, snackbarmsg: "failed" });
        }
      );

    //////////// switch update ////////////////

    fetch(
      `http://192.168.1.100:81/api/Switch?code=DV2&valeur=${
        parseInt(event.target.numfac.value) + 1
      }`,
      {
        method: "PUT",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          this.setState({ snackbaropen: true, snackbarmsg: "failed" });
        }
      );
  };

  render() {
    let ligModalClose = () => this.setState({ ligModalShow: false });
    const { dvnumfac, dvraisoc, rem, clientmail } = this.state;

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

        <form onSubmit={this.enregistrer}>
          <Card>
            <Card.Body>
              <Row style={{ marginBottom: "-20px", marginTop: "-20px" }}>
                <Col sm={4}>
                  {this.props.numfac.numfac.map((num) => (
                    <FormGroup>
                      <TextField
                        id="standard-basic"
                        label="№ Devis"
                        margin="normal"
                        value={parseInt(num.valeur)}
                        fullWidth
                        name="numfac"
                        disabled
                      />
                    </FormGroup>
                  ))}
                </Col>
                <Col sm={3}>
                  <TextField
                    id="standard-basic"
                    label="Date"
                    margin="normal"
                    type="date"
                    fullWidth
                    name="datfac"
                    defaultValue={this.state.defaultdate}
                  />
                </Col>
              </Row>

              <Row style={{ marginBottom: "-20px" }}>
                <Col sm={4}>
                  <FormGroup style={{ marginTop: "25px" }}>
                    <Typography component="div">
                      <Grid
                        component="label"
                        container
                        alignItems="center"
                        spacing={1}
                      >
                        <Grid item style={{ color: "grey" }}>
                          Raison sociale
                        </Grid>
                        <Grid item>
                          <Switch
                            checked={this.state.gilad}
                            onChange={this.handleChange("gilad")}
                            value="gilad"
                            color="primary"
                          />
                        </Grid>
                        <Grid item style={{ color: "#3f51b5" }}>
                          Code
                        </Grid>
                      </Grid>
                    </Typography>
                  </FormGroup>
                </Col>
                {this.state.gilad ? (
                  <Col sm={3}>
                    <FormGroup>
                      <Autocomplete
                        id="include-input-in-list"
                        includeInputInList
                        className="ajouter-client-input"
                        // options={this.props.clients.clients}
                        // options={this.state.rechs}
                        options={
                          this.state.clicked
                            ? this.state.rechs
                            : this.props.clients.clients
                        }
                        getOptionLabel={(option) => option.codcli}
                        onChange={(event, getOptionLabel) => {
                          getOptionLabel
                            ? this.setState({
                                raisonsocial: getOptionLabel.raisoc,
                                remiseg: getOptionLabel.remise,
                                codeclient: getOptionLabel.codcli,
                                categoriefiscale: getOptionLabel.catfisc,
                                btnEnable: true,
                                showTimbre: getOptionLabel.timbre,
                                showForfitaire: getOptionLabel.regimecli,
                                showButtonModalPassager:
                                  getOptionLabel.passager,
                                cemail: getOptionLabel.email,
                                valtimbre: getOptionLabel.timbre
                                  ? this.state.propsvaltimbre
                                  : 0,
                              })
                            : this.setState({
                                raisonsocial: "",
                                remiseg: 0,
                                codeclient: "",
                                categoriefiscale: "",
                                btnEnable: false,
                                showTimbre: false,
                                showForfitaire: 0,
                                showButtonModalPassager: false,
                                valtimbre: 0,
                              });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Code client"
                            margin="normal"
                            //variant="outlined"
                            fullWidth
                            onChange={this.clientHandlerChange}
                            name="codcli"
                          />
                        )}
                      />
                    </FormGroup>
                  </Col>
                ) : (
                  <Col sm={5}>
                    <FormGroup>
                      <Autocomplete
                        id="include-input-in-list"
                        includeInputInList
                        className="ajouter-client-input"
                        // options={this.props.clients.clients}
                        // options={this.state.rechs}
                        options={
                          this.state.clicked
                            ? this.state.rechs
                            : this.props.clients.clients
                        }
                        getOptionLabel={(option) => option.raisoc}
                        onChange={(event, getOptionLabel) => {
                          getOptionLabel
                            ? this.setState({
                                raisonsocial: getOptionLabel.raisoc,
                                remiseg: getOptionLabel.remise,
                                codeclient: getOptionLabel.codcli,
                                categoriefiscale: getOptionLabel.catfisc,
                                btnEnable: true,
                                showTimbre: getOptionLabel.timbre,
                                showForfitaire: getOptionLabel.regimecli,
                                showButtonModalPassager:
                                  getOptionLabel.passager,
                                cemail: getOptionLabel.email,
                                valtimbre: getOptionLabel.timbre
                                  ? this.state.propsvaltimbre
                                  : 0,
                              })
                            : this.setState({
                                raisonsocial: "",
                                remiseg: 0,
                                codeclient: "",
                                categoriefiscale: "",
                                btnEnable: false,
                                showTimbre: false,
                                showForfitaire: 0,
                                showButtonModalPassager: false,
                                valtimbre: 0,
                              });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Raison sociale"
                            margin="normal"
                            //variant="outlined"
                            fullWidth
                            onChange={this.clientHandlerChange}
                            name="raissoc"
                          />
                        )}
                      />
                    </FormGroup>
                  </Col>
                )}
                {this.state.gilad ? (
                  <Col sm={5}>
                    <FormGroup>
                      <TextField
                        id="standard-basic"
                        label="Raison sociale"
                        margin="normal"
                        //variant="outlined"
                        value={this.state.raisonsocial}
                        fullWidth
                        name="raissoc"
                        disabled={
                          this.state.codeclient === "100" ? false : true
                        }
                        onChange={this.raisocHandler}
                      />
                    </FormGroup>
                  </Col>
                ) : (
                  <Col sm={3}>
                    <FormGroup>
                      <TextField
                        id="standard-basic"
                        label="Code client"
                        margin="normal"
                        //variant="outlined"
                        value={this.state.codeclient}
                        fullWidth
                        name="codcli"
                        disabled
                      />
                    </FormGroup>
                  </Col>
                )}
              </Row>

              <Row>
                <Col sm={2}>
                  <TextField
                    id="standard-basic"
                    label="Cat Fiscale"
                    margin="normal"
                    //variant="outlined"
                    fullWidth
                    name="categoriefiscale"
                    value={this.state.categoriefiscale}
                    disabled
                  />
                </Col>

                <Col sm={2}>
                  {this.state.categoriefiscale === "0" ? (
                    <p
                      style={{
                        fontSize: "13px",
                        marginTop: "40px",
                        color: "#007bff",
                      }}
                    >
                      Assujetti{" "}
                    </p>
                  ) : this.state.categoriefiscale === "1" ? (
                    <p
                      style={{
                        fontSize: "13px",
                        marginTop: "40px",
                        color: "#007bff",
                      }}
                    >
                      Non Assujetti{" "}
                    </p>
                  ) : this.state.categoriefiscale === "2" ? (
                    <p
                      style={{
                        fontSize: "13px",
                        marginTop: "40px",
                        color: "#007bff",
                      }}
                    >
                      Exonéré TVA/FODEC{" "}
                    </p>
                  ) : this.state.categoriefiscale === "3" ? (
                    <p
                      style={{
                        fontSize: "13px",
                        marginTop: "40px",
                        color: "#007bff",
                      }}
                    >
                      Exonéré TVA{" "}
                    </p>
                  ) : this.state.categoriefiscale === "4" ? (
                    <p
                      style={{
                        fontSize: "13px",
                        marginTop: "40px",
                        color: "#007bff",
                      }}
                    >
                      Suspenssion{" "}
                    </p>
                  ) : this.state.categoriefiscale === "5" ? (
                    <p
                      style={{
                        fontSize: "13px",
                        marginTop: "40px",
                        color: "#007bff",
                      }}
                    >
                      Cession à Quai{" "}
                    </p>
                  ) : this.state.categoriefiscale === "6" ? (
                    <p
                      style={{
                        fontSize: "13px",
                        marginTop: "40px",
                        color: "#007bff",
                      }}
                    >
                      Réduction TVA{" "}
                    </p>
                  ) : (
                    <p
                      style={{
                        fontSize: "13px",
                        marginTop: "40px",
                        color: "#007bff",
                      }}
                    >
                      Cat Fiscale{" "}
                    </p>
                  )}
                </Col>

                <Col sm={3}>
                  <TextField
                    id="standard-basic"
                    label="Remise Globale %"
                    margin="normal"
                    //variant="outlined"
                    fullWidth
                    name="remise"
                    value={this.state.remiseg}
                    onChange={this.remiseglobalChange}
                  />
                </Col>

                {/* <Col sm={2}>
                  <FormGroup style={{ marginTop: "40px" }}>
                    {this.state.showTimbre ? (
                      <p style={{ color: "grey" }}>Timbre: ✔</p>
                    ) : null}
                  </FormGroup>
                </Col>

                <Col sm={2}>
                  <FormGroup style={{ marginTop: "40px" }}>
                    {this.state.showForfitaire === 1 ? (
                      <p style={{ color: "grey" }}>Forfitaire: ✔</p>
                    ) : null}
                  </FormGroup>
                </Col> */}
              </Row>
            </Card.Body>
          </Card>
          <div></div>
          <Accordion style={{ marginTop: "10px" }}>
            <Card bg="light">
              <Card.Header style={{ height: "60px" }}>
                <Row>
                  <Col sm={12}>
                    <Row>
                      <Col sm={11}>
                        <Accordion.Toggle
                          as={Button}
                          eventKey="0"
                          style={{ marginTop: "-5px" }}
                        >
                          <Chip
                            style={{ fontSize: "16px" }}
                            icon={<VisibilityIcon />}
                            color="primary"
                            label="Liste des Articles"
                            variant="outlined"
                          />
                        </Accordion.Toggle>
                      </Col>
                      <Col sm={1}>
                        {this.state.btnEnable ? (
                          <label>
                            <h5>
                              <Tooltip title="Ajouter, Editer et supprimer article">
                                <Fab
                                  style={{
                                    backgroundColor: "rgb(2, 15, 100)",
                                    color: "white",
                                    width: "40px",
                                    height: "40px",
                                  }}
                                  aria-label="add"
                                  onClick={() =>
                                    this.setState({
                                      ligModalShow: true,
                                      rem: this.state.remiseg,
                                    })
                                  }
                                >
                                  <AddIcon />
                                </Fab>
                              </Tooltip>
                            </h5>
                          </label>
                        ) : (
                          <label>
                            <h5>
                              <Tooltip title="Ajouter, Editer et supprimer article">
                                <Fab
                                  disabled
                                  style={{ width: "40px", height: "40px" }}
                                  aria-label="add"
                                  onClick={() =>
                                    this.setState({
                                      ligModalShow: true,
                                      rem: this.state.remiseg,
                                    })
                                  }
                                >
                                  <AddIcon />
                                </Fab>
                              </Tooltip>
                            </h5>
                          </label>
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  {/* <div className="lig-table"> */}
                  <div className="tabd28">
                    <table style={{ marginTop: "10px" }}>
                      <thead style={{ fontSize: "12px" }}>
                        <tr>
                          <th>Code</th>
                          <th style={{ width: "37%" }}>Désignation</th>
                          <th>Quantité</th>
                          <th>PU HT</th>
                          <th>Remise</th>
                          <th>TVA</th>
                          <th>PUTTCNet</th>
                          <th>TotalHT</th>
                        </tr>
                      </thead>
                      <tbody style={{ textAlign: "center" }}>
                        {this.state.tab.map((t, i) => (
                          <tr key={i}>
                            <td>
                              <span>{t.codearticle}</span>
                            </td>
                            <td style={{ fontSize: "12px", width: "37%" }}>
                              <span> {t.des} </span>
                            </td>
                            <td>
                              {" "}
                              <span> {t.qte}</span>
                            </td>
                            <td>
                              {" "}
                              <span> {Number(t.puht).toFixed(2)}</span>
                            </td>
                            <td>
                              {" "}
                              <span> {Number(t.remisea).toFixed(2)}</span>
                            </td>
                            <td>
                              {" "}
                              <span> {Number(t.tva).toFixed(2)}</span>
                            </td>
                            <td>
                              {" "}
                              <span> {Number(t.puttcnet).toFixed(3)}</span>
                            </td>
                            <td>
                              {" "}
                              <span> {Number(t.totalht).toFixed(2)}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>

          {/* //////////////// Footer //////////////////// */}
          <Card style={{ marginTop: "10px" }}>
            <Card.Body>
              <Row>
                <Col
                  sm={3}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <p style={{ color: "darkslateblue", marginBottom: "-5px" }}>
                    Total HT Brut
                  </p>
                  <p style={{ color: "black" }}>
                    {Number(this.state.totalhtbrut).toFixed(3)}
                  </p>
                </Col>

                <Col
                  sm={3}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <p style={{ color: "darkslateblue", marginBottom: "-5px" }}>
                    Remise Article
                  </p>
                  <p style={{ color: "black" }}>
                    {Number(this.state.sumremisearticle).toFixed(3)}
                  </p>
                </Col>

                <Col
                  sm={3}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <p style={{ color: "darkslateblue", marginBottom: "-5px" }}>
                    Total TVA
                  </p>
                  <p style={{ color: "black" }}>
                    {Number(this.state.totaltva).toFixed(3)}
                  </p>
                </Col>

                <Col
                  sm={3}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  {/* <p style={{ color: "darkslateblue", marginBottom: "-5px" }}>
                    Total Quantité
                  </p>
                  <p style={{ color: "black" }}>{this.state.totalqte}</p> */}
                  <p style={{ color: "darkslateblue", marginBottom: "-5px" }}>
                    valeur de timbre
                  </p>
                  <p style={{ color: "black" }}>
                    {Number(this.state.valtimbre).toFixed(3)}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col sm={3}>
                  <Divider
                    style={{ marginTop: "-8px", backgroundColor: "grey" }}
                  ></Divider>
                </Col>
                <Col sm={3}>
                  <Divider
                    style={{ marginTop: "-8px", backgroundColor: "grey" }}
                  ></Divider>
                </Col>
                <Col sm={3}>
                  <Divider
                    style={{ marginTop: "-8px", backgroundColor: "grey" }}
                  ></Divider>
                </Col>
                <Col sm={3}>
                  <Divider
                    style={{ marginTop: "-8px", backgroundColor: "grey" }}
                  ></Divider>
                </Col>
              </Row>

              <Row style={{ marginBottom: "-25px" }}>
                <Col
                  sm={3}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <p style={{ color: "darkslateblue", marginBottom: "-5px" }}>
                    Total HT Net
                  </p>
                  <p style={{ color: "black" }}>
                    {Number(this.state.totalhtnet).toFixed(3)}
                  </p>
                </Col>

                <Col
                  sm={3}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <p style={{ color: "darkslateblue", marginBottom: "-5px" }}>
                    Remise Globale
                  </p>
                  <p style={{ color: "black" }}>
                    {Number(this.state.remiseglobal).toFixed(3)}
                  </p>
                </Col>

                <Col
                  sm={3}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <p style={{ color: "darkslateblue", marginBottom: "-5px" }}>
                    Total TTC
                  </p>
                  <p style={{ color: "black" }}>
                    {Number(this.state.netapayer).toFixed(3)}
                  </p>
                </Col>

                <Col
                  sm={3}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      color: "rgb(220, 0, 78)",
                      fontWeight: "bold",
                      marginBottom: "-5px",
                    }}
                  >
                    Net à Payer
                  </p>
                  <p style={{ color: "black", fontWeight: "bold" }}>
                    {Number(this.state.netnetapayer).toFixed(3)}
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Row>
            <Col sm={5}></Col>
            <Col sm={3}></Col>
            <Col sm={4}>
              {this.state.totalqte === 0 ? (
                <Button
                  variant="contained"
                  disabled
                  style={{ marginTop: "20px", width: "100%" }}
                >
                  Enregistrer tous
                </Button>
              ) : (
                <Button
                  variant="contained"
                  style={{
                    marginTop: "20px",
                    width: "100%",
                    color: "white",
                    backgroundColor: "#020F64",
                  }}
                  type="submit"
                >
                  Enregistrer tous
                </Button>
              )}
            </Col>
          </Row>
        </form>
        <LigModal
          submitHandler={this.submitHandler}
          show={this.state.ligModalShow}
          onHide={ligModalClose}
          numfaccc={this.props.numfac.numfac.map((nu) => parseInt(nu.valeur))}
          dateee={this.state.defaultdate}
          rem={rem}
          valtimbre={this.state.valtimbre}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectClient: () => dispatch(SelectClient()),
    GetNumFacDevis: () => dispatch(GetNumFacDevis()),
    SelectArticle: () => dispatch(SelectArticle()),
    SelectUser: () => dispatch(SelectUser()),
    SelectValTimbre: () => dispatch(SelectValTimbre()),
  };
}

function mapStateToProps(state) {
  return {
    clients: state.clients,
    numfac: state.numfac,
    articles: state.articles,
    valtimbres: state.valtimbres,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FieldArraysFormClass);
