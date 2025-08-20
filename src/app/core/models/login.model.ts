export interface LoginRequest {
  userName: string;
  password: string;
}

export interface UserResponse {
  userId: string;
  firstName: string;
  lastName: string;
  position: string;
  userName: string;
  role: string; 
}
