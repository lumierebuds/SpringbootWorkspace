import { Cookies } from "react-cookie";

const cookies = new Cookies(); // 쿠키

export const setCookie = (name: string, value: string) => {
  return cookies.set(name, value, { maxAge: 60 * 60 * 3, path: "/" }); //
  // 쿠키 키, 값을 받고 유효시간을 추가해 저장히기
};

export const getCookie = (name: string) => {
  return cookies.get(name);
  // 쿠키값을 가져오기
};

export const removeCookie = (name: string) => {
  return cookies.set(name, "", { maxAge: 0, path: "/" });
  // 쿠키값을 삭제하기
};
