import api from "../api/axios";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}
interface LoginPayload {
  email: string;
  password: string;
}

const registerUser = async (payload: RegisterPayload) => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};
const loginUser = async (payload: LoginPayload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

export const AuthService = {
  registerUser,
  loginUser,
};
