import React, { useState } from 'react';  // React와 useState 훅을 import
import styled from 'styled-components';  // styled-components를 import (CSS-in-JS)
import Album from '../Album';  // Album 컴포넌트를 import (음악 항목을 표시하는 컴포넌트)

const Wrap = styled.div`
  width: 100%;  // Wrap 컴포넌트의 너비를 100%로 설정
  height: 100vh;  // Wrap 컴포넌트의 높이를 100vh로 설정 (전체 화면 높이)
  padding-top: 20px;  // 상단에 20px의 여백 추가
`;

const Header = styled.div`
  width: 100%;  // Header 컴포넌트의 너비를 100%로 설정
  height: 10%;  // Header의 높이를 화면의 10%로 설정
  background-color: ${({ theme }) => theme.colors.black};  // 배경색은 테마에서 제공된 black
  color: white;  // 텍스트 색은 흰색
  text-transform: uppercase;  // 텍스트를 대문자로 변환
  font-size: ${({ theme }) => theme.fonts.size.base};  // 폰트 크기는 테마의 base 크기 사용
  font-weight: 500;  // 폰트 두께는 500
  display: flex;  // flexbox를 사용하여 내부 정렬
  align-items: center;  // 수직 중앙 정렬
  justify-content: center;  // 수평 중앙 정렬
`;

const PlaylistWrap = styled.div``;  // PlaylistWrap 컴포넌트는 특별한 스타일이 없음
const PlaylistUl = styled.ul``;  // PlaylistUl 컴포넌트는 특별한 스타일이 없음
const PlaylistLi = styled.li`
  height: 8rem;  // 각 리스트 항목의 높이를 8rem으로 설정
  display: flex;  // flexbox로 항목을 정렬
  justify-content: space-between;  // 항목들 사이의 간격을 자동으로 배분
  align-items: center;  // 수직 중앙 정렬
  margin: 0 1.5rem;  // 좌우 마진을 1.5rem로 설정
  padding: 0 0.5rem;  // 좌우 패딩을 0.5rem으로 설정
  &:not(:last-child) {  // 마지막 항목이 아닌 경우
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray7};  // 아래쪽에 회색 테두리 추가
  }
`;

const PlaySetting = styled.div`
  i {
    font-size: 2rem;  // 아이콘의 폰트 크기를 2rem으로 설정
  }
`;

function Playlist({ playlist, onRemovePlaylist }) {
  const [list, setList] = useState(playlist);  // playlist 상태를 관리 (초기값은 부모 컴포넌트로부터 전달받은 playlist)

  const onRemove = (music) => {
    // 음악을 제거하는 함수
    setList((pre) => pre.filter((v) => v.title !== music.title));  // 현재 리스트에서 해당 음악을 제거
    music.isOnList = false;  // 음악 객체에서 isOnList 속성을 false로 설정
    onRemovePlaylist(music);  // 부모 컴포넌트에 음악을 제거하라고 알림
  };

  return (
    <Wrap> 
      <Header>My playlist</Header> 
      <PlaylistWrap>
        <PlaylistUl>
          {list.map((music, idx) => (  // 리스트의 각 음악 항목을 반복
            <PlaylistLi key={idx}>  
              <Album music={music} />  
              <PlaySetting onClick={() => onRemove(music)}>  
                <i className="xi-minus-thin" /> 
              </PlaySetting>
            </PlaylistLi>
          ))}
        </PlaylistUl>
      </PlaylistWrap>
    </Wrap>
  );
}

export default Playlist;  // Playlist 컴포넌트를 내보냄
