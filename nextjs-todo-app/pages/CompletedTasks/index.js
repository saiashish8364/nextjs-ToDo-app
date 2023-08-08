import { useEffect } from "react";
import { useSelector } from "react-redux";
import { todoActions } from "@/Components/Store/TodoSlice";
import { useDispatch } from "react-redux";
let count = 0;
function CompletedTasks() {
  const dispatch = useDispatch();
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
            if (data.todoStatus === "complete") {
              dispatch(todoActions.addCompletedTodo(data));
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
      // if (count === 0) {
      //   count = count + 1;
      // }
    },
    //this is a comment
    []
  );
  const todoCompleted = useSelector((state) => state.taskData.completed);
  return (
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
        Completed Task's
      </header>
      <ul
        style={{
          listStyle: "none",
          marginTop: "2%",
          marginLeft: "35px",
        }}
      >
        {todoCompleted.map((task) => (
          <li
            key={task.id}
            style={{
              marginTop: "3%",
              fontSize: "1.25rem",
            }}
          >
            {task.todo}
          </li>
        ))}
      </ul>
    </div>
    // <table>
    //     <tbody>
    //         <tr>
    //             <td>

    //             </td>
    //         </tr>
    //     </tbody>
    // </table>
  );
}
export default CompletedTasks;
