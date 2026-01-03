export type Card = {
  id: string;
  no: number;
  front: string; // 問題
  back: string;  // 答え
};

export type Unit = {
  unitNo: number;
  id: string;
  title: string;
  cards: Card[];
};

export type CardsData = {
  schemaVersion: number;
  units: Unit[];
  missingUnits?: number[];
};

export type CardProgress = {
  known: number;
  unknown: number;
  last?: "known" | "unknown";
  at?: number;
};

export type UnitProgress = {
  known: number;
  unknown: number;
  cards: Record<string, CardProgress>;
};

export type ProgressStore = Record<string, UnitProgress>; // key=unitId
