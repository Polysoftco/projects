const initialState = {
  factures: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "FACTURE_SELECT":
      return {
        ...state,
        factures: action.payload,
      };
    default:
      return state;
  }
}
