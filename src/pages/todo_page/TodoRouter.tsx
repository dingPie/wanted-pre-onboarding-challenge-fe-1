import React, { useState } from "react";
import { ITodo } from "../../utils/types/dataType";
import EditContainer from "./todo_edit/EditContainer";
import InputContainer from "./todo_input/InputContainer";
import ListsContainer from "./todo_list/ListsContainer";
import TodoServiceByReactQuery from "../../utils/service/todoServiceByReactQuery";
import { QueryClient } from "react-query";

interface ITodoRouter{
  todoService: TodoServiceByReactQuery;
  queryClient: QueryClient;
}


const TodoRouter = ( {
  todoService,
  queryClient
}: ITodoRouter ) => {

  const [editTodo, setEditTodo] = useState<ITodo | null>(null);

  return(
  <>
    <InputContainer 
      queryClient={queryClient}
      todoService={todoService}
    />
    <ListsContainer
      queryClient={queryClient}
      todoService={todoService}
      setEditTodo={setEditTodo}
    />
    {editTodo &&
      <EditContainer
        queryClient={queryClient}
        todoService={todoService}
        editTodo={editTodo}
        setEditTodo={setEditTodo}
      />
    }
  </>)
}

export default TodoRouter;