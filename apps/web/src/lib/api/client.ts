import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";
const API_TIMEOUT =
  Number(process.env.NEXT_PUBLIC_API_TIMEOUT_MS ?? "") || 15000;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: API_TIMEOUT,
});

export type Post = {
  id: string;
  author: {
    firstName: string;
    lastName: string;
    role: string;
    avatarColor: string;
    avatarUrl: string | null;
  };
  message: string;
  imageUrl?: string;
  likes: number;
  reactions: {
    label: string;
    count: number;
  }[];
  createdAt: string;
  tags: string[];
};

export class ApiUnauthorizedError extends Error {
  constructor(message = "Authentification requise") {
    super(message);
    this.name = "ApiUnauthorizedError";
  }
}

export class ApiForbiddenError extends Error {
  constructor(message = "Accès interdit") {
    super(message);
    this.name = "ApiForbiddenError";
  }
}

export async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await apiClient.get<Post[]>("/posts");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new ApiUnauthorizedError();
      }
      if (error.response?.status === 403) {
        throw new ApiForbiddenError();
      }
    }
    throw error;
  }
}
