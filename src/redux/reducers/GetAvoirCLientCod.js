const initialState = {
  codavoirs: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "AVOIRS_COD":
      return {
        ...state,
        codavoirs: action.payload,
      };
    default:
      return state;
  }
}
