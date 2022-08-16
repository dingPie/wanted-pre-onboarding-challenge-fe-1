import React, { useEffect, useState } from "react";
import { checkEmailForm, checkPwForm } from "../utils/auth_service";
import { useNavigate } from "react-router-dom";
import LoginPresenter from "./LoginPresenter";
import { IAuthRouter } from "../AuthRouter";
import { useMutation } from "react-query";

interface ILoginContainer extends IAuthRouter {
  setIsOpenCreatePopup: (v: boolean) => void;
}


const LoginContainer = ( {
  authService,
  todoService,
  queryClient,
  setIsOpenCreatePopup,
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
    const loginToken = await authService.login(inputEmail, inputPw); 
    if (!loginToken) return
    todoService.setIdToken(loginToken)
    navigate('/', {replace: true});
  }

  // 가입 팝업 호출
  const onClickPopupCreateUser = () => setIsOpenCreatePopup(true);

  // React Query 적용 ////////////////
   // Mutations
  //  const mutation = useMutation(onClickLoginBtn, {
  //   onSuccess: async () => {
  //     queryClient.invalidateQueries("setIdToken");
  //   }
  //  })
  ////////////////////////////////
  

  
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