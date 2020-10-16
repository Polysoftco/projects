const initialState = {
  codblbr: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "Reglement_Fournisseur_COD":
      return {
        ...state,
        codblbr: action.payload,
      };
    default:
      return state;
  }
}
