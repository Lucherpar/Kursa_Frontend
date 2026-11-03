export const TextContent = ({ value }: { value: string }) => {
  return (
    <div className="prose prose-sm max-w-none">
      {value ? (
        <div dangerouslySetInnerHTML={{ __html: value }} />
      ) : (
        <p className="text-muted-foreground">Sin contenido disponible</p>
      )}
    </div>
  );
};

export const ImageGallery = ({ images }: { images: string[] }) => {
  if (images.length === 0) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {images.map((src, i) => (
        <img key={i} src={src} alt="" className="rounded-lg w-full h-32 object-cover" />
      ))}
    </div>
  );
};

export const VideoPlayer = ({ src }: { src: string }) => {
  return (
    <div className="w-full aspect-video rounded-lg bg-muted overflow-hidden">
      <video src={src} controls className="w-full h-full" />
    </div>
  );
};
