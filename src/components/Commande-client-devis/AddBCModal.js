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
import "./ss.scss";

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
import { Input, Label, Table } from "reactstrap";
import Center from "react-center";

import Tooltip from "@material-ui/core/Tooltip";
import AddClientPassagerModal from "./AddClientPassagerModal";

import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

import { Divider, Chip } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";

// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import LigModal from "./LigModal";
import LigBCArticle from "./LigBCArticle";
import { GetNumFacBC } from "../../redux/actions/Getcodbc";

const roundTo = require("round-to");

var curr = new Date();
curr.setDate(curr.getDate());
var date = curr.toISOString().substr(0, 10);

class AddBCModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

      snackbaropen: false,
      snackbarmsg: ",",

      rechs: [],
    };
  }

  componentDidMount() {
    this.props.SelectClient();
    this.props.GetNumFacDevis();
    this.props.GetNumFacBC();
  }

  clientHandlerChange = (event) => {
    fetch(`http://192.168.1.100:81/api/CLIENTs?codclii=${event.target.value}`)
      .then((response) => response.json())
      .then((data) => this.setState({ rechs: data }));
  };

  submitHandler = (
    tab,
    totalqte,
    sumremisearticle,
    totalhtbrut,
    totaltva,
    totalhtnet,
    remiseglobal,
    netapayer,
    btnEnabled
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
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ openActionModal: true });
  };

  snackbarClose = () => {
    this.setState({ snackbaropen: false });
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  enregistrer = (event) => {
    event.preventDefault();

    /////////////// post ligarticle ////////////////////////////////
    this.state.tab.map((k, index) => {
      for (var i = 0; i < this.state.tab.length; i++) {
        fetch(
          `http://192.168.1.100:81/api/LigBCDV/{ID}?numfac=20200017&typfac=BC&numlig=${index}&codart=${k.codearticle}&quantite=${k.qte}&fodart=0&desart=${k.des}&datfac=${this.state.defaultdate}&priuni=${k.puht}&remise=${k.remisea}&unite${k.unite}&codtva=3&tautva=${k.tva}`,
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

              console.log("22", result);
              // window.alert(result);
            },
            (error) => {
              this.setState({ snackbaropen: true, snackbarmsg: "failed" });
            }
          );
      }
    });

    //////////// post BCDV /////////////////////////////
    fetch(
      `http://192.168.1.100:81/api/BCDVCLIs?numfac=20200017&typfac=BC&taurem=${event.target.remise.value}&codcli=${event.target.codcli.value}&raisoc=${event.target.raissoc.value}&catfisc=${event.target.categoriefiscale.value}&datfac=${this.state.defaultdate}&timbre=${this.state.showTimbre}&ForfaitCli=${this.state.showForfitaire}`,
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

          console.log(result);
          //// window.alert(result);
        },
        (error) => {
          this.setState({ snackbaropen: true, snackbarmsg: "failed" });
        }
      );

    ////////////////////// les calculs ///////////////////
    fetch(`http://192.168.1.100:81/api/LigBCDV?FAC=20200017&typfacc=BC`, {
      method: "POST",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ snackbaropen: true, snackbarmsg: result });

          console.log(result);
          //// window.alert(result);
        },
        (error) => {
          this.setState({ snackbaropen: true, snackbarmsg: "failed" });
        }
      );
  };
  render() {
    const { dvnumfac, dvraisoc, rem, clientmail } = this.state;

    let addModalClose1 = () => this.setState({ addModalShow1: false });
    let ligModalClose = () => this.setState({ ligModalShow: false });

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
              <b>Ajouter Bon de commande</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.enregistrer}>
              <Card>
                <Card.Body>
                  <Row style={{ marginBottom: "-20px", marginTop: "-20px" }}>
                    <Col sm={3}>
                      <FormGroup>
                        {this.props.numfacbcs.numfacbcs.map((t) => (
                          <TextField
                            // className="card add-input"
                            id="standard-basic"
                            label="№ BL"
                            margin="normal"
                            //variant="outlined"
                            fullWidth
                            name="codbc"
                            value={parseInt(t.valeur) + 1}
                            disabled
                          />
                        ))}
                      </FormGroup>
                    </Col>
                    <Col sm={5}>
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
                            options={this.state.rechs}
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
                            options={this.state.rechs}
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
                            disabled
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
                    <Col sm={3}>
                      <TextField
                        id="standard-basic"
                        label="Categorie Fiscale"
                        margin="normal"
                        //variant="outlined"
                        fullWidth
                        name="categoriefiscale"
                        value={this.state.categoriefiscale}
                      />
                    </Col>

                    <Col sm={3}>
                      <TextField
                        id="standard-basic"
                        label="Remise %"
                        margin="normal"
                        //variant="outlined"
                        fullWidth
                        name="remise"
                        value={this.state.remiseg}
                      />
                    </Col>

                    <Col sm={2}>
                      <FormGroup style={{ marginTop: "40px" }}>
                        {this.state.showTimbre ? (
                          //     <Alert style={{ width: "100%", textAlign: "center", fontSize: "12px" }} variant={"success"}>
                          //         <b style={{ marginTop: "-10px" }}></b>Timbre✔
                          // </Alert>
                          <p style={{ color: "grey" }}>Timbre: ✔</p>
                        ) : null}
                      </FormGroup>
                    </Col>

                    <Col sm={2}>
                      <FormGroup style={{ marginTop: "40px" }}>
                        {this.state.showForfitaire === 1 ? (
                          //             <Alert style={{
                          //                 width: "100%", textAlign: "center",
                          //                 fontSize: "12px"
                          //             }} variant={"success"}>
                          //                 <b style={{ marginTop: "-10px" }}></b>Forfitaire
                          //  </Alert>
                          <p style={{ color: "grey" }}>Forfitaire: ✔</p>
                        ) : null}
                      </FormGroup>
                    </Col>
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
                      <p style={{ color: "grey", marginBottom: "-5px" }}>
                        Total HT Brut
                      </p>
                      <p style={{ color: "black" }}>
                        {roundTo(this.state.totalhtbrut, 3)}
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
                      <p style={{ color: "grey", marginBottom: "-5px" }}>
                        Remise Article
                      </p>
                      <p style={{ color: "black" }}>
                        {roundTo(this.state.sumremisearticle, 3)}
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
                      <p style={{ color: "grey", marginBottom: "-5px" }}>
                        Total TVA
                      </p>
                      <p style={{ color: "black" }}>
                        {roundTo(this.state.totaltva, 3)}
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
                      <p style={{ color: "grey", marginBottom: "-5px" }}>
                        Total Quantité
                      </p>
                      <p style={{ color: "black" }}>{this.state.totalqte}</p>
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
                      <p style={{ color: "grey", marginBottom: "-5px" }}>
                        Total HT Net
                      </p>
                      <p style={{ color: "black" }}>
                        {roundTo(this.state.totalhtnet, 3)}
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
                      <p style={{ color: "grey", marginBottom: "-5px" }}>
                        Remise Globale
                      </p>
                      <p style={{ color: "black" }}>
                        {roundTo(this.state.remiseglobal, 3)}
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
                      <p style={{ color: "grey", marginBottom: "-5px" }}>
                        Total TVA
                      </p>
                      <p style={{ color: "black" }}>
                        {roundTo(this.state.totaltva, 3)}
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
                      <p style={{ color: "grey", marginBottom: "-5px" }}>
                        Net à Payer
                      </p>
                      <p style={{ color: "black" }}>
                        {roundTo(this.state.netapayer, 3)}
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
          </Modal.Body>
        </Modal>

        <LigBCArticle
          submitHandler={this.submitHandler}
          show={this.state.ligModalShow}
          onHide={ligModalClose}
          rem={rem}
          numfaccc={this.props.numfacbcs.numfacbcs.map(
            (nu) => parseInt(nu.numfac, 10) + 1
          )}
          datfac={this.state.defaultdate}
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
    GetNumFacBC: () => dispatch(GetNumFacBC()),
  };
}

function mapStateToProps(state) {
  return {
    clients: state.clients,
    numfacbcs: state.numfacbcs,
    articles: state.articles,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBCModal);
