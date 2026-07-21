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

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}


