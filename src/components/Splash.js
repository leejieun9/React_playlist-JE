import React from 'react';
import styled from 'styled-components';
import Logo from '../assets/images/intro-logo.png';

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 20px; //로고이미지 위치설정
  background-color: ${({ theme }) => theme.colors.black}; //배경 블랙
  display: flex;
  align-items: center;
  justify-content: center;
  > img {
    width: 80rem; //맨처음 보여지는 로고이미지 크기설정
  }
  position: relative;
`;

function Splash() {
  return (
    <Wrap>
      <img src={Logo} alt="logo" />
    </Wrap>
  );
}

export default Splash;