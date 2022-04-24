const initialState = {
  user: {},
};
const checkAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER": {
      const newUser = action.payload;
      return {
        ...state,
        user: newUser,
      };
    }
    case "LOGOUT_USER": {
      return {
        user: {},
      };
    }
    default:
      return state;
  }
};
export default checkAuthReducer;
