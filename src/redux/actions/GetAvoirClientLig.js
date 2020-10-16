import Axios from "axios";

export const SelectAvoirClientLig = () => {
  return (dispatch) => {
    Axios.get("https://jsonplaceholder.typicode.com/todos").then((response) => {
      return dispatch({ type: "F_LIG_SELECT", payload: response.data });
    });
  };
};
