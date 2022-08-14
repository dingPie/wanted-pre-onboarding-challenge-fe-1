import React from "react";
import { MainBtn } from "../../../components/Buttons";
import { ColBox, RowBox } from "../../../components/FlexBox";
import Text from "../../../components/Text";
import { ITodo } from "../../../utils/types/dataType";

interface IDetailTodo {
  todo: ITodo
  onClickDeleteTodo: (e: React.MouseEvent<HTMLDivElement|HTMLButtonElement>, todo: ITodo) => void;
  onClickOpenEditTodoPopup: (e: React.MouseEvent<HTMLDivElement|HTMLButtonElement>, todo: ITodo) => void;
}

const DetailTodo = ({
  todo,
  onClickDeleteTodo,
  onClickOpenEditTodoPopup
}: IDetailTodo) => {


  return(
    <ColBox
      gap={.5}
      // bgColor="white"
      padding=".5rem"
    >
      <Text
        shadow
        bgColor="white"
      >
        {todo.title}
      </Text>
      <Text
        height={10}
        shadow
        bgColor="white"
      >
      {todo.content}
      </Text>

      <RowBox
        center
      >
        <MainBtn
          width={8}
          onClick={(e) => onClickOpenEditTodoPopup(e, todo)}
        >
          수정
        </MainBtn>
        <MainBtn
          primary
            width={8}
          onClick={(e) => onClickDeleteTodo(e, todo)}
        >
          삭제
        </MainBtn>
      </RowBox>
    </ColBox>
  )
}

export default DetailTodo;