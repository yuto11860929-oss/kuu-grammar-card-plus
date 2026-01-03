import clsx from "clsx";

export function ActionButton({
  kind,
  disabled,
  children,
  onClick,
}: {
  kind: "known" | "unknown";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "h-12 rounded-btn px-4 font-medium text-white text-[14px] transition active:scale-[0.98]",
        kind === "known" ? "bg-known" : "bg-unknown",
        disabled && "opacity-40 active:scale-100"
      )}
    >
      {children}
    </button>
  );
}

export function NavButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "h-10 min-w-[72px] rounded-btn border border-border bg-surface text-[12px] font-medium text-textPrimary px-3 transition",
        "hover:bg-black/5 active:bg-black/10",
        disabled && "opacity-40 active:bg-transparent hover:bg-transparent"
      )}
    >
      {direction === "prev" ? "← 前へ" : "次へ →"}
    </button>
  );
}
