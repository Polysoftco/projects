import React, { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import "./GestionDesArticles.scss";

const PrixTab = props => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="prix-tab">
      {console.log("return")}
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            Prix
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Moar Tabs
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <section className="prix-tab">
                <div>
                  <p>P.U Revient Brut HT</p>
                  <input />
                </div>
                <div>
                  <p>Remise Frs</p>
                  <input />
                </div>
                <div>
                  {" "}
                  <p>P.U Revient Net HT</p>
                  <input />
                </div>

                <div>
                  {" "}
                  <p>P.U Revient Net TTC</p>
                  <input />
                </div>
                <div>
                  {" "}
                  <p>Marge/P.U Brut (%)</p>
                  <input />
                </div>
                <div>
                  {" "}
                  <p>Marge/P.U Net (%)</p>
                  <input />
                </div>
                <div>
                  {" "}
                  <p>P.U Vente HT</p>
                  <input />
                </div>
                <div>
                  {" "}
                  <p>P.U Vente TTC</p>
                  <input />
                </div>
              </section>{" "}
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default PrixTab;