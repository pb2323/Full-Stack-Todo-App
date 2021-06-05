import { SET_LOAD } from "../actionTypes";

let initialState = {
  load: false,
};
const reducer = (state = initialState, action) => {
  let { payload, type } = action;
  if (type === SET_LOAD) {
    return { ...state, load: payload };
  } else return state;
};

export default reducer;
