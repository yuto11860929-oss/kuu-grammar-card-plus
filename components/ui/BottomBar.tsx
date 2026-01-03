"use client";

import { ActionButton, NavButton } from "@/components/ui/Buttons";

export default function BottomBar({
  canPrev,
  canNext,
  onPrev,
  onNext,
  canMark,
  onKnown,
  onUnknown,
}: {
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  canMark: boolean;
  onKnown: () => void;
  onUnknown: () => void;
}) {
  return (
    <div className="w-full h-[112px] px-4 flex items-center gap-3" style={{ paddingBottom: `calc(16px + var(--safe-bottom))` }}>
      <NavButton direction="prev" disabled={!canPrev} onClick={onPrev} />
      <div className="flex-1 flex gap-3">
        <ActionButton kind="known" disabled={!canMark} onClick={onKnown}>
          知ってた
        </ActionButton>
        <ActionButton kind="unknown" disabled={!canMark} onClick={onUnknown}>
          知らなかった
        </ActionButton>
      </div>
      <NavButton direction="next" disabled={!canNext} onClick={onNext} />
    </div>
  );
}
