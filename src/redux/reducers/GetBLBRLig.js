const initialState = {
  blbrligs: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "Reglement_Fournisseur_LIG_SELECT":
      return {
        ...state,
        blbrligs: action.payload,
      };
    default:
      return state;
  }
}
