export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface Signal {
  id: string;
  asset: string;
  direction: "LONG" | "SHORT";
  entryPrice: string;
  targetPrice: string;
  stopLoss: string;
  status: "OPEN" | "CLOSED";
  userId: string;
  createdAt: string;
}