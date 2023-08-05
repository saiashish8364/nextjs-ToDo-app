import { useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { todoActions } from "@/Components/Store/TodoSlice";
function Home() {
  const task = useRef();
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.taskData.pending);

  function taskSubmitHandler(e) {
    e.preventDefault();
    dispatch(todoActions.addTodo(String(task.current.value)));
    task.current.value = "";
  }
  function markAsReadHandler(e) {
    const markedTodo = todo.filter(
      (item) => String(item.id) === String(e.target.id)
    );
    dispatch(todoActions.markAsReadTodo(markedTodo));
  }
  function deleteHandler(e) {
    const newTodos = todo.filter(
      (item) => String(item.id) !== String(e.target.id)
    );
    dispatch(todoActions.deleteTodo(newTodos));
  }
  return (
    <>
      <div
        style={{
          width: "50%",
          marginLeft: "25%",
          marginBottom: "2%",
        }}
      >
        <header
          style={{
            fontSize: "1.65rem",
          }}
        >
          Task's
        </header>
        <ul
          style={{
            listStyle: "none",
            marginTop: "2%",
            marginLeft: "35px",
          }}
        >
          {todo.map((task) => (
            <li
              key={task.id}
              style={{
                marginTop: "3%",
                fontSize: "1.25rem",
              }}
            >
              {task.todo}
              <button
                id={task.id}
                style={{
                  marginLeft: "35%",
                  height: "30px",
                  width: "100px",
                }}
                onClick={markAsReadHandler}
              >
                Mark as Read
              </button>
              <button
                id={task.id}
                style={{
                  marginLeft: "10px",
                  height: "30px",
                  width: "70px",
                }}
                onClick={deleteHandler}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div
        style={{
          marginLeft: "25%",
          marginTop: "2%",
        }}
      >
        <form onSubmit={taskSubmitHandler}>
          <input
            style={{
              width: "350px",
              height: "70px",
            }}
            ref={task}
          />
          <button
            style={{
              marginLeft: "15px",
              width: "100px",
              height: "35px",
            }}
            type="submit"
          >
            Add Task
          </button>
        </form>
      </div>
    </>
  );
}
export default Home;
