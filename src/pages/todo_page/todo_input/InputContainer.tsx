import axios from "axios";
import React, { useEffect, useState } from "react";
import InputPresenter from "./InputPresenter";

interface IInputContainer {
  idToken: string
}


const InputContainer = ( {
  idToken
}: IInputContainer ) => {

  const [inputTitle, setInputTitle] = useState("")
  const [inputContent, setInputContent] = useState("")


  const onChangeInputContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputContent(e.target.value)
  }


  const onChangeInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value)
  }


  const onClickAddTodo = async () => {
    if (!inputTitle.length || !inputContent.length ) {
      alert("내용을 입력해주세요.")
      return
    }
    const url = "http://localhost:8080/todos"
    const params = { title: inputTitle, content: inputContent }
    const config = {
      headers: {
        Authorization: idToken
      }
    }
    try {
      const res = await axios.post(url, params, config);
      console.log("추가 완료", res.data)
    } catch (e) {
      console.log(e)
      alert("알 수 없는 오류로 실패하였습니다.")
    }
    setInputTitle("")
    setInputContent("")
  }


  useEffect(() => {
  }, [])
  


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