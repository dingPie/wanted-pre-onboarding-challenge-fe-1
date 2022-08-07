import React, { useEffect, useState } from "react";
import { ITodo } from "../../utils/dataType";
import EditContainer from "./todo_edit/EditContainer";
import InputContainer from "./todo_input/InputContainer";
import ListsContainer from "./todo_list/ListsContainer";

interface ITodoRouter {
  idToken: string | null;
  setIdToken: (v: string | null) => void;
}


const TodoRouter = ( {
  idToken,
  setIdToken
}: ITodoRouter ) => {

  const [todos, setTodos] = useState<ITodo[]>([]);
  const [editTodo, setEditTodo] = useState<ITodo | null>(null);


  


  return(
  <>
    <InputContainer 
      idToken={idToken as string}
      todos={todos}
      setTodos={setTodos}
    />
    <ListsContainer
      idToken={idToken as string}
      todos={todos}
      setTodos={setTodos}
      setEditTodo={setEditTodo}
    />
    {editTodo &&
      <EditContainer
        idToken={idToken as string}
        todos={todos}
        setTodos={setTodos}
        editTodo={editTodo}
        setEditTodo={setEditTodo}
      />
    }
  </>)
}

export default TodoRouter;