import React, { useEffect, useState } from "react";
import axios from "axios";
import { checkEmailForm, checkPwForm } from "../utils/auth_service";
import { useNavigate } from "react-router-dom";
import LoginPresenter from "./LoginPresenter";

interface ILoginContainer {
  setIsOpenCreatePopup: (v: boolean) => void;
}


const LoginContainer = ( {
  setIsOpenCreatePopup
}: ILoginContainer ) => {

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
  const onClickLoginBtn = async () => {
    const url = "http://localhost:8080/users/login"
    const params = { email: inputEmail, password: inputPw }
    try {
      const res = await axios.post(url, params );
      localStorage.setItem("idToken", res.data.token);
      navigate('/', {replace: true});
    } catch (e) {
      alert("아이디 / 비밀번호가 잘못되었습니다.")
    }
    
  }

  const onClickPopupCreateUser = () => setIsOpenCreatePopup(true)


  

  return(
    <LoginPresenter 
      inputEmail={inputEmail}
      inputPw={inputPw}
      isCollectEmailForm={isCollectEmailForm}
      isCollectPwForm={isCollectPwForm}
      ref={submitRef}
      onChangeInputEmail={onChangeInputEmail}
      onChangeInputPw={onChangeInputPw}
      onClickLoginBtn={onClickLoginBtn}
      onClickPopupCreateUser={onClickPopupCreateUser}
    />
    )
}

export default LoginContainer;