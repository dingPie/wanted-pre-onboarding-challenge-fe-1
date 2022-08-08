import React, { forwardRef } from "react";
import styled from "styled-components";
import { CustomBtn, MainBtn } from "../../../components/Buttons";
import { RowBox } from "../../../components/FlexBox";
import { InputPW } from "../../../components/InputPW";
import { InputText } from "../../../components/InputText";
import Text from "../../../components/Text";
import { center } from "../../../styles/stylesCss";

interface ILoginPresenter {
  inputEmail: string;
  inputPw: string;
  isCollectEmailForm: boolean;
  isCollectPwForm: boolean;
  onChangeInputEmail: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeInputPw: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickPopupCreateUser: () => void;
  onClickLoginBtn: () => void;
}


const LoginPresenter = forwardRef<HTMLButtonElement, ILoginPresenter>(( {
  inputEmail,
  inputPw,
  isCollectEmailForm,
  isCollectPwForm,
  onChangeInputEmail,
  onChangeInputPw,
  onClickPopupCreateUser,
  onClickLoginBtn
}, ref ) => {

  

  return(
    <>
      <Text 
        bold
        fontSize="xl"
      >
        아이디
      </Text>
      <InputText 
        value={inputEmail}
        onChange={e => onChangeInputEmail(e)}
        name="email"
      />
  
      <Text 
        bold
        fontSize="xl"
      >
        비밀번호
      </Text>
      <InputPW 
        value={inputPw}
        name="password"
        onChange={e => onChangeInputPw(e)}
      />
  
      <RowBox>
        <MainBtn
          onClick={() => onClickPopupCreateUser()}
          width={12.5}
        >
          회원가입
        </MainBtn>
  
  
        <CustomBtn
          bold
          color="white"
          bgColor="#505050"
          width={12.5}
          ref={ref}
          onPolish={ isCollectEmailForm && isCollectPwForm }
          onClick={() => onClickLoginBtn()}
        >
          로그인
        </CustomBtn>
      </RowBox>
    </>)
})

export default LoginPresenter;


interface IInner {
  gap?: number;
  zIndex?: number;
  noBackground?: boolean;
}

const Inner = styled.div<IInner>`
  // 정렬
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  // size
  width: 720px;
  padding: 2rem 3.75rem;
  box-shadow: ${({theme, noBackground}) => !noBackground ? theme.boxShadow.main : "none" };
  
  z-index:${({zIndex}) => zIndex ? zIndex : 3 };
  background: white;
  border-radius: .25rem;
  ${center}
`

const Outer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .25);
`