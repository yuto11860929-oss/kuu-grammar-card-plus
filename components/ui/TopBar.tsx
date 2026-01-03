import Link from "next/link";
import clsx from "clsx";

export default function TopBar({
  mode,
  title,
  right,
}: {
  mode: "home" | "study" | "result";
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="h-14 w-full flex items-center justify-between px-4">
      <div className="w-11 h-11 flex items-center justify-center">
        {mode === "study" ? (
          <Link
            href="/"
            aria-label="戻る"
            className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-black/5 active:bg-black/10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>
      <div className={clsx("flex-1 text-left", mode === "home" && "text-left")}>
        <div className="text-[18px] font-medium leading-tight">{title}</div>
      </div>
      <div className="min-w-11 h-11 flex items-center justify-center text-[12px] text-textSecondary font-normal">
        {right ?? (mode === "home" ? (
          <span className="opacity-0">.</span>
        ) : null)}
      </div>
    </div>
  );
}
