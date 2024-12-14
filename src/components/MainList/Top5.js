import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/intro-logo.png';
import Album from '../Album';

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 20px;
`;

const Header = styled.div`
  width: 100%;
  height: 200px; /* 고정된 높이 */
  position: relative;
  background-color: ${({ theme }) => theme.colors.black};
  overflow: hidden;

  /* 로고 스타일 */
  .img-logo {
    width: 15rem;
    position: absolute;
    top: 3rem;
    left: 2rem;
    z-index: 2; /* 로고가 항상 위에 표시되도록 설정 */
  }

  /* 이미지 요소 삭제 또는 숨김 */
  .img-cover {
    display: none; /* 이미지 완전히 숨김 */
  }
`;

// 음악 리스트 본문 스타일
const MusicBody = styled.div`
  padding: 1rem 2rem;
`;

// 리스트 및 리스트 아이템 스타일
const MusicUL = styled.ul`
  padding: 0;
  list-style: none;
`;

const MusList = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.gray7}; // 재생 중인 아이템 강조
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const MusicItem = styled.div`
  display: flex;
  align-items: center;

  > span {
    color: ${({ theme }) => theme.colors.black};
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    margin-right: 1rem;
  }
`;

// 재생 및 추가/삭제 버튼 스타일
const PlaySetting = styled.div`
  button {
    margin-left: 0.8rem;

    i {
      font-size: 3rem;
      color: ${({ theme }) => theme.colors.gray3};
    }
    .xi-play.active,
    .xi-pause.active {
      color: ${({ theme }) => theme.colors.pink};
      font-weight: 700;
    }
  }
`;

// 푸터 스타일
const Footer = styled.div`
  padding: 1rem 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray3};
  font-size: 1.2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray7};
`;

function Top5({
  musics, // 음악 데이터 배열
  handlePlayMusic, // 음악 재생 함수
  onAddPlaylist, // 재생 목록에 추가하는 함수
  onRemovePlaylist, // 재생 목록에서 제거하는 함수
  onPlay, // 현재 재생 상태
  setOnPlay, // 재생 상태를 변경하는 함수
  current, // 현재 재생 중인 음악
}) {
  // 상태 관리
  const [list, setList] = useState([...musics]); // 음악 리스트 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  // 재생 목록에 추가
  const onAdd = (music) => {
    setList((prev) =>
      prev.map((v) => {
        if (v.title === music.title) {
          v.isOnList = true;
        }
        return v;
      })
    );
    onAddPlaylist(music); // 부모 컴포넌트에 추가 요청
  };

  // 재생 목록에서 제거
  const onRemove = (music) => {
    setList((prev) =>
      prev.map((v) => {
        if (v.title === music.title) {
          v.isOnList = false;
        }
        return v;
      })
    );
    onRemovePlaylist(music); // 부모 컴포넌트에 제거 요청
  };

  // 음악 리스트 업데이트 및 로딩 상태 관리
  useEffect(() => {
    setList(musics);
    setIsLoading(false); // 로딩 완료
  }, [musics]);

  return (
    <Wrap>
      {/* 헤더 영역 */}
      <Header>
        <img
          className="img-cover"
          src={musics[3]?.cover || '/path/to/default-image.jpg'}
          alt="first cover"
        />
        <img className="img-logo" src={logo} alt="logo" />
      </Header>

          
          <MusicUL>
            {list.map((music, idx) => (
              <MusList
                key={idx}
                isActive={music?.title === current?.title && !!onPlay} // 뮤직타이틀 강조
              >
                <MusicItem>
                  <span>{idx + 1}</span>
                  <Album music={music} />
                </MusicItem>
                <PlaySetting>
                  <button
                    onClick={
                      music?.title === current?.title && !!onPlay
                        ? () => setOnPlay(false) // 재생 중일 경우 일시 정지
                        : () => handlePlayMusic(music) // 음악 재생
                    }
                  >
                    <i
                      className={
                        music?.title === current?.title && !!onPlay
                          ? `xi-pause active`
                          : `xi-play ${onPlay ? '' : 'active'}`
                      }
                    />
                  </button>
                  <button
                    onClick={
                      music.isOnList
                        ? () => onRemove(music) // 재생 목록에서 제거
                        : () => onAdd(music) // 재생 목록에 추가
                    }
                  >
                    <i
                      className={
                        music.isOnList ? 'xi-minus-min' : 'xi-plus-min'
                      }
                    />
                  </button>
                </PlaySetting>
              </MusList>
            ))}
          </MusicUL>
    

      {/* 푸터 영역 */}
      <Footer>
        현재 Top 5 음악 목록입니다. 
      </Footer>
    </Wrap>
  );
}

export default Top5;