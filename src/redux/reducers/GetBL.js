const initialState = {
  bls: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "BL_SELECT":
      return {
        ...state,
        bls: action.payload,
      };
    default:
      return state;
  }
}
