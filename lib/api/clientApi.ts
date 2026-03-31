"use client";

import { api } from "./api";
import type { Note, NoteTag } from "../../types/note";

export interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>("/notes", { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: CreateNotePayload): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};

export const register = async (email: string, password: string): Promise<any> => {
  const { data } = await api.post(`/auth/register`, { email, password });
  return data;
};

export const login = async (email: string, password: string): Promise<any> => {
  const { data } = await api.post(`/auth/login`, { email, password });
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post(`/auth/logout`);
};

export const checkSession = async (): Promise<any> => {
  const { data } = await api.get(`/auth/check-session`);
  return data;
};

export const getMe = async (): Promise<any> => {
  const { data } = await api.get(`/user/me`);
  return data;
};

export const updateMe = async (email: string, userName: string): Promise<any> => {
  const { data } = await api.patch(`/user/me`, { email, userName });
  return data;
};