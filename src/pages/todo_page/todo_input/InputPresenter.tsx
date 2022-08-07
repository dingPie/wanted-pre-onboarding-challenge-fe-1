import React from "react";
import { MainBtn } from "../../../components/Buttons";
import { ColBox, RowBox } from "../../../components/FlexBox";
import { InputText } from "../../../components/InputText";
import InputTextArea from "../../../components/InputTextArea";
import Text from "../../../components/Text";

interface IInputPresenter {
  inputTitle: string;
  inputContent: string;
  onChangeInputTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeInputContent: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClickAddTodo: () => void;
}


const InputPresenter = ( {
  inputTitle,
  inputContent,
  onChangeInputTitle,
  onChangeInputContent,
  onClickAddTodo
}: IInputPresenter ) => {



  return(
  <ColBox
  >
    <ColBox
      padding="0"
    >
      <Text>
        제목
      </Text>
      <RowBox
        padding="0"
      >
        <InputText 
          value={inputTitle}
          onChange={onChangeInputTitle}
        />
        <MainBtn 
          primary
          width={10}
          onClick={() => onClickAddTodo()}
        >
          Add
        </MainBtn>
      </RowBox> 
    </ColBox>

    <ColBox
      padding="0"
    >
      <Text>
        내용
      </Text>
      <InputTextArea
        value={inputContent}
        onChange={onChangeInputContent}
      />
    </ColBox>
  </ColBox>)
}

export default InputPresenter;