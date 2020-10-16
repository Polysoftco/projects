import Axios from "axios";

export const SelectBLBRCod = () => {
  return (dispatch) => {
    Axios.get(
      `http://192.168.1.100:81/Api//LigFACCLIs?type=AT&numfac=${num}`
    ).then((response) => {
      return dispatch({ type: "AVOIR_COD", payload: response.data });
    });
  };
};
