import api from "../api/axios";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

const registerUser = async (payload: RegisterPayload) => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};

export const AuthService = {
  registerUser,
};
