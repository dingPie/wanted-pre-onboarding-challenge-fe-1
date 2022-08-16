import React, {  useState } from "react";
import { ITodo } from "../../../utils/types/dataType";
import TodoService from "../../../utils/service/todoService";
import InputPresenter from "./InputPresenter";
import TodoServiceByReactQuery from "../../../utils/service/todoServiceByReactQuery";

interface IInputContainer {
    // todoService: TodoService
    todoService: TodoServiceByReactQuery;
  todos: ITodo[];
  setTodos: (todos:  ITodo[]) => void;
}


const InputContainer = ( {
  todoService,
  todos,
  setTodos
}: IInputContainer ) => {

  const [inputTitle, setInputTitle] = useState("")
  const [inputContent, setInputContent] = useState("")

  // change Input Title
  const onChangeInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value)
  }


  // change Input Content
  const onChangeInputContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputContent(e.target.value)
  }

  
  // 추가 버튼 클릭
  const onClickAddTodo = async () => {
    if (!inputTitle.length || !inputContent.length ) {
      alert("내용을 입력해주세요.")
      return
    }
    const createdTodo = await todoService.createTodo<ITodo>(inputTitle, inputContent);
    if (!createdTodo) return
    setTodos([...todos, createdTodo.data])
    setInputTitle("")
    setInputContent("")
  }

  

  return(
    <InputPresenter 
      inputTitle={inputTitle}
      inputContent={inputContent}
      onChangeInputTitle={onChangeInputTitle}
      onChangeInputContent={onChangeInputContent}
      onClickAddTodo={onClickAddTodo}
    />
 )
}

export default InputContainer;