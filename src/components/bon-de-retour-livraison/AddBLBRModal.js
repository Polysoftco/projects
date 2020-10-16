import React, { Component } from "react";
import {
  Modal,
  Card,
  Row,
  FormGroup,
  Col,
  Alert,
  Accordion,
} from "react-bootstrap";
import "../styling/Styles.css";
// import "../commande-client-devis/ss.scss";
import "./bl.scss";

import {
  TextField,
  Paper,
  Button,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";
import { SelectClient } from "../../redux/actions/GetClients";
import { GetNumFacDevis } from "../../redux/actions/GetNumfacDevis";
import { SelectArticle } from "../../redux/actions/GetArticles";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

import { Divider, Chip } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";

import LigBLBRArticle from "./LigBLBRArticle";
import { SelectBLBRCod } from "../../redux/actions/GetBLBRcod";
import { SelectBLBR } from "../../redux/actions/GetBLBR";

const roundTo = require("round-to");

var curr = new Date();
curr.setDate(curr.getDate());
var date = curr.toISOString().substr(0, 10);

class AddBLBRModal extends Component {
  constructor(props) {
    super(props);
    const username = localStorage.getItem("username");

    this.state = {
      name: "",
      gilad: true,
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
      cemail: "",
      openActionModal: false,
      rechs: [],

      nextsubmit: false,

      snackbaropen: false,
      snackbarmsg: ",",
      username: username,

      valtimbre: 0,
      netnetapayer: 0,
      clicked: false,
    };
  }

  componentDidMount() {
    this.props.SelectClient();
    this.props.GetNumFacDevis();
    this.props.SelectBLBRCod();
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

  snackbarClose = () => {
    this.setState({ snackbaropen: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ openActionModal: true });
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  remiseglobalChange = (event) => {
    this.setState({ remiseg: event.target.value });
  };

  raisocHandler = (event) => {
    this.setState({ raisonsocial: event.target.value });
  };

  enregistrer = (event) => {
    // console.log("tet");

    event.preventDefault();
    let id = event.target.codeblbr.value;
    this.state.tab.map((k, index) => {
      for (var i = 0; i < this.state.tab.length; i++) {
        fetch(
          `http://192.168.1.100:81/api/LigBLBRs/{ID}?numfac=${id}&typfac=BR&numlig=${index}&codart=${k.codearticle}&quantite=${k.qte}&fodart=0&desart=${k.des}&datfac=${this.state.defaultdate}&priuni=${k.puht}&remise=${k.remisea}&unite${k.unite}&codtva=3&tautva=${k.tva}`,
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

    fetch(
      `http://192.168.1.100:81/api/BLBRs?numfac=${id}&typfac=BR&codcli=${event.target.codcli.value}&raisoc=${event.target.raissoc.value}&catfisc=${event.target.categoriefiscale.value}&datfac=${this.state.defaultdate}&timbre=${this.state.showTimbre}&ForfaitCli=${this.state.showForfitaire}&taurem=${this.state.remiseg}&VENDEUR=${this.state.username}`,
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
          this.props.onHide();

          this.props.SelectBLBR();

          fetch(`http://192.168.1.100:81/api/LigBLBRs?FAC=${id}&typfacc=BR`, {
            method: "POST",
            header: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });

          this.setState({ snackbaropen: true, snackbarmsg: result });
          this.props.SelectBLBRCod();
          console.log(result);
          // window.location.reload();
        },
        (error) => {
          this.setState({ snackbaropen: true, snackbarmsg: "failed" });
        }
      );

    //////////// switch update ////////////////
    // console.log("val test:" + event.target.codeblbr.value);
    console.log("testtshgsfghsgj", parseInt(id) + 1);
    fetch(
      `http://192.168.1.100:81/api/Switch?code=BR2&valeur=${parseInt(id) + 1}`,
      {
        method: "PUT",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    setTimeout(() => {
      fetch(
        `http://192.168.1.100:81/api/LigBLBRs?FAC=${id}&Typfacc=br&CODDEPP=`,
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
            console.log("mise a jour stock avec succée");
            console.log(result);
          },
          (error) => {
            this.setState({ snackbaropen: true, snackbarmsg: "failed" });
          }
        );

      window.location.reload();
    }, 2000);
  };

  clientHandlerChange = (event) => {
    fetch(`http://192.168.1.100:81/api/CLIENTs?codclii=${event.target.value}`)
      .then((response) => response.json())
      .then((data) => this.setState({ rechs: data, clicked: true }));
  };
  ligModalClose = () => this.setState({ ligModalShow: false });
  addModalClose1 = () => this.setState({ addModalShow1: false });

  render() {
    // const { dvnumfac, dvraisoc, rem, clientmail } = this.state;

    return (
      <div className="container">
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
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "white", color: "#020F64" }}
          >
            <Modal.Title id="contained-modal-title-vcenter">
              <b>Ajouter Bon de Retour </b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.enregistrer}>
              <Card>
                <Card.Body>
                  <Row style={{ marginBottom: "-20px", marginTop: "-20px" }}>
                    <Col sm={4}>
                      <FormGroup>
                        {this.props.codblbr.codblbr &&
                          this.props.codblbr.codblbr.map((t) => (
                            <TextField
                              // className="card add-input"
                              id="standard-basic"
                              label="№ BLBR"
                              margin="normal"
                              //variant="outlined"
                              value={parseInt(t.valeur)}
                              fullWidth
                              name="codeblbr"
                              disabled
                            />
                          ))}
                      </FormGroup>
                    </Col>
                    {/* <Col sm={5}></Col> */}
                    <Col sm={3}>
                      <TextField
                        id="standard-basic"
                        label="Date"
                        margin="normal"
                        //variant="outlined"
                        type="date"
                        fullWidth
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
                                      ? this.props.valtimbre
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
                                //onChange={this.clientHandlerChange}
                                onChange={(e) =>
                                  this.setState({ name: e.target.value })
                                }
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
                                      ? this.props.valtimbre
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

              {/* ///////////////////////////////////////////////////////// Accordiation //////////// */}

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
                                        backgroundColor: "#3f51b5",
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
                      <div className="tabbl2">
                        <table>
                          <thead
                            style={{ textAlign: "center", fontSize: "12px" }}
                          >
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
                          <tbody>
                            {this.state.tab.map((t) => (
                              <tr style={{ textAlign: "center" }}>
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
                      <p
                        style={{ color: "darkslateblue", marginBottom: "-5px" }}
                      >
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
                      <p
                        style={{ color: "darkslateblue", marginBottom: "-5px" }}
                      >
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
                      <p
                        style={{ color: "darkslateblue", marginBottom: "-5px" }}
                      >
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
                      {/* <p
                        style={{ color: "darkslateblue", marginBottom: "-5px" }}
                      >
                        Total Quantité
                      </p>
                      <p style={{ color: "black" }}>{this.state.totalqte}</p> */}
                      <p
                        style={{ color: "darkslateblue", marginBottom: "-5px" }}
                      >
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
                      <p
                        style={{ color: "darkslateblue", marginBottom: "-5px" }}
                      >
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
                      <p
                        style={{ color: "darkslateblue", marginBottom: "-5px" }}
                      >
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
                      <p
                        style={{ color: "darkslateblue", marginBottom: "-5px" }}
                      >
                        Total TTC
                      </p>
                      <p style={{ color: "black" }}>
                        {/* {Number(this.state.totaltva).toFixed(3)} */}
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
                        {/* {Number(this.state.netapayer).toFixed(3)} */}
                        {Number(this.state.netnetapayer).toFixed(3)}
                      </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <Row>
                <Col sm={8}></Col>
                <Col sm={4}>
                  {this.state.totalqte === 0 ? (
                    <Button
                      variant="contained"
                      //type="submit"
                      onClick={() => this.test()}
                      disabled
                      style={{ marginTop: "20px", width: "100%" }}
                    >
                      Enregistrer tous
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      // color="secondary"
                      type="submit"
                      style={{
                        marginTop: "20px",
                        width: "100%",
                        color: "white",
                        backgroundColor: "#020F64",
                      }}
                    >
                      Enregistrer tous
                    </Button>
                  )}
                </Col>
              </Row>
            </form>
          </Modal.Body>
        </Modal>

        <LigBLBRArticle
          submitHandler={this.submitHandler}
          show={this.state.ligModalShow}
          onHide={this.ligModalClose}
          rem={this.state.rem}
          numfaccc={
            this.props.codblbr.codblbr &&
            this.props.codblbr.codblbr.map((nu) => parseInt(nu.valeur))
          }
          datfac={this.state.defaultdate}
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
    SelectBLBRCod: () => dispatch(SelectBLBRCod()),
    SelectBLBR: () => dispatch(SelectBLBR),
  };
}

function mapStateToProps(state) {
  return {
    clients: state.clients,
    numfac: state.numfac,
    articles: state.articles,
    blbrs: state.blbrs,
    codblbr: state.codblbr,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBLBRModal);
