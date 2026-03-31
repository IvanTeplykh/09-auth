import { cookies } from "next/headers";
import { api } from "./api";
import type { Note } from "../../types/note";
import type { FetchNotesParams, FetchNotesResponse } from "./clientApi";

const getHeaders = async () => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join("; ");
  
  return {
    Cookie: allCookies,
  };
};

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const headers = await getHeaders();
  const { data } = await api.get<FetchNotesResponse>("/notes", { 
    params,
    headers 
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const headers = await getHeaders();
  const { data } = await api.get<Note>(`/notes/${id}`, { headers });
  return data;
};

export const getMe = async (): Promise<any> => {
  const headers = await getHeaders();
  const { data } = await api.get(`/user/me`, { headers });
  return data;
};

export const checkSession = async (): Promise<any> => {
  const headers = await getHeaders();
  const { data } = await api.get(`/auth/check-session`, { headers });
  return data;
};