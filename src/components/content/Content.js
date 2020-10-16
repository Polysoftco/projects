import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import NavBar from "./Navbar";
import { Switch, Route } from "react-router-dom";
import GestionDesRepresentants from "../gestion-des-representants/GestionDesRepresentants";
import HomePage from "../home-page/HomePage";
import Contact from "../contact-page/Contact";
import CommandeClientEtDevis from "../Commande-client-devis/CommandeClientEtDevis";
import BonDeCommande from "../Commande-client-devis/BonDeCommande";
import CommandeClientsEtFournisseurs from "../Commande-client-devis/CommandeClientsEtFournisseurs";
import DevisClient from "../Commande-client-devis/DevisClients";
import ConnectedFicheFournisseur from "../clients-fournisseurs/FicheFournisseur";
import FicheClient from "../clients-fournisseurs/FicheClient";
import FicheArticle from "../gestion-des-articles/GestionDesArticles";
import BonDeLivraison from "../bon-de-livraison/BonDeLivraison";
import Facture from "../facture/Facture";
import Login from "../../Login/Login";
import Nomenclature from "../Nomenclatures/Nomenclature";
import BonEntree from "../bon-entree/BonEntree";
import Reglement from "../reglement/Reglement";
import ClickToCall from "../clicktocall/ClickToCall";
import Personnel from "../personnels/Personnel";
import BonDeSortie from "../bon-de-sortie/BonDeSortie";
import BonDeRetourLivraison from "../bon-de-retour-livraison/BonDeRetourLivraison";
import AvoirClient from "../avoir-client/AvoirClient";
import ReglementFournisseur from "../reglement-fournisseur/ReglementFournisseur";

// import Logout from "./Logout";
export default (props) => (
  <Container
    fluid
    className={classNames("content", { "is-open": props.isOpen })}
  >
    <NavBar toggle={props.toggle} />
    <Switch>
      {/* <Route exact path="/" component={Login} /> */}
      {/* <Route exact path="/about" component={() => "About"} /> */}
      {/* <Route exact path="/Pages" component={() => "Pages"} /> */}
      <Route exact path="/faq" component={() => "FAQ"} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/fiche-client" component={FicheClient} />
      {/* <Route
          exact
          path="/gestion-des-représentants"
          component={GestionDesRepresentants}
        /> */}
      <Route exact path="/fiche-article" component={FicheArticle} />
      <Route
        exact
        path="/fiche-fournisseur"
        component={ConnectedFicheFournisseur}
      />
      {/* <Route exact path="/Page-2" component={() => "Page-2"} />
        <Route exact path="/page-1" component={() => "page-1"} />
        <Route exact path="/page-2" component={() => "page-2"} />
        <Route exact path="/page-3" component={() => "page-3"} />
        <Route exact path="/page-4" component={() => "page-4"} /> */}
      <Route exact path="/devis" component={DevisClient} />
      <Route exact path="/bon-entree" component={BonEntree} />

      {/* <Route
          exact
          path="/commande-client-et-devis"
          component={CommandeClientEtDevis}
        /> */}
      <Route exact path="/bon-de-commande" component={BonDeCommande} />
      {/* <Route
          exact
          path="/commande-client-et-fournisseurs"
          component={CommandeClientsEtFournisseurs}
        /> */}
      <Route exact path="/bon-de-livraison" component={BonDeLivraison} />
      <Route exact path="/facture" component={Facture} />
      <Route exact path="/homepage" component={HomePage} />
      <Route exact path="/nomenclature" component={Nomenclature} />
      <Route exact path="/reglement" component={Reglement} />
      <Route exact path="/clicktocall" component={ClickToCall} />
      <Route exact path="/personnel" component={Personnel} />
      <Route exact path="/bon-de-sortie" component={BonDeSortie} />
      <Route exact path="/bon-de-retour" component={BonDeRetourLivraison} />
      <Route exact path="/avoir-client" component={AvoirClient} />
      <Route
        exact
        path="/reglement-fournisseur"
        component={ReglementFournisseur}
      />
    </Switch>
  </Container>
);
