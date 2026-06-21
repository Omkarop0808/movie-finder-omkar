export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <p className="text-foreground font-bold animate-pulse text-xl uppercase tracking-widest">
        [CAMERA ROLLING...]
      </p>
    </div>
  );
}

export function ErrorMessage({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-start justify-center py-24 text-left border-l-4 border-primary pl-6">
      <h3 className="text-xl font-bold text-primary mb-2 uppercase">
        [SCENE REJECTED]
      </h3>
      <p className="text-foreground">
        ERROR DETAILS: {message || "CONNECTION LOST."}
      </p>
    </div>
  );
}
