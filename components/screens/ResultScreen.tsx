"use client";

import { useEffect, useMemo, useState } from "react";
import TopBar from "@/components/ui/TopBar";
import { loadCards } from "@/lib/data";
import { CardsData, Unit } from "@/lib/types";
import { loadProgress } from "@/lib/storage";
import Link from "next/link";

export default function ResultScreen({ unitNo }: { unitNo: number }) {
  const [data, setData] = useState<CardsData | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    loadCards().then(setData).catch((e) => setErr(e?.message ?? "読み込みに失敗しました"));
  }, []);

  const unit: Unit | null = useMemo(() => {
    if (!data) return null;
    return data.units.find((u) => u.unitNo === unitNo) ?? null;
  }, [data, unitNo]);

  const stats = useMemo(() => {
    const store = loadProgress();
    if (!unit) return { known: 0, unknown: 0 };
    const u = store[unit.id];
    return { known: u?.known ?? 0, unknown: u?.unknown ?? 0 };
  }, [unit]);

  if (err) {
    return (
      <main className="min-h-dvh mx-auto w-full max-w-[520px] px-4">
        <TopBar mode="result" title="結果" />
        <div className="text-sm text-red-600">{err}</div>
      </main>
    );
  }

  if (!data || !unit) {
    return (
      <main className="min-h-dvh mx-auto w-full max-w-[520px]">
        <TopBar mode="result" title="結果" />
        <div className="px-4 text-sm text-textSecondary">読み込み中…</div>
      </main>
    );
  }

  const total = stats.known + stats.unknown;
  const rate = total > 0 ? Math.round((stats.known / total) * 100) : 0;

  return (
    <main className="min-h-dvh">
      <div className="mx-auto w-full max-w-[520px]">
        <TopBar mode="result" title="結果" right={<span />} />
        <div className="px-4">
          <div className="text-[20px] font-medium">おつかれさま！</div>
          <div className="text-[12px] text-textSecondary mt-1">#{String(unit.unitNo).padStart(2, "0")} {unit.title}</div>

          <div className="mt-4 rounded-[16px] bg-surface border border-border p-4 shadow-card">
            <div className="flex items-baseline justify-between">
              <div className="text-[16px] font-medium">知ってた</div>
              <div className="text-[18px] font-medium">{stats.known}</div>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <div className="text-[16px] font-medium">知らなかった</div>
              <div className="text-[18px] font-medium">{stats.unknown}</div>
            </div>
            <div className="mt-3 text-[12px] text-textSecondary">既知率：{rate}%</div>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <Link
              href={`/study/${unit.unitNo}`}
              className="h-12 rounded-btn bg-textPrimary text-white flex items-center justify-center text-[14px] font-medium"
            >
              もう一周する
            </Link>
            <Link
              href="/"
              className="h-12 rounded-btn border border-border bg-surface flex items-center justify-center text-[14px] font-medium"
            >
              単元一覧に戻る
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
