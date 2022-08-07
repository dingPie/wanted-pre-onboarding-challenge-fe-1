import { css } from "styled-components";
import { darken, lighten } from 'polished';


export const polishedColor = css<{bgColor: string}>`
  ${({ bgColor }) => {

    return css`
      background: ${bgColor};

      &:hover {
        background: ${lighten(0.02, bgColor)};
      }
      &:active {
        background: ${darken(0.02, bgColor)};
      }
    `;
  }}
`

export const fontSizeSet = css<{fontSize?: string}>`
  ${({ fontSize }) => {
    let result = "";
    if (fontSize === "3x") result = "2rem";
    else if (fontSize === 'title') result = "3rem";
    else if (fontSize === '2x') result = "1.5rem";
    else if (fontSize === 'xl') result = "1.25rem";
    else if (fontSize === 'l') result = "1rem";
    else if (fontSize === 's') result = ".75rem";
    else if (fontSize === 'xs') result = ".625rem";
    else if (fontSize === 'm' || !fontSize) result = ".875rem";

    return css`
      font-size: ${result};
    `
  }}
`
export interface IJustfiy {
  center?: boolean;
  right?: boolean;
  between?: boolean;
  align?: string
}

export const setJustify = css<IJustfiy>`
  ${({ center, right, between, align }) => {
    let justify = "flex-start";
    if (right) justify = "flex-end";
    else if (center) justify = "center";
    else if (between) justify ="space-between"

    return css`
      justify-content: ${ justify };
      align-items: ${ align && align }
    `;
  }}
`

export const overFlowHidden = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const center = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
`

export const setTextLine = css<{whiteSpace?: string, lineClamp?: number}>`
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: ${({lineClamp}) => lineClamp ? lineClamp : 1  };;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: ${({whiteSpace}) => whiteSpace ? whiteSpace : 'pre-wrap'  };
`
