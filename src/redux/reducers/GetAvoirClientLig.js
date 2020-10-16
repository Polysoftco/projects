const initialState = {
  avoirsligs: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "AVOIR_LIG_SELECT":
      return {
        ...state,
        avoirsligs: action.payload,
      };
    default:
      return state;
  }
}
