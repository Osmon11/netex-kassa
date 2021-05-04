import { setData } from "../actionCreators";
import { AppAxios } from "../../axios/axios";

export const getProfile = () => (dispatch) => {
  AppAxios.get("/profile/personal")
    .then((res) => {
      dispatch(setData({ profileInfo: res.data.profile }));
    })
    .catch((e) => console.log(e));
};
