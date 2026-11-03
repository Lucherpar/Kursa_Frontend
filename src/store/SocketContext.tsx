import { createContext, useContext, useState, ReactNode } from "react";

interface SocketContextType {
  socket: any;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  sendSignal: (data: any) => void;
  sendChat: (data: any) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket] = useState<any>(null);

  const joinRoom = (roomId: string) => socket?.emit("join-room", roomId);
  const leaveRoom = (roomId: string) => socket?.emit("leave-room", roomId);
  const sendSignal = (data: any) => socket?.emit("call-signal", data);
  const sendChat = (data: any) => socket?.emit("chat-message", data);

  return (
    <SocketContext.Provider value={{ socket, joinRoom, leaveRoom, sendSignal, sendChat }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error("useSocketContext debe usarse dentro de SocketProvider");
  return context;
};
