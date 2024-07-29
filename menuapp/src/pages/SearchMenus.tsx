import { useDispatch } from "react-redux";
import { selectAllMenu } from "../features/menuSlice";

import Menus from "../components/Menus";
import useInput from "../hook/useInput";
import { searchKeyword } from "../type/menu";

import axios from "axios";
import { useEffect } from "react";
const SearchMenus = () => {
  // 검색 키워드 (타입, 맛)
  const [searchKeyword, onChangeKeyword] = useInput<searchKeyword>({
    type: "kr",
    taste: "mild",
  });

  const dispatch = useDispatch();

  // 검색요청을 보내는 함수
  const searchMenus = () => {
    axios
      .get(
        `http://localhost:8082/api/searchMenu/type/${searchKeyword.type}/taste/${searchKeyword.taste}`
      )
      .then((response) => {
        console.log(response.data);
        dispatch(selectAllMenu(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    return () => {
      //  컴포넌트가 소멸될때 실행할 코드
      dispatch(selectAllMenu([]));
    };
  });

  return (
    <>
      <div>
        <h4>추천메뉴(GET)</h4>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            className="form-check-input"
            name="type"
            id="get-no-type"
            value="all"
            checked={searchKeyword.type == "all"}
            onChange={onChangeKeyword}
          />
          <label htmlFor="get-no-type" className="form-check-label">
            모두
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            className="form-check-input"
            id="get-kr"
            name="type"
            value="kr"
            checked={searchKeyword.type == "kr"}
            onChange={onChangeKeyword}
          />
          <label htmlFor="get-kr" className="form-check-label">
            한식
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            className="form-check-input"
            id="get-ch"
            name="type"
            value="ch"
            checked={searchKeyword.type == "ch"}
            onChange={onChangeKeyword}
          />
          <label htmlFor="get-ch" className="form-check-label">
            중식
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            className="form-check-input"
            name="type"
            id="get-jp"
            value="jp"
            checked={searchKeyword.type == "jp"}
            onChange={onChangeKeyword}
          />
          <label htmlFor="get-jp" className="form-check-label">
            일식
          </label>
        </div>
        <br />
        <div className="form-check form-check-inline">
          <input
            type="radio"
            className="form-check-input"
            id="get-no-taste"
            name="taste"
            value="all"
            checked={searchKeyword.taste == "all"}
            onChange={onChangeKeyword}
          />
          <label htmlFor="get-no-taste" className="form-check-label">
            모두
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            className="form-check-input"
            id="get-hot"
            name="taste"
            value="hot"
            checked={searchKeyword.taste == "hot"}
            onChange={onChangeKeyword}
          />
          <label htmlFor="get-hot" className="form-check-label">
            매운맛
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            className="form-check-input"
            name="taste"
            id="get-mild"
            value="mild"
            checked={searchKeyword.taste == "mild"}
            onChange={onChangeKeyword}
          />
          <label htmlFor="get-mild" className="form-check-label">
            순한맛
          </label>
        </div>
        <br />
        <input
          type="button"
          className="btn btn-block btn-outline-success btn-send"
          value="전송"
          onClick={() => searchMenus()}
        />
        <Menus />
      </div>
    </>
  );
};

export default SearchMenus;
