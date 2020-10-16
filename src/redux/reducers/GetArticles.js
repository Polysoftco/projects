const initialState = {
  articles: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "ARTICLE_SELECT":
      return {
        ...state,
        articles: action.payload,
      };
    default:
      return state;
  }
}
