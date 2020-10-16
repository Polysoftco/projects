import React, { Component } from "react";
import {
  TextField,
  InputAdornment,
  Typography,
  Grid,
  Switch,
} from "@material-ui/core";
import { Col, Row, FormGroup } from "reactstrap";
import SearchIcon from "@material-ui/icons/Search";
import { Redirect } from "react-router-dom";
import AddReModal from "./AddReglementModal";
import { connect } from "react-redux";
import { SelectReglementFournisseur } from "../../redux/actions/GetReglementFournisseur";
import "./re.scss";
import GetREByIdModal from "./GetReglementByIdModal";

const DATE_OPTIONS = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

var curr = new Date();
curr.setDate(curr.getDate());
var date = curr.toISOString().substr(0, 10);

class ReglementFournisseur extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      addModalShow: false,
      getREByIdModalShow: false,
      loggedIn,
      rechs: [],
      icon: false,
      rechercheclicked: false,
      tabtab: [],

      defaultdate: date,
      firstdate: date,
      seconddate: date,
      rechdats: [],
      showrechbydate: false,

      gilad: true,
    };
  }

  componentDidMount() {
    this.props.SelectReglementFournisseur();
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });

    this.state.gilad
      ? this.setState({ showrechbydate: false })
      : this.setState({ rechercheclicked: false });
  };

  rechercheHandler = (event) => {
    fetch(`http://192.168.1.100:81/api/REGCLIs/${event.target.value}`)
      .then((response) => response.json())
      .then((data) => this.setState({ rechs: data, rechercheclicked: true }));
  };

  toggle = () => this.setState({ modal: !this.state.modal });

  firstrechdatHandler = (event) => {
    this.setState({ firstdate: event.target.value });

    fetch(
      `http://192.168.1.100:81/api/REGCLIs?datt=${event.target.value}&dattt=${this.state.seconddate}`
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          rechdats: data,
          showrechbydate: true,
          rechercheclicked: false,
        })
      );
  };

  secondrechdatHandler = (event) => {
    this.setState({ seconddate: event.target.value });

    fetch(
      `http://192.168.1.100:81/api/REGCLIs?datt=${this.state.firstdate}&dattt=${event.target.value}`
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          rechdats: data,
          showrechbydate: true,
          rechercheclicked: false,
        })
      );
  };

  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }

    let addModalClose1 = () => this.setState({ addModalShow: false });
    let getModalClose = () => this.setState({ getREByIdModalShow: false });

    const {
      regid,
      datereg,
      fournisseur,
      raisonsociale,
      modreg,
      numcais,
      numchq,
      titulaire,
      datech,
      mntreg,
      bqescompte,
      codccb,
      agence,
      monreg,
      verser,
      matban,
      note,
    } = this.state;

    return (
      <div>
        <div className="bl-icon">
          <i className="fab fa-dashcube" style={{ fontSize: "25px" }}>
            {" "}
            Règlement Fournisseur
          </i>
        </div>
        <br />
        <div>
          <Row style={{ marginTop: "-30px" }}>
            <Col sm={6}>
              <FormGroup style={{ marginTop: "25px" }}>
                <Typography component="div">
                  <Grid
                    component="label"
                    container
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item style={{ color: "grey" }}>
                      Recherche par date
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
                      Recherche par № BRèglement / Fournisseur
                    </Grid>
                  </Grid>
                </Typography>
              </FormGroup>
            </Col>
          </Row>
          {/* Recherche */}
          {/* <ConnectedSearchBar /> */}
          {this.state.gilad ? (
            <Row>
              <Col sm={10}>
                <div className="search-bar">
                  <TextField
                    placeholder="Recherche..."
                    id="input-with-icon-textfield"
                    className="input-search"
                    onChange={this.rechercheHandler}
                    onClick={this.toggle}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon className="search-icon" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </Col>
              <Col sm={2} style={{ marginTop: "-15px" }}>
                <div id="" style={{ textAlign: "center" }}>
                  <button
                    className="icon-btn add-btn"
                    onClick={() => this.setState({ addModalShow: true })}
                  >
                    <div className="add-icon"></div>
                    <div className="btn-txt">Ajouter Règlement</div>
                  </button>
                </div>
              </Col>
            </Row>
          ) : (
            <Row style={{ marginTop: "-15px" }}>
              <Col sm={3}>
                <TextField
                  id="standard-basic"
                  label="Date Début"
                  margin="normal"
                  type="date"
                  fullWidth
                  name="firstdate"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.firstrechdatHandler}
                  value={this.state.firstdate}
                  defaultValue={this.state.defaultdate}
                />
              </Col>

              <Col sm={3}>
                <TextField
                  id="standard-basic"
                  label="Date Fin"
                  margin="normal"
                  type="date"
                  fullWidth
                  name="seconddate"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={this.state.defaultdate}
                  onChange={this.secondrechdatHandler}
                  value={this.state.seconddate}
                />
              </Col>

              <Col sm={4}></Col>

              <Col sm={2}>
                {/* Add second part devis // Ligs */}
                {/* <AddDevis /> */}
                <div id="" style={{ textAlign: "center" }}>
                  <button
                    className="icon-btn add-btn"
                    onClick={() => this.setState({ addModalShow: true })}
                  >
                    <div className="add-icon"></div>
                    <div className="btn-txt">Ajouter BL</div>
                  </button>
                </div>
              </Col>
            </Row>
          )}
        </div>
        <br />
        {this.state.rechercheclicked ? (
          <div className="tabre">
            <table>
              <thead>
                <tr>
                  <th>№ REG</th>
                  <th>Date</th>
                  <th>Code fournisseur</th>
                  <th style={{ width: "40%" }}>Raison Sociale</th>
                  <th>Montant</th>
                  <th>Solde</th>
                </tr>
              </thead>
              <tbody>
                {this.state.rechs.map((test) => (
                  <tr
                    key={test.numreg}
                    onClick={() =>
                      this.setState({
                        getREByIdModalShow: true,
                        regid: test.numreg,
                        datereg: test.datreg,
                        fournisseur: test.codcli,
                        raisonsociale: test.raisoc,
                        modreg: test.modreg,
                        numcais: test.numcais,
                        numchq: test.numchq,
                        titulaire: test.titulaire,
                        datech: test.datech,
                        mntreg: test.mntreg,
                        bqescompte: test.BqEscompte,
                        codccb: test.codccb,
                        agence: test.agence,
                        monreg: test.monreg,
                        verser: test.verser,
                        matban: test.matban,
                        note: test.lib_reg,
                      })
                    }
                  >
                    <td>
                      <span>{test.numreg}</span>
                    </td>

                    <td>
                      <span>
                        {new Date(test.datreg).toLocaleDateString(
                          "fr",
                          DATE_OPTIONS
                        )}
                      </span>
                    </td>

                    <td>
                      <span>{test.codcli}</span>
                    </td>

                    <td style={{ width: "40%" }}>
                      <span>{test.raisoc}</span>
                    </td>
                    <td>
                      <span> {Number(test.mntreg).toFixed(3)} </span>
                    </td>
                    <td>
                      <span>{Number(test.Reste).toFixed(3)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : this.state.showrechbydate ? (
          <div className="tabre">
            <table>
              <thead>
                <tr>
                  <th>№ REG</th>
                  <th>Date</th>
                  <th>Code fournisseur</th>
                  <th style={{ width: "40%" }}>Raison Sociale</th>
                  <th>Montant</th>
                  <th>Solde</th>
                </tr>
              </thead>
              <tbody>
                {this.state.rechdats.map((test) => (
                  <tr
                    key={test.numreg}
                    onClick={() =>
                      this.setState({
                        getREByIdModalShow: true,
                        regid: test.numreg,
                        datereg: test.datreg,
                        fournisseur: test.codcli,
                        raisonsociale: test.raisoc,
                        modreg: test.modreg,
                        numcais: test.numcais,
                        numchq: test.numchq,
                        titulaire: test.titulaire,
                        datech: test.datech,
                        mntreg: test.mntreg,
                        bqescompte: test.BqEscompte,
                        codccb: test.codccb,
                        agence: test.agence,
                        monreg: test.monreg,
                        verser: test.verser,
                        matban: test.matban,
                        note: test.lib_reg,
                      })
                    }
                  >
                    <td>
                      <span>{test.numreg}</span>
                    </td>

                    <td>
                      <span>
                        {new Date(test.datreg).toLocaleDateString(
                          "fr",
                          DATE_OPTIONS
                        )}
                      </span>
                    </td>

                    <td>
                      <span>{test.codcli}</span>
                    </td>

                    <td style={{ width: "40%" }}>
                      <span>{test.raisoc}</span>
                    </td>
                    <td>
                      <span> {Number(test.mntreg).toFixed(3)} </span>
                    </td>
                    <td>
                      <span>{Number(test.Reste).toFixed(3)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="tabre">
            <table>
              <thead>
                <tr>
                  <th>№ REG</th>
                  <th>Date</th>
                  <th>Code fournisseur</th>
                  <th style={{ width: "40%" }}>Raison Sociale</th>
                  <th>Montant</th>

                  <th>Solde</th>
                </tr>
              </thead>
              <tbody>
                {/* {this.props.regs.regs.map((test) => (
                  <tr
                    key={test.numreg}
                    onClick={() =>
                      this.setState({
                        getREByIdModalShow: true,
                        regid: test.numreg,
                        datereg: test.datreg,
                        fournisseur: test.codcli,
                        raisonsociale: test.raisoc,
                        modreg: test.modreg,
                        numcais: test.numcais,
                        numchq: test.numchq,
                        titulaire: test.titulaire,
                        datech: test.datech,
                        mntreg: test.mntreg,
                        bqescompte: test.BqEscompte,
                        codccb: test.codccb,
                        agence: test.agence,
                        monreg: test.monreg,
                        verser: test.verser,
                        matban: test.matban,
                        note: test.lib_reg,
                      })
                    }
                  >
                    <td>
                      <span>{test.numreg}</span>
                    </td>

                    <td>
                      <span>
                        {new Date(test.datreg).toLocaleDateString(
                          "fr",
                          DATE_OPTIONS
                        )}
                      </span>
                    </td>

                    <td>
                      <span>{test.codcli}</span>
                    </td>

                    <td style={{ width: "40%" }}>
                      <span>{test.raisoc}</span>
                    </td>
                    <td>
                      <span> {Number(test.mntreg).toFixed(3)} </span>
                    </td>
                    <td>
                      <span>{Number(test.Reste).toFixed(3)}</span>
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        )}
        <AddReModal show={this.state.addModalShow} onHide={addModalClose1} />
        <GetREByIdModal
          show={this.state.getREByIdModalShow}
          onHide={getModalClose}
          regid={regid}
          datereg={datereg}
          fournisseur={fournisseur}
          raisonsociale={raisonsociale}
          modreg={modreg}
          numcais={numcais}
          numchq={numchq}
          titulaire={titulaire}
          datech={datech}
          mntreg={mntreg}
          bqescompte={bqescompte}
          codccb={codccb}
          agence={agence}
          monreg={monreg}
          verser={verser}
          matban={matban}
          note={note}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectReglementFournisseur: () => dispatch(SelectReglementFournisseur()),
  };
}

function mapStateToProps(state) {
  return {
    regs: state.regs,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReglementFournisseur);
