export const selectedRoom = (id, displayUser) => {
  return {
    type: "SELECT_ROOM",
    payload: id,
    payload2: displayUser,
  };
};
