import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CustomBtn, MainBtn } from "../../../components/Buttons";
import { ColBox, RowBox } from "../../../components/FlexBox";
import { InputText } from "../../../components/InputText";
import InputTextArea from "../../../components/InputTextArea";
import Text from "../../../components/Text";
import { center } from "../../../styles/stylesCss";
import { ITodo } from "../../../utils/dataType";
import EditPresenter from "./EditPresenter";

interface IEditContainer {
  idToken: string;
  editTodo: ITodo
  setEditTodo: (v: ITodo | null) => void;
  todos: ITodo[];
  setTodos: (todos:  ITodo[]) => void;
}

const EditContainer = ({
  idToken,
  editTodo,
  setEditTodo,
  todos,
  setTodos
}: IEditContainer) => {

  const [inputTitle, setInputTitle] = useState("")
  const [inputContent, setInputContent] = useState("")

  useEffect(() => {
    setInputTitle(editTodo.title)
    setInputContent(editTodo.title)
  
    return () => {
      setInputTitle("")
      setInputContent("")
    }
  }, [])
  


  const onChangeInputContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputContent(e.target.value)
  }


  const onChangeInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value)
  }


  const onClickEditBtn = async () => {
    if (!inputTitle.length || !inputContent.length ) {
      alert("내용을 입력해주세요.")
      return
    }
    const url = `http://localhost:8080/todos/${editTodo.id}`
    const params = { title: inputTitle, content: inputContent }
    const config = {
      headers: {
        Authorization: idToken
      }
    }
    try {
      const res = await axios.put(url, params, config);
      console.log("결과", res.data.data)
      const editedTodos = todos.map(todo => todo.id === editTodo.id ? res.data.data : todo )
      setTodos(editedTodos)
    } catch (e) {
      console.log(e)
      alert("알 수 없는 오류로 실패하였습니다.")
    }
    setEditTodo(null)
  }
  
  const onClickCancelBtn= () => {
    setEditTodo(null)
  }


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