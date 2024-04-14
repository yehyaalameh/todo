import React from "react";

interface FormProps {
  onAdd: (text: string) => void;
}

const Form: React.FC<FormProps> = (props) => {
  const [input, setInput] = React.useState("");

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInput(event.currentTarget[0].value.trim());
    console.log(input);
    if (input.length > 0) {
      props.onAdd(input);
    }
  };


  return (
    <div className="text-center">
      <form onSubmit={submitHandler}>
        <input
          className="bg-slate-900 text-white placeholder-gray-300 mx-3 py-1 px-4 rounded-lg border border-purple-500 focus:outline-none focus:shadow-outline w-96"
          type="text"
          placeholder="Add a new task"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          required
        />
        <button
          className="bg-purple-400 hover:bg-purple-500 text-white py-1 px-3 rounded-lg focus:outline-none focus:shadow-outline"
          type="submit"
        >
          +
        </button>
      </form>
    </div>
  );
};

export default Form;
