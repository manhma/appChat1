const initialState = {
  users: [],
  rooms: [],
  messages: [],
};
const chatDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS": {
      const newUsers = action.payload;
      return {
        ...state,
        users: newUsers,
      };
    }
    case "GET_ROOMS": {
      const newRooms = action.payload;
      return {
        ...state,
        rooms: newRooms,
      };
    }
    case "GET_MESSAGES": {
      const newMessages = action.payload;
      return {
        ...state,
        messages: newMessages,
      };
    }

    default:
      return state;
  }
};
export default chatDataReducer;
