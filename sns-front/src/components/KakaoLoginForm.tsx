import KakaoLogin from "react-kakao-login";
import { LoginResponse } from "../type/user";
import axios from "../utils/CustomAxios";
import { setCookie } from "../utils/Cookie";

export default function KakaoLoginForm({ setUser }: { setUser: (data: any) => void }) {

    const KakaoJavascriptKey = process.env.REACT_APP_KAKAO_API_KEY as string; // 환경변수 파일에 저장되어 있는 키값을 "문자열로" 가져오기
    console.log(KakaoJavascriptKey);
    /*
        로그인 성공시 실행할 콜백함수 
        인증 성공시 카카오서버에서 인가코드를 발행. 
    */
    const KakaoOnSuccess = (data: { response: LoginResponse }) => {  // 객체 형태로 받음
        console.log("카카오에서 전달받은 토큰", data);

        const ACCESS_TOKEN = data.response.access_token;  // access_token 변수에 저장하기

        setCookie("accessToken", ACCESS_TOKEN);
        
        // axios
        // .get("https://kapi.kakao.com/v2/user/me")
        // .then((res) => {
        //     console.log(res);  
        //     const { properties } = res.data;
        //     const user = {
        //         nickname: properties.nickname,
        //         profile: properties.profile_image
        //     }
        //     setUser(user);
        // })
        
        // 스프링 부트 서버를 통해 요청보내기 
        axios.post("http://localhost:8084/api/auth/login/kakao", {
            accessToken: ACCESS_TOKEN
        })
        .then(res => {
            console.log(res);
        })

    }

    const KakaoOnFail = (error:any) => {
        console.log(error);
    }

    return (
 
        <KakaoLogin
            token={KakaoJavascriptKey}
            onSuccess={KakaoOnSuccess}
            onFail={KakaoOnFail}
        />
        // token : 발급받은 API 키
        // onSuccess : 로그인 성공시 실행할 콜백함수 
        // onFail : 로그인 실패시 실행할 콜백함수
    )

}
