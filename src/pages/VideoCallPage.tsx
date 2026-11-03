import { useParams } from "react-router-dom";

export default function VideoCallPage() {
  const { roomId } = useParams();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Videollamada</h1>
      <div className="bg-muted rounded-lg w-full aspect-video flex items-center justify-center">
        <p className="text-muted-foreground">Sala: {roomId}</p>
      </div>
    </div>
  );
}
