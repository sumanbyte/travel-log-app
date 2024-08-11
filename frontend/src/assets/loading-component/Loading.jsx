import useMode from "../../hooks/useMode"

const Loading = () => {
  const {darkMode} = useMode();
  return (
    <div className={`text-center`}>
      <div className={`spinner-border ${darkMode ? "text-light": "text-dark"}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default Loading