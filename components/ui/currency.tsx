interface CurrencyProps {
  amount: number;
}

export default function Currency({
  amount,
}: CurrencyProps) {
  return (
    <>
      {new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      }).format(amount)}
    </>
  );
}