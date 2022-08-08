import React from "react";
import { MainBtn } from "../../../components/Buttons";
import { ColBox, RowBox } from "../../../components/FlexBox";
import Text from "../../../components/Text";
import { ITodo } from "../../../utils/dataType";

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
    >
      <Text
        shadow
      >
        {todo.title}
      </Text>
      <Text
        height={10}
        shadow
      >
      {todo.content}
      </Text>

      <RowBox
        center
      >
        <MainBtn
          onClick={(e) => onClickOpenEditTodoPopup(e, todo)}
        >
          수정
        </MainBtn>
        <MainBtn
          primary
          onClick={(e) => onClickDeleteTodo(e, todo)}
        >
          삭제
        </MainBtn>
      </RowBox>
    </ColBox>
  )
}

export default DetailTodo;