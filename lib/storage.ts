import { ProgressStore, Unit, Card } from "@/lib/types";

const KEY = "wh_progress_v1";

export function loadProgress(): ProgressStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || !parsed) return {};
    return parsed as ProgressStore;
  } catch {
    return {};
  }
}

export function saveProgress(store: ProgressStore) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    // ignore
  }
}

export function ensureUnit(store: ProgressStore, unit: Unit): ProgressStore {
  const key = unit.id;
  if (store[key]) return store;
  return {
    ...store,
    [key]: { known: 0, unknown: 0, cards: {} },
  };
}

export function markResult(store: ProgressStore, unit: Unit, card: Card, result: "known" | "unknown"): ProgressStore {
  const key = unit.id;
  const u = store[key] ?? { known: 0, unknown: 0, cards: {} };
  const c = u.cards[card.id] ?? { known: 0, unknown: 0 };
  const nextC = {
    ...c,
    known: c.known + (result === "known" ? 1 : 0),
    unknown: c.unknown + (result === "unknown" ? 1 : 0),
    last: result,
    at: Date.now(),
  };
  const nextU = {
    ...u,
    known: u.known + (result === "known" ? 1 : 0),
    unknown: u.unknown + (result === "unknown" ? 1 : 0),
    cards: { ...u.cards, [card.id]: nextC },
  };
  return { ...store, [key]: nextU };
}
