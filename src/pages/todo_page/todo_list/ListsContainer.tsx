import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { RowBox } from "../../../components/FlexBox";
import { ITodo } from "../../../utils/types/dataType";
import DetailTodo from "./DetailTodo";
import List from "./List";
import { QueryClient, useQuery } from "react-query";
import TodoServiceByReactQuery from "../../../utils/service/todoServiceByReactQuery";

interface IListsContainer {
    // todoService: TodoService
  todoService: TodoServiceByReactQuery;
  queryClient: QueryClient;
  todos: ITodo[];
  setTodos: (todos:  ITodo[]) => void;
  setEditTodo: (todo: ITodo) => void;
}

const ListsContainer = ({
  todoService,
  queryClient,
  todos,
  setTodos,
  setEditTodo
}: IListsContainer) => {

  const [seletedTodo, setSeletedTodo] = useState<ITodo | null>(null);

  //  // Todo 불러오기
  // const onLoadTodos = useCallback(async () => {
  //   const getTodos = await todoService.getTodos();
  //   if (!getTodos) return
  //   setTodos(getTodos)
  // },[setTodos, todoService])


  // 이전 클릭했던 Todo Local storage에 저장
  useEffect(() => {
    const seletedTodo = localStorage.getItem("seletedTodo")
    if (seletedTodo)  setSeletedTodo(JSON.parse(seletedTodo))
  }, [])

  
  // Todo 목록 클릭
  const onClickTodo = (todo: ITodo) => {
    if (todo === seletedTodo) {
      setSeletedTodo(null)
      localStorage.removeItem("seletedTodo")
    } else {
      setSeletedTodo(todo)
      localStorage.setItem("seletedTodo", JSON.stringify(todo))
    }
  }
  

  // Todo 삭제버튼 클릭
  const onClickDeleteTodo = async (e: React.MouseEvent<HTMLDivElement|HTMLButtonElement> , todo: ITodo) => {
    e.stopPropagation();
    const confirm = window.confirm("정말 이 Todo를 삭제할까요?")
    if (!confirm) return

    if(seletedTodo) setSeletedTodo(null);
    const deleteTodo = await todoService.deleteTodo(todo);
    if(!deleteTodo) return
    
    const targetId = todo.id;
    const deletedTodo = todos.filter(todo => todo.id !== targetId );
    setTodos(deletedTodo);
  }


  // 수정창 띄우기
  const onClickOpenEditTodoPopup = (e: React.MouseEvent<HTMLDivElement|HTMLButtonElement>, todo: ITodo) => {
    e.stopPropagation();
    setEditTodo(todo);
    setSeletedTodo(null);
  }


  const GET_TODOS = "getTodos";
  // React Query 적용 ////////////////
  const { isLoading, isError, data, error } = useQuery([GET_TODOS], () => todoService.getTodos<ITodo[]>() );
  
  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    if ( error instanceof Error)
      return <span>Error: {error.message}</span>
  }
  // 삭제버튼 React Query 적용: 실패...
  // const mutation = useMutation(onClickDeleteTodo, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("getTodos");
  //   }
  //  })
  ////////////////////////////////


  return(
    <RowBox
      gap={.5}
      padding=".5rem"
    >
      <ListBox>
        {data && data.data.data.map(todo => { // React Query 적용하여 바로 데이터 넣어줌
          return (
          <List
            key={todo.id}
            onClickTodo={onClickTodo}
            todo={todo} 
            onClickDeleteTodo={onClickDeleteTodo}
            onClickOpenEditTodoPopup={onClickOpenEditTodoPopup}
          />)
        })}
      </ListBox>
      { seletedTodo &&
        <DetailTodo 
          todo={seletedTodo} 
          onClickDeleteTodo={onClickDeleteTodo}
          onClickOpenEditTodoPopup={onClickOpenEditTodoPopup}
        />
      }

    </RowBox>
  )
}

export default ListsContainer;

const ListBox = styled.div`
  width:100%;
  overflow-y: scroll;
  padding: .25rem;

  &::-webkit-scrollbar {
    width: 0;
  }
`