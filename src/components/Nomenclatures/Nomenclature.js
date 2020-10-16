import React, { Component } from "react";

import {
  Tabs,
  Tab,
  Table,
  Button,
  Card,
  Row,
  Col,
  Form,
} from "react-bootstrap";

import { connect } from "react-redux";
import { SelectAllNome } from "../../redux/actions/GetAllNome";
import { TextField, Snackbar, IconButton, Fab } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { SelectCatNome } from "../../redux/actions/GetCatNome";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import "./nome.scss";

class Nomenclature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cat: "",
      tab: [],
      show: false,
      snackbaropen: false,
      snackbarmsg: ",",
      code: "",
      lib: "",
      changeButton: false,
    };
  }

  componentDidMount() {
    this.props.SelectAllNome();
    this.props.SelectCatNome();
  }

  catHandlerChange = () => {
    fetch(`http://192.168.1.100:81/api/Nome?cat=${this.state.cat}`)
      .then((response) => response.json())
      .then((data) => this.setState({ tab: data, show: true }));
  };

  supprimer = (index) => {
    if (
      window.confirm(
        "êtes-vous sûr de vouloir supprimer cette bon de livraison?"
      )
    ) {
      fetch(
        `http://192.168.1.100:81/api/Nome?catcat=${this.state.cat}&codecode=${index}`,
        {
          method: "DELETE",
          header: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          this.setState({ snackbaropen: true, snackbarmsg: result });
        });
    }
  };

  libHandler = (event) => {
    this.setState({ lib: event.target.value });
  };

  codeHandler = (event) => {
    this.setState({ code: event.target.value });
  };

  submitHandler = (event) => {
    event.preventDefault();

    fetch(
      `http://192.168.1.100:81/api/Nome?cat=${this.state.cat}&code=${event.target.code.value}&lib=${event.target.lib.value}&chdec=0`,
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
          window.location.reload();
          console.log(result);
        },
        (error) => {
          this.setState({ snackbaropen: true, snackbarmsg: "failed" });
        }
      );
  };

  modifierHandler = (event) => {
    event.preventDefault();

    fetch(
      `http://192.168.1.100:81/api/Nome?cat=${this.state.cat}&code=${this.state.code}&lib=${this.state.lib}`,
      {
        method: "PUT",
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
          window.location.reload();
          console.log(result);
        },
        (error) => {
          this.setState({ snackbaropen: true, snackbarmsg: "failed" });
        }
      );
  };

  snackbarClose = () => {
    this.setState({ snackbaropen: false });
  };

  render() {
    return (
      <div>
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

        <div className="page-icon">
          <u>
            {" "}
            <i class="far fa-plus-square" style={{ fontSize: "25px" }}>
              {" "}
              Nomenclature
            </i>
          </u>
        </div>

        <br />

        <Row>
          <Col sm={5}>
            <Card>
              <Card.Body>
                <div style={{ margin: "20px" }}>
                  <Form onSubmit={this.submitHandler}>
                    <Row form>
                      <Col>
                        <Form.Group controlId="code">
                          <Autocomplete
                            id="include-input-in-list"
                            includeInputInList
                            className="ajouter-client-input"
                            options={this.props.catnomes.catnomes}
                            getOptionLabel={(option) => option.cat}
                            onChange={(event, getOptionLabel) => {
                              getOptionLabel
                                ? fetch(
                                    `http://192.168.1.100:81/api/Nome?cat=${getOptionLabel.cat}`
                                  )
                                    .then((response) => response.json())
                                    .then((data) =>
                                      this.setState({
                                        tab: data,
                                        cat: getOptionLabel.cat,
                                        show: true,
                                      })
                                    )
                                : this.setState({
                                    cat: "",
                                    show: false,
                                    code: "",
                                    lib: "",
                                    changeButton: false,
                                  });
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Catégorie"
                                margin="normal"
                                fullWidth
                                //  onChange={this.catHandlerChange}
                                name="cat"
                              />
                            )}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row form>
                      <Col>
                        <Form.Group controlId="code">
                          <TextField
                            id="standard-basic"
                            label="Code"
                            margin="normal"
                            fullWidth
                            name="code"
                            type="text"
                            value={this.state.code}
                            onChange={this.codeHandler}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row form>
                      <Col>
                        <Form.Group controlId="lib">
                          <TextField
                            id="standard-basic"
                            label="Libellé"
                            margin="normal"
                            fullWidth
                            name="lib"
                            type="text"
                            value={this.state.lib}
                            onChange={this.libHandler}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row form>
                      <Col sm={2}></Col>
                      <Col sm={8}>
                        <Form.Group>
                          {this.state.changeButton ? (
                            <Button
                              style={{
                                backgroundColor: "#17a2b8",
                                width: "100%",
                                borderColor: "#17a2b8",
                              }}
                              onClick={this.modifierHandler}
                            >
                              Valider Modification
                            </Button>
                          ) : (
                            <Button
                              type="submit"
                              style={{
                                backgroundColor: "#17a2b8",
                                width: "100%",
                                borderColor: "#17a2b8",
                              }}
                            >
                              Enregistrer
                            </Button>
                          )}
                        </Form.Group>
                      </Col>
                      <Col sm={2}></Col>
                    </Row>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={7}>
            <Card style={{ height: "100%", marginTop: "5px" }}>
              <Card.Body>
                <h4 style={{ marginBottom: "30px" }}>
                  {" "}
                  Nomenclature &nbsp;{" "}
                  <span style={{ color: "rgb(23, 162, 184)" }}>
                    {" "}
                    {this.state.cat}{" "}
                  </span>{" "}
                </h4>
                <Row>
                  <Col>
                    {this.state.show ? (
                      <div className="tabnome">
                        <Table striped hover size="sm">
                          <thead
                            style={{ background: "#454d55", color: "white" }}
                          >
                            <tr>
                              <th>Code</th>
                              <th>Libellé</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.tab.map((t, i) => (
                              <tr key={i}>
                                <td> {t.code} </td>
                                <td> {t.lib} </td>
                                <td>
                                  <Tooltip title="Editer">
                                    <Fab size="small">
                                      <EditIcon
                                        style={{}}
                                        onClick={() => {
                                          this.setState({
                                            code: t.code,
                                            lib: t.lib,
                                            changeButton: true,
                                          });
                                          //   this.deleteRowMod(i);
                                        }}
                                      />
                                    </Fab>
                                  </Tooltip>
                                  &nbsp;&nbsp;&nbsp;
                                  <Tooltip title="Supprimer">
                                    <Fab size="small">
                                      <DeleteIcon
                                        style={{}}
                                        onClick={() => this.supprimer(t.code)}
                                      />
                                    </Fab>
                                  </Tooltip>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    ) : null}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectAllNome: () => dispatch(SelectAllNome()),
    SelectCatNome: () => dispatch(SelectCatNome()),
  };
}

function mapStateToProps(state) {
  return {
    allnomes: state.allnomes,
    catnomes: state.catnomes,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nomenclature);
