"use client";

import { useEffect, useMemo, useState } from "react";
import TopBar from "@/components/ui/TopBar";
import { loadCards } from "@/lib/data";
import { CardsData } from "@/lib/types";
import Link from "next/link";

function UnitItem({ unitNo, title, count }: { unitNo: number; title: string; count: number }) {
  return (
    <Link
      href={`/study/${unitNo}`}
      className={
        "h-16 w-full rounded-unit bg-surface border border-border shadow-card px-4 flex items-center gap-3 " +
        "transition active:scale-[0.99]"
      }
    >
      <div className="text-[12px] text-textPrimary font-normal">#{String(unitNo).padStart(2, "0")}</div>
      <div className="flex-1 text-[16px] font-medium text-textPrimary truncate">{title}</div>
      {/* 320幅相当だけ非表示（meta=off） */}
      <div className="text-[12px] text-textSecondary font-normal max-[360px]:hidden">{count}枚</div>
    </Link>
  );
}

export default function HomeScreen() {
  const [data, setData] = useState<CardsData | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    loadCards()
      .then(setData)
      .catch((e) => setErr(e?.message ?? "読み込みに失敗しました"));
  }, []);

  const units = useMemo(() => data?.units ?? [], [data]);

  return (
    <main className="min-h-dvh">
      <div className="mx-auto w-full max-w-[520px]">
        <div className="px-0">
          <div className="flex flex-col gap-3 px-0">
            {/* TopStack: TopBar + HomeHeader（8px） */}
            <div className="flex flex-col gap-2 px-0">
              <TopBar mode="home" title="英文法カード" right={
                <a
                  href="#"
                  aria-label="設定（未実装）"
                  className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-black/5 active:bg-black/10"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("設定は次のフェーズで追加します");
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M19.4 15a7.96 7.96 0 0 0 .1-1 7.96 7.96 0 0 0-.1-1l2-1.6-2-3.4-2.4 1a8.2 8.2 0 0 0-1.7-1l-.4-2.6H10l-.4 2.6a8.2 8.2 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.6a7.96 7.96 0 0 0-.1 1c0 .34.03.67.1 1l-2 1.6 2 3.4 2.4-1c.53.4 1.1.73 1.7 1l.4 2.6h4l.4-2.6c.6-.27 1.17-.6 1.7-1l2.4 1 2-3.4-2-1.6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                </a>
              } />

              {/* HomeHeader: 左テキスト(Fill) + 右猫(Fixed) */}
              <div className="flex items-start gap-3 px-4">
                <div className="flex-1 text-[12px] leading-[1.4] text-textSecondary">
                  学びたい単元を選んでスタート
                </div>
                {/* 透過しない前提：白プレート（丸角）でデザイン化 */}
                <div className="shrink-0">
                  <div className="rounded-btn border border-border bg-white shadow-[0_6px_18px_rgba(0,0,0,0.06)] overflow-hidden">
                    <img
                      src="/illustrations/kuuchan.jpg"
                      alt="くうちゃん"
                      className="block object-cover w-[88px] h-[88px] max-[360px]:w-[72px] max-[360px]:h-[72px] min-[420px]:w-[104px] min-[420px]:h-[104px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 pb-6" style={{ paddingBottom: `calc(24px + var(--safe-bottom))` }}>
              {err ? (
                <div className="text-sm text-red-600">{err}</div>
              ) : !data ? (
                <div className="text-sm text-textSecondary">読み込み中…</div>
              ) : (
                <div className="flex flex-col gap-3">
                  {units.map((u) => (
                    <UnitItem key={u.id} unitNo={u.unitNo} title={u.title} count={u.cards.length} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
