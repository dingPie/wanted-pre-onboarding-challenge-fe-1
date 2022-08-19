import React, { useEffect, useState } from "react";
import { ITodo } from "../../../utils/types/dataType";
import EditPresenter from "./EditPresenter";
import TodoServiceByReactQuery from "../../../utils/service/todoServiceByReactQuery";
import { QueryClient, useMutation } from "react-query";
import { GET_TODOS } from "../../../utils/types/const";

interface IEditContainer {
  todoService: TodoServiceByReactQuery;
  queryClient: QueryClient;
  editTodo: ITodo;
  setEditTodo: (v: ITodo | null) => void;
}

const EditContainer = ({
  todoService,
  editTodo,
  setEditTodo,
  queryClient
}: IEditContainer) => {

  const [inputTitle, setInputTitle] = useState(editTodo.title)
  const [inputContent, setInputContent] = useState(editTodo.content)

  
  // change Input Title
   const onChangeInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => 
     setInputTitle(e.target.value)

  // change Input Content
  const onChangeInputContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => 
    setInputContent(e.target.value)

  // 수정 todo React Query
  const editMutation = useMutation( () => todoService.updateTodo<ITodo>(inputTitle, inputContent, editTodo), {
    onSuccess: async () => queryClient.invalidateQueries(GET_TODOS)
  })
  
  // 수정 버튼 클릭
  const onClickEditBtn = async () => {
    if (!inputTitle.length || !inputContent.length ) {
      alert("내용을 입력해주세요.")
      return
    }
    editMutation.mutate();
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