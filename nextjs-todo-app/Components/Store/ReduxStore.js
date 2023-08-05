import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./TodoSlice";

const store = configureStore({
  reducer: {
    taskData: todoReducer,
  },
});

export default store;
