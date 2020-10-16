import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import SideBarReducer from "./reducers/SideBarReducer";
import thunkMiddlewar from "redux-thunk";
import { DataTablesReducer } from "./reducers/DataTablesReducer";
import loaderReducer from "./reducers/LoaderReducer";
import SearchingReducer from "./reducers/SearchingReducer";
import DevisClientReducer from "./reducers/DevisClient";
import { reducer as reduxFormReducer } from "redux-form";
import GetClientsReducer from "./reducers/GetClients";
import GetArticlesReducer from "./reducers/GetArticles";
import GetNumFacDevisReducer from "./reducers/GetNumfacDevis";
import GetDevisLigReducer from "./reducers/GetDevisLig";
import GetTestReducer from "./reducers/TestReducer";
import GetBCReducer from "./reducers/GetBC";
import GetBCLigModal from "./reducers/GetBCLig";
import GetBLReducer from "./reducers/GetBL";
import GetBLLigReducer from "./reducers/GetBLLig";
import GetFactureReducer from "./reducers/GetFacture";
import GetFactureLigReducer from "./reducers/GetFactureLig";

// import GetNumFacDevisReducer from "./reducers/GetNumfacDevis";
// import GetDevisLigReducer from "./reducers/GetDevisLig";
import GetNomeReducer from "./reducers/GetNome";
import GetSousFamilleReducer from "./reducers/GetSousFamille";
import GetCodartReducer from "./reducers/GetCodart";
import GetCodCliReducer from "./reducers/GetCodcli";
import GetFournisseurReducer from "./reducers/GetFournisseur";
import GetCodFrsReducer from "./reducers/GetCodFrs";
import GetSumQLigDVReducer from "./reducers/GetSumQLigDV";
import GetDBReducer from "./reducers/GetDBFolders";
import GetCodBlReducer from "./reducers/GetBLcod.";
import GetNomenclatureReducer from "./reducers/GetNomenclature";
import GetCodBCReducer from "./reducers/Getcodbc";
import GettopclientReducer from "./reducers/Top5";
import GetTopFrsReducer from "./reducers/Top5Frs";
import GetSumChargeReducer from "./reducers/SumCharge";
import GetBEReducer from "./reducers/GetBE";
import GetBECodReducer from "./reducers/GetBECod";
import GetFacFrsCodReducer from "./reducers/GetFacFrsCod";
import GetRECodReducer from "./reducers/GetRECod";
import GetRegReducer from "./reducers/GetReg";
import GetNomeBQReducer from "./reducers/GetNomeBQ";
import GetNomeAGReducer from "./reducers/GetNomeAG";
import GetNomeCSReducer from "./reducers/GetNomeCS";
import GetNomeSCReducer from "./reducers/GetNomeSituation";
import GetNomeCCBReducer from "./reducers/GetNomeCCB";
import GetAllNomeReducer from "./reducers/GetAllNome";
import GetCatNomeReducer from "./reducers/GetCatNome";
import GetCodFacReducer from "./reducers/GetCodFac";
import GetVendeurReducer from "./reducers/GetVendeur";
import getCodVDReducer from "./reducers/GetCodVD";
import getValTimbreReducer from "./reducers/GetValTimbre";
import getBSReducer from "./reducers/GetBS";
import getBSCodReducer from "./reducers/GetBSCod";
import getBLBReducer from "./reducers/GetBLBR";
import getBLBCodReducer from "./reducers/GetBLBRcod";
import GetBLBRLigReducer from "./reducers/GetBLBRLig";

import GetAvoirClient from "./reducers/GetAvoirClient";
import GetAvoirClientCod from "./reducers/GetAvoirCLientCod";
import GetAvoirClientLig from "./reducers/GetAvoirClientLig";

import GetReglementFournisseur from "./reducers/GetReglementFournisseur";
import GetReglementFournisseurCod from "./reducers/GetReglementFournisseurCod";
import GetReglementFournisseurLig from "./reducers/GetReglementFournisseurLig";

const middleware = [thunkMiddlewar];
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(applyMiddleware(...middleware));
const myStore = createStore(
  combineReducers({
    SideBarTitles: SideBarReducer,
    DataTablesReducer,
    loaderReducer,
    SearchingReducer,
    devis: DevisClientReducer,
    form: reduxFormReducer,
    clients: GetClientsReducer,
    articles: GetArticlesReducer,
    numfac: GetNumFacDevisReducer,
    ligs: GetDevisLigReducer,
    tests: GetTestReducer,
    bcs: GetBCReducer,
    bcligs: GetBCLigModal,
    bls: GetBLReducer,
    blbrs: getBLBReducer,
    codblbr: getBLBCodReducer,
    blligs: GetBLLigReducer,
    blbrligs: GetBLBRLigReducer,

    rf: GetReglementFournisseur,
    codrf: GetReglementFournisseurCod,
    rfligs: GetReglementFournisseurLig,

    avoirs: GetAvoirClient,
    codavoirs: GetAvoirClientCod,
    avoirsligs: GetAvoirClientLig,

    factures: GetFactureReducer,
    fligs: GetFactureLigReducer,
    nomes: GetNomeReducer,
    sousfamilles: GetSousFamilleReducer,
    codarts: GetCodartReducer,
    codclis: GetCodCliReducer,
    fournisseurs: GetFournisseurReducer,
    codfrss: GetCodFrsReducer,
    sums: GetSumQLigDVReducer,
    dbs: GetDBReducer,
    codbls: GetCodBlReducer,
    nomenclatures: GetNomenclatureReducer,
    numfacbcs: GetCodBCReducer,
    tops: GettopclientReducer,
    topfrss: GetTopFrsReducer,
    charges: GetSumChargeReducer,
    bes: GetBEReducer,
    codbes: GetBECodReducer,
    codfacfrss: GetFacFrsCodReducer,
    codres: GetRECodReducer,
    regs: GetRegReducer,
    bqs: GetNomeBQReducer,
    ags: GetNomeAGReducer,
    css: GetNomeCSReducer,
    scs: GetNomeSCReducer,
    ccbs: GetNomeCCBReducer,
    allnomes: GetAllNomeReducer,
    catnomes: GetCatNomeReducer,
    codfacs: GetCodFacReducer,
    vendeurs: GetVendeurReducer,
    codvds: getCodVDReducer,
    valtimbres: getValTimbreReducer,
    bsss: getBSReducer,
    bscods: getBSCodReducer,
  }),
  enhancer
);
export default myStore;
