import React, { forwardRef } from "react";
import styled from "styled-components";
import { CustomBtn, MainBtn } from "../../../components/Buttons";
import { ColBox, RowBox } from "../../../components/FlexBox";
import { InputPW } from "../../../components/InputPW";
import { InputText } from "../../../components/InputText";
import Text from "../../../components/Text";
import { center } from "../../../styles/stylesCss";

interface ICreatePresenter {
  inputEmail: string;
  inputPw: string;
  isCollectEmailForm: boolean;
  isCollectPwForm: boolean;
  onChangeInputEmail: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeInputPw: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickCrtUserBtn: () => void;
  onClickCancelCreateUser: () => void;
}


const CreatePresenter = forwardRef<HTMLButtonElement, ICreatePresenter>(( {
  inputEmail,
  inputPw,
  isCollectEmailForm,
  isCollectPwForm,
  onChangeInputEmail,
  onChangeInputPw,
  onClickCrtUserBtn,
  onClickCancelCreateUser
}, ref ) => {

  

  return(
    <Outer>
      <Inner>
        <Text
          bold
          fontSize="2x"
        >
          회원가입
        </Text>
        <ColBox>
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
        </ColBox>

        <ColBox>
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
        </ColBox>

        <RowBox 
          center
          padding="1rem 0 0"
        >
          <MainBtn 
            width={12.5}
            onClick={() => onClickCancelCreateUser()}
          > 
            닫기
          </MainBtn>

          <CustomBtn
            bold
            color={ (isCollectEmailForm && isCollectPwForm ) ? "white" : "gray" }
            bgColor="#679BFF"
            width={12.5}
            ref={ref}
            onPolish={ isCollectEmailForm && isCollectPwForm }
            onClick={() => onClickCrtUserBtn()}
          >
            회원가입
          </CustomBtn>
        </RowBox>
      </Inner>
    </Outer>)
})

export default CreatePresenter;


const Inner = styled.div`
  // 정렬
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  // size
  width: 720px;
  padding: 2rem 3.75rem;
  
  z-index: 3;
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