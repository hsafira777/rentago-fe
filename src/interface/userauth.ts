export interface UserAuth {
  name: string;
  email: string;
  role: "USER" | "TENANT";
  token: string;
}

export interface AuthStore {
  user: UserAuth | null;
}