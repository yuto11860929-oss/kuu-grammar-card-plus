"use client";

import clsx from "clsx";

export default function FlipCard({
  side,
  front,
  back,
  onToggle,
}: {
  side: "front" | "back";
  front: string;
  back: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={clsx(
        "w-full rounded-card bg-surface border border-border shadow-card p-5 text-left",
        "min-h-[260px] transition",
        "active:scale-[0.99]"
      )}
      aria-pressed={side === "back"}
    >
      <div className="text-[13px] text-textSecondary mb-3">
        {side === "front" ? "問題" : "答え"}
      </div>
      <div className="whitespace-pre-wrap break-words leading-[1.55] text-[18px] font-normal">
        <MixedText text={side === "front" ? front : back} />
      </div>
    </button>
  );
}

function MixedText({ text }: { text: string }) {
  // ざっくり判定：英字比率が高い「行」はInterに寄せる（-1px）
  const lines = text.split(/\n/);
?
/);
  return (
    <>
      {lines.map((line, idx) => {
        const enChars = (line.match(/[A-Za-z]/g) ?? []).length;
        const total = Math.max(1, line.length);
        const enRatio = enChars / total;
        const isFormula = /SVOC|SVO|have\s+p\.p\.|be\s+being\s+p\.p\./i.test(line);
        const isEnLine = enRatio >= 0.45 || /^[A-Za-z]/.test(line) || isFormula;
        return (
          <span
            key={idx}
            className={clsx(
              "block",
              isEnLine && "font-[var(--font-en)]",
              isEnLine && "text-[17px] leading-[1.45]",
              isFormula && "text-[16px] leading-[1.35]"
            )}
            lang={isEnLine ? "en" : "ja"}
          >
            {line || " "}
          </span>
        );
      })}
    </>
  );
}
