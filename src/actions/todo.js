export const addTodo = (todo) => {
  return {
    type: "ADD_TODO",
    payload: todo,
  };
};
export const delTodo = (id) => {
  return {
    type: "DEL_TODO",
    payload: id,
  };
};
export const editTodo = (id, title) => {
  return {
    type: "EDIT_TODO",
    payload: {
      editId: id,
      editTitle: title,
    },
  };
};
