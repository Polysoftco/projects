import Axios from "axios";

export const SelectBLBRLig = (num) => {
  return (dispatch) => {
    Axios.get(
      `http://192.168.1.100:81/Api/LigBLBRs?type=BR&numfac=${num}`
    ).then((response) => {
      return dispatch({ type: "BLBR_LIG_SELECT", payload: response.data });
    });
  };
};
