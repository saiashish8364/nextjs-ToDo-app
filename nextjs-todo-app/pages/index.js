import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { todoActions } from "@/Components/Store/TodoSlice";
import { MongoClient } from "mongodb";
let count = 0;
function Home(props) {
  const [refresh, setRefresh] = useState(false);
  const task = useRef();
  const editTask = useRef();
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.taskData.pending);
  let itemToEdit;
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
          dispatch(todoActions.removeStoreData());
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
            if (data.todoStatus === "incomplete") {
              dispatch(todoActions.addTodo(data));
            } else {
              dispatch(todoActions.markAsReadTodo(data));
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
      if (count === 0) {
        count = count + 1;
      }
    },
    //this is a comment
    [refresh]
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
  async function markAsReadHandler(e) {
    const markedTodo = todo.filter(
      (item) => String(item.id) === String(e.target.id)
    );
    console.log(markedTodo);
    const response = await fetch("/api/todos-update", {
      method: "PUT",
      body: JSON.stringify({
        id: markedTodo[0].id,
        todo: markedTodo[0].todo,
        todoStatus: "complete",
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    count = 0;

    dispatch(todoActions.markAsReadTodo(markedTodo));
    setRefresh((prev) => !prev);
  }
  async function deleteHandler(e) {
    const deleteId = e.target.id;
    const response = await fetch(`/api/todos-delete`, {
      method: "DELETE",
      body: JSON.stringify({ id: deleteId }),
    });
    const data = await response.json();
    console.log(data);
    const newTodos = todo.filter(
      (item) => String(item.id) !== String(e.target.id)
    );
    dispatch(todoActions.deleteTodo(newTodos));
    count = 0;
    setRefresh((prev) => !prev);
  }
  function editHandler(e) {
    const editItem = todo.filter(
      (item) => String(item.id) === String(e.target.id)
    );

    itemToEdit = editItem;
    console.log(itemToEdit);
    editTask.current.value = String(editItem[0].todo);
  }
  async function editSubmitHandler(e) {
    e.preventDefault();
    const response = await fetch("/api/todos-update", {
      method: "PUT",
      body: JSON.stringify({
        id: itemToEdit[0].id,
        todo: editTask.current.value,
        todoStatus: "incomplete",
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    editTask.current.value = "";
    count = 0;
    setRefresh((prev) => !prev);
  }
  return (
    <>
      <div
        style={{
          marginLeft: "35%",
          marginTop: "2%",
          marginBottom: "3%",
        }}
      >
        <form onSubmit={editSubmitHandler}>
          <input
            style={{
              width: "200px",
              height: "40px",
            }}
            ref={editTask}
          />
          <button
            style={{
              marginLeft: "15px",
              width: "100px",
              height: "35px",
            }}
            type="submit"
          >
            Update Task
          </button>
        </form>
      </div>

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
          {todo.map((task) => {
            if (task.todoStatus === "incomplete") {
              return (
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
                      marginLeft: "100px",
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
                    onClick={editHandler}
                  >
                    Edit
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
              );
            }
          })}
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
