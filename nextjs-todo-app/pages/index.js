import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { todoActions } from "@/Components/Store/TodoSlice";
import { MongoClient } from "mongodb";
let count = 0;
function Home(props) {
  const task = useRef();
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.taskData.pending);
  useEffect(
    () => {
      async function fetchData() {
        async function loadData() {
          const response = await fetch("/api/todos-get", {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          });
          const data = await response.json();
          return data;
        }

        try {
          const inData = await loadData();
          for (let i = 0; i < inData.length; i++) {
            let data = {
              id: inData[i]._id,
              todo: inData[i].todo,
              todoStatus: inData[i].todoStatus,
            };
            dispatch(todoActions.addTodo(data));
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (count === 0) {
        count = count + 1;
        fetchData();
      }
    },
    //this is a comment
    []
  );
  async function taskSubmitHandler(e) {
    e.preventDefault();
    const response = await fetch("/api/todos-post", {
      method: "POST",
      body: JSON.stringify({
        todo: task.current.value,
        todoStatus: "incomplete",
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    const storeData = {
      id: data.insertedId,
      todo: String(task.current.value),
      todoStatus: "incomplete",
    };
    dispatch(todoActions.addTodo(storeData));
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

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://ashish8364:Ashish143@cluster0.oovrhrs.mongodb.net/pendingTodo?retryWrites=true&w=majority"
  );
  const db = client.db();
  const todoCollections = db.collection("pendingTodo");
  const todos = await todoCollections.find().toArray();
  client.close();
  return {
    props: {
      todos: todos.map((todo) => ({
        id: todo._id.toString(),
        todo: todo.todo,
        todoStatus: todo.todoStatus,
      })),
    },
  };
}

export default Home;
