export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;

  loading: boolean;

  setUser: React.Dispatch<React.SetStateAction<User | null>>;

  setToken: React.Dispatch<React.SetStateAction<string | null>>;

  logout: () => void;
}
