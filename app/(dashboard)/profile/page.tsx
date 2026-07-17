export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Profile
        </h1>

        <p className="text-muted-foreground">
          Manage your account information.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-8">
        <h2 className="text-xl font-semibold">
          Coming Soon
        </h2>

        <p className="mt-2 text-muted-foreground">
          Profile management features will be available in a future update.
        </p>
      </div>
    </div>
  );
}