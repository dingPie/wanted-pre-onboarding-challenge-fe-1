import React, { forwardRef, memo } from "react";
import styled from "styled-components";


interface IInputText extends IInputTextEle {
  value?: string;
  name?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement> |  React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement> |  React.KeyboardEvent<HTMLTextAreaElement>) => void;
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


export const InputTextArea = memo(({
  value, name, defaultValue, placeholder, onChange, onKeyPress, width, height
}: IInputText) => {
  
  return(
    <InputTextAreaEle
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
})


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
const InputTextAreaEle = styled.textarea<IInputTextEle>`  //["attrs"]
  width:${({width}) => width ? width+"rem": "100%" };
  height: ${({height}) => height ? height+"rem": "2.5rem" };

  border: 2px solid #BEBEBE;
  border-radius: 4px;
  outline: none;

  /* 그림자 */
  box-shadow: ${({theme}) => theme.boxShadow.main };
`