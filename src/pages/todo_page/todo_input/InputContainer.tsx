import React, {  useState } from "react";
import { ITodo } from "../../../utils/types/dataType";
import TodoService from "../../../utils/service/todoService";
import InputPresenter from "./InputPresenter";
import TodoServiceByReactQuery from "../../../utils/service/todoServiceByReactQuery";
import { QueryClient, useMutation } from "react-query";
import { GET_TODOS } from "../../../utils/types/const";

interface IInputContainer {
  todoService: TodoServiceByReactQuery;
  queryClient: QueryClient;
}


const InputContainer = ( {
  todoService,
  queryClient,
}: IInputContainer ) => {

  const [inputTitle, setInputTitle] = useState("")
  const [inputContent, setInputContent] = useState("")

  // change Input Title
  const onChangeInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => 
    setInputTitle(e.target.value)

  // change Input Content
  const onChangeInputContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => 
    setInputContent(e.target.value)

  // todo 추가 React Query
  const addMutation = useMutation( async ([title, content]: string[]) => todoService.createTodo<ITodo>(title, content), {
    onSuccess: async () => queryClient.invalidateQueries(GET_TODOS)
  })
  
  // 추가 버튼 클릭
  const onClickAddTodo = async () => {
    if (!inputTitle.length || !inputContent.length ) {
      alert("내용을 입력해주세요.")
      return
    }
    addMutation.mutate([inputTitle, inputContent]); // set 필요가 없다;
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