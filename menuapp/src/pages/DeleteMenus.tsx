import axios from "axios";
import { useState } from "react";

const DeleteMenus = () => {
  const [menuId, setMenuId] = useState("");

  const deleteMenus = () => {
    axios
      .delete(`http://localhost:8082/api/menu/${menuId}`)
      .then((response) => {
        console.log(response);
        alert(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h4>메뉴 삭제하기(DELETE)</h4>
      <p>메뉴번호를 사용해 해당메뉴정보를 삭제함.</p>
      <input
        type="text"
        name="id"
        placeholder="메뉴번호"
        className="form-control"
        onChange={(e) => {
          setMenuId(e.target.value);
        }}
      />
      <br />
      <input
        type="button"
        className="btn btn-block btn-outline-danger btn-send"
        value="삭제"
        onClick={deleteMenus}
      />
    </div>
  );
};

export default DeleteMenus;
