import { FormEvent, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
type Todo = {
  id: string;
  todoText: string;
};
const App = () => {
  const [todoText, setTodoText] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  useEffect(() => {
    const data = localStorage.getItem("todoL");
    if (data) {
      const d: Todo[] = JSON.parse(data);
      setTodoList(d);
    }
  }, []);
  const onAddingTodo = (e: FormEvent): void => {
    e.preventDefault();
    const item = {
      id: uuid(),
      todoText: todoText,
    };
    setTodoList((prevState: Todo[]) => [...prevState, item]);
    setTodoText("");
    localStorage.setItem("todoL", JSON.stringify([...todoList, item]));
  };
  const onDeletingTodo = (id: string): void => {
    const filtered = todoList.filter((each) => each.id !== id);
    setTodoList(filtered);
    localStorage.setItem("todoL", JSON.stringify(filtered));
  };
  return (
    <form onSubmit={onAddingTodo}>
      <h1>Create TODO</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <input
          type="text"
          placeholder="Add Todo"
          onChange={(e) => setTodoText(e.target.value)}
          required
          value={todoText}
        />
        <button type="submit" className="add-btn">
          Add
        </button>
      </div>
      <ul style={{ marginTop: "80px" }}>
        {todoList.map((each: Todo) => (
          <li
            key={each.id}
            style={{
              display: "flex",
              listStyleType: "none",
              alignItems: "center",
              justifyContent: "space-between",
              width: "400px",
            }}
          >
            <p>{each.todoText}</p>
            <button
              className="delete"
              type="button"
              onClick={() => onDeletingTodo(each.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default App;
