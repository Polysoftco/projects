const initialState = {
  rf: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "Reglement_Fournisseur_SELECT":
      return {
        ...state,
        rf: action.payload,
      };
    default:
      return state;
  }
}
