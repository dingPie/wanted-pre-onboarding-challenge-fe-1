import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MainBtn } from "../components/Buttons";
import { RowBox } from "../components/FlexBox";
import Text from "../components/Text";

interface IHeader {
  setIdToken: (v: string | null) => void;
}

const Header = ( {
  setIdToken
}: IHeader ) => {

  const location = useLocation();
  const navigate = useNavigate();
  const [headerName, setHeaderName] = useState("")
  

  useEffect(() => {
    setHeaderName(location.pathname === "/" ? "TODO" : "LOGIN" )
  }, [])
  

  const onClickLogOut = () => {
    const confirm = window.confirm("현재 계정에서 로그아웃할까요?")
    if (!confirm) return
    localStorage.removeItem("idToken");
    localStorage.removeItem("seletedTodo");
    setIdToken(null);
    navigate('/auth', {replace: true})
  }

  return (
    <RowBox
      padding="0"
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