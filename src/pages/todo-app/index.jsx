import { useState } from "react";
import { useTodoStore } from "./store/useTodoStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const TodoAppContgainer = () => {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    filter,
    setFilter,
  } = useTodoStore();

  const [todoText, setTodoText] = useState("");
  const [editedId, setEditedId] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const filterTodo = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;

    return true;
  });

  const handleAddTodo = () => {
    if (!todoText.trim()) {
      toast.error("Enter Todo Title!");
      return;
    }
    if (editedId) {
      editTodo(editedId, todoText);
      setEditedId(null);
      toast.success("Todo Updated Successfully");
      setTodoText("");
    } else {
      addTodo(todoText.trim());
      console.log(todos);

      toast.success("Todo Added Successfully");
      setTodoText("");
    }
  };

  const handleDeleteTodo = (id) => {
    setDeletePopup(true);
    setSelectedTodo(id);
  };

  const handleConfiormDeleteTodo = () => {
    if (selectedTodo) {
      deleteTodo(selectedTodo);
    }
    toast.success(`Id '${selectedTodo}' successfully deleted ! `);
    setDeletePopup(false);
    setSelectedTodo(null);
  };

  const handleCancelDeleteTodo = () => {
    setDeletePopup(false);
    setSelectedTodo(null);
  };

  const handleEditTodo = (id, text) => {
    setTodoText(text);
    setEditedId(id);
  };

  console.log(filter);

  return (
    <div className="h-screen bg-slate-950 pt-3  overflow-y-hidden">
      <div className="max-w-3xl mx-auto h-[98vh] ">
        {/* Form */}
        <div className="todo-form border border-slate-600 bg-linear-to-tr from-slate-700 via-slate-900 to-slate-950 p-5 flex gap-3">
          <div className="input-field flex-1">
            <Label htmlFor="title" className="mb-3 text-xl block text-white">
              Enter Todo Text
            </Label>
              <Input
                id="title"
                type="text"
                className="rounded-none h-12 w-full outline-0 border-none text-lg placeholder:text-lg bg-white px-4"
                value={todoText}
                placeholder="ex. Buy Milk"
                onChange={(e) => setTodoText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddTodo();
                  }
                }}
              />
          </div>

          <Button
          variant={`${editedId ? "outline":"secondary"}`}
            onClick={handleAddTodo}
            className={`${editedId ? "bg-green-600 hover:bg-green-900 " : ""} mt-9 cursor-pointer px-6 py-6`}
          >
            {editedId ? "Update Todo" : "Add Todo"}
          </Button>
        </div>

        {/* filter */}
        <div className="filter mt-3  flex items-center gap-6">
          <div
            title={"Select All"}
            className="all border px-3 bg-white py-2 flex items-center gap-3 cursor-pointer "
            onClick={() => setFilter("all")}
          >
            <Label htmlFor="all" className="cursor-pointer">
              All
            </Label>
            <input
              type="radio"
              name="filter"
              id="all"
              className="cursor-pointer"
              checked={filter === "all"}
              onChange={() => setFilter("all")}
            />
          </div>
          <div
            title={"Select Completed"}
            className="completed border px-3 bg-white py-2 flex items-center gap-3 cursor-pointer "
            onClick={() => setFilter("completed")}
          >
            <Label htmlFor="completed" className="cursor-pointer">
              Completed
            </Label>
            <input
              type="radio"
              name="filter"
              id="completed"
              className="cursor-pointer"
              checked={filter === "completed"}
              onChange={() => setFilter("completed")}
            />
          </div>
          <div
            title={"Select Pending"}
            className="pending border px-3 bg-white py-2 flex items-center gap-3 cursor-pointer"
            onClick={() => setFilter("pending")}
          >
            <Label htmlFor="pending" className="cursor-pointer">
              Pending
            </Label>
            <input
              type="radio"
              name="filter"
              id="pending"
              className="cursor-pointer"
              checked={filter === "pending"}
              onChange={() => setFilter("pending")}
            />
          </div>
        </div>

        {/* Todo List */}
        <div className="mt-3">
          {filterTodo.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No Todo List Found
            </div>
          ) : (
            <div className="space-y-3  h-[75vh] pb-10 overflow-y-auto">
              {filterTodo.map((todo, idx) => (
                <div
                  key={idx}
                  className="border group bg-white relative p-2 flex items-center justify-between"
                >
                  <p
                    className={` w-full text-xl ${
                      todo.completed ? "line-through text-gray-500" : ""
                    }
            `}
                  >
                    {todo.text}
                  </p>
                  <div className="actions absolute bg-slate-950/90 rounded-md text-white scale-0 group-hover:scale-100 transition-all right-2 flex gap-3 items-center px-6 py-1 ">
                    <Input
                      type={"checkbox"}
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className={"text-2xl text-black cursor-pointer"}
                    />
                    <button
                      className="cursor-pointer hover:text-yellow-400"
                      onClick={() => handleEditTodo(todo.id, todo.text)}
                    >
                      Edit
                    </button>
                    <button
                      className="cursor-pointer hover:text-blue-400"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div
        className={`fixed  inset-0 flex items-center justify-center bg-black/20 transition-all delay-100 backdrop-blur-sm ${deletePopup === true ? "scale-100 " : "scale-0"} `}
      >
        <div className="bg-white  p-8 rounded">
          <h2 className="text-2xl">
            Are you sure you want to delete this todo?
          </h2>

          <div className="flex gap-2 mt-10">
            <button
              className="cursor-pointer px-3 border py-2 hover:bg-red-600 hover:text-white"
              onClick={handleConfiormDeleteTodo}
            >
              Confirm
            </button>

            <button
              className="cursor-pointer px-3 border py-2 hover:bg-green-900 hover:text-white"
              onClick={handleCancelDeleteTodo}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoAppContgainer;
