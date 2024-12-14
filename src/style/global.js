import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';


const GlobalStyle = createGlobalStyle`
 ${reset};
 
  * {
    margin: 0;
    padding: 0;  
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%; //1rem = 10px;
  }

button {
  border: none; /* 버튼의 기본 테두리를 제거 */
  cursor: pointer; /* 버튼 위에 마우스를 올리면 클릭 가능한 포인터로 변경 */
  background-color: transparent; /* 버튼의 배경색을 투명하게 설정 */
}

  ${({ theme }) => {
    return css`
      body {
        font-family: ${theme.fonts.family.base};
        font-weight: ${theme.fonts.weight.normal};
        font-size: ${theme.fonts.size.base};
      }
    `;
  }}
`;

export default GlobalStyle;
