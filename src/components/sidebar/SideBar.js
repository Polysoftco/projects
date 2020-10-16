import React, { useState } from "react";
import SubMenu from "./SubMenu";
import { NavItem, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./SideBar.scss";
const SideBar = (props) => {
  const fctt = localStorage.getItem("fct");
  const tokenn = localStorage.getItem("token");
  const [fct, setfct] = useState(fctt);
  const [token, settoken] = useState(tokenn);

  return (
    <div className={classNames("sidebar", { "is-open": props.isOpen })}>
      {/* <div className="sidebar-header">
        <span color="info" onClick={props.toggle} style={{ color: "#fff" }}>
          &times;
        </span>
        &nbsp;&nbsp;&nbsp;
        <Link to={"/homepage"}>
          <img src="/images/logo.png" alt="Logo" width="200" height="70" />
        </Link>
      </div> */}
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3">
          <div>
            {fct === "100" ? (
              <Link to={"/homepage"} className="title" onClick={props.toggle}>
                <NavItem style={{ fontSize: "16px", paddingLeft: "27px" }}>
                  <i class="fas fa-chart-bar"> &nbsp;&nbsp;DashBoard</i>
                </NavItem>
              </Link>
            ) : null}
            {props.SideBarTitles.sidebar.map((el, index) => (
              <SubMenu
                key={index}
                title={el.title}
                icon={el.icon}
                items={el.submenu}
              />
            ))}

            {/* {fct === "100" ? (
              <Link
                to={"/clicktocall"}
                className="title"
                onClick={props.toggle}
              >
                <NavItem style={{ fontSize: "16px", paddingLeft: "27px" }}>
                  <i class="fas fa-phone-volume"></i>{" "}
                  <span style={{ marginLeft: "17px" }}>Click To Call</span>
                </NavItem>
              </Link>
            ) : null} */}
            {fct === "100" ? (
              <Link
                to={"/fiche-fournisseur"}
                className="title"
                onClick={props.toggle}
              >
                <NavItem style={{ fontSize: "16px", paddingLeft: "27px" }}>
                  <i class="fas fa-user-friends"></i>{" "}
                  <span style={{ marginLeft: "17px" }}>Fournisseur</span>
                </NavItem>
              </Link>
            ) : (
              <h3></h3>
            )}
            {fct === "100" ? (
              <Link
                to={"/fiche-client"}
                className="title"
                onClick={props.toggle}
              >
                <NavItem style={{ fontSize: "16px", paddingLeft: "27px" }}>
                  <i class="fas fa-user-tie"></i>{" "}
                  <span style={{ marginLeft: "17px" }}>&nbsp;Client</span>
                </NavItem>
              </Link>
            ) : (
              <h3></h3>
            )}
            {fct === "100" ? (
              <Link to={"/personnel"} className="title" onClick={props.toggle}>
                <NavItem style={{ fontSize: "16px", paddingLeft: "27px" }}>
                  <i class="fas fa-users"></i>{" "}
                  <span style={{ marginLeft: "17px" }}>Commercial</span>
                </NavItem>
              </Link>
            ) : (
              <h3></h3>
            )}
            <br />
            <br />
            <a to="" href="https://polysoftco.tn">
              <NavItem style={{ fontSize: "16px", paddingLeft: "20px" }}>
                <i class="fas fa-globe"></i>
                <span style={{ marginLeft: "17px" }}>Polysoft&CO.tn</span>
              </NavItem>
            </a>
            <Link to={"/contact"} onClick={props.toggle}>
              <NavItem>
                <NavItem style={{ fontSize: "16px", paddingLeft: "12px" }}>
                  <i class="far fa-comment-alt"></i>
                  <span style={{ marginLeft: "17px" }}>Contact</span>
                </NavItem>
              </NavItem>
            </Link>
          </div>
        </Nav>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    SideBarTitles: state.SideBarTitles,
  };
};
const ConnectedSideBar = connect(mapStateToProps)(SideBar);

export default ConnectedSideBar;
