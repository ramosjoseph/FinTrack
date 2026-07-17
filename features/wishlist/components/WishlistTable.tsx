"use client";

import type { WishlistItem } from "../types/wishlist";

import DeleteWishlistButton from "./DeleteWishlistButton";
import PurchasedToggle from "./PurchasedToggle";

interface Props {
  items: WishlistItem[];
}

export default function WishlistTable({
  items,
}: Props) {
  return (
    <div className="rounded-xl border bg-card">
      <div className="border-b p-6">
        <h2 className="text-xl font-semibold">
          Wishlist Items
        </h2>

        <p className="text-sm text-muted-foreground">
          {items.length} item(s)
          saved.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left">
                Item
              </th>

              <th className="px-6 py-3 text-left">
                Target Price
              </th>

              <th className="px-6 py-3 text-left">
                Priority
              </th>

              <th className="px-6 py-3 text-left">
                Status
              </th>

              <th className="px-6 py-3 text-left">
                Target Date
              </th>

              <th className="px-6 py-3 text-left">
                Notes
              </th>

              <th className="px-6 py-3 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center text-muted-foreground"
                >
                  No wishlist items yet.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b"
                >
                  <td className="px-6 py-4 font-medium">
                    {item.item_name}
                  </td>

                  <td className="px-6 py-4">
                    ₱
                    {Number(
                      item.target_price
                    ).toLocaleString(
                      "en-PH",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        item.priority ===
                        "high"
                          ? "bg-red-100 text-red-700"
                          : item.priority ===
                            "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.priority
                        .charAt(0)
                        .toUpperCase() +
                        item.priority.slice(
                          1
                        )}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        item.purchased
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item.purchased
                        ? "Purchased"
                        : "Pending"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {item.target_date
                      ? new Date(
                          item.target_date
                        ).toLocaleDateString(
                          "en-PH",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )
                      : "—"}
                  </td>

                  <td className="px-6 py-4">
                    {item.notes ?? "—"}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <PurchasedToggle
                        itemId={item.id}
                        purchased={
                          item.purchased
                        }
                      />

                      <DeleteWishlistButton
                        itemId={item.id}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}