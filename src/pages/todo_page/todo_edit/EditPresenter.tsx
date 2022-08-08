import React from "react";
import styled from "styled-components";
import {  MainBtn } from "../../../components/Buttons";
import {  RowBox } from "../../../components/FlexBox";
import { InputText } from "../../../components/InputText";
import InputTextArea from "../../../components/InputTextArea";
import Text from "../../../components/Text";
import { center } from "../../../styles/stylesCss";

interface IEditPresenter {
  inputTitle: string;
  inputContent: string;
  onChangeInputTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeInputContent: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClickEditBtn: () => void;
  onClickCancelBtn: () => void;
}

const EditPresenter = ({
  inputTitle,
  inputContent,
  onChangeInputTitle,
  onChangeInputContent,
  onClickEditBtn,
  onClickCancelBtn
}: IEditPresenter) => {


  return(
    <Outer>
      <Inner>
        <Text
          bold
          center
          fontSize="2x"
        >
          Edit Todo
        </Text>
        <InputText 
          value={inputTitle}
          onChange={e => onChangeInputTitle(e)}
        />
        <InputTextArea 
          value={inputContent}
          onChange={e => onChangeInputContent(e)}
        />

        <RowBox
          center
        >
          <MainBtn
            width={10}
            onClick={() => onClickCancelBtn()}
          >
            취소
          </MainBtn>
          <MainBtn
            primary
            width={10}
            onClick={() => onClickEditBtn()}
          >
            수정
          </MainBtn>
        </RowBox>
      </Inner>
    </Outer>
  )
}

export default EditPresenter;

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