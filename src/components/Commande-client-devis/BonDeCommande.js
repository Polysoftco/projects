import React, { Component } from "react";

import { connect } from "react-redux";
import { SelectBC } from "../../redux/actions/GetBC";
import ConnectedSearchBar from "../content/SearchBar";
import { Row, Col, Button, Table, FormGroup } from "reactstrap";
import "./ss.scss";
import AddBCModal from "./AddBCModal";
import GetBCByIdModal from "./GetBCByIdModal";
import { Redirect } from "react-router-dom";

import EmailModal from "./EmailModal";
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

class BonDeCommande extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      addModalShow: false,
      getBCByIdModalShow: false,
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
    this.props.SelectBC();
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
    fetch(`http://192.168.1.100:81/api/BCDVCLIs/${event.target.value}?type=BC`)
      .then((response) => response.json())
      .then((data) => this.setState({ rechs: data, rechercheclicked: true }));
  };

  firstrechdatHandler = (event) => {
    this.setState({ firstdate: event.target.value });

    fetch(
      `http://192.168.1.100:81/api/BCDVCLIs?datt=${event.target.value}&dattt=${this.state.seconddate}&typpe=BC`
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
      `http://192.168.1.100:81/api/BCDVCLIs?datt=${this.state.firstdate}&dattt=${event.target.value}&typpe=BC`
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
    let addModalClose1 = () => this.setState({ addModalShow: false });
    let getModalClose = () => this.setState({ getBCByIdModalShow: false });
    const {
      bcid,
      datebc,
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
      rem,
      annuler,
      catfisc,
      sumqt,
      taurem,
      valtimbree,
      //totalhtbr,
    } = this.state;

    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <div className="bc-icon">
          <i class="fas fa-clipboard-list" style={{ fontSize: "25px" }}>
            {" "}
            Bon de commande
          </i>
        </div>
        <br />
        <div>
          <Row style={{ marginTop: "-30px" }}>
            <Col sm={5}>
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
                      Recherche par № BC / Client
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
                <div id="" style={{ textAlign: "center" }}>
                  <button
                    className="icon-btn add-btn"
                    onClick={() => this.setState({ addModalShow: true })}
                  >
                    <div className="add-icon"></div>
                    <div className="btn-txt">Ajouter BC</div>
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
                    <div className="btn-txt">Ajouter BC</div>
                  </button>
                </div>
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
                  <th>№ BC</th>
                  <th>Date</th>
                  {/* <th style={{ width: "55%" }}>Client</th> */}
                  <th>Code client</th>
                  <th style={{ width: "40%" }}>Raison Sociale</th>
                  <th>Montant </th>
                </tr>
              </thead>
              <tbody>
                {this.state.rechs.map((test) => (
                  <tr
                    key={test.numfac}
                    onClick={() => {
                      fetch(
                        `http://192.168.1.100:81/api/LigBCDV?type=BC&numfac=${test.numfac}`
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
                            // totalhtbr:
                            //   data &&
                            //   data.reduce(
                            //     (a, v) => a + parseInt(v.quantite) * v.priuni,
                            //     0
                            //   ),
                          })
                        );

                      this.setState({
                        getBCByIdModalShow: true,
                        bcid: test.numfac,
                        datebc: test.datfac,
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
                  <th>№ BC</th>
                  <th>Date</th>
                  {/* <th style={{ width: "55%" }}>Client</th> */}
                  <th>Code client</th>
                  <th style={{ width: "40%" }}>Raison Sociale</th>
                  <th>Montant </th>
                </tr>
              </thead>
              <tbody>
                {this.state.rechdats.map((test) => (
                  <tr
                    key={test.numfac}
                    onClick={() => {
                      fetch(
                        `http://192.168.1.100:81/api/LigBCDV?type=BC&numfac=${test.numfac}`
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
                        getBCByIdModalShow: true,
                        bcid: test.numfac,
                        datebc: test.datfac,
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
                  <th>№ BC</th>
                  <th>Date</th>
                  {/* <th style={{ width: "55%" }}>Client</th> */}
                  <th>Code client</th>
                  <th style={{ width: "40%" }}>Raison Sociale</th>
                  <th>Montant </th>
                </tr>
              </thead>
              <tbody>
                {this.props.bcs.bcs.map((test) => (
                  <tr
                    key={test.numfac}
                    onClick={() => {
                      fetch(
                        `http://192.168.1.100:81/api/LigBCDV?type=BC&numfac=${test.numfac}`
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
                            // totalhtbr:
                            //   data &&
                            //   data.reduce(
                            //     (a, v) => a + parseInt(v.quantite) * v.priuni,
                            //     0
                            //   ),
                          })
                        );

                      this.setState({
                        getBCByIdModalShow: true,
                        bcid: test.numfac,
                        datebc: test.datfac,
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

        <AddBCModal
          show={this.state.addModalShow}
          onHide={addModalClose1}
          valtimbre={this.props.valtimbres.valtimbres.map((t) =>
            parseFloat(t.valtimbre)
          )}
        />

        <GetBCByIdModal
          show={this.state.getBCByIdModalShow}
          onHide={getModalClose}
          bcid={bcid}
          datebc={datebc}
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
          rem={rem}
          tabtab={this.state.tabtab}
          annuler={annuler}
          sumqt={sumqt}
          taurem={taurem}
          catfisc={catfisc}
          valtimbre={this.props.valtimbres.valtimbres.map((t) =>
            parseFloat(t.valtimbre)
          )}
          valtimbree={valtimbree}

          // totalhtbr={totalhtbr}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectBC: () => dispatch(SelectBC()),
    SelectValTimbre: () => dispatch(SelectValTimbre()),
  };
}

function mapStateToProps(state) {
  return {
    bcs: state.bcs,
    SearchingResult: state.SearchingReducer,
    valtimbres: state.valtimbres,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BonDeCommande);
