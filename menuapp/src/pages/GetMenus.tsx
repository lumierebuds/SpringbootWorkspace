import axios from "axios";
import Menus from "../components/Menus";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectAllMenu } from "../features/menuSlice";

const GetMenus = () => {
  const dispatch = useDispatch();

  // 전체 메뉴조회
  useEffect(() => {
    // 경로는 스프랑 서버의 포트에 해당하는 경로로 설정해줘야 한다.
    // Origin? 프로토콜 + ip주소 + 포트번호
    // 브라주어 상에서는 같은 Origin끼리만 통신이 가능
    axios.get("http://localhost:8082/api/menus").then((response) => {
      dispatch(selectAllMenu(response.data));
    });
  }, []);

  return (
    <>
      <div>
        <h4>전체 메뉴 조회(GET)</h4>
      </div>
      <Menus />
    </>
  );
};

export default GetMenus;
