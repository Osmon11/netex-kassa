import { AppAxios } from "axios/axios";

const GET_MERCHANTS = "GET_MERCHANTS";
const GET_MERCHANTS_SUCCESS = "GET_MERCHANTS_SUCCESS";
const GET_MERCHANTS_LOADING = "GET_MERCHANTS_LOADING";
const GET_MERCHANTS_FAILED = "GET_MERCHANTS_FAILED";
const ADD_MERCHANTS_SUCCESS = "ADD_MERCHANTS_SUCCESS";
const ADD_MERCHANTS_LOADING = "ADD_MERCHANTS_LOADING";
const ADD_MERCHANTS_FAILED = "ADD_MERCHANTS_FAILED";

export const handleGetMerchantsAction = () => (dispatch) => {
  dispatch({ type: GET_MERCHANTS_LOADING });
  AppAxios.get("/account/list")
    .then((res) => {
      dispatch(getMerchants(res.data.list));
      dispatch(dispatch({ type: GET_MERCHANTS_SUCCESS }));
    })
    .catch(() => {
      dispatch(dispatch({ type: GET_MERCHANTS_FAILED }));
    });
};

export const handleAddMerchantsAction = (data, callback) => (dispatch) => {
  dispatch({ type: ADD_MERCHANTS_LOADING });
  AppAxios.post("/account/add", data)
    .then((res) => {
      console.log(res);
      callback();
      dispatch(dispatch({ type: ADD_MERCHANTS_SUCCESS }));
    })
    .catch(() => {
      dispatch(dispatch({ type: ADD_MERCHANTS_FAILED }));
    });
};

export const getMerchants = (merchants) => ({
  type: GET_MERCHANTS,
  merchants,
});
