import React, { useState } from "react";
import "./App.css";
import { User } from "./type/user";
import KakaoLoginForm from "./components/KakaoLoginForm";

function App() {
  // 로그인 정보를 저장할 state
  const [user, setUser] = useState<User | null>();

  return (
    <div className="App">
      {user ? (
        <>
          <img src={user.profile} />
          <div>
            <span>{user.nickname}</span>
          </div>
          <button onClick={() => setUser(null)}>로그아웃</button>
        </>
      ) : (
        <KakaoLoginForm setUser={setUser} />
      )}
    </div>
  );
}

export default App;
