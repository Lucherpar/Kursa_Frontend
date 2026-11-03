import { getSocket } from "../lib/socket";

export const useSocketConnection = (_roomId: string | null, _onMessage: (message: any) => void) => {
  const socket = getSocket();
  return { socket };
};
