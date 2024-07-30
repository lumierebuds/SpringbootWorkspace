import './App.css';
import { useEffect, useState } from 'react';
import { RootState } from './store/store';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Member } from './type/type';
import { logOut, setUser } from './features/userSlice';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ChattingRoomList from './pages/ChattingRoomList';
import ChattingRoom from './pages/ChattingRoom';

function App() {

  const user = useSelector((state: RootState) => state.user);
  const [userList, setUserList] = useState<Member[]>([]); // userList  -  사용자의 목록
  const [userNo, setUserNo] = useState(0); // userNo  - 사용자 번호
  const dispatch = useDispatch();
  const navi = useNavigate();


  useEffect(() => {
    axios.get("http://localhost:8083/chatApp/allUsers")
      .then((response) => {
        setUserList(response.data); // setUserList로 사용자의 목록을 설정해준다. 
      })
      .catch((error) => {
        console.log(error);
      })
  },[]) // 처음 컴포넌트 렌더링될때 "사용자 정보를 가져오기" 

  const selectUser = () => {
    if (userNo == 0) return;
    let user = userList.find(u =>  u.userNo == userNo ) as Member; // 사용자 목록에서 체크박스로 선택한 사용자 선택  
    dispatch(setUser(user)); // 선택했던 사용자로 채팅할 수 있게 상태 변경
  }

  return (
    <div className="App">
      {
        user.userNo == 0 ? (
          <>
            <h2>채팅 계정 선택</h2>
            <div className='card-wrapper'>
            {
              userList.map((user) => {
                return (
                  <div className='card' key={user.userNo}>
                    <label>
                      <img src={user.profile}></img>
                      <div className='user-info'>
                        <span className='user-nickname'>{user.nickName}</span>
                      </div>
                      <input type='radio' name='userNo' value={user.userNo}
                        onChange={(e) => {
                          console.log("실행");
                          setUserNo(Number(e.target.value));
                        }}
                      />
                    </label>
                  </div>
                )  
              })
            }
            </div>
            <button onClick={selectUser}>선택</button>
          </>
        ) : (
          <>
          <div className="header">
            <div className='header-2'>
            <div className='user-info'>
              <img src={user.profile}/>
              <span className='user-nickname'>{user.nickName}</span>                
            </div>
            <button className='logout-btn' onClick={() => {
              dispatch(logOut());
              navi("/");
            }}>로그아웃</button>
            </div>
          </div>
          <Routes>
            <Route path='/' element={<ChattingRoomList/>} />
            <Route path='/list' element={<ChattingRoomList/>} />
            <Route path='/detail/:chatRoomNo' element={<ChattingRoom/>}/>
          </Routes>
          </>
          ) 
      }
    </div>
  );
}

export default App;
