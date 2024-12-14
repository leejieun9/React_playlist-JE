import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import db from './assets/db.json'; // 로컬 JSON 파일에서 음악 데이터를 가져옴
import {
  Header,
  Splash,
  MainList,
  Playlist,
  Search,
  Tab,
  PlayView,
} from './components'; // 여러 컴포넌트 import

// 전체 화면을 감싸는 컨테이너 스타일
const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

// 스플래시 화면의 페이드아웃 애니메이션 정의
const hideSplashScreen = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
`;

// 스플래시 화면 스타일 정의
const SplashWrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  animation: ${hideSplashScreen} 1s ease-in-out forwards;
  animation-delay: 1.5s; // 애니메이션 시작 전 1.5초 지연
  z-index: 11; // 다른 요소 위에 렌더링
`;

function App() {
  // 현재 페이지 상태 관리
  const [page, setPage] = useState('Main'); // 기본 페이지는 'Main'
  // 오디오 객체 상태 관리
  const [audio, setAudio] = useState();
  // 재생 상태 관리
  const [onPlay, setOnPlay] = useState(false);
  // 플레이 뷰 활성화 상태 관리
  const [onPlayView, setOnPlayView] = useState(false);
  // 재생목록 관리
  const [playlist, setPlaylist] = useState([]);
  // 전체 음악 리스트 관리
  const [list, setList] = useState([]);
  // 현재 재생 중인 음악 정보 관리
  const [current, setCurrent] = useState({});

  // 현재 재생 음악 설정 함수
  const onCurrentMusic = (music) => {
    setCurrent(music); // 현재 음악 정보 업데이트
    audio?.pause(); // 기존 오디오 중지
    setAudio(new Audio(music.source)); // 새로운 오디오 객체 생성
    setTimeout(() => setOnPlay(true), 10000); // 10초 후 재생 상태 활성화
  };

  // 탭 네비게이션 상태 변경 함수
  const onTabNav = (nav) => {
    setPage(nav); // 페이지 상태를 선택된 탭으로 변경
  };

  // 재생목록에 음악 추가 함수
  const onAddPlaylist = (music) => {
    setPlaylist((pre) => {
      let isOn = !!pre.find((v) => v.title === music.title); // 이미 재생목록에 있는지 확인
      return isOn ? pre : [...pre, music]; // 중복되지 않으면 추가
    });
  };

  // 재생목록에서 음악 제거 함수
  const onRemovePlaylist = (music) => {
    setPlaylist((pre) => pre.filter((v) => v.title !== music.title)); // 선택된 음악 제거
  };

  // JSON 파일에서 음악 데이터 가져오기 함수
  const getMusics = async () => {
    const { musics } = db; // JSON에서 음악 데이터 가져오기
    musics.sort((a, b) => -a.vote + b.vote); // 투표 순으로 정렬
    musics.map((v) => {
      v.cover = `/covers/${v.cover}`; // 이미지 경로 수정
      v.isOnList = false; // 리스트 추가 상태 초기화
      return v;
    });
    setList(musics); // 정리된 음악 리스트 업데이트
  };

  // 컴포넌트 마운트 시 음악 데이터 가져오기
  useEffect(() => {
    getMusics();
  }, []);

  // 재생 상태 변경 시 오디오 재생/일시정지 처리
  useEffect(() => {
    onPlay ? audio?.play() : audio?.pause();
  }, [onPlay, audio]);

  // 오디오 재생 종료 이벤트 처리
  useEffect(() => {
    audio?.addEventListener('ended', () => setOnPlay(false)); // 재생 종료 시 상태 변경
    return () => {
      audio?.removeEventListener('ended', () => setOnPlay(false)); // 클린업
    };
  }, [audio]);

  return (
    <Wrap>
      <Header />

      {/* 스플래시 화면 */}
      <SplashWrap>
        <Splash />
      </SplashWrap>

      {/* 메인 페이지 */}
      {page === 'Main' && (
        <MainList
          musics={list} // 음악 리스트 전달
          onAddPlaylist={onAddPlaylist} // 재생목록 추가 함수 전달
          onRemovePlaylist={onRemovePlaylist} // 재생목록 제거 함수 전달
          onCurrentMusic={onCurrentMusic} // 현재 음악 변경 함수 전달
          setOnPlay={setOnPlay} // 재생 상태 설정 함수 전달
          current={current} // 현재 음악 정보 전달
          onPlay={onPlay} // 재생 상태 전달
          setOnPlayView={(boolean) => setOnPlayView(boolean)} // 플레이 뷰 상태 설정 함수 전달
        />
      )}

      {/* 재생목록 페이지 */}
      {page === 'Playlist' && (
        <Playlist
          playlist={playlist} // 재생목록 전달
          onRemovePlaylist={onRemovePlaylist} // 재생목록 제거 함수 전달
        />
      )}

      {/* 검색 페이지 */}
      {page === 'Search' && (
        <Search
          musics={list} // 음악 리스트 전달
          playlist={playlist} // 재생목록 전달
          onAddPlaylist={onAddPlaylist} // 재생목록 추가 함수 전달
          onRemovePlaylist={onRemovePlaylist} // 재생목록 제거 함수 전달
          current={current} // 현재 음악 정보 전달
          setOnPlay={setOnPlay} // 재생 상태 설정 함수 전달
          onPlay={onPlay} // 재생 상태 전달
          onCurrentMusic={onCurrentMusic} // 현재 음악 변경 함수 전달
          setOnPlayView={(boolean) => setOnPlayView(boolean)} // 플레이 뷰 상태 설정 함수 전달
        />
      )}

      {/* 재생 뷰 활성화 */}
      {onPlayView && (
        <PlayView
          audio={audio} // 오디오 객체 전달
          music={current} // 현재 음악 정보 전달
          onPlayView={onPlayView} // 플레이 뷰 활성화 상태 전달
          onPlay={onPlay} // 재생 상태 전달
          setOnPlay={setOnPlay} // 재생 상태 설정 함수 전달
          setOnPlayView={(boolean) => setOnPlayView(boolean)} // 플레이 뷰 상태 설정 함수 전달
        />
      )}

      {/* 하단 탭 네비게이션 */}
      <Tab onTabNav={onTabNav} />
    </Wrap>
  );
}

export default App;
