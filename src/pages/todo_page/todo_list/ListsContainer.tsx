import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RowBox } from "../../../components/FlexBox";
import { ITodo } from "../../../utils/dataType";
import DetailTodo from "./DetailTodo";
import List from "./List";

interface IListsContainer {
  idToken: string;
  todos: ITodo[];
  setTodos: (todos:  ITodo[]) => void;
  setEditTodo: (todo: ITodo) => void;
}

const ListsContainer = ({
  idToken,
  todos,
  setTodos,
  setEditTodo
}: IListsContainer) => {

  const [seletedTodo, setSeletedTodo] = useState<ITodo | null>(null);


  const onLoadTodos = async () => {
    const url = "http://localhost:8080/todos"
    const config = {
      headers: {
        Authorization: idToken
      }
    }
    try {
      const res = await axios.get(url, config);
      console.log("가져온 투두 목록", res.data)
      setTodos(res.data.data)
    } catch (e) {
      console.log(e, "에러")
    }
  }


  useEffect(() => {
    onLoadTodos()
    const seletedTodo = localStorage.getItem("seletedTodo")
    if (seletedTodo)  setSeletedTodo(JSON.parse(seletedTodo))
  }, [])

  
  const onClickTodo = (todo: ITodo) => {
    if (todo === seletedTodo) {
      setSeletedTodo(null)
      localStorage.removeItem("seletedTodo")
    } else {
      setSeletedTodo(todo)
      localStorage.setItem("seletedTodo", JSON.stringify(todo))
    }
  }
  

  const onClickDeleteTodo = async (e: React.MouseEvent<HTMLDivElement|HTMLButtonElement> , todo: ITodo) => {
    e.stopPropagation();
    const confirm = window.confirm("정말 이 Todo를 삭제할까요?")
    if (!confirm) return

    const targetId = todo.id;

    const url = `http://localhost:8080/todos/${todo.id}`
    const config = {
      headers: {
        Authorization: idToken
      },
    }
    try {
      const res = await axios.delete(url, config);
      console.log("투두 삭제: ", res.data)
    } catch (e) {
      console.log(e, "에러")
    }

    const deletedTodo = todos.filter(todo => todo.id !== targetId );
    setTodos(deletedTodo);
    if(seletedTodo) setSeletedTodo(null);
  }


  const onClickOpenEditTodoPopup = (e: React.MouseEvent<HTMLDivElement|HTMLButtonElement>, todo: ITodo) => {
    e.stopPropagation();
    setEditTodo(todo);
    setSeletedTodo(null);
  }


  return(
    <RowBox
      gap={.5}
    >
      <ListBox>
        {todos.map(todo => {
          return (
          <List
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

  &::-webkit-scrollbar {
    width: 0;
  }
`