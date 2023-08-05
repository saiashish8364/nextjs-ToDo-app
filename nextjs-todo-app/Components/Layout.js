import Link from "next/link";
function Layout(props) {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "3%",
        }}
      >
        <p
          style={{
            marginRight: "50px",
            fontSize: "1.75rem",
          }}
        >
          <Link href="/">ToDo Tasks</Link>
        </p>
        <p
          style={{
            marginLeft: "50px",
            fontSize: "1.75rem",
          }}
        >
          <Link href="/CompletedTasks">Completed Tasks</Link>
        </p>
      </div>

      <div
        style={{
          marginTop: "5%",
        }}
      >
        {props.children}
      </div>
    </>
  );
}
export default Layout;
