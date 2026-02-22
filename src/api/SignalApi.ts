import api from "./api";
import type { ApiResponse, Signal } from "./types";

export const fetchSignals = async (isAdmin: boolean) => {
  const endpoint = isAdmin ? "/signals" : "/signals/mine";
  const res = await api.get<ApiResponse<Signal[]>>(endpoint);
  return res.data.data;
};

export const createSignal = async (data: {
  asset: string;
  direction: "LONG" | "SHORT";
  entryPrice: string;
  targetPrice: string;
  stopLoss: string;
}) => {
  const res = await api.post<ApiResponse<Signal>>("/signals", data);
  return res.data.data;
};

export const updateSignal = async (id: string, data: Partial<Signal>) => {
  const res = await api.put<ApiResponse<Signal>>(`/signals/${id}`, data);
  return res.data.data;
};

export const deleteSignal = async (id: string) => {
  await api.delete(`/signals/${id}`);
};