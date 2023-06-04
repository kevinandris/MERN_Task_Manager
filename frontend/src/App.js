import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskList from "./components/TaskList";

// set proxy URL using .env file and add a proxy in package.json file
export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
  return (
    <>
      <div className="app">
        <div className="task-container">
          <TaskList/>
        </div>
        <ToastContainer />
      </div>
    </>
  );
} 

export default App;
