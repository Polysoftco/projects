import Axios from "axios";

export const GetCodart = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/aRTICLEs?k=1").then((response) => {
      return dispatch({ type: "GET_CODART", payload: response.data });
    });
  };
};
