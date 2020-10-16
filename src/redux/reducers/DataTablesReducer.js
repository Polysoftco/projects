import {
  GET_ARTICLES_LIST,
  GET_ARTICLES_HEADER,
  GET_CLIENTS_HEADER,
  GET_ELEMENT_DETAILS,
  GET_CLIENTS_LIST,
  REMPLIR_DATA_TABLE,
  GET_FOURNISSEURS_HEADER,
  GET_FOURNISSEURS_LIST,
} from "../../constants/actionTypes";
const intialSatate = {
  articles: [],
  tableHeader: [],
  clients: [],
  dataTable: [],
  etat: "",
  fournisseurs: [],
  elementDetails: [],
};
export const DataTablesReducer = (state = intialSatate, action) => {
  switch (action.type) {
    case GET_ELEMENT_DETAILS:
      return {
        ...state,
        elementDetails: action.payload,
      };
    case GET_ARTICLES_LIST:
      return {
        ...state,
        etat: action.etat,
        articles: action.payload.map((el, index) => ({
          id: index,
          code: el.codart,
          name: el.desart,
        })),
      };

    case GET_FOURNISSEURS_LIST:
      return {
        ...state,
        etat: action.etat,
        fournisseurs: action.payload.map((el, index) => ({
          id: index,
          code: el.codfrs,
          name: el.raisoc,
          adresse: el.adr,
          numTel1: el.tel1,
          numTel2: el.tel2,
          codePostal: el.cp,
          siteWeb: el.sitweb,
          ville: el.ville,
          email: el.email,
          timbre: el.timbre,
          codeTVA: el.codeTVA,
          tauxFodec: el.tauxfodec,
          userType: el.psg,
          soldeFacture: el.soldfac,
          soldeGlobal: el.soldfacbl,
        })),
      };

    case GET_ARTICLES_HEADER:
      return {
        ...state,
        tableHeader: action.payload,
      };
    case GET_CLIENTS_HEADER:
      return {
        ...state,
        tableHeader: action.payload,
      };
    case GET_FOURNISSEURS_HEADER:
      return {
        ...state,
        tableHeader: action.payload,
      };
    case GET_CLIENTS_LIST:
      return {
        ...state,
        etat: action.etat,
        clients: action.payload.map((el, index) => ({
          id: index,
          code: el.codcli,

          name: el.raisoc,
          adresse: el.adr,
          numTel1: el.tel1,
          numTel2: el.tel2,
          codePostal: el.cp,
          siteWeb: el.sitweb,
          ville: el.ville,
          CIN: el.cin,
          email: el.email,
          RIB: el.rib,
          timbre: el.timbre,
          categorieFiscale: el.catfisc,
          remise: el.remise,
          RC: el.RC,
          regimeClient: el.regimecli,
          codeTVA: el.codtva,

          userType: el.passager,
          soldeFacture: el.soldfac,
          soldeGlobal: el.soldfacbl,
          representant: el.rep,
        })),
      };
    case REMPLIR_DATA_TABLE:
      return {
        ...state,
        etat: state.etat,
        dataTable:
          state.etat === "client"
            ? state.clients
            : state.etat === "article"
            ? state.articles
            : state.fournisseurs,
      };
    default:
      return state;
  }
};
