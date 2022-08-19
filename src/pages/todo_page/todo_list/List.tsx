import React, { memo } from "react";
import styled from "styled-components";
import { MainBtn } from "../../../components/Buttons";
import { RowBox } from "../../../components/FlexBox";
import Text from "../../../components/Text";
import { ITodo } from "../../../utils/types/dataType";

interface IList {
  todo: ITodo
  onClickTodo: (todo: ITodo) => void;
  onClickDeleteTodo: (e: React.MouseEvent<HTMLDivElement|HTMLButtonElement>, todo: ITodo) => void;
  onClickOpenEditTodoPopup: (e: React.MouseEvent<HTMLDivElement|HTMLButtonElement>, todo: ITodo) => void;
}

const List = ({
  todo,
  onClickTodo,
  onClickDeleteTodo,
  onClickOpenEditTodoPopup
}: IList) => {


  return(
    <TodoBox
      align="center"
      bgColor="white"
      shadow
      onClick={ () => onClickTodo(todo)}
    >
      <Text
      >
        {todo.title}
      </Text>
      <MainBtn
      width={3}
        onClick={ e => onClickOpenEditTodoPopup(e, todo)}
      >
        수정
      </MainBtn>
      <MainBtn
      width={3}
        onClick={e => onClickDeleteTodo(e, todo)}
      >
        삭제
      </MainBtn>
    </TodoBox>
  )
}

export default memo(List);

export const TodoBox = styled(RowBox)`
  display: grid;
  grid-template-columns: 1fr 3rem 3rem;
  gap: .5rem;

  width: 100%;
  /* height: 2.5rem; */
  padding: .5rem;
  margin-bottom: .5rem;

  border-radius: .25rem ;
`