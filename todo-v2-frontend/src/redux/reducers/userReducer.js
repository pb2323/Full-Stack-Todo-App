import { LOGIN_USER, REGISTER_USER } from "../actionTypes";

let initialState = {
  user: [],
};
const reducer = (state = initialState, action) => {
  let { payload, type } = action;
  switch (type) {
    case LOGIN_USER:
      return { ...state, user: payload };
    case REGISTER_USER:
      return { ...state, user: payload };
    default:
      console.log("Default user");
      return state;
  }
};

export default reducer;
