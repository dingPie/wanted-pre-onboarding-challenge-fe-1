import React from "react";
import styled from "styled-components";
import { RowBox } from "../../../components/FlexBox";
import Text from "../../../components/Text";
import { ITodo } from "../../../utils/dataType";

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
      shadow
      onClick={ () => onClickTodo(todo)}
    >
      <Text>
        {todo.title}
      </Text>
      <Text
        onClick={ e => onClickOpenEditTodoPopup(e, todo)}
      >
        수정
      </Text>
      <Text
        onClick={e => onClickDeleteTodo(e, todo)}
      >
        삭제
      </Text>
    </TodoBox>
  )
}

export default List;

export const TodoBox = styled(RowBox)`
  display: grid;
  grid-template-columns: 1fr 3rem 3rem;
  gap: .5rem;

  width: 100%;
  height: 2.5rem;
  padding: 0;
  margin-bottom: .5rem;

  border-radius: .25rem ;
`