import React, { useEffect, useState } from "react";
import axios from "axios";
import CreatePresenter from "./CreatePresenter";
import { checkEmailForm, checkPwForm } from "../utils/auth_service";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../utils/service/authService";
import TodoService from "../../../utils/service/todoService";

interface ICreateContainer {
  authService: AuthService;
  todoService: TodoService;
  setIsOpenCreatePopup: (v: boolean) => void;
}


const CreateContainer = ( {
  authService,
  todoService,
  setIsOpenCreatePopup,
}: ICreateContainer ) => {

  const navigate = useNavigate();

  // Email, Pw input
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");
  
  // Check Collect State
  const [isCollectEmailForm, setIsCollectEmailForm] = useState(false);
  const [isCollectPwForm, setIsCollectPwForm] = useState(false);

  // sumbit (btn) Ref
  const submitRef = React.useRef<HTMLButtonElement>(null)
  

  // Watch Collect State
  useEffect(() => {
    if (!submitRef.current) return
    if (isCollectEmailForm && isCollectPwForm) {
      submitRef.current.removeAttribute("disabled")
    } else {
      submitRef.current.setAttribute("disabled", "")
    }
      
  }, [isCollectEmailForm, isCollectPwForm])
  

  // onChange Check Email Form
  const onChangeInputEmail = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => 
    setInputEmail(e.target.value)
  

  // onChange Check Password Form
  const onChangeInputPw = (e: React.ChangeEvent<HTMLInputElement>) => 
    setInputPw(e.target.value)
  

  // Watch Email From
  useEffect(() => {
    if (!inputEmail.length) return
    checkEmailForm(inputEmail) ? setIsCollectEmailForm(true) : setIsCollectEmailForm(false)
  }, [inputEmail])


  // Watch Password From
  useEffect(() => {
    if (!inputPw.length) return
    checkPwForm(inputPw) ? setIsCollectPwForm(true) : setIsCollectPwForm(false)
  }, [inputPw])
  
  
  // login Check
  const onClickCrtUserBtn = async () => {
    const loginToken = await authService.signUp(inputEmail, inputPw);
    if (!loginToken) return
    todoService.setIdToken(loginToken);
    setIsOpenCreatePopup(false)
    navigate('/', {replace: true});
  }


  // cancel create user
  const onClickCancelCreateUser = () => setIsOpenCreatePopup(false)

  

  return(
    <CreatePresenter 
      inputEmail={inputEmail}
      inputPw={inputPw}
      isCollectEmailForm={isCollectEmailForm}
      isCollectPwForm={isCollectPwForm}
      ref={submitRef}
      onChangeInputEmail={onChangeInputEmail}
      onChangeInputPw={onChangeInputPw}
      onClickCrtUserBtn={onClickCrtUserBtn}
      onClickCancelCreateUser={onClickCancelCreateUser}
    />
    )
}

export default CreateContainer;