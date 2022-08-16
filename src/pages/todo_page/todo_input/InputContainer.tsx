import React, {  useState } from "react";
import { ITodo } from "../../../utils/types/dataType";
import TodoService from "../../../utils/service/todoService";
import InputPresenter from "./InputPresenter";
import TodoServiceByReactQuery from "../../../utils/service/todoServiceByReactQuery";
import { QueryClient, useMutation } from "react-query";

interface IInputContainer {
    // todoService: TodoService
  todoService: TodoServiceByReactQuery;
  queryClient: QueryClient;
  todos: ITodo[];
  setTodos: (todos:  ITodo[]) => void;
}


const InputContainer = ( {
  todoService,
  queryClient,
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

    // React Query 적용 ////////////////
   // Mutations
   const GET_TODOS = "getTodos";
   const mutation = useMutation(onClickAddTodo, {
    onSuccess: async () => {
      queryClient.invalidateQueries(GET_TODOS);
    }
   })
  ////////////////////////////////

  

  return(
    <InputPresenter 
      inputTitle={inputTitle}
      inputContent={inputContent}
      onChangeInputTitle={onChangeInputTitle}
      onChangeInputContent={onChangeInputContent}
      onClickAddTodo={mutation.mutate}
    />
 )
}

export default InputContainer;