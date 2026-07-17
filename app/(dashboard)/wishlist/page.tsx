import WishlistForm from "@/features/wishlist/components/WishlistForm";
import WishlistSummary from "@/features/wishlist/components/WishlistSummary";
import WishlistTable from "@/features/wishlist/components/WishlistTable";

import { WishlistService } from "@/features/wishlist/services/wishlist.service";

export default async function WishlistPage() {
  const items =
    await WishlistService.getItems();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Wishlist
        </h1>

        <p className="text-muted-foreground">
          Track purchases and
          financial goals.
        </p>
      </div>

      <WishlistSummary
        items={items}
      />

      <WishlistForm />

      <WishlistTable
        items={items}
      />
    </div>
  );
}