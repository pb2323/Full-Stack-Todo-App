import { LOGIN_USER } from "../actionTypes";

let state = {
  user: {},
};
const reducer = (a, action, initialState = state) => {
  let { payload, type } = action;
  switch (type) {
    case LOGIN_USER:
      console.log(payload);
      return { ...initialState, user: payload };
    case "AB":
      return initialState;
    default:
      return initialState;
  }
};

export default reducer;
