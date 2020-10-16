const initialState = {
  blbrs: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "BLBR_SELECT":
      return {
        ...state,
        blbrs: action.payload,
      };
    default:
      return state;
  }
}
