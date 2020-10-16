const initialState = {
  rfligs: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "Reglement_Fournisseur_LIG_SELECT":
      return {
        ...state,
        rfligs: action.payload,
      };
    default:
      return state;
  }
}
