export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <h1 className="text-7xl font-bold">
        404
      </h1>

      <p className="mt-4 text-lg text-muted-foreground">
        The page you are looking for does not exist.
      </p>
    </main>
  );
}