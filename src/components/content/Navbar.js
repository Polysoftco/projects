import React, { useState, Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import {
  Navbar,
  Button,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";

//     const username = localStorage.getItem("username");

//     this.state = { username: username, isOpen: true };
//   }

//   toggle = () => {
//     this.setState({ isOpen: !this.state.isOpen });
//   };

//   render() {
//     return (
//       <div>
//         <Navbar
//           style={{ marginTop: "-10px", marginBottom: "10px" }}
//           color="light"
//           light
//           className="navbar shadow-sm p-3 bg-white rounded"
//           expand="md"
//         >
//           <Button
//             className="buttonside"
//             style={{ color: "#fff" }}
//             onClick={this.toggle}
//           >
//             <FontAwesomeIcon icon={faAlignLeft} />
//           </Button>
//           &nbsp;&nbsp;&nbsp;
//           <span style={{ color: "black" }}>
//             <i class="fa fa-user-circle" aria-hidden="true">
//               {" "}
//               {this.state.username}
//             </i>
//           </span>
//           <NavbarToggler onClick={this.state.toggle} />
//           <Collapse isOpen={!this.state.isOpen} navbar>
//             <Nav className="ml-auto" navbar>
//               <NavItem>
//                 <NavLink
//                   tag={Link}
//                   to={"/fiche-fournisseur"}
//                   onClick={this.toggle}
//                 >
//                   <span style={{ color: "#020f64" }}>
//                     {" "}
//                     <i className="fas fa-shopping-cart"></i> Fournisseur
//                   </span>
//                 </NavLink>
//               </NavItem>
//               <NavItem>
//                 <NavLink tag={Link} to={"/fiche-client"} onClick={this.toggle}>
//                   <span style={{ color: "#020f64" }}>
//                     {" "}
//                     <i className="fas fa-user"></i> client{" "}
//                   </span>
//                 </NavLink>
//               </NavItem>
//               <NavItem>
//                 <NavLink tag={Link} to={"/fiche-article"} onClick={this.toggle}>
//                   <span style={{ color: "#020f64" }}>
//                     {" "}
//                     <i className="fas fa-cube"></i> Article{" "}
//                   </span>
//                 </NavLink>
//               </NavItem>
//               <NavItem>
//                 <NavLink
//                   tag={Link}
//                   to={"/bon-de-livraison"}
//                   onClick={this.toggle}
//                 >
//                   <span style={{ color: "#020f64" }}>
//                     {" "}
//                     <i class="fas fa-list-alt"></i> BL{" "}
//                   </span>
//                 </NavLink>
//               </NavItem>
//               <NavItem>
//                 <NavLink tag={Link} to={"/devis"} onClick={this.toggle}>
//                   <span style={{ color: "#020f64" }}>
//                     {" "}
//                     <i className="fas fa-clipboard-list"></i> Devis{" "}
//                   </span>
//                 </NavLink>
//               </NavItem>
//               <NavItem>
//                 <NavLink tag={Link} to={"/logout"}>
//                   <i
//                     class="fas fa-sign-out-alt"
//                     style={{ color: "rgb(220, 0, 78)" }}
//                   >
//                     {" "}
//                     Log-out
//                   </i>
//                 </NavLink>
//               </NavItem>
//             </Nav>
//           </Collapse>
//         </Navbar>
//       </div>
//     );
//   }
// }

const username = localStorage.getItem("username");
export default (props) => {
  const [isOpen, setOpen] = useState(true);
  const [time, setTime] = useState();
  const toggle = () => setOpen(!isOpen);
  setInterval(() => {
    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    const hours = new String(new Date().getHours()); //Current Hours
    var zero1 = "";
    var zero2 = "";
    var zero3 = "";
    if (new String(hours).length == 1) {
      zero1 = "0";
    }
    const min = new String(new Date().getMinutes()); //Current Minutes
    if (new String(min).length == 1) {
      zero2 = "0";
    }
    const sec = new String(new Date().getSeconds()); //Current Seconds
    if (new String(sec).length == 1) {
      zero3 = "0";
    }

    const datenow =
      date + "/" + month + "/" + year + " " + zero1 + hours + ":" + zero2 + min;
    setTime(datenow);
  }, 1000);
  return (
    <Navbar
      style={{ marginTop: "-10px", marginBottom: "10px" }}
      color="light"
      light
      className="navbar shadow-sm p-3 bg-white rounded"
      expand="md"
    >
      <Button
        className="buttonside"
        style={{ color: "#fff" }}
        onClick={props.toggle}
      >
        <FontAwesomeIcon icon={faAlignLeft} />
      </Button>
      &nbsp;&nbsp;&nbsp;
      <div className="sidebar-header">
        <Link to={"/homepage"}>
          <img
            src="/images/ayolalogos.png"
            alt="Logo"
            width="160"
            height="40"
          />
        </Link>
      </div>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={!isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <span style={{ marginTop: "8%", color: "black" }}>
            <i class="fa fa-user-circle" aria-hidden="true">
              {" "}
              {username}
              <l
                className=""
                style={{
                  marginTop: "3%",
                  fontWeight: "bold",
                }}
              ></l>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{new String(time)}
            </i>
          </span>

          <NavItem style={{ marginTop: "5%", color: "black" }}>
            <NavLink tag={Link} to={"/logout"}>
              <i
                class="fas fa-sign-out-alt"
                style={{ color: "rgb(220, 0, 78)" }}
              >
                {" "}
                Log-out
              </i>
              {/* <Button style={{ background: "rgb(220, 0, 78)" }}><i class="fas fa-sign-out-alt" >  Déconnexion</i></Button> */}
            </NavLink>
          </NavItem>
          {/* <NavItem>
            <span style={{ color: "cornflowerblue" }}>
              <i class="fa fa-user-circle" aria-hidden="true">
                {" "}
                {username}
              </i>
            </span>
          </NavItem> */}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

function mapStateToProps(state) {
  return {
    blbrs: state.blbrs,
  };
}
