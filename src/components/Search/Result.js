import React, { useState, useEffect } from 'react'; // React와 React Hook 불러오기
import styled from 'styled-components'; // styled-components 라이브러리 불러오기
import Album from '../Album'; // Album 컴포넌트 불러오기 (경로는 필요에 따라 수정 필요)

// Wrap 컴포넌트: 전체 검색 화면의 스타일링
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 20px;
`;

// Header 컴포넌트: 검색창의 스타일링
const Header = styled.div`
  width: 100%;
  height: 13%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  > input[type='text'] { // 텍스트 입력창 스타일
    width: 90%;
    height: 3.5rem;
    border: none;
    border-radius: 2rem;
    background-color: ${({ theme }) => theme.colors.gray7}; // 테마의 회색7 적용
    padding: 0 1.5rem;
    font-size: 1.5rem;
  }
  &::after { // 아이콘 스타일 (예: 검색 버튼용)
    font-family: 'xeicon';
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 83%;
    color: ${({ theme }) => theme.colors.gray3}; // 테마의 회색3 적용
    cursor: pointer;
  }
`;

// PlaylistWrap, PlaylistUl, PlaylistLi: 검색된 음악 목록의 스타일링
const PlaylistWrap = styled.div``;

const PlaylistUl = styled.ul``;

const PlaylistLi = styled.li`
  height: 8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 1.5rem;
  padding: 0 0.5rem;
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray7}; // 테마의 회색7으로 구분선
  }
`;

// PlaySetting 컴포넌트: 플레이 버튼 및 추가/제거 버튼 스타일
const PlaySetting = styled.div`
  button {
    margin-left: 0.8rem;

    i {
      font-size: 3rem;
      color: ${({ theme }) => theme.colors.gray3}; // 기본 버튼 색상: 회색3
    }
    .xi-play.active,
    .xi-pause.active { // 활성화된 플레이/일시정지 버튼 스타일
      color: ${({ theme }) => theme.colors.pink}; // 테마의 핑크색 적용
      font-weight: 700; // 굵게
    }
  }
`;

// Search 컴포넌트: 검색 화면의 주요 기능 및 렌더링
function Search({
  musics, // 음악 목록
  handlePlayMusic, // 음악 재생 핸들러
  onAddPlaylist, // 재생목록 추가 핸들러
  onRemovePlaylist, // 재생목록 제거 핸들러
  onPlay, // 현재 재생 상태
  setOnPlay, // 재생 상태 업데이트 함수
  current, // 현재 재생 중인 음악
}) {
  const [list, setList] = useState([]); // 검색 결과를 저장할 상태
  const [value, setValue] = useState(''); // 검색어를 저장할 상태

  // 검색어 입력 시 상태 업데이트
  const onChange = (e) => {
    const term = e.target.value;
    setValue(term);
  };

  // 검색 버튼 클릭 시 동작
  const onSearchClick = () => {
    if (value.trim() === '') {
      alert('검색어를 입력해주세요!'); // 빈 입력 방지
    } 
  };

  // 재생목록에 음악 추가
  const onAdd = (music) => {
    setList((prev) =>
      prev.map((v) => {
        if (v.title === music.title) {
          v.isOnList = true; // 재생목록에 추가된 상태로 표시
        }
        return v;
      })
    );
    onAddPlaylist(music); // 부모 컴포넌트에 추가 요청
  };

  // 재생목록에서 음악 제거
  const onRemove = (music) => {
    setList((prev) =>
      prev.map((v) => {
        if (v.title === music.title) {
          v.isOnList = false; // 재생목록에서 제거된 상태로 표시
        }
        return v;
      })
    );
    onRemovePlaylist(music); // 부모 컴포넌트에 제거 요청
  };

  // 검색 기능: 검색어가 입력될 때마다 실행
  useEffect(() => {
    let term = value.toLowerCase(); // 검색어를 소문자로 변환
    if (term.length) {
      let filtered = musics.filter(
        (v) =>
          v.title.toLowerCase().includes(term) || // 제목에 검색어 포함
          v.artists[0].toLowerCase().includes(term) // 아티스트 이름에 검색어 포함
      );
      setList(filtered); // 필터링된 결과를 상태로 저장
    }
  }, [value, musics]); // 검색어와 음악 목록이 변경될 때 실행

  return (
    <Wrap>
      <Header>
        <input
          type="text"
          placeholder="찾으실 노래를 검색해주세요!" // 검색창 placeholder
          value={value}
          onChange={(e) => onChange(e)}
        />
        <div onClick={onSearchClick} style={{ position: 'absolute', right: '5%' }}>
          🔍
        </div>
      </Header>
      <PlaylistWrap>
        <PlaylistUl>
          {list?.map((music, idx) => ( // 검색 결과를 리스트로 렌더링
            <PlaylistLi key={idx}>
              <Album music={music} /> {/* Album 컴포넌트로 음악 정보 렌더링 */}
              <PlaySetting>
                <button
                  onClick={
                    music?.title === current?.title && !!onPlay
                      ? () => setOnPlay(false) // 재생 중일 경우 일시정지
                      : () => handlePlayMusic(music) // 재생
                  }
                >
                  <i
                    className={
                      music?.title === current?.title && !!onPlay
                        ? `xi-pause active` // 재생 중인 경우 일시정지 아이콘 활성화
                        : `xi-play ${onPlay ? '' : 'active'}` // 정지된 경우 재생 아이콘 활성화
                    }
                  />
                </button>
                <button
                  onClick={
                    music.isOnList ? () => onRemove(music) : () => onAdd(music) // 추가/제거 버튼
                  }
                >
                  <i
                    className={music.isOnList ? 'xi-minus-min' : 'xi-plus-min'} // 아이콘 변경
                  />
                </button>
              </PlaySetting>
            </PlaylistLi>
          ))}
        </PlaylistUl>
      </PlaylistWrap>
    </Wrap>
  );
}

export default Search; // Search 컴포넌트 내보내기
