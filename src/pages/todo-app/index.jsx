import { useTodoStore } from "./store/useTodoStore"

const TodoAppContgainer = () => {

    const {todos,filter,setFilter,addTodo,deleteTodo,editTodo,toggleTodo } = useTodoStore();

    


  return (
    <div>TodoAppContgainer</div>
  )
}

export default TodoAppContgainer