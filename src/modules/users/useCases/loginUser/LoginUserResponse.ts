export interface LoginUserResponse {
  user: {
    uuid: string;
    email: string;
  };
  jwt: string;
}
