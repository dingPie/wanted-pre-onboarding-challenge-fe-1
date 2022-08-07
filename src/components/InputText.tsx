import React, { forwardRef, memo } from "react";
import styled from "styled-components";


interface IInputText extends IInputTextEle {
  value?: string;
  name?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement> ) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}


export const InputText = memo(forwardRef<HTMLInputElement, IInputText>(( {
  value, name, defaultValue, placeholder, onChange, onKeyPress, width, height
}, ref) => {
  
  return(
    <InputTextEle
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



interface IInputTextEle {
  width?: number;
  height?: number;
}

const InputTextEle = styled.input<IInputTextEle>`  //["attrs"]
  width:${({width}) => width ? width+"rem": "100%" };
  height: ${({height}) => height ? height+"rem": "2.25rem" };

  border: 2px solid #BEBEBE;
  border-radius: 4px;
  outline: none;

  box-shadow: ${({theme}) => theme.boxShadow.main };
`