import type { WishlistItem } from "../types/wishlist";

interface Props {
  items: WishlistItem[];
}

export default function WishlistSummary({
  items,
}: Props) {
  const totalValue = items.reduce(
    (sum, item) =>
      sum + Number(item.target_price),
    0
  );

  const pendingItems =
    items.filter(
      (item) => !item.purchased
    );

  const purchasedItems =
    items.filter(
      (item) => item.purchased
    );

  const pendingValue =
    pendingItems.reduce(
      (sum, item) =>
        sum +
        Number(item.target_price),
      0
    );

  const purchasedValue =
    purchasedItems.reduce(
      (sum, item) =>
        sum +
        Number(item.target_price),
      0
    );

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Total Wishlist Value
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          ₱
          {totalValue.toLocaleString(
            "en-PH",
            {
              minimumFractionDigits: 2,
            }
          )}
        </h2>

        <p className="mt-2 text-xs text-muted-foreground">
          {items.length} item(s)
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Pending Items
        </p>

        <h2 className="mt-2 text-2xl font-bold text-blue-600">
          {pendingItems.length}
        </h2>

        <p className="mt-2 text-xs text-muted-foreground">
          ₱
          {pendingValue.toLocaleString(
            "en-PH",
            {
              minimumFractionDigits: 2,
            }
          )}
          {" "}remaining
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Purchased Items
        </p>

        <h2 className="mt-2 text-2xl font-bold text-green-600">
          {purchasedItems.length}
        </h2>

        <p className="mt-2 text-xs text-muted-foreground">
          ₱
          {purchasedValue.toLocaleString(
            "en-PH",
            {
              minimumFractionDigits: 2,
            }
          )}
          {" "}completed
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Completion Rate
        </p>

        <h2 className="mt-2 text-2xl font-bold text-primary">
          {items.length > 0
            ? (
                (purchasedItems.length /
                  items.length) *
                100
              ).toFixed(0)
            : 0}
          %
        </h2>

        <p className="mt-2 text-xs text-muted-foreground">
          Wishlist progress
        </p>
      </div>
    </div>
  );
}