import React, { ReactNode } from "react";
import styled, { css } from "styled-components";
import { fontSizeSet } from "../styles/stylesCss";

interface IText {
  fontSize?: string;
  bold?: boolean;
  width?: number;
  height?: number;
  padding?: string;
  color?: string;
  bgColor?: string;
  radius?: number;
  shadow?: boolean;
  inline?: boolean;
  cursor?: boolean;
  center?: boolean;
  margin?: string;
}

interface ITextComponent extends IText {
  children?: ReactNode;
  onClick?: (v: any) => void;
  onLinkify?: boolean;
}


const TextComponent = ( {
  fontSize,
  bold,
  width,
  height,
  padding,
  color, 
  bgColor, 
  radius, 
  shadow,
  inline,
  cursor,
  center,
  margin,

  children,
  onClick,
  onLinkify
}: ITextComponent ) => {

  
  return(
    <Text
      fontSize={fontSize}
      bold={bold}
      width={width}
      height={height}
      padding={padding}
      color={color} 
      bgColor={bgColor} 
      radius={radius} 
      shadow={shadow}
      inline={inline}
      cursor={cursor}
      center={center}
      margin={margin}

      onClick={onClick}
    >
      {children}
    </Text>
  )

}



const Text = styled.div<IText>`
  // 크기
  width: ${({width}) => width && width+"rem" };
  height: ${({height}) => height && height+"rem" };
  line-height: ${({height}) => height && height+"rem" };
  padding: ${({padding}) => padding ? padding : ".5rem"};
  margin: ${({margin}) => margin && margin };

  // 폰트
  font-weight: ${({bold}) => bold && "bold"};
  text-align: ${({center}) => center && "center" };
  ${fontSizeSet};

  // 배경, 색상
  color: ${({color}) => color && color };
  background: ${({bgColor}) => bgColor && bgColor };
  border-radius: ${({radius}) => radius ? radius+"rem" : `.25rem` };

  ${({inline}) => {
    return inline && 'display: inline-block'
  }};

  ${({shadow}) => {
      return shadow && 'box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(0, 0, 0, 0.05)'
  }};

  ${({cursor}) => {
    return cursor ? `cursor: pointer` : `cursor: auto`
  }}
`

export default Text;