export const getDataUsers = (users) => {
  return {
    type: "GET_USERS",
    payload: users,
  };
};
export const getDataRooms = (rooms) => {
  return {
    type: "GET_ROOMS",
    payload: rooms,
  };
};
export const getDataMessages = (messages) => {
  return {
    type: "GET_MESSAGES",
    payload: messages,
  };
};
