import React, { Component } from "react";
import "./GestionDesArticles.scss";
import { Table, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import {
  getArticleList,
  getArticleHeader,
} from "../../redux/actions/ArticleActions";
import ConnectedSearchBar from "../content/SearchBar";
import "../../App.css";
import { SelectArticle } from "../../redux/actions/GetArticles";
import AddingArticleModal from "./AddingArticleModal";
import GetArticleByIdModal from "./GetArticleByIdModal";
import { Redirect } from "react-router-dom";

import ReactToPrint from "react-to-print";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Fab, InputAdornment, TextField } from "@material-ui/core";
import TestAjout from "./TestAjout";
import AddFamilleModal from "./AddFamilleModal";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Tooltip from "@material-ui/core/Tooltip";
import AddSousFamilleModal from "./AddSousFamilleModal";
import { Button } from "react-bootstrap";
import SearchIcon from "@material-ui/icons/Search";

class FicheArticle extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      data: [],
      modal: false,
      addModalShow1: false,
      getArticleByIdModalShow: false,

      loggedIn,
      rechs: [],
      icon: false,
      rechercheclicked: false,
    };
  }
  toggle = () => this.setState({ modal: !this.state.modal });

  componentDidMount() {
    console.log("getarticleslist component didmount");
    this.props.getArticleHeader();
    this.props.SelectArticle();
    // this.setState({ rechs: this.props.articles.articles });
  }

  deletearticle(articleid) {
    if (window.confirm("are you sure?")) {
      fetch(`http://192.168.1.100:81/api/ARTICLEs/` + articleid, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }
  }

  rechercheHandler = (event) => {
    fetch(`http://192.168.1.100:81/api/ARTICLEs?codartt=${event.target.value}`)
      .then((response) => response.json())
      .then((data) => this.setState({ rechs: data, rechercheclicked: true }));
  };

  toggle = () => {
    this.setState({
      icon: !this.state.icon,
    });
  };

  // componentDidUpdate() {
  //   this.props.SelectArticle();
  // }

  render() {
    let addModalClose1 = () => this.setState({ addModalShow1: false });
    let getModalClose = () => this.setState({ getArticleByIdModalShow: false });
    const {
      designationarticle,
      codearticle,
      codeabarrearticle,
      famillearticle,
      reffrsarticle,
      remisearticle,
      stockarticle,
      pvttcarticle,
      typefodecarticle,
      typedcarticle,
      pudht,
      unitearticle,
      tvaarticle,
      sousfamillearticle,
      tauxdcarticle,
      purevientbrut,
      remisefrs,
      purevientnetht,
      purevientnetttc,
      margeprbrut,
      margeprrnet,
      puventeht,
      puventettc,
    } = this.state;

    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <main className="gestion-des-articles">
          <div className="page-icon">
            <i className="fas fa-cube" style={{ fontSize: "25px" }}>
              {" "}
              Fiche Article
            </i>
          </div>
          <br />
          <div>
            <Row>
              <Col sm="9">
                {/* Recherche */}
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
                {/* Add second part tests // Ligs */}
                <div id="" style={{ textAlign: "center" }}>
                  <button
                    className="icon-btn add-btn"
                    onClick={() => this.setState({ addModalShow1: true })}
                  >
                    <div className="add-icon"></div>
                    <div className="btn-txt">Ajouter article</div>
                  </button>
                </div>
              </Col>
            </Row>
            <AddingArticleModal
              show={this.state.addModalShow1}
              onHide={addModalClose1}
            />
          </div>
          <br />

          {/* <div className="articles-table"> */}
          {this.state.rechercheclicked ? (
            <div className="tabga">
              <table striped>
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    {/* {this.props.DataTables.tableHeader.map((el, index) => (
                      <th key={index} className={el.className}>
                        <center>{el.title}</center>
                      </th>
                    ))} */}
                    <th>Code</th>

                    <th style={{ width: "40%" }}>Désignation</th>
                    <th>Stock</th>

                    <th>P.U.V HT</th>
                    <th>T.V.A (%)</th>
                    <th>P.U.V TTC</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {this.props.articles.articles
                  .filter(
                    (article) =>
                      article.codart
                        .toString()
                        .includes(this.props.SearchingResult.searching) ||
                      article.desart
                        .toLowerCase()
                        .includes(this.props.SearchingResult.searching)
                  ) */}
                  {this.state.rechs.map((article) => (
                    <tr
                      key={article.codart}
                      onClick={() => {
                        this.setState({
                          getArticleByIdModalShow: true,
                          designationarticle: article.desart,
                          codearticle: article.codart,
                          codeabarrearticle: article.codbar,
                          famillearticle: article.famart,
                          reffrsarticle: article.reffrs,
                          remisearticle: article.remise,
                          stockarticle: article.stkfin,
                          pvttcarticle: article.PUDTTC,
                          typefodecarticle: article.typfodec,
                          typedcarticle: article.typdc,
                          pudht: article.PUDHT,
                          unitearticle: article.unite,
                          tvaarticle: article.tautva,
                          sousfamillearticle: article.sousfam,
                          tauxdcarticle: article.TDC,
                          purevientbrut: article.PURBHT,
                          remisefrs: article.remisefrs,
                          purevientnetht: article.PURNHT,
                          purevientnetttc: article.PURNTTC,
                          margeprbrut: article.margedet,
                          margeprrnet: article.margedet,
                          puventeht: article.PUDHT,
                          puventettc: article.PUDTTC,
                        });
                      }}
                    >
                      <td>
                        <span>{article.codart}</span>
                      </td>

                      <td style={{ width: "40%" }}>
                        <span>{article.desart}</span>
                      </td>

                      <td>
                        <span>{article.stkfin}</span>
                      </td>

                      <td>
                        <span>{Number(article.PUDHT).toFixed(3)}</span>
                      </td>

                      <td>
                        <span>{Number(article.tautva).toFixed(2)}</span>
                      </td>
                      <td>
                        <span>{Number(article.PUDTTC).toFixed(3)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="tabga">
              <table striped>
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    {/* {this.props.DataTables.tableHeader.map((el, index) => (
                      <th key={index} className={el.className}>
                        <center>{el.title}</center>
                      </th>
                    ))} */}
                    <th>Code</th>

                    <th style={{ width: "50%" }}>Désignation</th>
                    <th>Stock</th>

                    <th>P.U.V HT</th>
                    <th>T.V.A (%)</th>
                    <th>P.U.V TTC</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.articles.articles.map((article) => (
                    <tr
                      key={article.codart}
                      onClick={() => {
                        this.setState({
                          getArticleByIdModalShow: true,
                          designationarticle: article.desart,
                          codearticle: article.codart,
                          codeabarrearticle: article.codbar,
                          famillearticle: article.famart,
                          reffrsarticle: article.reffrs,
                          remisearticle: article.remise,
                          stockarticle: article.stkfin,
                          pvttcarticle: article.PUDTTC,
                          typefodecarticle: article.typfodec,
                          typedcarticle: article.typdc,
                          pudht: article.PUDHT,
                          unitearticle: article.unite,
                          tvaarticle: article.tautva,
                          sousfamillearticle: article.sousfam,
                          tauxdcarticle: article.TDC,
                          purevientbrut: article.PURBHT,
                          remisefrs: article.remisefrs,
                          purevientnetht: article.PURNHT,
                          purevientnetttc: article.PURNTTC,
                          margeprbrut: article.margedet,
                          margeprrnet: article.remise,
                          puventeht: article.PUDHT,
                          puventettc: article.PUDTTC,
                        });
                      }}
                    >
                      <td>
                        <span>{article.codart}</span>
                      </td>

                      <td style={{ width: "50%" }}>
                        <span>{article.desart}</span>
                      </td>

                      <td>
                        <span>{article.stkfin}</span>
                      </td>

                      <td>
                        <span>{Number(article.PUDHT).toFixed(3)}</span>
                      </td>

                      <td>
                        <span>{Number(article.tautva).toFixed(2)}</span>
                      </td>
                      <td>
                        <span>{Number(article.PUDTTC).toFixed(3)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* <div>
            <input type="text" onChange={this.rechercheHandler}></input>
            {this.state.rechs.map((t) => (
              <table>
                <tr>
                  <td>codart</td>
                  <td>designation</td>
                </tr>
                <tr>
                  <td> {t.codart} </td>
                  <td> {t.desart} </td>
                </tr>
              </table>
            ))}
          </div> */}

          <GetArticleByIdModal
            show={this.state.getArticleByIdModalShow}
            onHide={getModalClose}
            designationarticle={designationarticle}
            codearticle={codearticle}
            codeabarrearticle={codeabarrearticle}
            famillearticle={famillearticle}
            reffrsarticle={reffrsarticle}
            remisearticle={remisearticle}
            stockarticle={stockarticle}
            pvttcarticle={pvttcarticle}
            typefodecarticle={typefodecarticle}
            typedcarticle={typedcarticle}
            pudht={pudht}
            unitearticle={unitearticle}
            tvaarticle={tvaarticle}
            sousfamillearticle={sousfamillearticle}
            tauxdcarticle={tauxdcarticle}
            purevientbrut={purevientbrut}
            remisefrs={remisefrs}
            purevientnetht={purevientnetht}
            purevientnetttc={purevientnetttc}
            margeprbrut={margeprbrut}
            margeprrnet={margeprrnet}
            puventeht={puventeht}
            puventettc={puventettc}
          />
        </main>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  getArticleList: () => {
    dispatch(getArticleList());
  },
  getArticleHeader: () => {
    dispatch(getArticleHeader());
  },

  SelectArticle: () => dispatch(SelectArticle()),
});
const mapStateToProps = (state) => {
  return {
    SideBarTitles: state.SideBarTitles,

    SearchingResult: state.SearchingReducer,

    DataTables: state.DataTablesReducer,
    articles: state.articles,
  };
};
const ConnectedFicheArticle = connect(
  mapStateToProps,
  mapDispatchToProps
)(FicheArticle);

export default ConnectedFicheArticle;
