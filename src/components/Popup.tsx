import React, { ReactNode, memo } from "react";
import styled from "styled-components";
import { center } from "../styles/stylesCss";
import { MainBtn } from "./Buttons";
import { RowBox } from "./FlexBox";
import Text from './Text'


interface IPopup {
  children: ReactNode;
  title: string;
  onClickCancel?: () => void;
  onClickDo?: (v: any) => void;
  cancelBtnName?: string;
  doBtnName?: string;
  
  //styled components props
  gap?: number;
  zIndex?: number;
  noBackground?: boolean;
}

const Popup = ( { noBackground, children, title, onClickCancel, onClickDo, cancelBtnName, doBtnName, gap, zIndex }: IPopup) => {

  return (<>
    { noBackground ?
      <Inner 
        gap={gap} 
        zIndex={zIndex} 
        noBackground={noBackground}
      >
      <Text fontSize='l' bold> {title} </Text>
        {children}
        <RowBox center >
          <MainBtn width={12.5}
            onClick={onClickCancel}
          > { cancelBtnName ? cancelBtnName : "닫기" } 
          </MainBtn>
          <MainBtn width={12.5} primary
            onClick={onClickDo}
          > { doBtnName ? doBtnName : "확인" }
          </MainBtn>
        </RowBox>
      </Inner> 
      :
      <Outer>
        <Inner 
          gap={gap} 
          zIndex={zIndex}
        >
        <Text fontSize='l' bold> {title} </Text>
          {children}
          <RowBox center >
            <MainBtn width={12.5}
              onClick={onClickCancel}
            > { cancelBtnName ? cancelBtnName : "닫기" } 
            </MainBtn>
            <MainBtn width={12.5} primary
              onClick={onClickDo}
            > { doBtnName ? doBtnName : "확인" }
            </MainBtn>
          </RowBox>
        </Inner>
      </Outer>
    }
</>)
}

export default memo(Popup)

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
  gap: ${({gap}) => gap ? gap+"rem" : "1rem"};

  // size
  width: 720px;
  height: 360px;
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