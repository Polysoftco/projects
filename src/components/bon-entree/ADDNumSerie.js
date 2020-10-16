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
// import View from "react-view-component/lib/View";

import "../styling/Styles.css";
// import "../commande-client-devis/ss.scss";
import "./be.scss";

import {
  TextField,
  Paper,
  Button,
  Snackbar,
  IconButton,
  MenuItem,
} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";

import Tooltip from "@material-ui/core/Tooltip";

import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

import { Divider, Chip } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { SelectBECod } from "../../redux/actions/GetBECode";
import LigBEArticle from "./LigBEArticle";
import { SelectBE } from "../../redux/actions/GetBE";
import { SelectFacFrsCod } from "../../redux/actions/GetFacFrsCod";
import { SelectFournisseur } from "../../redux/actions/GetFournisseur";
import { AlignedGridsService } from "ag-grid-community";

const roundTo = require("round-to");
var curr = new Date();
curr.setDate(curr.getDate());
var date = curr.toISOString().substr(0, 10);

class AddNumSerie extends Component {
  constructor(props) {
    super(props);
    const username = localStorage.getItem("username");

    this.state = {
      gilad: true,
      defaultdate: date,
      NS0: "NS0",
      listInput: [],

      // showTimbre: false,
      // showForfitaire: 0,
      // showButtonModalPassager: false,
      // addModalShow1: false,
      // ligModalShow: false,
      // tab: [1, 2, 3, 4, 5, 6],
      // totalqte: 0,
      // sumremisearticle: 0,
      // totalhtbrut: 0,
      // totaltva: 0,
      // remiseg: 0,
      // representant: "",
      // raisonsocial: "",
      // codeclient: "",
      // categoriefiscale: "",
      // totalhtnet: 0,
      // remiseglobal: 0,
      // netapayer: 0,
      // btnEnable: false,
      // btnEnabled: false,
      // cemail: "",
      // openActionModal: false,
      // rechs: [],
      // codetva: "",
      // typach: [
      //   { code: "L", label: "L" },
      //   { code: "F", label: "F" },
      // ],

      nextsubmit: false,

      snackbaropen: false,
      snackbarmsg: ",",
      codf: "",

      valtimbre: 0,
      netnetapayer: 0,
      catfiscal: "0",

      username: username,
      clicked: false,
    };
  }

  componentDidMount() {
    this.props.SelectBECod();
    this.props.SelectFacFrsCod();
    this.props.SelectFournisseur();
    var listInput = [];
    for (let index = 0; index < 50; index++) {
      listInput.push("");
    }
    this.setState({ listInput: listInput });
  }

  // typachChange = () => {
  //   this.props.codfacfrss.codfacfrss.map((t) =>
  //     this.setState({ codf: t.valeur })
  //   );
  // };

  // submitHandler = () =>
  //   tab,
  //   totalqte,
  //   sumremisearticle,
  //   totalhtbrut,
  //   totaltva,
  //   totalhtnet,
  //   remiseglobal,
  //   netapayer,
  //   btnEnabled,
  //   netnetapayer
  //   {
  //     this.setState({
  //       tab: tab,
  //       totalqte: totalqte,
  //       sumremisearticle: sumremisearticle,
  //       totalhtbrut: totalhtbrut,
  //       totaltva: totaltva,
  //       totalhtnet: totalhtnet,
  //       remiseglobal: remiseglobal,
  //       netapayer: netapayer,
  //       btnEnabled: btnEnabled,
  //       netnetapayer: netnetapayer,
  //     });
  //   };

  enregistrerNumeroSerie = (e, position) => {
    var listInput = this.state.listInput;
    listInput[position] = e.target.value;
    this.setState({
      listInput: listInput,
    });
  };
  onclickButton = () => {
    // alert(this.state.listInput);
    console.log(this.state.listInput);

    this.props.codbes.codbes.map((t) => {
      for (let userObject of this.state.listInput) {
        if (userObject != "") {
          console.log(t.valeur);
          fetch(
            `http://192.168.1.100:81/api/NumSeries?CodArt=${this.props.test}&NumSer=${userObject}&DateGar=${date}&DurGar=0&Vendu=false&CodDep=&QteStock=1`,
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
      }
    });
  };
  //   affichetable(params) {
  //  return(
  //     for (var i = 0; i < 50; i++) {
  //       <input
  //         type="text"
  //         className="form-control mb-2 mr-sm-2"
  //         placeholder="Jane Doe"
  //       />;
  //     }
  //     );
  //   }
  affichetable(props) {
    return (
      <div className="Comment">
        <div className="UserInfo">
          <img
            className="Avatar"
            src={props.author.avatarUrl}
            alt={props.author.name}
          />
          <div className="UserInfo-name">{props.author.name}</div>
        </div>
        <div className="Comment-text">{props.text}</div>
        <div className="Comment-date">{props.date}</div>
      </div>
    );
  }
  render() {
    // var NumeroSerieListInput = [];
    // for (let i = 0; i < 50; i++) {
    //   let chaine = i;
    //   NumeroSerieListInput.push;
    // <input
    //   type="text"
    //   data-code={"NS" + chaine}
    //   id={"NS" + chaine}
    //   onChange={(e) => this.enregistrerNumeroSerie(e, i)}
    //   className={"NS" + chaine}
    //   placeholder={"NS" + chaine}
    //   style={{ maxWidth: "100px" }}
    // />
    // ();
    // }

    let ligModalClose = () => this.setState({ ligModalShow: false });

    const { rem } = this.state;

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
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "white", color: "#020F64" }}
          >
            <Modal.Title id="contained-modal-title-vcenter">
              <b>Ajouter Numéro Série</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Body>
                <Col
                  sm={6}
                  md={4}
                  style={{ textAlign: "center" }}
                  style={{
                    marginLeft: " 30%",
                    marginRight: " 20%",
                  }}
                >
                  <div className="table-responsive">
                    <label style={{ textAlign: "center" }}>Numéro Série</label>

                    {this.state.listInput.map((el, i) => (
                      <input
                        type="text"
                        data-code={"NS" + i}
                        id={"NS" + i}
                        onChange={(e) => this.enregistrerNumeroSerie(e, i)}
                        className="form-control"
                        placeholder={"NS" + (i + 1)}
                        style={{ maxWidth: "170px" }}
                        value={this.state.listInput[i]}
                      />
                    ))}
                  </div>
                  <Button
                    onClick={() => this.onclickButton()}
                    variant="contained"
                    type="submit"
                    style={{
                      marginTop: "20px",
                      width: "100%",
                      color: "white",
                      backgroundColor: "#020F64",
                    }}
                  >
                    Valider
                  </Button>
                </Col>
              </Card.Body>
            </Card>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectFournisseur: () => {
      dispatch(SelectFournisseur());
    },
    SelectBECod: () => dispatch(SelectBECod()),
    SelectBE: () => dispatch(SelectBE()),
    SelectFacFrsCod: () => dispatch(SelectFacFrsCod()),
  };
}

function mapStateToProps(state) {
  return {
    fournisseurs: state.fournisseurs,
    codbes: state.codbes,
    codfacfrss: state.codfacfrss,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNumSerie);
