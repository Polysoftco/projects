const initialState = {
  codrf: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "Reglement_Fournisseur_COD":
      return {
        ...state,
        codrf: action.payload,
      };
    default:
      return state;
  }
}
