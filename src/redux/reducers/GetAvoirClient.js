const initialState = {
  avoirs: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "AVOIR_SELECT":
      return {
        ...state,
        avoirs: action.payload,
      };
    case "AVOIR_COD":
      console.log("reducer", action.payload);
      return {
        ...state,
        avoirs: action.payload,
      };
    default:
      return state;
  }
}
