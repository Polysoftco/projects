import React, { Component } from "react";
import { connect } from "react-redux";
import "../Commande-client-devis/Styling.css";
import { getClientHeader } from "../../redux/actions/ClientActions";

import "../../App.css";
import "./ClientsFournisseurs.scss";
import ConnectedSearchBar from "../content/SearchBar";
import { SelectTest } from "../../redux/actions/TestAction";
import { Table, Row, Col } from "reactstrap";
import AddCModal from "./add-modal/AddCModal";
import GetClientByID from "./GetClientByID";
import GetFournisseurByID from "./GetFournisseurByID";
import AddFmodal from "./add-modal/AddFmodal";
import { Redirect } from "react-router-dom";
import { SelectFournisseur } from "../../redux/actions/GetFournisseur";
import SearchIcon from "@material-ui/icons/Search";
import { TextField, InputAdornment } from "@material-ui/core";

class FicheFournisseur extends Component {
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
    this.props.SelectFournisseur();
  }

  rechercheHandler = (event) => {
    fetch(
      `http://192.168.1.100:81/api/fournisseurs?codfrss=${event.target.value}`
    )
      .then((response) => response.json())
      .then((data) => this.setState({ rechs: data, rechercheclicked: true }));
  };

  render() {
    let addModalClose1 = () => this.setState({ addModalShow: false });
    let GetByIdModalClose = () => this.setState({ GetByIdModalShow: false });

    const {
      codefournisseur,
      raisoc,
      tel1,
      tel2,
      email,
      adresse,
      siteweb,
      nom,
      ville,
      codepostal,
      identifiant,
      tauxfodec,
      timbre,
      soustraitant,

      acontacter,
      impot,
      comptable,
    } = this.state;

    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <main className="gestion-des-clients">
          <div className="page-icon">
            <i className="fas fa-shopping-cart" style={{ fontSize: "25px" }}>
              {" "}
              Fiche Fournisseur
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
                  <div id="" style={{ textAlign: "center" }}>
                    <button
                      className="icon-btn add-btn"
                      onClick={() => this.setState({ addModalShow: true })}
                    >
                      <div className="add-icon"></div>
                      <div className="btn-txt">Ajouter Fournisseur</div>
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
                      key={test.codfrs}
                      onClick={() => {
                        this.setState({
                          GetByIdModalShow: true,
                          codefournisseur: test.codfrs,
                          raisoc: test.raisoc,
                          tel1: test.tel1,
                          tel2: test.tel2,
                          email: test.email,
                          adresse: test.adr,
                          siteweb: test.sitweb,
                          nom: test.nom,
                          ville: test.ville,
                          codepostal: test.cp,
                          identifiant: test.CodeTVA,
                          tauxfodec: test.tauxfodec,
                          timbre: test.timbre,
                          soustraitant: test.STrt,

                          acontacter: test.fax,
                          impot: test.autreimp,
                          comptable: test.compte,
                        });
                      }}
                    >
                      <td>
                        <span>{test.codfrs}</span>
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
                  {this.props.fournisseurs.fournisseurs.map((test) => (
                    <tr
                      key={test.codfrs}
                      onClick={() => {
                        this.setState({
                          GetByIdModalShow: true,
                          codefournisseur: test.codfrs,
                          raisoc: test.raisoc,
                          tel1: test.tel1,
                          tel2: test.tel2,
                          email: test.email,
                          adresse: test.adr,
                          siteweb: test.sitweb,
                          nom: test.nom,
                          ville: test.ville,
                          codepostal: test.cp,
                          identifiant: test.CodeTVA,
                          tauxfodec: test.tauxfodec,
                          timbre: test.timbre,
                          soustraitant: test.STrt,

                          acontacter: test.fax,
                          impot: test.autreimp,
                          comptable: test.compte,
                        });
                      }}
                    >
                      <td>
                        <span>{test.codfrs}</span>
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

          <AddFmodal show={this.state.addModalShow} onHide={addModalClose1} />

          <GetFournisseurByID
            show={this.state.GetByIdModalShow}
            onHide={GetByIdModalClose}
            //  passager={passager}
            codefournisseur={codefournisseur}
            raisoc={raisoc}
            tel1={tel1}
            tel2={tel2}
            email={email}
            adresse={adresse}
            siteweb={siteweb}
            nom={nom}
            ville={ville}
            codepostal={codepostal}
            identifiant={identifiant}
            tauxfodec={tauxfodec}
            timbre={timbre}
            soustraitant={soustraitant}
            acontacter={acontacter}
            impot={impot}
            comptable={comptable}
          />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DataTables: state.DataTablesReducer,
    // tests: state.tests,
    SearchingResult: state.SearchingReducer,
    fournisseurs: state.fournisseurs,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getClientHeader: () => {
    dispatch(getClientHeader());
  },
  // SelectTest: () => {
  //   dispatch(SelectTest());
  // },
  SelectFournisseur: () => {
    dispatch(SelectFournisseur());
  },
});
const ConnectedFicheFournisseur = connect(
  mapStateToProps,
  mapDispatchToProps
)(FicheFournisseur);
export default ConnectedFicheFournisseur;
