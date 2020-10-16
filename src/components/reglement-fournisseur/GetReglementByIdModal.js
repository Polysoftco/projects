import React, { Component } from "react";
import { Modal, Card, Row, Col } from "react-bootstrap";
import "../styling/Styles.css";
import { Typography, Button } from "@material-ui/core";
import { Label, Alert } from "reactstrap";

import Popover from "@material-ui/core/Popover";
import { makeStyles } from "@material-ui/core/styles";

import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import PrintIcon from "@material-ui/icons/Print";
import EditIcon from "@material-ui/icons/Edit";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Divider, Fab, IconButton, Snackbar } from "@material-ui/core";
import ReactToPrint from "react-to-print";
import HomeIcon from "@material-ui/icons/Home";
import PhoneIcon from "@material-ui/icons/Phone";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ModifierReg from "./ModifierReglement";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const actions = [
  // { icon: <PrintIcon />, name: "Imprimer" },
  { icon: <EditIcon />, name: "Modifier" },
  { icon: <DeleteOutlineIcon />, name: "Supprimer" },
];

const DATE_OPTIONS = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

const DATE_OPTIONSS = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

var curr = new Date();
curr.setDate(curr.getDate());
var date = curr.toISOString().substr(0, 10);

class GetReglementByIdModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      popoverOpen: false,
      anchorEl: null,
      snackbaropen: false,
      snackbarmsg: "",
      fournisseurimp: [],
      todaydate: date,
      openModifierModal: false,
    };
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClosee = () => {
    this.setState({ anchorEl: null });
  };

  toggle = () => {
    this.setState({ popoverOpen: true });
  };

  handleOpen = () => {
    this.setState({ open: true });
    fetch(
      `http://192.168.1.100:81/api/Fournisseurs?codefournisseur=${this.props.fournisseur}`
    )
      .then((response) => response.json())
      .then((data) => this.setState({ fournisseurimp: data }));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  snackbarClose = (event) => {
    this.setState({ snackbaropen: false });
  };

  supprimer = () => {
    if (
      window.confirm(
        `êtes-vous sûr de vouloir supprimer Le réglement numéro ${this.props.regid}?`
      )
    ) {
      fetch(`http://192.168.1.100:81/api/REGCLIs/${this.props.regid}`, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          this.props.onHide();
          this.setState({ snackbaropen: true, snackbarmsg: result });
          console.log(result);

          window.location.reload();
        });
    }
  };

  openModifier = () => {
    this.setState({ openModifierModal: true });
  };

  render() {
    let ModifierModalClose = () => this.setState({ openModifierModal: false });

    const openn = Boolean(this.state.anchorEl);
    const id = openn ? "simple-popover" : undefined;
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
              <b>Détails Règlement Fournisseur</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Body>
                <Row>
                  <Col style={{ textAlign: "center" }} sm={3}>
                    <Typography variant="h6" component="h2">
                      <Label style={{ color: "#020f64" }}>№ Règlement</Label>
                    </Typography>
                    <Typography style={{ color: "grey", fontSize: "14px" }}>
                      {this.props.regid}
                    </Typography>
                  </Col>

                  <Col style={{ textAlign: "center" }} sm={3}>
                    <Typography variant="h6" component="h2">
                      <Label style={{ color: "#020f64" }}>Date Règ</Label>
                    </Typography>
                    <Typography style={{ color: "grey", fontSize: "14px" }}>
                      {/* {this.props.datebl} */}
                      {new Date(this.props.datereg).toLocaleDateString(
                        "fr",
                        DATE_OPTIONS
                      )}
                    </Typography>
                  </Col>

                  <Col style={{ textAlign: "center" }} sm={2}>
                    <Typography variant="h6" component="h2">
                      <Label style={{ color: "#020f64" }}>Fournisseur</Label>
                    </Typography>
                    <Typography style={{ color: "grey", fontSize: "14px" }}>
                      {this.props.fournisseur}
                    </Typography>
                  </Col>

                  <Col style={{ textAlign: "center" }} sm={4}>
                    <Typography variant="h6" component="h2">
                      <Label style={{ color: "#020f64" }}>Raison Sociale</Label>
                    </Typography>
                    <Typography style={{ color: "grey", fontSize: "14px" }}>
                      {this.props.raisonsociale}
                    </Typography>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <br />

            <Row>
              <Col sm={6}>
                <Card>
                  <Card.Body>
                    <Row style={{ marginBottom: "-12px" }}>
                      <Col sm={6}>
                        <p style={{ color: "darkslateblue" }}>Mode règlement</p>
                      </Col>
                      <Col sm={6}>
                        {this.props.modreg === "" ||
                        this.props.modreg === null ? (
                          <p style={{ color: "black" }}>--</p>
                        ) : (
                          <p style={{ color: "black" }}>{this.props.modreg}</p>
                        )}
                      </Col>
                    </Row>

                    <Row style={{ marginBottom: "-12px" }}>
                      <Col sm={6}>
                        <p style={{ color: "darkslateblue" }}>№ Pièce</p>
                      </Col>

                      <Col sm={6}>
                        {this.props.numchq === "" ||
                        this.props.numchq === null ? (
                          <p style={{ color: "black" }}>--</p>
                        ) : (
                          <p style={{ color: "black" }}>{this.props.numchq}</p>
                        )}
                      </Col>
                    </Row>

                    <Row style={{ marginBottom: "-12px" }}>
                      <Col sm={6}>
                        <p style={{ color: "darkslateblue" }}>
                          Banque fournisseur
                        </p>
                      </Col>

                      <Col sm={6}>
                        {this.props.matban === "" ||
                        this.props.matban === null ? (
                          <p style={{ color: "black" }}>--</p>
                        ) : (
                          <p style={{ color: "black" }}>{this.props.matban}</p>
                        )}
                      </Col>
                    </Row>

                    <Row style={{ marginBottom: "-12px" }}>
                      <Col sm={6}>
                        <p style={{ color: "darkslateblue" }}>Agence</p>
                      </Col>

                      <Col sm={6}>
                        {this.props.agence === "" ||
                        this.props.agence === null ? (
                          <p style={{ color: "black" }}>--</p>
                        ) : (
                          <p style={{ color: "black" }}>{this.props.agence}</p>
                        )}
                      </Col>
                    </Row>

                    <Row style={{ marginBottom: "-12px" }}>
                      <Col sm={6}>
                        <p style={{ color: "darkslateblue" }}>Caisse</p>
                      </Col>

                      <Col sm={6}>
                        {this.props.numcais === "" ||
                        this.props.numcais === null ? (
                          <p style={{ color: "black" }}>--</p>
                        ) : (
                          <p style={{ color: "black" }}>{this.props.numcais}</p>
                        )}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={6}>
                <Card style={{ height: "100%" }}>
                  <Card.Body>
                    <Row style={{ marginBottom: "-12px" }}>
                      <Col sm={7}>
                        <p style={{ color: "darkslateblue" }}>Echéance</p>
                      </Col>

                      <Col sm={5}>
                        {this.props.datech === null ||
                        this.props.datech === "" ? (
                          <p style={{ color: "black" }}>--</p>
                        ) : (
                          <p style={{ color: "black" }}>
                            {" "}
                            {new Date(this.props.datech).toLocaleDateString(
                              "fr",
                              DATE_OPTIONSS
                            )}
                          </p>
                        )}
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: "-12px" }}>
                      <Col sm={7}>
                        <p style={{ color: "darkslateblue" }}>Titulaire</p>
                      </Col>

                      <Col sm={5}>
                        {this.props.titulaire === "" ||
                        this.props.titulaire === null ? (
                          <p style={{ color: "black" }}>--</p>
                        ) : (
                          <p style={{ color: "black" }}>
                            {this.props.titulaire}
                          </p>
                        )}
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: "-12px" }}>
                      <Col sm={7}>
                        <p style={{ color: "darkslateblue" }}>Situation</p>
                      </Col>

                      <Col sm={5}>
                        {this.props.verser === "" ||
                        this.props.verser === null ? (
                          <p style={{ color: "black" }}>--</p>
                        ) : (
                          <p style={{ color: "black" }}>{this.props.verser}</p>
                        )}
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: "-12px" }}>
                      <Col sm={7}>
                        <p style={{ color: "darkslateblue" }}>
                          Banque versement
                        </p>
                      </Col>

                      <Col sm={5}>
                        {this.props.bqescompte === "" ||
                        this.props.bqescompte === null ? (
                          <p style={{ color: "black" }}>--</p>
                        ) : (
                          <p style={{ color: "black" }}>
                            {this.props.bqescompte}
                          </p>
                        )}
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: "-12px" }}>
                      <Col sm={7}>
                        <p style={{ color: "darkslateblue" }}>C.C.B</p>
                      </Col>

                      <Col sm={5}>
                        {this.props.codccb === "" ||
                        this.props.codccb === null ? (
                          <p style={{ color: "black" }}>--</p>
                        ) : (
                          <p style={{ color: "black" }}>{this.props.codccb}</p>
                        )}
                      </Col>
                    </Row>{" "}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Card style={{ marginTop: "12px" }}>
              <Card.Body>
                <Row style={{ marginBottom: "-12px" }}>
                  <Col sm={3}>
                    <div>
                      <Button
                        aria-describedby={id}
                        variant="contained"
                        color="primary"
                        style={{
                          //  background: "#17a2b8",
                          width: "100%",
                          height: "60px",
                        }}
                        onClick={this.handleClick}
                      >
                        Note
                      </Button>
                      <Popover
                        id={id}
                        open={openn}
                        anchorEl={this.state.anchorEl}
                        onClose={this.handleClosee}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        <Typography
                          style={{
                            width: "500px",
                            height: "100px",
                            padding: "10px",
                            background: "#eee",
                          }}
                          className={useStyles.typography}
                        >
                          {this.props.note === "" ||
                          this.props.note === null ? (
                            <p> Note Vide ... </p>
                          ) : (
                            <p style={{ color: "black", fontSize: "17px" }}>
                              {this.props.note}
                            </p>
                          )}
                        </Typography>
                      </Popover>
                    </div>
                    {/* {this.props.note === "" ||
                    this.props.note === null ? null : (
                      <div>
                        <Row>
                          <Col sm={3}>
                            <p style={{ color: "#17a2b8" }}>Note</p>
                          </Col>
                          <Col sm={9}>
                            <p style={{ color: "black", fontSize: "12px" }}>
                              {this.props.note}
                            </p>
                          </Col>
                        </Row>
                      </div>
                    )} */}
                  </Col>
                  <Col sm={8}>
                    <Alert
                      color={"secondary"}
                      style={{
                        width: "100%",
                        height: "60px",
                      }}
                    >
                      <h4 style={{ color: "#17a2b8", textAlign: "center" }}>
                        Montant &nbsp;&nbsp;
                        <span style={{ color: "black" }}>
                          {Number(this.props.monreg).toFixed(3)}
                        </span>
                      </h4>
                    </Alert>
                  </Col>

                  {/* <Col sm={5}></Col> */}
                  <Col sm={1}>
                    <div>
                      <SpeedDial
                        style={{
                          position: "absolute",
                          bottom: "25px",
                          right: "0px",
                        }}
                        ariaLabel="SpeedDial openIcon example"
                        hidden={this.state.hidden}
                        icon={<EditIcon openIcon={<EditIcon />} />}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        open={this.state.open}
                        FabProps={{ size: "small" }}
                      >
                        {actions.map((action) => (
                          <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={() => {
                              this.handleClose();
                              action.name == "Modifier" && this.openModifier();
                              action.name == "Supprimer" && this.supprimer();
                            }}
                          />
                        ))}
                        {!this.state.open ? (
                          <ReactToPrint
                            trigger={() => (
                              <Fab
                                size="small"
                                style={{
                                  backgroundColor: "white",
                                  display: "none",
                                }}
                                aria-label="add"
                              >
                                <PrintIcon />
                              </Fab>
                            )}
                            content={() => this.componentRef}
                          />
                        ) : (
                          <ReactToPrint
                            trigger={() => (
                              <Fab
                                size="small"
                                style={{
                                  backgroundColor: "white",
                                  marginLeft: "7px",
                                  color: "grey",
                                }}
                                aria-label="add"
                              >
                                <PrintIcon />
                              </Fab>
                            )}
                            content={() => this.componentRef}
                          />
                        )}
                      </SpeedDial>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>

          <ModifierReg
            show={this.state.openModifierModal}
            onHide={ModifierModalClose}
            regid={this.props.regid}
            raisonsocial={this.props.raisonsociale}
            codefournisseur={this.props.fournisseur}
            datreg={this.props.datereg}
            codmodreg={this.props.modreg}
            // libmodreg={this.props.}
            bqfournisseur={this.props.matban}
            montant={this.props.monreg}
            codbqfournisseur={this.props.matban}
            // libbqfournisseur={this.props.}
            codagence={this.props.agence}
            // libagence={this.props.}
            codcaisse={this.props.numcais}
            // libcaisse={this.props.}
            codsituation={this.props.verser}
            // libsituation={this.props.}
            codbqvers={this.props.bqescompte}
            // libbqvers={this.props.}
            codccb={this.props.codccb}
            titulaire={this.props.titulaire}
            datech={this.props.datech}
            numchq={this.props.numchq}
            note={this.props.note}
            // libccb={this.props.}
            // chdec={this.props.}
          />
        </Modal>

        {/* ///////////////// Imprimer /////////// */}
        <div style={{ display: "none" }}>
          <div
            ref={(el) => (this.componentRef = el)}
            style={{ margin: "15px", height: "98%" }}
          >
            <h3>Société POLYSOFT & CO</h3>
            <p>
              Logiciels, Servie informatique et conseil <br />
              Adresse : Avenue Majida Boulila Imm Loulou 3000 Sfax - Tunisie{" "}
              <br />
              Tél: 74 443 620 / Gsm: 20 413 577 / Email: gm@polysoftco.tn <br />
              Code TVA: 1609013R A/M/000 <br />
              RIB: 08 804 0003410007877 51 BIAT H.Thameur Sfax
            </p>

            <div
              style={{ borderTopStyle: "solid", marginBottom: "20px" }}
            ></div>
            <h1
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Reçu №: {this.props.regid}{" "}
            </h1>
            <Row>
              <Col></Col>
              <Col>
                <h4 style={{ marginLeft: "230px" }}>
                  Le:{" "}
                  {new Date(this.state.todaydate).toLocaleDateString(
                    "fr",
                    DATE_OPTIONSS
                  )}
                </h4>

                {/* {this.state.fournisseurimp.map((t) =>
                  t.codtva === "" ? (
                    <h6>Code TVA : --</h6>
                  ) : (
                    <h6>Code TVA : {t.codtva}</h6>
                  )
                )} */}
              </Col>
            </Row>
            <br />

            <br />

            {/* <div style={{ borderBottomStyle: "solid" }}> */}
            <div>
              <h2 style={{ marginBottom: "15px", marginLeft: "10px" }}>
                Fournisseur : &nbsp;&nbsp;{" "}
                <span className="imp">
                  <b>{this.props.fournisseur}</b> {this.props.raisonsociale}
                </span>
              </h2>

              <h2 style={{ marginBottom: "15px", marginLeft: "10px" }}>
                Règlement : &nbsp;&nbsp;{" "}
                <span className="imp">{this.props.modreg}</span>
              </h2>

              {this.props.numchq === "" || this.props.numchq === null ? null : (
                <h2 style={{ marginBottom: "15px", marginLeft: "10px" }}>
                  Pièce : &nbsp;&nbsp;{" "}
                  <span className="imp">
                    {this.props.numchq} &nbsp; <b>Au</b>{" "}
                    {new Date(this.props.datech).toLocaleDateString(
                      "fr",
                      DATE_OPTIONSS
                    )}
                    &nbsp; <b>Banque</b> &nbsp;
                    {this.props.matban}
                  </span>
                </h2>
              )}

              <h2 style={{ marginBottom: "15px", marginLeft: "10px" }}>
                Montant : &nbsp;&nbsp;{" "}
                <span className="imp">
                  {Number(this.props.monreg).toFixed(3)}
                </span>
              </h2>

              <h2 style={{ marginBottom: "15px", marginLeft: "10px" }}>
                Date du règlement : &nbsp;&nbsp;{" "}
                <span className="imp">
                  {new Date(this.props.datereg).toLocaleDateString(
                    "fr",
                    DATE_OPTIONSS
                  )}
                </span>
              </h2>
            </div>
            <br />
            {/* //////////////////////// footer ///////////////////////////// */}
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                textAlign: "center",
                marginTop: "20px",
                justifyContent: "space-between",
                marginLeft: "5px",
              }}
            >
              <h3 style={{ marginLeft: "170px" }}> Signature & Cachet </h3>
              <h3 style={{ marginRight: "200px" }}> Signature Fournisseur </h3>
            </div>

            <br />
            <br />
            <br />
            <div style={{ borderBottomStyle: "dashed" }}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default GetReglementByIdModal;
