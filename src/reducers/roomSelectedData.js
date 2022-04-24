const initialState = {};
const roomDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_ROOM": {
      const roomid = action.payload;
      const displayUser = action.payload2;
      return {
        roomid,
        displayUser,
      };
    }

    default:
      return state;
  }
};
export default roomDataReducer;
