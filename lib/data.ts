import { CardsData } from "@/lib/types";

export async function loadCards(): Promise<CardsData> {
  const res = await fetch("/cards.json", { cache: "no-store" });
  if (!res.ok) {
    throw new Error("cards.json を読み込めませんでした");
  }
  return (await res.json()) as CardsData;
}
