// reducers/hobby.js
const initialState = {
  list: [
    {
      userId: 1,
      id: 1,
      title: "viec1",
      completed: false,
    },
    {
      userId: 1,
      id: 2,
      title: "viec2",
      completed: false,
    },
  ],
};
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO": {
      const newList = [...state.list];
      newList.push({
        userId: Math.floor(Math.random() * 10) + 1,
        id: new Date().getTime(),
        title: action.payload,
        body: "manhmanh",
      });
      return {
        ...state,
        list: newList,
      };
    }
    case "DEL_TODO": {
      const newList = [...state.list].filter((todo) => {
        return todo.id !== action.payload;
      });
      console.log(newList);
      return {
        ...state,
        list: newList,
      };
    }
    case "EDIT_TODO": {
      const newList = [...state.list].map((todo) => {
        if (todo.id === action.payload.editId) {
          return {
            userId: todo.userId,
            id: todo.id,
            title: action.payload.editTitle,
            completed: todo.completed,
          };
        } else return todo;
      });
      return {
        ...state,
        list: newList,
      };
    }
    default:
      return state;
  }
};
export default todoReducer;
