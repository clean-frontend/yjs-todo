import { todosStore } from "./store";
import { observer } from "mobx-react-lite";

// use the observer pattern from mobx-react-lite.
export const App = observer(() => {
  return (
    <main className="flex flex-col items-center p-10">
      <div className="w-full max-w-[300px]">
        <p className="text-2xl">Todo items:</p>
        <form
          className="mb-4"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as { text?: HTMLInputElement };
            todosStore.addTodo(form.text?.value ?? "");
          }}
        >
          <input
            placeholder="Enter a todo item and hit enter"
            name="text"
            type="text"
            className="w-full rounded border border-teal-600 text-lg p-2 mt-2"
            value={todosStore.text}
            onChange={(e) => {
              todosStore.text = e.target.value;
            }}
          />
        </form>
        <ul className="">
          {todosStore.list.map((todo, i) => {
            return (
              <li
                key={i}
                className="flex items-center border-b border-slate-300 py-2"
                style={{ textDecoration: todo.completed ? "line-through" : "" }}
              >
                <label className="flex gap-2 text-lg items-center">
                  <input
                    className="w-6 h-6"
                    type="checkbox"
                    checked={todo.completed ?? false}
                    onChange={() => todosStore.toggleItem(todo.id)}
                  />
                  {todo.title}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
});
