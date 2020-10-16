import Axios from "axios";

export const SelectBLBR = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/BLBRs?type=br").then((response) => {
      return dispatch({ type: "BLBR_SELECT", payload: response.data });
    });
  };
};
