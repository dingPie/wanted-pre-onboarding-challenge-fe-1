import React, { forwardRef, memo } from "react";
import styled from "styled-components";


interface IInputPW extends IInputPWEle {
  value?: string;
  name?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}


export const InputPW = memo(forwardRef<HTMLInputElement, IInputPW>(( {
  value, name, defaultValue, placeholder, onChange, onKeyPress, width, height
}, ref) => {
  
  return(
    <InputPWEle
      ref={ref}
      value={value}
      name={name}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={onChange}
      onKeyPress={onKeyPress}
      width={width}
      height={height}
    />
  )
}))



interface IInputPWEle {
  width?: number;
  height?: number;
}

const InputPWEle = styled.input.attrs({type: "password"})<IInputPWEle>`  //["attrs"]
  width:${({width}) => width ? width+"rem": "100%" };
  height: ${({height}) => height ? height+"rem": "2.25rem" };

  border: 2px solid #BEBEBE;
  border-radius: 4px;
  outline: none;

  box-shadow: ${({theme}) => theme.boxShadow.main };
`