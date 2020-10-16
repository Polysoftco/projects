import Axios from "axios";

export const SelectBLBRCod = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/bCDVCLIs?typpe=BR").then(
      (response) => {
        return dispatch({ type: "BLBR_COD", payload: response.data });
      }
    );
  };
};
