import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MainBtn } from "../components/Buttons";
import { RowBox } from "../components/FlexBox";
import Text from "../components/Text";
import TodoService from "../utils/service/todoService";

interface IHeader {
  todoService: TodoService;
}

const Header = ( {
  todoService,
}: IHeader ) => {

  const location = useLocation();
  const navigate = useNavigate();
  const [headerName, setHeaderName] = useState("")
  

  useEffect(() => {
    console.log(location.pathname)
    setHeaderName(location.pathname === "/" ? "TODO" : "LOGIN" )
  }, [location.pathname])
  

  // 로그아웃 로직
  const onClickLogOut = () => {
    const confirm = window.confirm("현재 계정에서 로그아웃할까요?")
    if (!confirm) return
    localStorage.removeItem("idToken");
    localStorage.removeItem("seletedTodo");
    todoService.setIdToken(null);
    navigate('/auth', {replace: true})
  }

  return (
    <RowBox
      padding=".5rem"
      align="center"
      between
    >
      <Text
        padding="0"
        fontSize="3x"
        bold
      >
        {headerName}
      </Text>
      { headerName === "TODO" &&
        <MainBtn
        primary
        onClick={() => onClickLogOut()}
        >
          Log out
        </MainBtn>
      }
    </RowBox>
  )
}

export default Header;