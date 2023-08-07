import { createSlice } from "@reduxjs/toolkit";

const todoDatabase = {
  pending: [],
  completed: [],
};

const todoSlice = createSlice({
  name: "todoData",
  initialState: todoDatabase,
  reducers: {
    addTodo(state, action) {
      const incomingData = action.payload;
      state.pending = [
        ...state.pending,
        {
          id: String(incomingData.id),
          todo: String(incomingData.todo),
        },
      ];
    },
    markAsReadTodo(state, action) {
      const data = action.payload;
      state.completed = [
        ...state.completed,
        {
          id: data[0].id,
          todo: data[0].todo,
        },
      ];
      const newTodos = state.pending.filter(
        (item) => String(item.id) !== String(data[0].id)
      );
      state.pending = newTodos;
    },
    deleteTodo(state, action) {
      state.pending = action.payload;
    },
  },
});

export const todoActions = todoSlice.actions;
export default todoSlice.reducer;
