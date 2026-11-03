export const LessonCard = ({ lesson }: { lesson: any }) => {
  return (
    <div className="border border-border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer">
      <h3 className="font-medium">{lesson.title}</h3>
      <p className="text-sm text-muted-foreground">{lesson.contentType}</p>
    </div>
  );
};

export const DropzoneZone = ({ onFilesAdded }: { onFilesAdded: (files: File[]) => void }) => {
  return (
    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
      <p className="text-muted-foreground">Haz clic o arrastra archivos aquí</p>
      <input type="file" multiple className="sr-only" onChange={(e) => onFilesAdded(Array.from(e.target.files || []))} />
    </div>
  );
};
