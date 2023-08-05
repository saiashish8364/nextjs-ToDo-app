import { createSlice } from "@reduxjs/toolkit";

const todoDatabase = {
  pending: [
    { id: "1", todo: "test1" },
    { id: "2", todo: "test2" },
  ],
  completed: [],
};

const todoSlice = createSlice({
  name: "todoData",
  initialState: todoDatabase,
  reducers: {
    addTodo(state, action) {
      state.pending = [
        ...state.pending,
        {
          id: String(Math.random()),
          todo: String(action.payload),
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
