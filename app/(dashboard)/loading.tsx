export default function Loading() {
  return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="space-y-3 text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />

        <p className="text-sm text-muted-foreground">
          Loading...
        </p>
      </div>
    </div>
  );
}