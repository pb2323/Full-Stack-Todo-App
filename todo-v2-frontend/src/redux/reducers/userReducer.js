import { LOGIN_USER,REGISTER_USER } from "../actionTypes";

let state = {
  user: {},
};
const reducer = (a, action, initialState = state) => {
  let { payload, type } = action;
  switch (type) {
    case LOGIN_USER:
      console.log(payload,"payload");
      return { ...initialState, user: payload };
    case REGISTER_USER:
      console.log(payload,"");
      return {...initialState,user:payload};
    default:
      return initialState;
  }
};

export default reducer;
