import axios from "axios";
import { ChangeEvent, useState } from "react";
import { initialMenu } from "../type/menu";

const UpdateMenus = () => {
  const [menuId, setMenuId] = useState(""); // 수정시 조회할 메뉴아이디

  const [updateMenu, setUpdateMenu] = useState(initialMenu); // 수정요청을 보내게될 메뉴

  const selectOneMenu = () => {
    axios
      .get(`http://localhost:8082/api/menu/${menuId}`)
      .then((response) => {
        console.log(response.data);
        setUpdateMenu(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (e: ChangeEvent) => {
    const { value, name } = e.target as HTMLInputElement;
    setUpdateMenu({
      ...updateMenu,
      [name]: value,
    });
  };

  const updateMenus = () => {
    axios
      .put(`http://localhost:8082/api/menu/${updateMenu.id}`, updateMenu)
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div>
        <h4>메뉴수정하기(PUT)</h4>
        <p>메뉴번호를 사용해 해당메뉴정보를 수정함.</p>
        <input
          type="text"
          name="id"
          placeholder="메뉴번호"
          className="form-control"
          value={menuId}
          onChange={(e) => {
            setMenuId(e.target.value);
          }}
        />
        <br />
        <input
          type="button"
          className="btn btn-block btn-outline-primary btn-send"
          value="검색"
          onClick={selectOneMenu}
        />
      </div>
      <form
        id="menuEnrollFrm"
        onSubmit={(e) => {
          e.preventDefault(); // 기본 이벤트 호출 방지 - 새로고침되는거 방지
          (e.target as HTMLFormElement).reset(); // 제출시에 값을 초기화 시키기
        }}
      >
        <input type="hidden" name="id" value={updateMenu.id} />
        <input
          type="text"
          name="restaurant"
          placeholder="음식점"
          className="form-control"
          value={updateMenu.restaurant}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="name"
          placeholder="메뉴"
          className="form-control"
          value={updateMenu.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="가격"
          className="form-control"
          value={updateMenu.price}
          onChange={handleInputChange}
        />
        <div className="form-check form-check-inline">
          <input
            type="radio"
            className="form-check-input"
            name="type"
            id="post-kr"
            value="kr"
            onChange={handleInputChange}
            checked={updateMenu.type == "kr"}
            // true, false값을 통해 체크처리 하게만든다.
          />
          <label htmlFor="post-kr" className="form-check-label">
            한식
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            className="form-check-input"
            name="type"
            id="post-ch"
            value="ch"
            onChange={handleInputChange}
            checked={updateMenu.type == "ch"}
            // true, false값을 통해 체크처리 하게만든다.
          />
          <label htmlFor="post-ch" className="form-check-label">
            중식
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            className="form-check-input"
            name="type"
            id="post-jp"
            value="jp"
            onChange={handleInputChange}
            checked={updateMenu.type == "jp"}
            // true, false값을 통해 체크처리 하게만든다.
          />
          <label htmlFor="post-jp" className="form-check-label">
            일식
          </label>
        </div>
        <br />
        <div className="form-check form-check-inline">
          <input
            type="radio"
            className="form-check-input"
            name="taste"
            id="post-hot"
            value="hot"
            onChange={handleInputChange}
            checked={updateMenu.taste == "hot"}
          />
          <label htmlFor="post-hot" className="form-check-label">
            매운맛
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            className="form-check-input"
            name="taste"
            id="post-mild"
            value="mild"
            onChange={handleInputChange}
            checked={updateMenu.taste == "mild"}
          />
          <label htmlFor="post-mild" className="form-check-label">
            순한맛
          </label>
        </div>
        <br />
        <input
          type="submit"
          className="btn btn-block btn-outline-success btn-send"
          value="등록"
          onClick={updateMenus}
        />
      </form>
    </>
  );
};

export default UpdateMenus;