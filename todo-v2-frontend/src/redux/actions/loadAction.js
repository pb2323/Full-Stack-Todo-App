import { SET_LOAD } from "../actionTypes";
export const setLoad = (load) => async (dispatch) => {
  dispatch({ type: SET_LOAD, payload: load });
};
