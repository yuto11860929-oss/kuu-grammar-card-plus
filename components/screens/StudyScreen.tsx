"use client";

import { useEffect, useMemo, useState } from "react";
import TopBar from "@/components/ui/TopBar";
import FlipCard from "@/components/ui/FlipCard";
import BottomBar from "@/components/ui/BottomBar";
import ToastOnce from "@/components/ui/Toast";
import { loadCards } from "@/lib/data";
import { Card, CardsData, Unit } from "@/lib/types";
import { ensureUnit, loadProgress, markResult, saveProgress } from "@/lib/storage";
import { useRouter } from "next/navigation";

export default function StudyScreen({ unitNo }: { unitNo: number }) {
  const router = useRouter();
  const [data, setData] = useState<CardsData | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [side, setSide] = useState<"front" | "back">("front");
  const [store, setStore] = useState(() => loadProgress());

  useEffect(() => {
    loadCards().then(setData).catch((e) => setErr(e?.message ?? "読み込みに失敗しました"));
  }, []);

  const unit: Unit | null = useMemo(() => {
    if (!data) return null;
    return data.units.find((u) => u.unitNo === unitNo) ?? null;
  }, [data, unitNo]);

  useEffect(() => {
    if (unit) {
      const next = ensureUnit(store, unit);
      setStore(next);
      saveProgress(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit?.id]);

  const cards: Card[] = unit?.cards ?? [];
  const card = cards[index];

  const canPrev = index > 0;
  const canNext = index < cards.length - 1;
  const canMark = side === "back";

  function goPrev() {
    if (!canPrev) return;
    setIndex((i) => Math.max(0, i - 1));
    setSide("front");
  }

  function goNext() {
    if (!unit) return;
    if (canNext) {
      setIndex((i) => Math.min(cards.length - 1, i + 1));
      setSide("front");
    } else {
      router.push(`/result/${unit.unitNo}`);
    }
  }

  function mark(result: "known" | "unknown") {
    if (!unit || !card) return;
    const nextStore = markResult(store, unit, card, result);
    setStore(nextStore);
    saveProgress(nextStore);
    // テンポ重視：少し待って次へ、次カードは表
    window.setTimeout(() => {
      if (index >= cards.length - 1) {
        router.push(`/result/${unit.unitNo}`);
      } else {
        setIndex((i) => i + 1);
        setSide("front");
      }
    }, 150);
  }

  if (err) {
    return (
      <main className="min-h-dvh mx-auto w-full max-w-[520px] px-4">
        <TopBar mode="study" title="読み込みエラー" />
        <div className="text-sm text-red-600">{err}</div>
      </main>
    );
  }

  if (!data || !unit) {
    return (
      <main className="min-h-dvh mx-auto w-full max-w-[520px]">
        <TopBar mode="study" title="読み込み中…" right={<span />} />
        <div className="px-4 text-sm text-textSecondary">読み込み中…</div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh">
      <div className="mx-auto w-full max-w-[520px] flex flex-col">
        <TopBar
          mode="study"
          title={`#${String(unit.unitNo).padStart(2, "0")} ${unit.title}`}
          right={<span>{index + 1}/{cards.length}</span>}
        />

        <div className="px-4 flex-1 flex flex-col gap-3">
          {card ? (
            <FlipCard
              side={side}
              front={card.front}
              back={card.back}
              onToggle={() => setSide((s) => (s === "front" ? "back" : "front"))}
            />
          ) : (
            <div className="text-sm text-textSecondary">カードがありません</div>
          )}
        </div>

        <BottomBar
          canPrev={canPrev}
          canNext={true}
          onPrev={goPrev}
          onNext={goNext}
          canMark={canMark}
          onKnown={() => mark("known")}
          onUnknown={() => mark("unknown")}
        />

        {/* 初回だけヒント（ガイド文は常時出さない方針） */}
        <ToastOnce id="tap_to_flip" message="カードをタップして答えを表示" />
      </div>
    </main>
  );
}
