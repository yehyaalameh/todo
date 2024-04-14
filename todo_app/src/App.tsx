import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "../src/components/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCheck } from "@fortawesome/free-solid-svg-icons";

const List: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/resource/todo_1");
      setTodos(response.data.data.map((todo: any) => todo.title));
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodoHandler = async (enteredText: string) => {
    try {
      const response = await axios.post("/api/resource/todo_1", {
        title: enteredText,
      });
      setTodos((prevTodos) => [...prevTodos, response.data.data.title]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteHandler = async (todoToDelete: string) => {
    try {
      await axios.delete(`/api/resource/todo_1/${todoToDelete}`);
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo !== todoToDelete)
      );
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

 const completeHandler = async (todoToComplete: string) => {
   try {
     // Get the todo item ID based on its title (you might need to adjust this logic based on your actual data structure)
     const todoItem = todos.find((todo) => todo === todoToComplete);
     if (!todoItem) {
       console.error("Todo item not found.");
       return;
     }

     // Send a PUT request to update the status to "Completed"
     await axios.put(`/api/resource/todo_1/${todoItem.id}`, {
       status: "Completed",
     });

     // Update the state to remove the completed todo
     setTodos((prevTodos) =>
       prevTodos.filter((todo) => todo !== todoToComplete)
     );
     setCompleted((prevCompleted) => [...prevCompleted, todoToComplete]);
   } catch (error) {
     console.error("Error completing todo:", error);
   }
 };
  return (
    <div className="App justify-center flex-auto bg-slate-900 rounded-xl py-9 text-white">
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
  );
};

export default List;
