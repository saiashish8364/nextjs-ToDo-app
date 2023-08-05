import { useSelector } from "react-redux";
function CompletedTasks() {
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
        Task's
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
