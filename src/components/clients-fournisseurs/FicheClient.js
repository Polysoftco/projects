import React, { Component } from "react";
import { connect } from "react-redux";
import "../Commande-client-devis/Styling.css";
import { getClientHeader } from "../../redux/actions/ClientActions";
import "./ClientsFournisseurs.scss";

import "../../App.css";
import ConnectedSearchBar from "../content/SearchBar";
import { SelectTest } from "../../redux/actions/TestAction";
import { Table, Row, Col } from "reactstrap";
import AddCModal from "./add-modal/AddCModal";
import GetClientByID from "./GetClientByID";
import { Redirect } from "react-router-dom";
import { SelectClient } from "../../redux/actions/GetClients";
import SearchIcon from "@material-ui/icons/Search";
import { TextField, InputAdornment } from "@material-ui/core";

class FicheClient extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      addModalShow: false,
      GetByIdModalShow: false,
      loggedIn,
      rechs: [],
      icon: false,
      rechercheclicked: false,
    };
  }

  toggle = () => this.setState({ modal: !this.state.modal });

  componentDidMount() {
    console.log("gettestslist component didmount");
    this.props.getClientHeader();
    // this.props.SelectTest();
    this.props.SelectClient();
  }

  rechercheHandler = (event) => {
    fetch(`http://192.168.1.100:81/api/CLIEntS?codclii=${event.target.value}`)
      .then((response) => response.json())
      .then((data) => this.setState({ rechs: data, rechercheclicked: true }));
  };

  render() {
    let addModalClose1 = () => this.setState({ addModalShow: false });
    let GetByIdModalClose = () => this.setState({ GetByIdModalShow: false });

    const {
      passager,
      codeclient,
      raisoc,
      tel1,
      tel2,
      email,
      adresse,
      siteweb,
      cin,
      ville,
      codepostal,
      identifiant,
      tauxfodec,
      timbre,
      soustraitant,

      acontacter,
      impot,
      comptable,
      categoriefiscale,
    } = this.state;
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <main className="gestion-des-clients">
          <div className="page-icon">
            <i className="fas fa-user" style={{ fontSize: "25px" }}>
              {" "}
              Fiche client
            </i>
          </div>
          <br />
          <Row>
            <Col sm={12}>
              <Row>
                <Col sm="9">
                  {/* <ConnectedSearchBar /> */}
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
                <Col sm="3">
                  <div
                    id=""
                    style={{ textAlign: "center", marginLeft: "50px" }}
                  >
                    <button
                      className="icon-btn add-btn"
                      onClick={() => this.setState({ addModalShow: true })}
                    >
                      <div className="add-icon"></div>
                      <div className="btn-txt">Ajouter client</div>
                    </button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <br />

          {this.state.rechercheclicked ? (
            <div className="tabcf">
              <table striped>
                <thead>
                  <tr>
                    {/* {this.props.DataTables.tableHeader.map((el, index) => (
                      <th key={index} className={el.className}>
                        <center>{el.title}</center>
                      </th>
                    ))} */}
                    <th>Code</th>
                    <th>Raison sociale</th>
                    <th>Ville</th>
                    <th>Solde Facture</th>
                    <th>Solde Global</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.rechs.map((test) => (
                    <tr
                      key={test.codcli}
                      onClick={() => {
                        this.setState({
                          GetByIdModalShow: true,
                          passager: test.passager,
                          codeclient: test.codcli,
                          raisoc: test.raisoc,
                          tel1: test.tel1,
                          tel2: test.tel2,
                          email: test.email,
                          adresse: test.adr,
                          siteweb: test.sitweb,
                          cin: test.cin,
                          ville: test.ville,
                          codepostal: test.cp,
                          identifiant: test.codtva,
                          tauxfodec: test.compte,
                          timbre: test.timbre,
                          soustraitant: test.NAR,

                          acontacter: test.RC,
                          impot: test.CodDep,
                          comptable: test.RIB2,
                          categoriefiscale: test.catfisc,
                        });
                      }}
                    >
                      <td>
                        <span>{test.codcli}</span>
                      </td>

                      <td>
                        <span>{test.raisoc}</span>
                      </td>

                      {test.ville === "" ? (
                        <td>
                          <span>--</span>
                        </td>
                      ) : (
                        <td>
                          <span>{test.ville}</span>
                        </td>
                      )}

                      <td>
                        <span>{Number(test.soldfac).toFixed(3)}</span>
                      </td>
                      <td>
                        <span>{Number(test.soldfacbl).toFixed(3)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="tabcf">
              <table striped>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Raison sociale</th>
                    <th>Ville</th>
                    <th>Solde Facture</th>
                    <th>Solde Global</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.clients.clients.map((test) => (
                    <tr
                      key={test.codcli}
                      onClick={() => {
                        this.setState({
                          GetByIdModalShow: true,
                          passager: test.passager,
                          codeclient: test.codcli,
                          raisoc: test.raisoc,
                          tel1: test.tel1,
                          tel2: test.tel2,
                          email: test.email,
                          adresse: test.adr,
                          siteweb: test.sitweb,
                          cin: test.cin,
                          ville: test.ville,
                          codepostal: test.cp,
                          identifiant: test.codtva,
                          tauxfodec: test.compte,
                          timbre: test.timbre,
                          soustraitant: test.NAR,

                          acontacter: test.RC,
                          impot: test.CodDep,
                          comptable: test.RIB2,
                          categoriefiscale: test.catfisc,
                        });
                      }}
                    >
                      <td>
                        <span>{test.codcli}</span>
                      </td>

                      <td>
                        <span>{test.raisoc}</span>
                      </td>
                      {test.ville === "" ? (
                        <td>
                          <span>--</span>
                        </td>
                      ) : (
                        <td>
                          <span>{test.ville}</span>
                        </td>
                      )}

                      <td>
                        <span>{Number(test.soldfac).toFixed(3)}</span>
                      </td>
                      <td>
                        <span>{Number(test.soldfacbl).toFixed(3)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <AddCModal show={this.state.addModalShow} onHide={addModalClose1} />

          <GetClientByID
            show={this.state.GetByIdModalShow}
            onHide={GetByIdModalClose}
            passager={passager}
            codeclient={codeclient}
            raisoc={raisoc}
            tel1={tel1}
            tel2={tel2}
            email={email}
            adresse={adresse}
            siteweb={siteweb}
            cin={cin}
            ville={ville}
            codepostal={codepostal}
            identifiant={identifiant}
            tauxfodec={tauxfodec}
            timbre={timbre}
            soustraitant={soustraitant}
            acontacter={acontacter}
            impot={impot}
            comptable={comptable}
            categoriefiscale={categoriefiscale}
          />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DataTables: state.DataTablesReducer,
    tests: state.tests,
    SearchingResult: state.SearchingReducer,
    clients: state.clients,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getClientHeader: () => {
    dispatch(getClientHeader());
  },
  SelectTest: () => {
    dispatch(SelectTest());
  },
  SelectClient: () => {
    dispatch(SelectClient());
  },
});
const ConnectedFicheClient = connect(
  mapStateToProps,
  mapDispatchToProps
)(FicheClient);
export default ConnectedFicheClient;
