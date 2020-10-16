import Axios from "axios";

export const SelectAvoir = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/FACCLIs?type=AT").then(
      (response) => {
        console.log("response", response.data);
        return dispatch({ type: "AVOIR_COD", payload: response.data });
      }
    );
  };
};
