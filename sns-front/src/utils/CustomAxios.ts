import axios from "axios";
import { getCookie } from "./Cookie";


// axios전송시 header에 항상 access_token을 추가
const CustomAxios = axios.create({
    // headers:{
    //     "Authorization" : getCookie("accessToken")
    // }
})

CustomAxios.interceptors.request.use(function(request){
    //끼어들 코드
    request.headers.Authorization = "Bearer "+getCookie('accessToken')

    return request;
})

export default CustomAxios;