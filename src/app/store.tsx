import * as mobx from "mobx";
import { syncedStore, getYjsDoc } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";
import { nanoid } from "nanoid";
import { enableMobxBindings } from "@syncedstore/core";

// enable mobx bindings
enableMobxBindings(mobx);

type Todo = { id: string; completed: boolean; title: string };

const store = syncedStore({
  todos: [] as Todo[],
  addTodoForm: {} as { text?: string },
});

// Create a document that syncs automatically using Y-WebRTC
const doc = getYjsDoc(store);

export const webrtcProvider = new WebrtcProvider("my-sync-todos", doc, {
  signaling: ["ws://localhost:4444"],
});

export const disconnect = () => webrtcProvider.disconnect();
export const connect = () => webrtcProvider.connect();

class TodosStore {
  constructor() {
    mobx.makeAutoObservable(this);
  }

  get text() {
    return store.addTodoForm.text ?? "";
  }

  set text(text: string) {
    store.addTodoForm.text = text;
  }

  get list() {
    return store.todos;
  }

  addTodo(title: string) {
    store.todos.push({
      id: nanoid(),
      title,
      completed: false,
    });
  }

  removeTodo(id: string) {
    const index = store.todos.findIndex((todo) => todo.id === id);
    store.todos.splice(index, 1);
  }

  toggleItem(id: string) {
    const index = store.todos.findIndex((todo) => todo.id === id);
    store.todos[index].completed = !store.todos[index].completed;
  }
}

export const todosStore = new TodosStore();
