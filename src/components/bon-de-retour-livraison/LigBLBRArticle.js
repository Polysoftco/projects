import React, { Component } from "react";
import { Modal, Card } from "react-bootstrap";
import "../styling/Styles.css";
import "./bl.scss";
import { Input, Label, FormGroup, Col, Row, Table } from "reactstrap";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { SelectArticle } from "../../redux/actions/GetArticles";
import { TextField, Fab, IconButton } from "@material-ui/core";
import "../styling/Styling.scss";
import Center from "react-center";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
// import EditArticleModal from "./EditArticleModal";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import Checkbox from "@material-ui/core/Checkbox";
import EditIcon from "@material-ui/icons/Edit";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const roundTo = require("round-to");

class LigBLBRArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codearticle: "",
      qte: "",
      totalht: 0,
      des: "",
      unite: "",
      puht: "",
      remisea: 0,
      tva: 0,
      puttcnet: 0,
      faudec: "N",
      tab: [],
      totalqte: 0,
      sumremisearticle: 0,
      totalhtbrut: 0,
      totaltva: 0,
      totalhtnet: 0,
      remiseglobal: 0,
      netapayer: 0,
      snackbaropen: false,
      snackbarfail: false,
      editModalShow: false,
      qtte: 0,
      btnEnabled: false,
      gilad: true,
      rechs: [],
      stkfin: 0,

      snackbarmsg: ",",
      yesno: "",
      netnetapayer: 0,
      clicked: false,
    };
  }

  componentDidMount() {
    this.props.SelectArticle();
  }

  articleHandlerChange = (event) => {
    fetch(`http://192.168.1.100:81/api/ARTICLEs?codartt=${event.target.value}`)
      .then((response) => response.json())
      .then((data) => this.setState({ rechs: data, clicked: true }));
  };

  snackbarClose = (event) => {
    this.setState({ snackbaropen: false });
  };

  snackbarFailClose = (event) => {
    this.setState({ snackbarfail: false });
  };

  qteHandler = (event) => {
    console.log(typeof parseInt(event.target.value));
    console.log(typeof this.state.totalqte);

    this.setState({
      qte: event.target.value,
      puttcnet:
        parseInt(this.state.puht) +
        parseInt(this.state.puht) * (this.state.tva / 100),
      totalht:
        event.target.value *
        this.state.puht *
        ((100 - this.state.remisea) / 100),
    });

    // this.state.stkfin >= parseInt(event.target.value)
    //   ? this.setState({ yesno: "yes" })
    //   : this.setState({ yesno: "no" });
  };

  remiseHandler = (event) => {
    this.setState({
      remisea: event.target.value,
      totalht:
        this.state.qte * this.state.puht * ((100 - event.target.value) / 100),
    });
  };

  puhtHandler = (event) => {
    this.setState({
      puht: event.target.value,
      totalht:
        this.state.qte *
        event.target.value *
        ((100 - this.state.remisea) / 100),
      puttcnet:
        parseInt(event.target.value) +
        parseInt(event.target.value) * (parseInt(this.state.tva) / 100),
    });
  };

  onCellChange = (event) => {
    this.setState({ codearticle: event.target.value });
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  deleteRow = (index) => {
    var tab = [...this.state.tab];
    tab.splice(index, 1);
    const SumQte = tab && tab.reduce((a, v) => a + parseInt(v.qte), 0);
    const SumRemiseArticle =
      tab &&
      tab.reduce((a, v) => a + (parseInt(v.qte) * v.puht * v.remisea) / 100, 0);
    const SumHtBrut =
      tab && tab.reduce((a, v) => a + parseInt(v.qte) * v.puht, 0);
    const SumTva =
      tab &&
      tab.reduce(
        (a, v) =>
          a +
          parseInt(v.qte) * v.puht * ((100 - v.remisea) / 100) * (v.tva / 100),
        0
      );
    const SumHtNet =
      tab &&
      tab.reduce((a, v) => a + v.totalht * ((100 - this.props.rem) / 100), 0);
    const SumRemiseGlobale =
      tab && tab.reduce((a, v) => a + v.totalht * (this.props.rem / 100), 0);
    const SumNetAPayer =
      tab &&
      tab.reduce(
        (a, v) =>
          a +
          (v.totalht * ((100 - this.props.rem) / 100) +
            parseInt(v.qte) *
              v.puht *
              ((100 - v.remisea) / 100) *
              (v.tva / 100)),
        0
      );
    const SumNetNetAPayer = SumNetAPayer + parseFloat(this.props.valtimbre);

    this.setState({
      tab,
      totalqte: SumQte,
      sumremisearticle: SumRemiseArticle,
      totalhtbrut: SumHtBrut,
      totaltva: SumTva,
      totalhtnet: SumHtNet,
      remiseglobal: SumRemiseGlobale,
      netapayer: SumNetAPayer,
      snackbarfail: true,
      netnetapayer: SumNetNetAPayer,
    });
  };

  submitHandlers = (event) => {
    event.preventDefault();

    const newtab = this.state.tab.concat({
      codearticle: this.state.codearticle,
      des: this.state.des,
      qte: this.state.qte,
      unite: this.state.unite,
      puht: this.state.puht,
      faudec: this.state.faudec,
      remisea: event.target.remisea.value,
      tva: this.state.tva,
      puttcnet: this.state.puttcnet,
      totalht: this.state.totalht,
    });
    const SumQte = newtab && newtab.reduce((a, v) => a + parseInt(v.qte), 0);
    const SumRemiseArticle =
      newtab &&
      newtab.reduce(
        (a, v) => a + (parseInt(v.qte) * v.puht * v.remisea) / 100,
        0
      );
    const SumHtBrut =
      newtab && newtab.reduce((a, v) => a + parseInt(v.qte) * v.puht, 0);
    const SumTva =
      newtab &&
      newtab.reduce(
        (a, v) =>
          a +
          parseInt(v.qte) * v.puht * ((100 - v.remisea) / 100) * (v.tva / 100),
        0
      );
    const SumHtNet =
      newtab &&
      newtab.reduce(
        (a, v) => a + v.totalht * ((100 - this.props.rem) / 100),
        0
      );
    const SumRemiseGlobale =
      newtab &&
      newtab.reduce((a, v) => a + v.totalht * (this.props.rem / 100), 0);
    const SumNetAPayer =
      newtab &&
      newtab.reduce(
        (a, v) =>
          a +
          (v.totalht * ((100 - this.props.rem) / 100) +
            v.qte * v.puht * ((100 - v.remisea) / 100) * (v.tva / 100)),
        0
      );
    const SumNetNetAPayer = SumNetAPayer + parseFloat(this.props.valtimbre);

    this.setState({
      tab: newtab,

      totalqte: SumQte,
      sumremisearticle: SumRemiseArticle,
      totalhtbrut: SumHtBrut,
      totaltva: SumTva,
      totalhtnet: SumHtNet,
      remiseglobal: SumRemiseGlobale,
      netapayer: SumNetAPayer,
      snackbaropen: true,
      btnEnabled: true,
      netnetapayer: SumNetNetAPayer,
    });

    this.setState({
      codearticle: "",
      qte: "",
      totalht: 0,
      des: "",
      unite: "",
      puht: "",
      remisea: 0,
      tva: 0,
      puttcnet: 0,
      faudec: "N",
    });
  };

  render() {
    let editModalClose = () => this.setState({ editModalShow: false });

    console.log(
      this.state.totalqte,
      `remise article =${this.state.sumremisearticle}`
    );

    return (
      <div className="container">
        <Snackbar
          open={this.state.snackbaropen}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={this.snackbarClose}
        >
          <Alert
            style={{ height: "50px" }}
            onClose={this.snackbarClose}
            severity="success"
          >
            Article ajouté
          </Alert>
        </Snackbar>

        <Snackbar
          open={this.state.snackbarfail}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={this.snackbarFailClose}
        >
          <Alert
            style={{ height: "50px" }}
            onClose={this.snackbarFailClose}
            severity="error"
          >
            Article supprimé
          </Alert>
        </Snackbar>

        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton style={{ color: "#00087E" }}>
            <Modal.Title id="contained-modal-title-vcenter">
              <b>Articles</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#fff" }}>
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <form onSubmit={this.submitHandlers}>
                      <Row form style={{ marginBottom: "-20px" }}>
                        <Col sm={7}>
                          <FormGroup>
                            <Typography component="div">
                              <Grid
                                component="label"
                                container
                                alignItems="center"
                                spacing={1}
                              >
                                <Grid>
                                  <b>Chercher article par :</b>
                                </Grid>
                                &nbsp;&nbsp;
                                <Grid item>Désignation</Grid>
                                <Grid item>
                                  <Switch
                                    color="primary"
                                    checked={this.state.gilad}
                                    onChange={this.handleChange("gilad")}
                                    value="gilad"
                                  />
                                </Grid>
                                <Grid item style={{ color: "#3f51b5" }}>
                                  Code
                                </Grid>
                              </Grid>
                            </Typography>
                          </FormGroup>
                        </Col>

                        <Col sm={3}>
                          <FormGroup
                            style={{ marginTop: "10px", marginLeft: "10px" }}
                          >
                            {this.state.faudec === "A" ? (
                              <p style={{ color: "grey" }}>Fodec: ✔</p>
                            ) : null}
                          </FormGroup>
                        </Col>

                        <Col sm={2}>
                          <FormGroup
                            style={{ marginTop: "10px", marginLeft: "10px" }}
                          >
                            <p style={{ color: "grey" }}>
                              Stock: {this.state.stkfin}{" "}
                            </p>
                          </FormGroup>
                        </Col>
                      </Row>

                      {/* {this.state.yesno} */}

                      <Row form>
                        <Col sm={5}>
                          <FormGroup>
                            {this.state.gilad ? (
                              <Autocomplete
                                id="include-input-in-list"
                                includeInputInList
                                className="ajouter-client-input"
                                //   options={this.props.articles.articles}
                                // options={this.state.rechs}
                                options={
                                  this.state.clicked
                                    ? this.state.rechs
                                    : this.props.articles.articles
                                }
                                getOptionLabel={(option) => option.codart}
                                onChange={(event, getOptionLabel) => {
                                  getOptionLabel
                                    ? this.setState({
                                        codearticle: getOptionLabel.codart,
                                        des: getOptionLabel.desart,
                                        unite: getOptionLabel.unite,
                                        puht: getOptionLabel.PUDHT,
                                        remisea: getOptionLabel.remise,
                                        tva: getOptionLabel.tautva,
                                        faudec: getOptionLabel.typfodec,
                                        stkfin: getOptionLabel.stkfin,
                                      })
                                    : this.setState({
                                        codearticle: "",
                                        totalht: 0,
                                        des: "",
                                        unite: "",
                                        puht: "",
                                        remisea: 0,
                                        tva: 0,
                                        faudec: "N",
                                        stkfin: 0,
                                        qte: "",
                                      });
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Code article"
                                    margin="normal"
                                    fullWidth
                                    onChange={this.articleHandlerChange}
                                  />
                                )}
                              />
                            ) : (
                              <Autocomplete
                                id="include-input-in-list"
                                includeInputInList
                                className="ajouter-client-input"
                                //   options={this.props.articles.articles}
                                // options={this.state.rechs}
                                options={
                                  this.state.clicked
                                    ? this.state.rechs
                                    : this.props.articles.articles
                                }
                                getOptionLabel={(option) => option.desart}
                                onChange={(event, getOptionLabel) => {
                                  getOptionLabel
                                    ? this.setState({
                                        codearticle: getOptionLabel.codart,
                                        des: getOptionLabel.desart,
                                        unite: getOptionLabel.unite,
                                        puht: getOptionLabel.PUDHT,
                                        remisea: getOptionLabel.remise,
                                        tva: getOptionLabel.tautva,
                                        faudec: getOptionLabel.typfodec,
                                        stkfin: getOptionLabel.stkfin,
                                      })
                                    : this.setState({
                                        codearticle: "",
                                        totalht: 0,
                                        des: "",
                                        unite: "",
                                        puht: "",
                                        remisea: 0,
                                        tva: 0,
                                        faudec: "N",
                                        stkfin: 0,
                                        qte: "",
                                        puttcnet: 0,
                                      });
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Désignation article"
                                    margin="normal"
                                    fullWidth
                                    onChange={this.articleHandlerChange}
                                  />
                                )}
                              />
                            )}
                          </FormGroup>
                        </Col>
                        <FormGroup style={{ display: "none" }}>
                          <Label> code artcile</Label>
                          <Input
                            type="text"
                            value={this.state.codearticle}
                            disabled
                          />
                        </FormGroup>

                        <Col sm={5}>
                          {this.state.gilad ? (
                            <FormGroup>
                              <TextField
                                id="standard-basic"
                                label="Désignation"
                                value={this.state.des}
                                disabled
                                margin="normal"
                                fullWidth
                              />
                            </FormGroup>
                          ) : (
                            <FormGroup>
                              <TextField
                                id="standard-basic"
                                label="Code article"
                                value={this.state.codearticle}
                                disabled
                                margin="normal"
                                fullWidth
                              />
                            </FormGroup>
                          )}
                        </Col>

                        <Col sm={2}>
                          <FormGroup>
                            {this.state.des === "" ? (
                              <TextField
                                id="standard-basic"
                                label="Quantité"
                                type="number"
                                disabled
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                style={{ marginTop: "16px" }}
                                margin="normal"
                                fullWidth
                                required
                              />
                            ) : (
                              <TextField
                                id="standard-basic"
                                label="Quantité"
                                type="number"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                style={{ marginTop: "16px" }}
                                value={this.state.qte}
                                onChange={this.qteHandler}
                                margin="normal"
                                fullWidth
                                required
                              />
                            )}
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row form>
                        <Col sm={2}>
                          <FormGroup>
                            <TextField
                              id="standard-basic"
                              label="Unité"
                              value={this.state.unite}
                              fullWidth
                              disabled
                            />
                          </FormGroup>
                        </Col>

                        <Col sm={2}>
                          <FormGroup>
                            <TextField
                              id="standard-basic"
                              label="PU HT"
                              value={this.state.puht}
                              fullWidth
                              name="puht"
                              onChange={this.puhtHandler}
                            />
                          </FormGroup>
                        </Col>

                        <Col sm={2}>
                          <FormGroup>
                            <TextField
                              id="standard-basic"
                              label="Remise %"
                              value={this.state.remisea}
                              fullWidth
                              name="remisea"
                              // disabled
                              onChange={this.remiseHandler}
                            />
                          </FormGroup>
                        </Col>

                        <Col sm={2}>
                          <FormGroup>
                            <TextField
                              id="standard-basic"
                              label="TVA"
                              value={this.state.tva}
                              fullWidth
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col sm={2}>
                          <FormGroup>
                            <TextField
                              id="standard-basic"
                              label="PU TTC Net"
                              value={Number(this.state.puttcnet).toFixed(3)}
                              fullWidth
                              disabled
                            />
                          </FormGroup>
                        </Col>

                        <Col sm={2}>
                          <FormGroup>
                            <TextField
                              id="standard-basic"
                              label="Total HT"
                              value={Number(this.state.totalht).toFixed(3)}
                              fullWidth
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      {this.state.des === "" ||
                      this.state.yesno === "no" ||
                      this.state.qte === "" ||
                      this.state.stkfin <= 0 ||
                      parseInt(this.state.qte) <= 0 ? (
                        <Center>
                          <Button
                            disabled
                            style={{ width: "250px" }}
                            variant="contained"
                            color="primary"
                            type="submit"
                          >
                            Ajouter
                          </Button>
                        </Center>
                      ) : (
                        <Center>
                          <Button
                            style={{ width: "250px" }}
                            variant="contained"
                            color="primary"
                            type="submit"
                          >
                            Ajouter
                          </Button>
                        </Center>
                      )}
                    </form>
                  </Card.Body>
                </Card>

                <Card style={{ marginTop: "10px" }}>
                  <Card.Body>
                    <div className="tabbl2">
                      <table style={{ marginTop: "10px" }}>
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
                            <th></th>
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

                              <td>
                                <Tooltip title="Supprimer cet article">
                                  <Fab size="small">
                                    <DeleteIcon
                                      style={{}}
                                      onClick={() => this.deleteRow(i)}
                                    />
                                  </Fab>
                                </Tooltip>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            {/* {
              // !this.state.btnEnabled ? (
              //   <Button disabled variant="contained" style={{ width: "30%" }}>
              //     Enregistrer
              //   </Button>
              // ) : (
              this.state.tab.map((t, i) => ( */}
            <Button
              variant="contained"
              style={{
                backgroundColor: "rgb(0, 8, 126)",
                color: "white",
                width: "30%",
              }}
              onClick={() => {
                this.props.submitHandler(
                  this.state.tab,
                  this.state.totalqte,
                  this.state.sumremisearticle,
                  this.state.totalhtbrut,
                  this.state.totaltva,
                  this.state.totalhtnet,
                  this.state.remiseglobal,
                  this.state.netapayer,
                  this.state.btnEnabled,
                  this.state.netnetapayer
                );
                // this.enregistrer();
                this.props.onHide();
              }}
            >
              Enregistrer
            </Button>
            {/* ))
              // )
            } */}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectArticle: () => dispatch(SelectArticle()),
  };
}

function mapStateToProps(state) {
  return {
    articles: state.articles,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LigBLBRArticle);
