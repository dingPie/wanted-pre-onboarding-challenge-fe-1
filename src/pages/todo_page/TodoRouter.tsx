import React, { useState } from "react";
import { ITodo } from "../../utils/types/dataType";
import TodoService from "../../utils/service/todoService";
import EditContainer from "./todo_edit/EditContainer";
import InputContainer from "./todo_input/InputContainer";
import ListsContainer from "./todo_list/ListsContainer";

interface ITodoRouter{
  todoService: TodoService
}


const TodoRouter = ( {
  todoService,
}: ITodoRouter ) => {

  const [todos, setTodos] = useState<ITodo[]>([]);
  const [editTodo, setEditTodo] = useState<ITodo | null>(null);



  return(
  <>
    <InputContainer 
      // idToken={idToken as string}
      todoService={todoService}
      todos={todos}
      setTodos={setTodos}
    />
    <ListsContainer
      // idToken={idToken as string}
      todoService={todoService}
      todos={todos}
      setTodos={setTodos}
      setEditTodo={setEditTodo}
    />
    {editTodo &&
      <EditContainer
        // idToken={idToken as string}
        todoService={todoService}
        todos={todos}
        setTodos={setTodos}
        editTodo={editTodo}
        setEditTodo={setEditTodo}
      />
    }
  </>)
}

export default TodoRouter;