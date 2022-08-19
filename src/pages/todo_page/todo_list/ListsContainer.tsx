import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { RowBox } from "../../../components/FlexBox";
import { ITodo } from "../../../utils/types/dataType";
import DetailTodo from "./DetailTodo";
import List from "./List";
import { QueryClient, useMutation, useQuery } from "react-query";
import TodoServiceByReactQuery from "../../../utils/service/todoServiceByReactQuery";
import { GET_TODOS } from "../../../utils/types/const";

interface IListsContainer {
    // todoService: TodoService
  todoService: TodoServiceByReactQuery;
  queryClient: QueryClient;
  setEditTodo: (todo: ITodo) => void;
}

const ListsContainer = ({
  todoService,
  queryClient,
  setEditTodo
}: IListsContainer) => {
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);
  
  const { data } = useQuery([GET_TODOS], () => todoService.getTodos<ITodo[]>(), {
    staleTime: 0,
    cacheTime: 5000
  } );
  
  // 이전 클릭했던 Todo Local storage에 저장
  useEffect(() => {
    const selectedTodo = localStorage.getItem("selectedTodo")
    if (selectedTodo)  setSelectedTodo(JSON.parse(selectedTodo))
  }, [])
  
  // Todo 목록 클릭
  const onClickTodo = useCallback((todo: ITodo) => {
    if (todo === selectedTodo) {
      setSelectedTodo(null)
      localStorage.removeItem("selectedTodo")
    } else {
      setSelectedTodo(todo)
      localStorage.setItem("selectedTodo", JSON.stringify(todo))
    }
  },[selectedTodo])
  
  // todo 삭제 React Query
  const deleteMutation = useMutation( async (todo: ITodo) => todoService.deleteTodo(todo), {
    onSuccess: () => queryClient.invalidateQueries(GET_TODOS)
  })
  
  // Todo 삭제버튼 클릭
  const onClickDeleteTodo = useCallback( async (e: React.MouseEvent<HTMLDivElement|HTMLButtonElement> , todo: ITodo) => {
    e.stopPropagation();
    const confirm = window.confirm("정말 이 Todo를 삭제할까요?")
    if (!confirm) return
    if(selectedTodo) setSelectedTodo(null);
    
    deleteMutation.mutate(todo); // useMutation 사용
  }, [selectedTodo])
  
  // 수정창 띄우기
  const onClickOpenEditTodoPopup =  useCallback( (e: React.MouseEvent<HTMLDivElement|HTMLButtonElement>, todo: ITodo) => {
    e.stopPropagation();
    setEditTodo(todo);
    setSelectedTodo(null);
  }, [selectedTodo])


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
      { selectedTodo &&
        <DetailTodo 
          todo={selectedTodo} 
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