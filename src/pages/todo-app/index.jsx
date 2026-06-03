import { useState } from "react";
import { useTodoStore } from "./store/useTodoStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const TodoAppContgainer = () => {
  const { todos, addTodo,toggleTodo } = useTodoStore();

  const [todoText, setTodoText] = useState("");

  const handleAddTodo = () => {
    if (!todoText.trim()) {
      toast.error("Enter Todo Title!");
      return;
    }

    addTodo(todoText.trim());
    console.log(todos);
    

    toast.success("Todo Added Successfully");
    setTodoText("");
  };

  return (
    <div className="h-screen bg-cyan-50">
      <div className="max-w-3xl mx-auto border">
        {/* Form */}
        <div className="todo-form bg-amber-50 p-5 flex gap-3 border">
          <div className="input-field flex-1">
            <Label htmlFor="title" className="mb-3 text-xl block">
              Enter Todo Text
            </Label>

            <Input
              id="title"
              type="text"
              className="rounded-none h-12 text-5xl placeholder:text-lg bg-white px-4"
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

          <Button onClick={handleAddTodo} className="mt-9 cursor-pointer px-6 py-6">
            Add Task
          </Button>
        </div>

        {/* Todo List */}
        <div className="p-5">
          {todos.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No Todo List Found
            </div>
          ) : (
            <div className="space-y-3 h-[84vh] pb-10 overflow-y-auto">
              {todos.map((todo,idx) => (
                <div
                  key={idx}
                  className="border p-3 flex items-center justify-between"
                >
                  <p className={` text-xl ${todo.completed
                ? "line-through text-gray-500"
                : ""}
            `} >{todo.text}</p>
                 <Input type={"checkbox"} checked={todo.completed}
            onChange={() => toggleTodo(todo.id)} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoAppContgainer;