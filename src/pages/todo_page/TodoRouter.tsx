import React from "react";
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

  return(
  <>
    hi, Todo Page (Header)
    <InputContainer 
      idToken={idToken as string}
    />
    <ListsContainer
      idToken={idToken as string}
    />
  </>)
}

export default TodoRouter;