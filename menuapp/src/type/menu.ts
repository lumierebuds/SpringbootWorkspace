export type MenuType = "all" | "kr" | "jp" | "ch";

export type MenuTaste = "all" | "mild" | "hot";
// 가질 수 있는값이 enum 타입으로 가져올 수 있기 때문에
// 리액트에서도 타입을 지정해준다.

export interface Menu {
  id: number;
  restaurant: string;
  name: string;
  price: number;
  type: MenuType;
  taste: MenuTaste;
}

// 게시물 메뉴 한개
export const initialMenu: Menu = {
  id: 0,
  restaurant: "",
  name: "",
  price: 0,
  type: "kr",
  taste: "mild",
} as const;

// 검색어 타입

export type searchKeyword = {
  type: MenuType;
  taste: MenuTaste;
};

// 게시물 메뉴 리스트
export const initialMenuList: Menu[] = [];
