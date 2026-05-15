export interface UserData {
  name: string;
  phone: string;
  email: string;
  comment: string;
  login?: string;
  password?: string;
}

export interface User extends UserData {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthRequest {
  authorization?: string;
}

export interface ParsedBody {
  [key: string]: any;
}

export interface HttpResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}
