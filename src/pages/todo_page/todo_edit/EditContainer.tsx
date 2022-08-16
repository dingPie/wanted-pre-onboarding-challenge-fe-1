import React, { useEffect, useState } from "react";
import { ITodo } from "../../../utils/types/dataType";
import EditPresenter from "./EditPresenter";
import TodoService from "../../../utils/service/todoService";
import TodoServiceByReactQuery from "../../../utils/service/todoServiceByReactQuery";

interface IEditContainer {
    // todoService: TodoService
    todoService: TodoServiceByReactQuery;
  todos: ITodo[];
  editTodo: ITodo;
  setTodos: (todos:  ITodo[]) => void;
  setEditTodo: (v: ITodo | null) => void;
}

const EditContainer = ({
  todoService,
  todos,
  editTodo,
  setTodos,
  setEditTodo,
}: IEditContainer) => {

  const [inputTitle, setInputTitle] = useState("")
  const [inputContent, setInputContent] = useState("")

  useEffect(() => {
    setInputTitle(editTodo.title)
    setInputContent(editTodo.content)
  
    return () => {
      setInputTitle("")
      setInputContent("")
    }
  }, [])
  

  // change Input Title
   const onChangeInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
     setInputTitle(e.target.value)
   }


  // change Input Content
  const onChangeInputContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputContent(e.target.value)
  }


  // 수정 버튼 클릭
  const onClickEditBtn = async () => {
    if (!inputTitle.length || !inputContent.length ) {
      alert("내용을 입력해주세요.")
      return
    }
    const updatedTodo = await todoService.updateTodo<ITodo>(inputTitle, inputContent, editTodo);
    if (!updatedTodo) return
    const editedTodos = todos.map(todo => todo.id === editTodo.id ? updatedTodo.data : todo )
    setTodos(editedTodos)
    setEditTodo(null)
  }
  

  // 취소 버튼 클릭
  const onClickCancelBtn= () => setEditTodo(null)
  


  return(
   <EditPresenter 
    inputTitle={inputTitle}
    inputContent={inputContent}
    onChangeInputTitle={onChangeInputTitle}
    onChangeInputContent={onChangeInputContent}
    onClickEditBtn={onClickEditBtn}
    onClickCancelBtn={onClickCancelBtn}
   /> 
  )
}

export default EditContainer;