// 타입 저장

export type User = {
  profile: string;
  nickname: string;
};

export type LoginResponse = {
  token_type: string;
  access_token: string;
  expires_in: string;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
}