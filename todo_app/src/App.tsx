import React from "react";
import Form from "./components/Form";
import { FrappeProvider } from "frappe-react-sdk";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Routes from "./components/Routes";

const App: React.FC = () => {
  const [todos, setTodos] = React.useState<string[]>([]);
  const [completed, setCompleted] = React.useState<string[]>([]);

  const addTodoHandler = (enteredText: string) => {
    setTodos((prevTodos) => [enteredText, ...prevTodos]);
  };
 const deleteHandler = (todoToDelete: string) => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo !== todoToDelete)
    )};
  const completeHandler = (todoToComplete: string) => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo !== todoToComplete)
    );
    setCompleted((prevCompleted) => [todoToComplete, ...prevCompleted]);
  };

  return (
    <FrappeProvider>
      <Routes/>
      <div className=" App justify-center flex-auto bg-slate-900 rounded-xl py-9 text-white">
        <Form onAdd={addTodoHandler} />
        <div className="mt-8 ml-6 justify-start font-bold text-purple-400">
          Tasks to do - {todos.length}
          <ul>
            {todos.map((todo, index) => (
              <li
                className="text-white font-normal bg-slate-950 mt-2 py-3 mr-8 pr-2 pl-4 rounded-lg pb-5 justify-center mb-3"
                key={index}
              >
                {todo}
                <button
                  className="float-end mx-3 text-red-500 px-2 rounded-lg py-1 bg-slate-800"
                  onClick={() => deleteHandler(todo)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <button
                  className="float-end text-green-500 px-2 rounded-lg py-1 bg-slate-800"
                  onClick={() => completeHandler(todo)}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 ml-6 justify-start font-bold text-purple-400">
          Done - {completed.length}
          <ul>
            {completed.map((done, index) => (
              <li
                className="bg-slate-950 mt-2 py-3 mr-8 pr-2 pl-4 rounded-lg pb-5 justify-center font-normal line-through text-green-500 mb-3"
                key={index}
              >
                {done}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FrappeProvider>
  );
};

export default App;
