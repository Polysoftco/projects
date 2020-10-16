import React, { Component } from "react";
import { Row, Col, Table, FormGroup } from "reactstrap";
import AddDevis from "./AddDevis";
import { connect } from "react-redux";
import { SelectUser } from "../../redux/actions/DevisClient";
import "../styling/Styles.css";
import ConnectedSearchBar from "../content/SearchBar";
import EditDevisClientModal from "./EditDevisClientModal";
import { SelectClient } from "../../redux/actions/GetClients";
import { Button } from "react-bootstrap";
import { SelectDevisLig } from "../../redux/actions/GetDevisLig";
import "./ss.scss";
import { Redirect } from "react-router-dom";
import {
  TextField,
  InputAdornment,
  Switch,
  Grid,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { SelectValTimbre } from "../../redux/actions/GetValTimbre";

const DATE_OPTIONS = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

var curr = new Date();
curr.setDate(curr.getDate());
var date = curr.toISOString().substr(0, 10);

class DevisClient extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      editModalShow: false,
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
    this.props.SelectUser();
    this.props.SelectValTimbre();
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });

    this.state.gilad
      ? this.setState({ showrechbydate: false })
      : this.setState({ rechercheclicked: false });
  };

  toggle = () => this.setState({ modal: !this.state.modal });

  rechercheHandler = (event) => {
    fetch(`http://192.168.1.100:81/api/BCDVCLIs/${event.target.value}?type=DV`)
      .then((response) => response.json())
      .then((data) => this.setState({ rechs: data, rechercheclicked: true }));
  };

  firstrechdatHandler = (event) => {
    this.setState({ firstdate: event.target.value });

    fetch(
      `http://192.168.1.100:81/api/BCDVCLIs?datt=${event.target.value}&dattt=${this.state.seconddate}&typpe=DV`
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
      `http://192.168.1.100:81/api/BCDVCLIs?datt=${this.state.firstdate}&dattt=${event.target.value}&typpe=DV`
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

  editModalClose = () => this.setState({ editModalShow: false });

  render() {
    const {
      devisid,
      datedevis,
      client,
      raisonsociale,
      totalqteee,
      totalhtbrut,
      remiselignes,
      remiseglobale,
      totalhtnet,
      totaldc,
      totalcos,
      totalttc,
      totaltva,
      droitdetimbre,
      avanceimpot,
      annuler,
      sumqt,
      catfisc,
      taurem,
      valtimbree,
    } = this.state;

    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <div className="page-icon">
          <i class="fas fa-tasks" style={{ fontSize: "25px" }}>
            {" "}
            Devis client
          </i>
        </div>
        <br />
        <div>
          <Row style={{ marginTop: "-30px" }}>
            <Col sm={12}>
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
                      Recherche par № DV / Client
                    </Grid>
                  </Grid>
                </Typography>
              </FormGroup>
            </Col>
          </Row>
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
                <AddDevis />
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
                <AddDevis
                  valtimbre={this.props.valtimbres.valtimbres.map((t) =>
                    parseFloat(t.valtimbre)
                  )}
                />
              </Col>
            </Row>
          )}
        </div>
        <br />

        {/* <div className="bc-table"> */}
        {this.state.rechercheclicked ? (
          <div className="tabd">
            <table striped>
              <thead>
                <tr>
                  <th>№ DV</th>
                  <th>Date</th>
                  {/* <th style={{ width: "55%" }}>Client</th> */}
                  <th>Code client</th>
                  <th style={{ width: "40%" }}>Raison Social</th>
                  <th>Montant </th>
                </tr>
              </thead>
              <tbody>
                {this.state.rechs.map((test) => (
                  <tr
                    key={test.numfac}
                    onClick={() => {
                      fetch(
                        `http://192.168.1.100:81/api/LigBCDV?type=DV&numfac=${test.numfac}`
                      )
                        .then((response) => response.json())
                        .then((data) =>
                          this.setState({
                            tabtab: data,
                            sumqt:
                              data &&
                              data.reduce(
                                (a, v) => a + parseInt(v.quantite),
                                0
                              ),
                          })
                        );
                      this.setState({
                        editModalShow: true,
                        devisid: test.numfac,
                        datedevis: test.datfac,
                        client: test.codcli,
                        raisonsociale: test.raisoc,
                        totalhtbrut: test.smhtb,
                        remiselignes: test.smremart,
                        remiseglobale: test.smremglo,
                        totalhtnet: test.smhtn,
                        totaldc: test.smDC,
                        totalcos: test.smCOS,
                        totalttc: test.mntbon,
                        totaltva: test.smtva,
                        droitdetimbre: test.timbre,
                        avanceimpot: test.ForfaitCli,
                        annuler: test.annuler,
                        catfisc: test.catfisc,
                        taurem: test.taurem,
                        valtimbree: test.valtimbre,
                      });
                    }}
                  >
                    <td>
                      <span>{test.numfac}</span>
                    </td>

                    <td>
                      <span>
                        {new Date(test.datfac).toLocaleDateString(
                          "fr",
                          DATE_OPTIONS
                        )}
                      </span>
                    </td>

                    {/* <td style={{ width: "55%" }}>
                      <span>{test.codcli}</span> &nbsp;&nbsp;&nbsp;&nbsp;
                      <span>{test.raisoc}</span>
                    </td> */}
                    <td>
                      <span>{test.codcli}</span>
                    </td>
                    <td style={{ width: "40%" }}>
                      <span>{test.raisoc}</span>
                    </td>

                    <td>
                      <span>
                        {" "}
                        {Number(
                          parseFloat(test.mntbon) + parseFloat(test.valtimbre)
                        ).toFixed(3)}
                      </span>{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : this.state.showrechbydate ? (
          <div className="tabd">
            <table striped>
              <thead>
                <tr>
                  <th>№ DV</th>
                  <th>Date</th>
                  {/* <th style={{ width: "55%" }}>Client</th> */}
                  <th>Code client</th>
                  <th style={{ width: "40%" }}>Raison Social</th>
                  <th>Montant </th>
                </tr>
              </thead>
              <tbody>
                {this.state.rechdats.map((test) => (
                  <tr
                    key={test.numfac}
                    onClick={() => {
                      fetch(
                        `http://192.168.1.100:81/api/LigBCDV?type=DV&numfac=${test.numfac}`
                      )
                        .then((response) => response.json())
                        .then((data) =>
                          this.setState({
                            tabtab: data,
                            sumqt:
                              data &&
                              data.reduce(
                                (a, v) => a + parseInt(v.quantite),
                                0
                              ),
                          })
                        );
                      this.setState({
                        editModalShow: true,
                        devisid: test.numfac,
                        datedevis: test.datfac,
                        client: test.codcli,
                        raisonsociale: test.raisoc,
                        totalhtbrut: test.smhtb,
                        remiselignes: test.smremart,
                        remiseglobale: test.smremglo,
                        totalhtnet: test.smhtn,
                        totaldc: test.smDC,
                        totalcos: test.smCOS,
                        totalttc: test.mntbon,
                        totaltva: test.smtva,
                        droitdetimbre: test.timbre,
                        avanceimpot: test.ForfaitCli,
                        annuler: test.annuler,
                        catfisc: test.catfisc,
                        taurem: test.taurem,
                        valtimbree: test.valtimbre,
                      });
                    }}
                  >
                    <td>
                      <span>{test.numfac}</span>
                    </td>

                    <td>
                      <span>
                        {new Date(test.datfac).toLocaleDateString(
                          "fr",
                          DATE_OPTIONS
                        )}
                      </span>
                    </td>

                    {/* <td style={{ width: "55%" }}>
                  <span>{test.codcli}</span> &nbsp;&nbsp;&nbsp;&nbsp;
                  <span>{test.raisoc}</span>
                </td> */}
                    <td>
                      <span>{test.codcli}</span>
                    </td>
                    <td style={{ width: "40%" }}>
                      <span>{test.raisoc}</span>
                    </td>

                    <td>
                      <span>
                        {" "}
                        {Number(
                          parseFloat(test.mntbon) + parseFloat(test.valtimbre)
                        ).toFixed(3)}
                      </span>{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="tabd">
            <table striped>
              <thead>
                <tr>
                  <th>№ DV</th>
                  <th>Date</th>
                  {/* <th style={{ width: "55%" }}>Client</th> */}
                  <th>Code client</th>
                  <th style={{ width: "40%" }}>Raison Sociale</th>
                  <th>Montant </th>
                </tr>
              </thead>
              <tbody>
                {this.props.devis.devis.map((test) => (
                  <tr
                    key={test.numfac}
                    onClick={() => {
                      fetch(
                        `http://192.168.1.100:81/api/LigBCDV?type=DV&numfac=${test.numfac}`
                      )
                        .then((response) => response.json())
                        .then((data) =>
                          this.setState({
                            tabtab: data,
                            sumqt:
                              data &&
                              data.reduce(
                                (a, v) => a + parseInt(v.quantite),
                                0
                              ),
                          })
                        );
                      this.setState({
                        editModalShow: true,
                        devisid: test.numfac,
                        datedevis: test.datfac,
                        client: test.codcli,
                        raisonsociale: test.raisoc,
                        totalhtbrut: test.smhtb,
                        remiselignes: test.smremart,
                        remiseglobale: test.smremglo,
                        totalhtnet: test.smhtn,
                        totaldc: test.smDC,
                        totalcos: test.smCOS,
                        totalttc: test.mntbon,
                        totaltva: test.smtva,
                        droitdetimbre: test.timbre,
                        avanceimpot: test.ForfaitCli,
                        annuler: test.annuler,
                        catfisc: test.catfisc,
                        taurem: test.taurem,
                        valtimbree: test.valtimbre,
                      });
                    }}
                  >
                    <td>
                      <span>{test.numfac}</span>
                    </td>

                    <td>
                      <span>
                        {new Date(test.datfac).toLocaleDateString(
                          "fr",
                          DATE_OPTIONS
                        )}
                      </span>
                    </td>
                    {/* 
                    <td style={{ width: "55%" }}>
                      <span>{test.codcli}</span> &nbsp;&nbsp;&nbsp;&nbsp;
                      <span>{test.raisoc}</span>
                    </td> */}
                    <td>
                      <span>{test.codcli}</span>
                    </td>
                    <td style={{ width: "40%" }}>
                      <span>{test.raisoc}</span>
                    </td>

                    <td>
                      <span>
                        {" "}
                        {Number(
                          parseFloat(test.mntbon) + parseFloat(test.valtimbre)
                        ).toFixed(3)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <br />

        <EditDevisClientModal
          show={this.state.editModalShow}
          onHide={this.editModalClose}
          devisid={devisid}
          datedevis={datedevis}
          client={client}
          raisonsociale={raisonsociale}
          totalhtbrut={totalhtbrut}
          remiselignes={remiselignes}
          remiseglobale={remiseglobale}
          totalhtnet={totalhtnet}
          totaldc={totaldc}
          totalcos={totalcos}
          totalttc={totalttc}
          totaltva={totaltva}
          droitdetimbre={droitdetimbre}
          avanceimpot={avanceimpot}
          cod={devisid}
          annuler={annuler}
          tabtab={this.state.tabtab}
          sumqt={sumqt}
          taurem={taurem}
          catfisc={catfisc}
          valtimbre={this.props.valtimbres.valtimbres.map((t) =>
            parseFloat(t.valtimbre)
          )}
          valtimbree={valtimbree}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectUser: () => dispatch(SelectUser()),
    SelectValTimbre: () => dispatch(SelectValTimbre()),
  };
}

function mapStateToProps(state) {
  return {
    devis: state.devis,
    valtimbres: state.valtimbres,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DevisClient);
