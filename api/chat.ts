import { Message } from "@/hooks/chat";

const API_URL = "http://127.0.0.1:8000";

export const getMessages = async (): Promise<Message[]> =>
  await fetch(`${API_URL}/`, {
    method: "GET",
  }).then((res) => res.json());

export const sendMessage = async (text: string): Promise<Message[]> =>
  await fetch(`${API_URL}/?text=${text}`, {
    method: "POST",
  }).then((res) => res.json());

export const updateMessage = async (
  id: string,
  text: string
): Promise<Message[]> =>
  await fetch(`${API_URL}/${id}?text=${text}`, {
    method: "PUT",
  }).then((res) => res.json());

export const deleteMessage = async (id: string): Promise<Message[]> =>
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
